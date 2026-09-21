"use client";

/**
 * Résumé-activity telemetry. Collects everything the browser can truthfully
 * report about a visitor's environment and hands it to /api/track-resume,
 * which enriches it server-side (IP, geo, network owner) before emailing.
 * Fire-and-forget: never blocks or breaks the visitor's UI.
 */

export type ResumeAction = "view" | "print" | "download";

/** One navigator.storage estimate, cached because it can be async/slow. */
type StorageEstimate = { quota?: number; usage?: number };

const sessionStart = Date.now();
// Cache the storage estimate once per page session.
let storageEstimate: StorageEstimate | null | undefined;

async function getStorageEstimate(): Promise<StorageEstimate | null> {
  if (storageEstimate !== undefined) return storageEstimate;
  try {
    if (typeof navigator !== "undefined" && navigator.storage?.estimate) {
      storageEstimate = await navigator.storage.estimate();
    } else {
      storageEstimate = null;
    }
  } catch {
    storageEstimate = null;
  }
  return storageEstimate;
}

/** GB with one decimal, or undefined when unavailable. */
function toGb(bytes?: number): number | undefined {
  if (typeof bytes !== "number" || !Number.isFinite(bytes) || bytes <= 0) return undefined;
  return Math.round((bytes / 1024 ** 3) * 10) / 10;
}

/** Approximate GPU renderer string via WebGL, e.g. "ANGLE (NVIDIA, NVIDIA GeForce ...)" */
function gpuRenderer(): string | undefined {
  try {
    const canvas = document.createElement("canvas");
    const gl = (canvas.getContext("webgl2") ??
      canvas.getContext("webgl")) as WebGLRenderingContext | null;
    if (!gl) return undefined;
    const dbg = gl.getExtension("WEBGL_debug_renderer_info");
    const value = dbg
      ? (gl.getParameter(dbg.UNMASKED_RENDERER_WEBGL) as string | null)
      : (gl.getParameter(gl.RENDERER) as string | null);
    return typeof value === "string" && value.length > 0 ? value.slice(0, 120) : undefined;
  } catch {
    return undefined;
  }
}

function connectionInfo(): Record<string, unknown> {
  // Network Information API: Chromium browsers only; undefined elsewhere.
  const conn = (navigator as Navigator & { connection?: unknown }).connection as
    | { effectiveType?: string; downlink?: number; rtt?: number; saveData?: boolean }
    | undefined;
  if (!conn) return {};
  return {
    networkType: conn.effectiveType, // "4g", "3g", ...
    networkDownlinkMbps: conn.downlink,
    networkRttMs: conn.rtt,
    dataSaver: conn.saveData,
  };
}

function collectClientData(): Record<string, unknown> {
  const nav = navigator as Navigator & { deviceMemory?: number };
  const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const tzOffset = new Date().getTimezoneOffset();

  return {
    // Viewport context
    screenWidth: screen.width,
    screenHeight: screen.height,
    viewportWidth: window.innerWidth,
    viewportHeight: window.innerHeight,
    devicePixelRatio: window.devicePixelRatio,

    // Locale context
    timezone: tz,
    timezoneOffsetMinutes: tzOffset,
    languages: navigator.languages ?? [navigator.language],
    platform: nav.platform,

    // Hardware hints (where exposed; absent on Safari/Firefox)
    cpuCores: nav.hardwareConcurrency,
    deviceMemoryGb: nav.deviceMemory,

    // Behavior/context
    scrollDepthPercent: Math.round(
      (window.scrollY / Math.max(1, document.documentElement.scrollHeight - window.innerHeight)) * 100,
    ),
    timeOnPageMs: Date.now() - sessionStart,
    referrer: document.referrer || undefined,
    pageUrl: window.location.href,
    pagePath: window.location.pathname,
    sessionId: sessionStorage.getItem("visitor_session") ?? undefined,
    isBotHint:
      // webdriver flag, aggressive reduced-motion/JS quirks: only a hint for the email.
      (navigator.webdriver === true ? "webdriver" : undefined),

    // Async values are merged in by trackResume after collection
    ...connectionInfo(),
  };
}

/** Fire-and-forget notification to the owner. Never blocks the UI. */
export async function trackResume(action: ResumeAction, payload: Record<string, unknown> = {}) {
  // The API contract: { action, client } — the route validates client keys
  // against its allowlist, so everything browser-reported goes under client.
  const body: Record<string, unknown> = {
    action,
    client: {
      ...collectClientData(),
      ...payload,
    },
  };

  if (typeof navigator !== "undefined" && navigator.sendBeacon) {
    try {
      // sendBeacon survives unload/print dialogs better than fetch+keepalive.
      const blob = new Blob([JSON.stringify(body)], { type: "application/json" });
      navigator.sendBeacon("/api/track-resume", blob);
      return;
    } catch {
      // fall through to fetch
    }
  }

  fetch("/api/track-resume", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
    keepalive: true,
  }).catch(() => {});
}

/** Fire the notification with async hardware data merged in. */
export async function trackResumeRich(action: ResumeAction, payload: Record<string, unknown> = {}) {
  const [storage, gpu] = await Promise.all([getStorageEstimate(), Promise.resolve(gpuRenderer())]);
  await trackResume(action, {
    ...payload,
    storageQuotaGb: toGb(storage?.quota),
    storageUsedGb: toGb(storage?.usage),
    gpuRenderer: gpu,
  });
}

/** Stable per-browser-tab session id, generated once and reused. */
export function ensureVisitorSessionId(): string {
  if (typeof window === "undefined") return "";
  try {
    let id = sessionStorage.getItem("visitor_session");
    if (!id) {
      id =
        typeof crypto !== "undefined" && "randomUUID" in crypto
          ? crypto.randomUUID()
          : `s_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`;
      sessionStorage.setItem("visitor_session", id);
    }
    return id;
  } catch {
    return "";
  }
}
