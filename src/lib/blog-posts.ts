import "server-only";

import { getBlogAuthor } from "@/lib/blog-authors";
import type { BlogPostMetadata } from "@/lib/blog-convex";
import { getInsightByContentFile, type InsightPost } from "@/lib/insights";
import { normaliseTags } from "@/lib/blog-tags";

export async function hydrateBlogPost(metadata: BlogPostMetadata) {
  const source = await getInsightByContentFile(metadata.contentFile);
  if (!source) return undefined;
  const author = getBlogAuthor(metadata.authorKey);
  const publicationTime =
    metadata.publishedAt ?? metadata.scheduledFor ?? metadata.createdAt;
  const post: InsightPost = {
    ...source,
    author: author?.name ?? metadata.authorKey,
    category: metadata.category,
    coverImage: metadata.featuredImage || source.coverImage,
    excerpt: metadata.excerpt,
    filename: metadata.contentFile,
    publishedAt: new Date(publicationTime).toISOString().slice(0, 10),
    seoDescription: metadata.seoDescription,
    seoTitle: metadata.seoTitle || metadata.title,
    slug: metadata.slug,
    status: "published",
    tags: normaliseTags(metadata.tags),
    title: metadata.title,
    updatedAt: new Date(metadata.updatedAt).toISOString().slice(0, 10),
  };
  return { author, metadata, post };
}
