import { existsSync } from "node:fs";
import { readFile, readdir } from "node:fs/promises";
import { join } from "node:path";
import matter from "gray-matter";
import { normaliseTags } from "@/lib/blog-tags";

const insightsDirectory = join(process.cwd(), "src", "content", "insights");
const requiredPublishedFields = ["title", "slug", "excerpt", "publishedAt", "category", "tags", "seoTitle", "seoDescription", "author"] as const;
const statuses = ["draft", "scheduled", "published", "archived"] as const;

export type InsightStatus = (typeof statuses)[number];

export type InsightPost = {
  author: string;
  category: string;
  content: string;
  coverImage?: string;
  coverImageAlt?: string;
  excerpt: string;
  filename: string;
  publishedAt: string;
  readingTime: string;
  seoDescription: string;
  seoTitle: string;
  slug: string;
  status: InsightStatus;
  tags: string[];
  title: string;
  updatedAt?: string;
};

function asOptionalString(value: unknown) {
  return typeof value === "string" && value.trim() ? value.trim() : undefined;
}

function asString(value: unknown) {
  return asOptionalString(value) ?? "";
}

function getStatus(value: unknown): InsightStatus {
  if (value === undefined) {
    return "draft";
  }

  if (typeof value !== "string" || !statuses.includes(value as InsightStatus)) {
    throw new Error(`Insights frontmatter status must be one of: ${statuses.join(", ")}.`);
  }

  return value as InsightStatus;
}

function getTags(value: unknown) {
  return normaliseTags(value);
}

function estimateReadingTime(content: string) {
  const words = content
    .replace(/<[^>]+>/g, " ")
    .replace(/[#_*`[\](){}>-]/g, " ")
    .split(/\s+/)
    .filter(Boolean).length;

  return `${Math.max(1, Math.ceil(words / 220))} min read`;
}

function validatePublishedPost(post: InsightPost, data: Record<string, unknown>) {
  const missing = requiredPublishedFields.filter((field) => {
    if (field === "tags") {
      return post.tags.length === 0;
    }

    return !asOptionalString(data[field]);
  });

  if (missing.length > 0) {
    throw new Error(`Published insight "${post.filename}" is missing required frontmatter: ${missing.join(", ")}.`);
  }

  if (post.slug !== post.filename.replace(/\.mdx$/, "")) {
    throw new Error(`Published insight "${post.filename}" must use the same filename and slug.`);
  }

  if (Number.isNaN(Date.parse(post.publishedAt))) {
    throw new Error(`Published insight "${post.filename}" has an invalid publishedAt date.`);
  }

  if (post.updatedAt && Number.isNaN(Date.parse(post.updatedAt))) {
    throw new Error(`Published insight "${post.filename}" has an invalid updatedAt date.`);
  }
}

async function loadInsight(filename: string, validatePublished = true): Promise<InsightPost> {
  const raw = await readFile(join(insightsDirectory, filename), "utf8");
  const { content, data } = matter(raw);
  const frontmatter = data as Record<string, unknown>;
  const status = getStatus(frontmatter.status);
  const readingTime = asOptionalString(frontmatter.readingTime) ?? estimateReadingTime(content);

  const post: InsightPost = {
    author: asString(frontmatter.author),
    category: asString(frontmatter.category),
    content,
    coverImage:
      asOptionalString(frontmatter.featuredImage) ??
      asOptionalString(frontmatter.coverImage),
    coverImageAlt: asOptionalString(frontmatter.coverImageAlt),
    excerpt: asString(frontmatter.excerpt),
    filename,
    publishedAt: asString(frontmatter.publishedAt),
    readingTime,
    seoDescription: asString(frontmatter.seoDescription),
    seoTitle: asString(frontmatter.seoTitle),
    slug: asOptionalString(frontmatter.slug) ?? filename.replace(/\.mdx$/, ""),
    status,
    tags: getTags(frontmatter.tags),
    title: asOptionalString(frontmatter.title) ?? "Untitled insight",
    updatedAt: asOptionalString(frontmatter.updatedAt),
  };

  if (validatePublished && status === "published") {
    validatePublishedPost(post, frontmatter);
  }

  return post;
}

export async function getInsightByContentFile(contentFile: string) {
  if (!/^[a-z0-9-]+\.mdx$/.test(contentFile)) {
    return undefined;
  }
  const filename = (await readdir(insightsDirectory)).find(
    (candidate) => candidate === contentFile,
  );
  return filename ? loadInsight(filename, false) : undefined;
}

export async function getAllInsights() {
  const filenames = (await readdir(insightsDirectory)).filter((filename) => filename.endsWith(".mdx"));
  const posts = await Promise.all(filenames.map((filename) => loadInsight(filename)));

  return posts.sort((a, b) => Date.parse(b.publishedAt || "1970-01-01") - Date.parse(a.publishedAt || "1970-01-01"));
}

export async function getPublishedInsights() {
  return (await getAllInsights()).filter((post) => post.status === "published");
}

export async function getInsightBySlug(slug: string) {
  return (await getPublishedInsights()).find((post) => post.slug === slug);
}

export async function getRelatedInsights(post: InsightPost, limit = 3) {
  const posts = await getPublishedInsights();

  return posts
    .filter((candidate) => candidate.slug !== post.slug)
    .map((candidate) => ({
      candidate,
      score: Number(candidate.category === post.category) * 3 + candidate.tags.filter((tag) => post.tags.includes(tag)).length,
    }))
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score || Date.parse(b.candidate.publishedAt) - Date.parse(a.candidate.publishedAt))
    .slice(0, limit)
    .map(({ candidate }) => candidate);
}

export function getAvailableInsightCoverImage(coverImage?: string) {
  if (!coverImage?.startsWith("/")) {
    return undefined;
  }

  return existsSync(join(process.cwd(), "public", coverImage.replace(/^\/+/, ""))) ? coverImage : undefined;
}
