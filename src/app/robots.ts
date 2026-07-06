import type { MetadataRoute } from "next";
import { absoluteUrl, siteUrl } from "@/lib/seo";

export default function robots(): MetadataRoute.Robots {
  return {
    host: siteUrl,
    rules: {
      allow: ["/", "/llms.txt", "/llms-full.txt", "/assistant-knowledge.json", "/assistant-knowledge.md", "/ai-knowledge.json", "/ai-knowledge.md"],
      disallow: [
        "/api",
        "/api/",
        "/app",
        "/app/",
        "/admin",
        "/admin/",
        "/auth",
        "/auth/",
        "/draft",
        "/draft/",
        "/preview",
        "/preview/",
        "/sign-in",
        "/sign-in/",
        "/sign-up",
        "/sign-up/",
        "/__clerk",
        "/__clerk/",
      ],
      userAgent: "*",
    },
    sitemap: absoluteUrl("/sitemap.xml"),
  };
}
