import { NextResponse } from "next/server";
import { sendResumeNotification } from "@/lib/email";

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

export async function POST(request: Request) {
  try {
    const body = (await request.json().catch(() => ({}))) as { action?: string };
    const action =
      body.action === "print" ? "print" : body.action === "download" ? "download" : "view";

    const h = request.headers;
    await sendResumeNotification({
      action,
      referrer: h.get("referer") ?? undefined,
      userAgent: h.get("user-agent") ?? undefined,
      language: h.get("accept-language")?.split(",")[0]?.trim() || undefined,
      ips: collectIps(request),
      city: decodeHeader(h.get("x-vercel-ip-city")),
      region: decodeHeader(h.get("x-vercel-ip-country-region")),
      country: decodeHeader(h.get("x-vercel-ip-country")),
      latitude: h.get("x-vercel-ip-latitude") ?? undefined,
      longitude: h.get("x-vercel-ip-longitude") ?? undefined,
    });
    return NextResponse.json({ ok: true });
  } catch {
    // Always answer 200 so the client never retries or shows an error.
    return NextResponse.json({ ok: true });
  }
}
