import type { MetadataRoute } from "next";
import { PROJECTS } from "@/data/resume";

const SITE_URL = "https://ben4dev.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const projectPages = PROJECTS.filter((p) => p.caseStudy).map((p) => ({
    url: `${SITE_URL}/projects/${p.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    ...projectPages,
  ];
}
