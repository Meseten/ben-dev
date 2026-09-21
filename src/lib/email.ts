import { RESUME_ALERT_EMAIL } from "./config";

export type TrackPayload = {
  action: "view" | "print" | "download";
  referrer?: string;
  userAgent?: string;
  language?: string;
  ips?: string[];
  city?: string;
  region?: string;
  country?: string;
  latitude?: string;
  longitude?: string;
  /** Fields enriched by /api/track-resume before calling this. */
  isp?: string;
  asOrg?: string;
  client?: Record<string, unknown>;
};

function deviceInfo(ua?: string): string {
  if (!ua) return "unknown";
  const os =
    /Windows/.test(ua)
      ? "Windows"
      : /Android/.test(ua)
        ? "Android"
        : /iPhone|iPad|iPod/.test(ua)
          ? "iOS"
          : /Mac OS X|Macintosh/.test(ua)
            ? "macOS"
            : /Linux/.test(ua)
              ? "Linux"
              : "unknown OS";
  const browser = /Edg\//.test(ua)
    ? "Edge"
    : /OPR\//.test(ua)
      ? "Opera"
      : /Chrome\//.test(ua)
        ? "Chrome"
        : /Safari\//.test(ua) && /Version\//.test(ua)
          ? "Safari"
          : /Firefox\//.test(ua)
            ? "Firefox"
            : "unknown browser";
  const kind = /Mobi|Android|iPhone/.test(ua) ? "mobile" : /iPad|Tablet/.test(ua) ? "tablet" : "desktop";
  return `${os} · ${browser} · ${kind}`;
}

function locationInfo(p: TrackPayload): string {
  const parts = [p.city, p.region, p.country].filter(Boolean);
  return parts.length > 0 ? parts.join(", ") : "unknown";
}

function mapLink(p: TrackPayload): string | null {
  if (!p.latitude || !p.longitude) return null;
  const lat = Number(p.latitude);
  const lon = Number(p.longitude);
  if (Number.isNaN(lat) || Number.isNaN(lon)) return null;
  return `https://www.openstreetmap.org/?mlat=${lat}&mlon=${lon}#map=10/${lat}/${lon}`;
}

/** Strict email-userinfo validation; returns null when it's not a safe link. */
function mailtoLink(p: TrackPayload): string | null {
  if (!p.client?.email) return null;
  const email = String(p.client.email);
  if (!/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(email)) return null;
  return `mailto:${email}`;
}

/** Turn any unknown JSON value into a single printable line. */
function scalar(value: unknown): string {
  if (value === null || value === undefined || value === "") return "";
  if (typeof value === "boolean") return value ? "yes" : "no";
  if (Array.isArray(value)) return value.filter((v) => v !== null && v !== undefined && v !== "").join(", ");
  if (typeof value === "object") return "";
  return String(value);
}

/** Human labels for every client field track-resume.ts can send. */
const CLIENT_LABELS: Record<string, string> = {
  pageUrl: "Page URL",
  pagePath: "Page path",
  viewportWidth: "Viewport",
  viewportHeight: "Viewport height",
  screenWidth: "Screen",
  screenHeight: "Screen height",
  devicePixelRatio: "Device pixel ratio",
  timezone: "Timezone",
  timezoneOffsetMinutes: "Timezone offset (min)",
  languages: "Languages",
  platform: "Platform",
  cpuCores: "CPU cores",
  deviceMemoryGb: "Device memory (GB)",
  storageQuotaGb: "Storage quota (GB)",
  storageUsedGb: "Storage used (GB)",
  networkType: "Network type",
  networkDownlinkMbps: "Network downlink (Mbps)",
  networkRttMs: "Network RTT (ms)",
  dataSaver: "Data saver",
  scrollDepthPercent: "Scroll depth (%)",
  timeOnPageMs: "Time on page (ms)",
  sessionId: "Session ID",
  isBotHint: "Bot hint",
  referrer: "Referrer",
  resume: "Résumé section",
  printMode: "Save as PDF",
  gpuRenderer: "GPU renderer",
};

/** Order the rows: known labels first (in this order), unknown ones after. */
const CLIENT_LABEL_ORDER = Object.keys(CLIENT_LABELS);

function clientLines(client?: Record<string, unknown>): string[] {
  if (!client) return [];
  const entries = Object.entries(client).filter(
    ([, v]) => v !== null && v !== undefined && v !== "" && (!Array.isArray(v) || v.length > 0),
  );
  const ordered = [
    ...CLIENT_LABEL_ORDER.filter((k) => entries.some(([ek]) => ek === k)),
    ...entries.map(([k]) => k).filter((k) => !CLIENT_LABEL_ORDER.includes(k)),
  ];
  return ordered
    .map((key) => {
      const value = entries.find(([ek]) => ek === key)?.[1];
      const text = scalar(value);
      return text ? `${(CLIENT_LABELS[key] ?? key).padEnd(22, " ")} ${text}` : "";
    })
    .filter(Boolean);
}

/**
 * Sends a résumé-activity notification to RESUME_ALERT_EMAIL via Resend,
 * with everything the request can tell us about who opened it: device,
 * browser, language, IPs, geo from the host platform (Vercel headers in
 * production, absent locally), plus network owner and a client-report
 * section (viewport, screen, timezone, hardware hints, scroll depth, etc.).
 *
 * No-ops silently when RESEND_API_KEY is not configured, so local dev
 * and preview builds never fail on this call.
 */
export async function sendResumeNotification(payload: TrackPayload): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey || !payload.action) return;

  const { Resend } = await import("resend");
  const resend = new Resend(apiKey);

  const when = new Date();
  const timeText = `${when.toISOString()} (UTC)`;
  const actionLabel =
    payload.action === "view"
      ? "Viewed"
      : payload.action === "print"
        ? "Printed / saved as PDF"
        : "Downloaded";

  const lines = [
    `Action:  résumé ${actionLabel.toLowerCase()}`,
    `Time:    ${timeText}`,
    ``,
    `WHO`,
    `Device:  ${deviceInfo(payload.userAgent)}`,
    `Lang:    ${payload.language ?? "unknown"}`,
    `IP:      ${payload.ips && payload.ips.length > 0 ? payload.ips.join(", ") : "unknown"}`,
    `Where:   ${locationInfo(payload)}`,
  ];
  const map = mapLink(payload);
  if (map) lines.push(`Approx. map: ${map}`);
  if (payload.isp || payload.asOrg) {
    lines.push(`Network: ${[payload.isp, payload.asOrg].filter(Boolean).join(" / ")}`);
  }
  lines.push(``, `CONTEXT`, `Page:    ${payload.referrer ?? "direct visit"}`);
  if (payload.userAgent) lines.push(`UA:      ${payload.userAgent}`);

  // Everything the visitor's browser reported about its own environment.
  const clientRows = clientLines(payload.client);
  if (clientRows.length > 0) {
    lines.push(``, `VISITOR ENVIRONMENT`);
    lines.push(...clientRows);
  }
  const contact = mailtoLink(payload);
  if (contact) lines.push(``, `CONTACT: ${contact}`);

  try {
    await resend.emails.send({
      from: "Portfolio Alerts <onboarding@resend.dev>",
      to: RESUME_ALERT_EMAIL,
      subject: `Résumé ${actionLabel.toLowerCase()} · ${locationInfo(payload)} · ${deviceInfo(payload.userAgent)}`,
      text: lines.join("\n"),
    });
  } catch {
    // Never break the visitor's experience over a notification.
  }
}
