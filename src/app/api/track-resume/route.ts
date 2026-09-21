import { NextResponse } from "next/server";
import { sendResumeNotification, type TrackPayload } from "@/lib/email";
import { logVisitorEvent } from "@/lib/visitor-log";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Header names that can carry the visitor's IP, depending on host/CDN.
// x-forwarded-for may hold a chain: client, proxy1, proxy2.
const IP_HEADERS = [
  "x-forwarded-for",
  "x-real-ip",
  "cf-connecting-ip",
  "true-client-ip",
  "fly-client-ip",
] as const;

function collectIps(request: Request): string[] {
  const ips: string[] = [];
  for (const name of IP_HEADERS) {
    const value = request.headers.get(name);
    if (!value) continue;
    for (const part of value.split(",")) {
      const ip = part.trim();
      if (ip && !ips.includes(ip)) ips.push(ip);
    }
  }
  return ips;
}

/** Vercel geo headers are URL-encoded (e.g. "Cavite%2C%20Cavite"). */
function decodeHeader(value: string | null): string | undefined {
  if (!value) return undefined;
  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
}

const IP_RE = /^(\d{1,3}(?:\.\d{1,3}){3}|[0-9a-f:]{4,45})$/i;

function firstPublicIp(ips: string[]): string | undefined {
  for (const ip of ips) {
    if (!IP_RE.test(ip)) continue;
    // Skip loopback / private ranges; only public addresses are geo-enrichable.
    if (/^(127\.|10\.|192\.168\.|172\.(1[6-9]|2\d|3[01])\.|169\.254\.|::1|f[cd][0-9a-f]{2}:)/i.test(ip)) continue;
    return ip;
  }
  return undefined;
}

type IpapiResponse = {
  country_name?: string;
  city?: string;
  region?: string;
  latitude?: number;
  longitude?: number;
  org?: string;
  asn?: string;
};

/**
 * Enriches the location with the network owner (ISP/org/ASN) and a full
 * country name from ipapi.co. When IPAPI_KEY is set (Ben provisioned one on
 * Vercel) it is passed as ?apikey=, which lifts the free endpoint's daily
 * quota; without a key the free endpoint is still tried as a fallback.
 * Toggled by RESUME_IP_ENRICH; best-effort: failures just skip enrichment.
 */
function parseIpapi(data: unknown): Partial<TrackPayload> {
  const d = data as IpapiResponse;
  if (!d || typeof d !== "object") return {};
  return {
    city: d.city || undefined,
    region: d.region || undefined,
    country: d.country_name || undefined,
    latitude: d.latitude !== undefined ? String(d.latitude) : undefined,
    longitude: d.longitude !== undefined ? String(d.longitude) : undefined,
    isp: d.org || undefined,
    asOrg: d.asn || undefined,
  };
}

async function enrichFromIp(ip: string | undefined): Promise<Partial<TrackPayload>> {
  if (!ip || !process.env.RESUME_IP_ENRICH) return {};

  const ipapiKey = process.env.IPAPI_KEY ?? process.env.IPAPI_API_KEY;
  const qs = ipapiKey ? `?apikey=${encodeURIComponent(ipapiKey)}` : "";
  try {
    const res = await fetch(
      `https://ipapi.co/${encodeURIComponent(ip)}/json/${qs}`,
      {
        signal: AbortSignal.timeout(3000),
        headers: { "User-Agent": "portfolio-resume-tracker" },
      },
    );
    if (!res.ok) return {};
    return parseIpapi(await res.json());
  } catch {
    return {};
  }
}

const CLIENT_KEYS = new Set([
  "screenWidth", "screenHeight", "viewportWidth", "viewportHeight", "devicePixelRatio",
  "timezone", "timezoneOffsetMinutes", "languages", "platform", "cpuCores", "deviceMemoryGb",
  "storageQuotaGb", "storageUsedGb", "networkType", "networkDownlinkMbps", "networkRttMs",
  "dataSaver", "scrollDepthPercent", "timeOnPageMs", "referrer", "pageUrl", "pagePath",
  "sessionId", "isBotHint", "gpuRenderer", "resume", "printMode", "email",
]);

function clampNumber(v: unknown, max: number): number | undefined {
  const n = typeof v === "number" ? v : Number(v);
  return Number.isFinite(n) && n >= 0 ? Math.min(n, max) : undefined;
}

function cleanClient(raw: unknown): Record<string, unknown> | undefined {
  if (!raw || typeof raw !== "object" || Array.isArray(raw)) return undefined;
  const out: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(raw as Record<string, unknown>)) {
    if (!CLIENT_KEYS.has(key)) continue;
    if (typeof value === "number" || typeof value === "boolean") {
      out[key] = value;
    } else if (typeof value === "string") {
      out[key] = value.slice(0, 300);
    } else if (Array.isArray(value) && value.length > 0 && value.length <= 10) {
      out[key] = value.map((v) => String(v).slice(0, 60));
    }
    // Numbers that are unbounded or NaN get clamped below.
    if (typeof out[key] === "number") {
      const clamped = clampNumber(out[key], 100_000);
      out[key] = clamped;
      if (clamped === undefined) delete out[key];
    }
  }
  return Object.keys(out).length > 0 ? out : undefined;
}

export async function POST(request: Request) {
  try {
    const body = (await request.json().catch(() => ({}))) as {
      action?: string;
      client?: Record<string, unknown>;
    };
    const action =
      body.action === "print" ? "print" : body.action === "download" ? "download" : "view";

    const h = request.headers;
    const ips = collectIps(request);
    const geo: Partial<TrackPayload> = {
      city: decodeHeader(h.get("x-vercel-ip-city")),
      region: decodeHeader(h.get("x-vercel-ip-country-region")),
      country: decodeHeader(h.get("x-vercel-ip-country")),
      latitude: h.get("x-vercel-ip-latitude") ?? undefined,
      longitude: h.get("x-vercel-ip-longitude") ?? undefined,
    };

    // Optional deep enrichment (ISP, full country name). Toggled by env so
    // it stays off (and quota untouched) unless explicitly enabled.
    const enrichment = await enrichFromIp(process.env.RESUME_IP_ENRICH === "force" ? ips[0] : firstPublicIp(ips));
    const merged: Partial<TrackPayload> = { ...geo };
    for (const key of ["city", "region", "country", "latitude", "longitude"] as const) {
      if (!merged[key] && enrichment[key]) merged[key] = enrichment[key] as string;
    }

    const payload: TrackPayload = {
      action,
      referrer: h.get("referer") ?? undefined,
      userAgent: h.get("user-agent") ?? undefined,
      language: h.get("accept-language")?.split(",")[0]?.trim() || undefined,
      ips,
      ...merged,
      isp: enrichment.isp,
      asOrg: enrichment.asOrg,
      client: cleanClient(body.client),
    };

    // Store the full enriched payload in the visitor log (best-effort,
    // before the email so the history survives even if Resend hiccups).
    await logVisitorEvent({ action, payload: payload as unknown as Record<string, unknown> });

    await sendResumeNotification(payload);
    return NextResponse.json({ ok: true });
  } catch {
    // Always answer 200 so the client never retries or shows an error.
    return NextResponse.json({ ok: true });
  }
}
