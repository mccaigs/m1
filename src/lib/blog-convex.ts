import "server-only";

import { ConvexHttpClient } from "convex/browser";
import { makeFunctionReference } from "convex/server";
import { auth } from "@clerk/nextjs/server";
import type { Id } from "../../convex/_generated/dataModel";

const canManage = makeFunctionReference<
  "query",
  Record<string, never>,
  { clerkUserId: string; role: "owner" }
>("blogPosts:canManage");

export type BlogPostMetadata = {
  _id: Id<"blogPosts">;
  title: string;
  slug: string;
  excerpt: string;
  authorKey: string;
  featuredImage: string;
  category: string;
  tags: string[];
  seoTitle: string;
  seoDescription: string;
  status: "draft" | "scheduled" | "published" | "archived";
  contentFile: string;
  publishedAt?: number;
  scheduledFor?: number;
  createdAt: number;
  updatedAt: number;
  createdBy: string;
  updatedBy: string;
  githubPath?: string;
  githubSha?: string;
  lastCommitSha?: string;
  lastCommitUrl?: string;
  lastGitHubSyncAt?: number;
  githubSyncStatus?: "pending" | "synced" | "failed";
  githubSyncError?: string;
};

const listPublished = makeFunctionReference<
  "query",
  Record<string, never>,
  BlogPostMetadata[]
>("blogPosts:listPublished");
const getPublishedBySlug = makeFunctionReference<
  "query",
  { slug: string },
  BlogPostMetadata | null
>("blogPosts:getPublishedBySlug");
const getForOwner = makeFunctionReference<
  "query",
  { postId: Id<"blogPosts"> },
  BlogPostMetadata | null
>("blogPosts:getForOwner");
export const beginBlogSync = makeFunctionReference<
  "mutation",
  { postId: Id<"blogPosts"> },
  null
>("blogPosts:beginSync");
export const setBlogSyncResult = makeFunctionReference<
  "mutation",
  {
    postId: Id<"blogPosts">;
    status: "pending" | "synced" | "failed";
    githubPath?: string;
    githubSha?: string;
    lastCommitSha?: string;
    lastCommitUrl?: string;
    error?: string;
    clearCommitMetadata?: boolean;
  },
  null
>("blogPosts:setSyncResult");
export const removeBlogPost = makeFunctionReference<
  "mutation",
  { postId: Id<"blogPosts"> },
  null
>("blogPosts:remove");

export async function requireBlogOwner() {
  const authState = await auth();
  if (!authState.userId) throw new Error("Authentication required.");
  const token = await authState.getToken({ template: "convex" });
  const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL;
  if (!token || !convexUrl) throw new Error("Convex authentication is unavailable.");
  const client = new ConvexHttpClient(convexUrl, { logger: false });
  client.setAuth(token);
  await client.query(canManage, {});
  return { client, userId: authState.userId };
}

function publicClient() {
  const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL;
  if (!convexUrl) return null;
  return new ConvexHttpClient(convexUrl, { logger: false });
}

export async function getPublishedBlogPosts() {
  return (await publicClient()?.query(listPublished, {})) ?? [];
}

export async function getPublishedBlogPost(slug: string) {
  return (await publicClient()?.query(getPublishedBySlug, { slug })) ?? null;
}

export async function getOwnerBlogPost(postId: Id<"blogPosts">) {
  const { client } = await requireBlogOwner();
  return client.query(getForOwner, { postId });
}
