import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Eye, Printer } from "lucide-react";
import ScrollProgress from "@/components/ScrollProgress";
import ScrollReveal from "@/components/ScrollReveal";
import SiteDock from "@/components/SiteDock";
import { readVisitorEvents } from "@/lib/visitor-log";

// Private analytics page: keep it out of search results either way.
export const metadata: Metadata = {
  title: "Visitor log",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

function deviceInfo(ua?: string): string {
  if (!ua) return "unknown";
  const os = /Windows/.test(ua)
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

function place(p: Record<string, unknown>): string {
  const parts = [p.city, p.region, p.country].filter(
    (v): v is string => typeof v === "string" && v.length > 0,
  );
  return parts.length > 0 ? parts.join(", ") : "unknown";
}

function fmtTime(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    timeZoneName: "short",
  });
}

function ActionBadge({ action }: { action: string }) {
  if (action === "print") {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full border border-benchmark/40 bg-benchmark/10 px-2.5 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wider text-benchmark-deep dark:text-benchmark-light">
        <Printer size={10} aria-hidden />
        printed
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-bamboo-500/40 bg-bamboo-500/10 px-2.5 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wider text-bamboo-600 dark:text-bamboo-400">
      <Eye size={10} aria-hidden />
      viewed
    </span>
  );
}

function PayloadTable({ payload }: { payload: Record<string, unknown> }) {
  const rows = Object.entries(payload).filter(
    ([, v]) => v !== null && v !== undefined && v !== "" &&
      (!Array.isArray(v) || v.length > 0) &&
      (!Array.isArray(v) || v.some((x) => x !== null && x !== undefined && x !== "")),
  );
  if (rows.length === 0) return null;
  return (
    <div className="overflow-hidden rounded-xl border border-ink/10 dark:border-ink-light/10">
      <table className="w-full text-left">
        <tbody>
          {rows.map(([key, value]) => (
            <tr key={key} className="border-b border-ink/5 dark:border-ink-light/5 last:border-b-0">
              <th
                scope="row"
                className="w-44 shrink-0 bg-bamboo-50/60 dark:bg-ink-softdark/60 px-3 py-1.5 align-top font-mono text-[10px] font-bold uppercase tracking-wider text-ink-faint"
              >
                {key}
              </th>
              <td className="break-all px-3 py-1.5 font-mono text-[11px] text-ink-soft dark:text-ink-faint">
                {Array.isArray(value) ? value.join(", ") : typeof value === "object" ? JSON.stringify(value) : String(value)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default async function VisitorLogPage() {
  const { events, total, truncated } = await readVisitorEvents(100);

  return (
    <main className="relative min-h-screen">
      <ScrollProgress />
      <SiteDock />

      <div className="relative max-w-4xl mx-auto px-4 pt-32 pb-24">
        <ScrollReveal>
          <Link
            href="/"
            className="inline-flex items-center gap-2 font-mono text-xs font-bold text-ink-soft dark:text-ink-faint hover:text-bamboo-600 dark:hover:text-bamboo-400 transition-colors mb-10"
          >
            <ArrowLeft size={14} aria-hidden />
            Back to portfolio
          </Link>

          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-ink dark:text-ink-light mb-3">
            Visitor log
          </h1>
          <p className="text-ink-soft dark:text-ink-faint max-w-2xl leading-relaxed mb-2">
            Every résumé event with its full enriched payload, stored server-side
            independently of the notification emails.
          </p>
          <p className="font-mono text-xs text-ink-faint mb-10">
            {total} stored event{total === 1 ? "" : "s"}
            {truncated ? " · oldest entries trimmed (5 MB cap)" : ""}
          </p>
        </ScrollReveal>

        {events.length === 0 ? (
          <ScrollReveal delay={0.1}>
            <div className="rounded-2xl border border-dashed border-ink/15 dark:border-ink-light/15 p-10 text-center">
              <p className="font-mono text-sm text-ink-faint">
                No events stored yet. Open the résumé on the site and reload this page.
              </p>
            </div>
          </ScrollReveal>
        ) : (
          <ol className="space-y-4">
            {events.map((event, i) => {
              const payload = (event.payload ?? {}) as Record<string, unknown>;
              return (
                <li key={`${event.at}-${i}`}>
                  <ScrollReveal delay={Math.min(i * 0.03, 0.3)}>
                    <details className="group rounded-2xl border border-ink/10 dark:border-ink-light/10 bg-white dark:bg-ink-card/60 open:border-bamboo-500/40 transition-colors">
                      <summary className="flex cursor-pointer select-none flex-wrap items-center gap-x-3 gap-y-1.5 p-5 [&::-webkit-details-marker]:hidden">
                        <ActionBadge action={event.action} />
                        <span className="font-mono text-xs font-bold text-ink dark:text-ink-light">
                          {fmtTime(event.at)}
                        </span>
                        <span className="text-xs text-ink-soft dark:text-ink-faint">
                          {place(payload)} · {deviceInfo(payload.userAgent as string | undefined)}
                        </span>
                        <span className="ml-auto font-mono text-[10px] uppercase tracking-wider text-ink-faint group-open:hidden">
                          details
                        </span>
                      </summary>
                      <div className="px-5 pb-5">
                        <PayloadTable payload={payload} />
                      </div>
                    </details>
                  </ScrollReveal>
                </li>
              );
            })}
          </ol>
        )}
      </div>
    </main>
  );
}
