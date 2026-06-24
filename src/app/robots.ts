import type { MetadataRoute } from "next";
import { absoluteUrl, siteUrl } from "@/lib/seo";

export default function robots(): MetadataRoute.Robots {
  return {
    host: siteUrl,
    rules: {
      allow: "/",
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
