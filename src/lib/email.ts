import { RESUME_ALERT_EMAIL } from "./config";

type TrackPayload = {
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

/**
 * Sends a résumé-activity notification to RESUME_ALERT_EMAIL via Resend,
 * with everything the request can tell us about who opened it: device,
 * browser, language, IPs, and geo from the host platform (Vercel headers
 * in production, absent locally).
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
  lines.push(``, `CONTEXT`, `Page:    ${payload.referrer ?? "direct visit"}`);
  if (payload.userAgent) lines.push(`UA:      ${payload.userAgent}`);

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
