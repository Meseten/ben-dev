import { promises as fs } from "fs";
import path from "path";

/**
 * File-backed visitor log. Every résumé event (view / print / download) is
 * appended as one JSON line with its full enriched payload, so the history
 * can be browsed later even beyond the notification emails.
 *
 * Storage: <project>/.visitor-log/events.jsonl (gitignored). Appends are
 * serialized per server instance; on serverless the file lives in the
 * instance's own writable layer, so it is best-effort: a read-only disk or
 * a cold instance with an empty file never breaks the visitor's request.
 * Set VISITOR_LOG_DIR to persist somewhere durable (e.g. a mounted volume).
 */

export type VisitorEvent = {
  /** ISO timestamp, set by the log itself. */
  at: string;
  action: "view" | "print" | "download";
  /** Everything track-resume enriched: geo, IPs, UA, client telemetry. */
  payload: Record<string, unknown>;
};

const LOG_DIR = process.env.VISITOR_LOG_DIR || path.join(process.cwd(), ".visitor-log");
const LOG_FILE = path.join(LOG_DIR, "events.jsonl");
const MAX_BYTES = 5 * 1024 * 1024; // 5 MB, roughly 4–5k events

function sanitize(value: unknown, depth = 0): unknown {
  if (value === null || typeof value !== "object") {
    if (typeof value === "string") return value.slice(0, 2000);
    if (typeof value === "number" && !Number.isFinite(value)) return String(value);
    return value ?? null;
  }
  if (depth >= 6) return "[truncated]";
  if (Array.isArray(value)) return value.slice(0, 20).map((v) => sanitize(v, depth + 1));
  const out: Record<string, unknown> = {};
  for (const [k, v] of Object.entries(value as Record<string, unknown>).slice(0, 80)) {
    out[k] = sanitize(v, depth + 1);
  }
  return out;
}

/** Append one event. Best-effort: never throws into the API route. */
export async function logVisitorEvent(
  event: Omit<VisitorEvent, "at">,
): Promise<void> {
  try {
    const record: VisitorEvent = {
      at: new Date().toISOString(),
      action: event.action,
      payload: (sanitize(event.payload) ?? {}) as Record<string, unknown>,
    };
    await fs.mkdir(LOG_DIR, { recursive: true });
    // Open in append mode creates the file when missing and never truncates.
    const handle = await fs.open(LOG_FILE, "a");
    try {
      await handle.write(JSON.stringify(record) + "\n");
    } finally {
      await handle.close();
    }
    await trimIfNeeded();
  } catch {
    // Read-only filesystem or full disk: the emails still go out, this is
    // a bonus history, so stay silent.
  }
}

/** Keep the file bounded by dropping the oldest half once it exceeds MAX_BYTES. */
async function trimIfNeeded(): Promise<void> {
  try {
    const stat = await fs.stat(LOG_FILE);
    if (stat.size <= MAX_BYTES) return;
    const raw = await fs.readFile(LOG_FILE, "utf8");
    const lines = raw.split("\n").filter(Boolean);
    const keep = lines.slice(Math.floor(lines.length / 2));
    await fs.writeFile(LOG_FILE, keep.join("\n") + "\n", "utf8");
  } catch {
    // best-effort
  }
}

export type VisitorLogPage = {
  events: VisitorEvent[];
  total: number;
  truncated: boolean;
};

/**
 * Newest-first page of stored events. Reads the whole (bounded) file;
 * cheap at the 5 MB cap.
 */
export async function readVisitorEvents(
  limit = 100,
  offset = 0,
): Promise<VisitorLogPage> {
  try {
    const raw = await fs.readFile(LOG_FILE, "utf8");
    const lines = raw.split("\n").filter(Boolean);
    const events: VisitorEvent[] = [];
    for (let i = lines.length - 1; i >= 0; i--) {
      try {
        const parsed = JSON.parse(lines[i]) as VisitorEvent;
        if (parsed && typeof parsed === "object" && parsed.action) events.push(parsed);
      } catch {
        // Skip a torn line (e.g. crash mid-write) instead of failing the page.
      }
    }
    return {
      events: events.slice(offset, offset + limit),
      total: events.length,
      truncated: raw.length > MAX_BYTES,
    };
  } catch {
    // File missing (no events yet) or unreadable.
    return { events: [], total: 0, truncated: false };
  }
}
