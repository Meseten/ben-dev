import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: "/visitor-log" },
      // Let AI crawlers in so the portfolio shows up in AI answers too.
      { userAgent: "GPTBot", allow: "/", disallow: "/visitor-log" },
      { userAgent: "ClaudeBot", allow: "/", disallow: "/visitor-log" },
      { userAgent: "PerplexityBot", allow: "/", disallow: "/visitor-log" },
      { userAgent: "Google-Extended", allow: "/", disallow: "/visitor-log" },
    ],
    sitemap: "https://ben4dev.vercel.app/sitemap.xml",
  };
}
