import type { MetadataRoute } from "next";
import { getPublishedBlogPosts } from "@/lib/blog-convex";
import { getPublishedInsights } from "@/lib/insights";
import { absoluteUrl, publicRoutes, publicTextAssets, socialImageUrl } from "@/lib/seo";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const lastModified = new Date();
  const insightPosts = await getPublishedInsights();
  const blogPosts = await getPublishedBlogPosts();
  const insightSlugs = new Set(insightPosts.map((post) => post.slug));

  const publicPages: MetadataRoute.Sitemap = publicRoutes.map(({ changeFrequency, path, priority }) => ({
    changeFrequency,
    images: path === "/" ? [socialImageUrl] : undefined,
    lastModified,
    priority,
    url: absoluteUrl(path),
    videos: path === "/" ? [
      {
        description: "A product reel showing the mccaigs deterministic Assistant, Start a Project workflow, and Studio OS.",
        thumbnail_loc: absoluteUrl("/media/mccaigs-opener-poster.webp"),
        title: "mccaigs systems demonstration",
      },
    ] : undefined,
  }));

  return [
    ...publicPages,
    ...publicTextAssets.map(({ changeFrequency, path, priority }) => ({
      changeFrequency,
      lastModified,
      priority,
      url: absoluteUrl(path),
    })),
    ...insightPosts.map((post) => ({
      changeFrequency: "monthly" as const,
      lastModified: new Date(post.updatedAt ?? post.publishedAt),
      priority: 0.7,
      url: absoluteUrl(`/insights/${post.slug}`),
    })),
    ...blogPosts.filter((post) => !insightSlugs.has(post.slug)).map((post) => ({
      changeFrequency: "monthly" as const,
      lastModified: new Date(post.updatedAt),
      priority: 0.7,
      url: absoluteUrl(`/insights/${post.slug}`),
    })),
  ];
}
