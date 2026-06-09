import { v } from "convex/values";
import { internalMutation, mutation, query } from "./_generated/server";
import { requireOwner } from "./studioAuth";
import { normaliseTags } from "../src/lib/blog-tags";

const status = v.union(
  v.literal("draft"),
  v.literal("scheduled"),
  v.literal("published"),
  v.literal("archived"),
);

const fields = {
  title: v.string(),
  slug: v.string(),
  excerpt: v.string(),
  authorKey: v.string(),
  featuredImage: v.string(),
  category: v.string(),
  tags: v.any(),
  seoTitle: v.string(),
  seoDescription: v.string(),
  status,
  contentFile: v.string(),
  publishedAt: v.optional(v.number()),
  scheduledFor: v.optional(v.number()),
};

const syncStatus = v.union(
  v.literal("pending"),
  v.literal("synced"),
  v.literal("failed"),
);

function cleanText(value: string) {
  return value.trim();
}

function cleanSlug(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function validatePublishable(args: {
  title: string;
  slug: string;
  excerpt: string;
  authorKey: string;
  contentFile: string;
  seoDescription: string;
  tags: unknown;
}) {
  const required = {
    title: args.title,
    slug: args.slug,
    excerpt: args.excerpt,
    authorKey: args.authorKey,
    contentFile: args.contentFile,
    seoDescription: args.seoDescription,
  };
  const missing = Object.entries(required)
    .filter(([, value]) => typeof value !== "string" || !value.trim())
    .map(([key]) => key);
  if (missing.length) {
    throw new Error(`Publishing requires: ${missing.join(", ")}.`);
  }
  normaliseTags(args.tags);
}

function validateContentFile(slug: string, contentFile: string) {
  if (contentFile.trim() !== `${slug}.mdx`) {
    throw new Error("Content file must match the blog post slug.");
  }
}

function publicationFields(
  nextStatus: "draft" | "scheduled" | "published" | "archived",
  publishedAt?: number,
  scheduledFor?: number,
) {
  if (nextStatus === "published") {
    return { publishedAt: publishedAt ?? Date.now(), scheduledFor: undefined };
  }
  if (nextStatus === "scheduled") {
    if (!scheduledFor || scheduledFor <= Date.now()) {
      throw new Error("Scheduled posts require a future publication time.");
    }
    return { publishedAt: undefined, scheduledFor };
  }
  return { publishedAt, scheduledFor: undefined };
}

export const canManage = query({
  args: {},
  handler: async (ctx) => {
    const viewer = await requireOwner(ctx);
    return { clerkUserId: viewer.clerkUserId, role: viewer.role };
  },
});

export const listForOwner = query({
  args: {},
  handler: async (ctx) => {
    await requireOwner(ctx);
    const posts = await ctx.db.query("blogPosts").order("desc").collect();
    return posts.map((post) => ({ ...post, tags: normaliseTags(post.tags) }));
  },
});

export const getForOwner = query({
  args: { postId: v.id("blogPosts") },
  handler: async (ctx, { postId }) => {
    await requireOwner(ctx);
    const post = await ctx.db.get(postId);
    return post ? { ...post, tags: normaliseTags(post.tags) } : null;
  },
});

export const create = mutation({
  args: fields,
  handler: async (ctx, args) => {
    const viewer = await requireOwner(ctx);
    const slug = cleanSlug(args.slug);
    const tags = normaliseTags(args.tags);
    const existing = await ctx.db
      .query("blogPosts")
      .withIndex("by_slug", (q) => q.eq("slug", slug))
      .unique();
    if (existing) throw new Error("A blog post already uses this slug.");
    validateContentFile(slug, args.contentFile);
    if (args.status === "published" || args.status === "scheduled") {
      validatePublishable({
        title: args.title,
        slug,
        excerpt: args.excerpt,
        authorKey: args.authorKey,
        contentFile: args.contentFile,
        seoDescription: args.seoDescription,
        tags,
      });
    }
    const now = Date.now();
    return ctx.db.insert("blogPosts", {
      ...args,
      ...publicationFields(args.status, args.publishedAt, args.scheduledFor),
      title: cleanText(args.title),
      slug,
      excerpt: cleanText(args.excerpt),
      category: cleanText(args.category),
      tags,
      seoTitle: cleanText(args.seoTitle),
      seoDescription: cleanText(args.seoDescription),
      contentFile: cleanText(args.contentFile),
      featuredImage: cleanText(args.featuredImage),
      createdAt: now,
      updatedAt: now,
      createdBy: viewer.clerkUserId,
      updatedBy: viewer.clerkUserId,
      githubPath: `src/content/insights/${cleanText(args.contentFile)}`,
      githubSyncStatus: "pending",
    });
  },
});

export const update = mutation({
  args: { postId: v.id("blogPosts"), ...fields },
  handler: async (ctx, { postId, ...args }) => {
    const viewer = await requireOwner(ctx);
    const current = await ctx.db.get(postId);
    if (!current) throw new Error("Blog post not found.");
    const slug = cleanSlug(args.slug);
    const tags = normaliseTags(args.tags);
    const duplicate = await ctx.db
      .query("blogPosts")
      .withIndex("by_slug", (q) => q.eq("slug", slug))
      .unique();
    if (duplicate && duplicate._id !== postId) {
      throw new Error("A blog post already uses this slug.");
    }
    validateContentFile(slug, args.contentFile);
    if (args.status === "published" || args.status === "scheduled") {
      validatePublishable({
        title: args.title,
        slug,
        excerpt: args.excerpt,
        authorKey: args.authorKey,
        contentFile: args.contentFile,
        seoDescription: args.seoDescription,
        tags,
      });
    }
    await ctx.db.patch(postId, {
      ...args,
      ...publicationFields(args.status, args.publishedAt, args.scheduledFor),
      title: cleanText(args.title),
      slug,
      excerpt: cleanText(args.excerpt),
      category: cleanText(args.category),
      tags,
      seoTitle: cleanText(args.seoTitle),
      seoDescription: cleanText(args.seoDescription),
      contentFile: cleanText(args.contentFile),
      featuredImage: cleanText(args.featuredImage),
      updatedAt: Date.now(),
      updatedBy: viewer.clerkUserId,
      githubPath: `src/content/insights/${cleanText(args.contentFile)}`,
      githubSyncStatus: "pending",
      githubSyncError: undefined,
    });
  },
});

export const beginSync = mutation({
  args: { postId: v.id("blogPosts") },
  handler: async (ctx, { postId }) => {
    await requireOwner(ctx);
    const post = await ctx.db.get(postId);
    if (!post) throw new Error("Blog post not found.");
    await ctx.db.patch(postId, {
      githubSyncStatus: "pending",
      githubSyncError: undefined,
    });
  },
});

export const setSyncResult = mutation({
  args: {
    postId: v.id("blogPosts"),
    status: syncStatus,
    githubPath: v.optional(v.string()),
    githubSha: v.optional(v.string()),
    lastCommitSha: v.optional(v.string()),
    lastCommitUrl: v.optional(v.string()),
    error: v.optional(v.string()),
    clearCommitMetadata: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    await requireOwner(ctx);
    const post = await ctx.db.get(args.postId);
    if (!post) throw new Error("Blog post not found.");
    await ctx.db.patch(args.postId, {
      githubPath: args.githubPath ?? post.githubPath,
      githubSha: args.clearCommitMetadata ? undefined : args.githubSha ?? post.githubSha,
      lastCommitSha: args.clearCommitMetadata
        ? undefined
        : args.lastCommitSha ?? post.lastCommitSha,
      lastCommitUrl: args.clearCommitMetadata
        ? undefined
        : args.lastCommitUrl ?? post.lastCommitUrl,
      lastGitHubSyncAt: Date.now(),
      githubSyncStatus: args.status,
      githubSyncError: args.error,
    });
  },
});

export const remove = mutation({
  args: { postId: v.id("blogPosts") },
  handler: async (ctx, { postId }) => {
    await requireOwner(ctx);
    await ctx.db.delete(postId);
  },
});

export const listPublished = query({
  args: {},
  handler: async (ctx) => {
    const now = Date.now();
    const published = await ctx.db
      .query("blogPosts")
      .withIndex("by_status", (q) => q.eq("status", "published"))
      .collect();
    const due = await ctx.db
      .query("blogPosts")
      .withIndex("by_status", (q) => q.eq("status", "scheduled"))
      .collect();
    return [...published, ...due.filter((post) => (post.scheduledFor ?? Infinity) <= now)]
      .map((post) => ({ ...post, tags: normaliseTags(post.tags) }))
      .sort(
        (a, b) =>
          (b.publishedAt ?? b.scheduledFor ?? 0) -
          (a.publishedAt ?? a.scheduledFor ?? 0),
      );
  },
});

export const getPublishedBySlug = query({
  args: { slug: v.string() },
  handler: async (ctx, { slug }) => {
    const post = await ctx.db
      .query("blogPosts")
      .withIndex("by_slug", (q) => q.eq("slug", slug))
      .unique();
    if (!post) return null;
    if (post.status === "published") {
      return { ...post, tags: normaliseTags(post.tags) };
    }
    if (post.status === "scheduled" && (post.scheduledFor ?? Infinity) <= Date.now()) {
      return { ...post, tags: normaliseTags(post.tags) };
    }
    return null;
  },
});

export const publishScheduled = internalMutation({
  args: {},
  handler: async (ctx) => {
    const now = Date.now();
    const scheduled = await ctx.db
      .query("blogPosts")
      .withIndex("by_status", (q) => q.eq("status", "scheduled"))
      .collect();
    let published = 0;
    for (const post of scheduled) {
      if ((post.scheduledFor ?? Infinity) > now) continue;
      await ctx.db.patch(post._id, {
        status: "published",
        publishedAt: now,
        scheduledFor: undefined,
        updatedAt: now,
      });
      published += 1;
    }
    return { published };
  },
});
