import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Ben James Duag, Systems & Applications Developer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px",
          background: "linear-gradient(135deg, #020617 0%, #0b1526 100%)",
          color: "#f8fafc",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        {/* Grid pattern */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(to right, rgba(148,163,184,0.07) 1px, transparent 1px), linear-gradient(to bottom, rgba(148,163,184,0.07) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
            display: "flex",
          }}
        />

        {/* Top row: badge + domain */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", position: "relative" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 14,
              padding: "12px 26px",
              borderRadius: 999,
              border: "1px solid rgba(22,163,74,0.45)",
              background: "rgba(22,163,74,0.12)",
            }}
          >
            <div
              style={{
                width: 14,
                height: 14,
                borderRadius: 999,
                background: "#22c55e",
                display: "flex",
              }}
            />
            <span style={{ fontSize: 24, fontWeight: 700, color: "#4ade80", letterSpacing: 2 }}>
              krna | LIVE ON PYPI
            </span>
          </div>
          <span style={{ fontSize: 26, color: "#94a3b8", fontWeight: 600, display: "flex" }}>ben4dev.vercel.app</span>
        </div>

        {/* Middle: name + role */}
        <div style={{ display: "flex", flexDirection: "column", gap: 22, position: "relative" }}>
          <div style={{ fontSize: 30, color: "#22d3ee", fontWeight: 700, letterSpacing: 4, display: "flex" }}>
            ben4dev | SYSTEMS &amp; APPLICATIONS DEVELOPER
          </div>
          <div style={{ fontSize: 96, fontWeight: 700, letterSpacing: -3, lineHeight: 1.05, display: "flex" }}>
            Ben James Duag
          </div>
          <div style={{ fontSize: 34, color: "#94a3b8", display: "flex" }}>
            Full-stack | AI research | civic tech
          </div>
        </div>

        {/* Bottom row: tech strip */}
        <div style={{ display: "flex", gap: 18, position: "relative" }}>
          {["Next.js", "Python", "Tauri", "Firebase", "OSINT"].map((t) => (
            <div
              key={t}
              style={{
                display: "flex",
                padding: "10px 24px",
                borderRadius: 14,
                border: "1px solid rgba(148,163,184,0.25)",
                background: "rgba(15,23,42,0.6)",
                color: "#cbd5e1",
                fontSize: 24,
                fontWeight: 600,
              }}
            >
              {t}
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size }
  );
}
