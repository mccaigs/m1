import type { MetadataRoute } from "next";
import { getPublishedBlogPosts } from "@/lib/blog-convex";
import { getPublishedInsights } from "@/lib/insights";
import { absoluteUrl, publicRoutes } from "@/lib/seo";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const lastModified = new Date();
  const insightPosts = await getPublishedInsights();
  const blogPosts = await getPublishedBlogPosts();

  const publicPages: MetadataRoute.Sitemap = publicRoutes.map(({ changeFrequency, path, priority }) => ({
    changeFrequency,
    images: path === "/" ? [absoluteUrl("/opengraph-image")] : undefined,
    lastModified,
    priority,
    url: absoluteUrl(path),
    videos: path === "/" ? [
      {
        description: "A product reel showing the McCaigs deterministic Assistant, Start a Project workflow, and Studio OS.",
        thumbnail_loc: absoluteUrl("/media/mccaigs-systems-demo-poster.png"),
        title: "McCaigs systems demonstration",
      },
    ] : undefined,
  }));

  return [
    ...publicPages,
    ...insightPosts.map((post) => ({
      changeFrequency: "monthly" as const,
      lastModified: new Date(post.updatedAt ?? post.publishedAt),
      priority: 0.6,
      url: absoluteUrl(`/insights/${post.slug}`),
    })),
    ...blogPosts.map((post) => ({
      changeFrequency: "monthly" as const,
      lastModified: new Date(post.updatedAt),
      priority: 0.6,
      url: absoluteUrl(`/blog/${post.slug}`),
    })),
  ];
}
