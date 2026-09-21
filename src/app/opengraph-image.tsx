import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Ben James Duag, Systems & Applications Developer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Share card in the site's locked palette (DESIGN.md): bamboo-ink ground,
 * bamboo accent, warm paper text. No grid patterns, no second accent.
 */
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
          background: "linear-gradient(135deg, #0C130D 0%, #131C12 100%)",
          color: "#EDF3EA",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        {/* Top row: status + domain */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", position: "relative" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 14,
              padding: "12px 26px",
              borderRadius: 999,
              border: "1px solid rgba(123,201,106,0.45)",
              background: "rgba(63,125,46,0.18)",
            }}
          >
            <div
              style={{
                width: 14,
                height: 14,
                borderRadius: 999,
                background: "#7BC96A",
                display: "flex",
              }}
            />
            <span style={{ fontSize: 24, fontWeight: 700, color: "#A8D180", letterSpacing: 2 }}>
              krna | LIVE ON PYPI
            </span>
          </div>
          <span style={{ fontSize: 26, color: "#98A88F", fontWeight: 600, display: "flex" }}>ben4dev.vercel.app</span>
        </div>

        {/* Middle: name + role */}
        <div style={{ display: "flex", flexDirection: "column", gap: 22, position: "relative" }}>
          <div style={{ fontSize: 30, color: "#7BC96A", fontWeight: 700, letterSpacing: 4, display: "flex" }}>
            ben4dev | SYSTEMS &amp; APPLICATIONS DEVELOPER
          </div>
          <div style={{ fontSize: 96, fontWeight: 700, letterSpacing: -3, lineHeight: 1.05, display: "flex" }}>
            Ben James Duag
          </div>
          <div style={{ fontSize: 34, color: "#A9B8A0", display: "flex" }}>
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
                border: "1px solid rgba(123,201,106,0.3)",
                background: "rgba(10,16,10,0.6)",
                color: "#C9E3AB",
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
