import "server-only";

import { mkdir, readFile, unlink, writeFile } from "node:fs/promises";
import { join } from "node:path";
import matter from "gray-matter";
import { getBlogAuthor } from "@/lib/blog-authors";
import { normaliseTags } from "@/lib/blog-tags";
import {
  commitGitHubFile,
  deleteGitHubFile,
  readGitHubFile,
  type GitHubCommitResult,
} from "@/lib/server/github-publisher";

const contentDirectory = join(process.cwd(), "src", "content", "insights");
const templatePath = join(contentDirectory, "mdx-template.md");
const contentRepoDirectory = "src/content/insights";
const imageRepoDirectory = "public/content/insights";

export type BlogWriteMode = "github" | "local";
export type BlogWriteResult = GitHubCommitResult & { mode: BlogWriteMode };

export type BlogFileMetadata = {
  authorKey: string;
  category: string;
  contentFile: string;
  excerpt: string;
  featuredImage: string;
  publishedAt?: number;
  scheduledFor?: number;
  seoDescription: string;
  seoTitle: string;
  slug: string;
  status: "draft" | "scheduled" | "published" | "archived";
  tags: string[];
  title: string;
};

function assertContentFile(contentFile: string) {
  if (!/^[a-z0-9-]+\.mdx$/.test(contentFile)) {
    throw new Error("Content file must be a lowercase kebab-case MDX filename.");
  }
}

function assertFileMatchesSlug(metadata: BlogFileMetadata) {
  assertContentFile(metadata.contentFile);
  if (metadata.contentFile !== `${metadata.slug}.mdx`) {
    throw new Error("Content file must match the blog post slug.");
  }
}

function dateValue(timestamp?: number) {
  return timestamp ? new Date(timestamp).toISOString().slice(0, 10) : "";
}

function frontmatter(metadata: BlogFileMetadata) {
  const author = getBlogAuthor(metadata.authorKey);
  if (!author) throw new Error("Unknown blog author.");
  return {
    title: metadata.title,
    slug: metadata.slug,
    excerpt: metadata.excerpt,
    publishedAt: dateValue(metadata.publishedAt ?? metadata.scheduledFor),
    updatedAt: dateValue(Date.now()),
    category: metadata.category,
    tags: normaliseTags(metadata.tags),
    seoTitle: metadata.seoTitle,
    seoDescription: metadata.seoDescription,
    status: metadata.status,
    featuredImage: metadata.featuredImage,
    coverImage: metadata.featuredImage,
    author: author.name,
    readingTime: "",
  };
}

export function getBlogWriteMode(): BlogWriteMode {
  const configured = process.env.BLOG_WRITE_MODE?.trim().toLowerCase();
  if (configured && configured !== "local" && configured !== "github") {
    throw new Error("BLOG_WRITE_MODE must be either local or github.");
  }
  if (configured === "local" || configured === "github") return configured;
  return process.env.NODE_ENV === "production" ? "github" : "local";
}

function contentRepoPath(contentFile: string) {
  return `${contentRepoDirectory}/${contentFile}`;
}

function commitMessage(action: "create" | "delete" | "update", slug: string) {
  const verbs = { create: "Create", delete: "Delete", update: "Update" } as const;
  return `${verbs[action]} blog post: ${slug}`;
}

function articleBody(input: string) {
  return matter(input).content.trimStart();
}

async function generatedContent(metadata: BlogFileMetadata, body?: string) {
  const content = body === undefined
    ? matter(await readFile(templatePath, "utf8")).content
    : articleBody(body);
  return matter.stringify(content, frontmatter(metadata));
}

export async function createBlogContentFile(metadata: BlogFileMetadata, body?: string): Promise<BlogWriteResult> {
  assertFileMatchesSlug(metadata);
  const mode = getBlogWriteMode();
  const content = await generatedContent(metadata, body);
  if (mode === "github") {
    return {
      ...(await commitGitHubFile({
        content,
        message: commitMessage("create", metadata.slug),
        path: contentRepoPath(metadata.contentFile),
      })),
      mode,
    };
  }
  const target = join(contentDirectory, metadata.contentFile);
  await writeFile(target, content, "utf8");
  return { commitSha: "local", commitUrl: "", mode, path: contentRepoPath(metadata.contentFile) };
}

export async function updateBlogContentFile(metadata: BlogFileMetadata, body?: string): Promise<BlogWriteResult> {
  assertFileMatchesSlug(metadata);
  const mode = getBlogWriteMode();
  const content = await generatedContent(metadata, body);
  if (mode === "github") {
    return {
      ...(await commitGitHubFile({
        content,
        message: commitMessage("update", metadata.slug),
        path: contentRepoPath(metadata.contentFile),
      })),
      mode,
    };
  }
  const target = join(contentDirectory, metadata.contentFile);
  await writeFile(target, content, "utf8");
  return { commitSha: "local", commitUrl: "", mode, path: contentRepoPath(metadata.contentFile) };
}

export async function readBlogContentBody(contentFile: string) {
  assertContentFile(contentFile);
  const mode = getBlogWriteMode();
  if (mode === "github") {
    const existing = await readGitHubFile(contentRepoPath(contentFile));
    return existing ? matter(existing.content).content.trimStart() : "";
  }
  try {
    const existing = await readFile(join(contentDirectory, contentFile), "utf8");
    return matter(existing).content.trimStart();
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") return "";
    throw error;
  }
}

export async function deleteBlogContentFile(contentFile: string): Promise<BlogWriteResult | null> {
  assertContentFile(contentFile);
  const mode = getBlogWriteMode();
  if (mode === "github") {
    const result = await deleteGitHubFile({
      message: commitMessage("delete", contentFile.replace(/\.mdx$/, "")),
      path: contentRepoPath(contentFile),
    });
    return result ? { ...result, mode } : null;
  }
  try {
    await unlink(join(contentDirectory, contentFile));
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code !== "ENOENT") throw error;
  }
  return { commitSha: "local", commitUrl: "", mode, path: contentRepoPath(contentFile) };
}

export async function saveBlogFeaturedImage(file: File, slug: string) {
  if (!/^[a-z0-9-]+$/.test(slug)) throw new Error("Invalid blog slug.");
  if (!file.type.startsWith("image/")) throw new Error("Featured image must be an image.");
  const extension = file.name.split(".").pop()?.toLowerCase() ?? "jpg";
  if (!["jpg", "jpeg", "png", "webp"].includes(extension)) {
    throw new Error("Featured image must be JPG, PNG, or WebP.");
  }
  const mode = getBlogWriteMode();
  const directory = join(process.cwd(), "public", "content", "insights");
  await mkdir(directory, { recursive: true });
  const filename = `${slug}.${extension}`;
  const content = Buffer.from(await file.arrayBuffer());
  if (mode === "github") {
    await commitGitHubFile({
      content,
      message: `Update blog featured image: ${slug}`,
      path: `${imageRepoDirectory}/${filename}`,
    });
  } else {
    await writeFile(join(directory, filename), content);
  }
  return `/content/insights/${filename}`;
}
