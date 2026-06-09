import type { NextRequest } from "next/server";
import type { Id } from "../../../../convex/_generated/dataModel";
import {
  createBlogContentFile,
  deleteBlogContentFile,
  readBlogContentBody,
  saveBlogFeaturedImage,
  updateBlogContentFile,
  type BlogFileMetadata,
} from "@/lib/blog-files";
import {
  beginBlogSync,
  removeBlogPost,
  requireBlogOwner,
  setBlogSyncResult,
} from "@/lib/blog-convex";

export const runtime = "nodejs";

export async function GET(request: NextRequest) {
  try {
    await requireBlogOwner();
    const contentFile = request.nextUrl.searchParams.get("contentFile") ?? "";
    const content = await readBlogContentBody(contentFile);
    return Response.json({ content });
  } catch (error) {
    return errorResponse(error);
  }
}

export async function POST(request: NextRequest) {
  let postId: Id<"blogPosts"> | undefined;
  try {
    const { client } = await requireBlogOwner();
    const body = (await request.json()) as {
      metadata: BlogFileMetadata;
      postId: Id<"blogPosts">;
      content?: string;
    };
    postId = body.postId;
    await client.mutation(beginBlogSync, { postId });
    const result = await createBlogContentFile(body.metadata, body.content);
    await recordSuccess(client, postId, result);
    return Response.json({ contentFile: body.metadata.contentFile, ...result });
  } catch (error) {
    await recordFailure(postId, error);
    return errorResponse(error);
  }
}

export async function PATCH(request: NextRequest) {
  let postId: Id<"blogPosts"> | undefined;
  try {
    const { client } = await requireBlogOwner();
    const body = (await request.json()) as {
      metadata: BlogFileMetadata;
      postId: Id<"blogPosts">;
      content?: string;
    };
    postId = body.postId;
    await client.mutation(beginBlogSync, { postId });
    const result = await updateBlogContentFile(body.metadata, body.content);
    await recordSuccess(client, postId, result);
    return Response.json({ contentFile: body.metadata.contentFile, ...result });
  } catch (error) {
    await recordFailure(postId, error);
    return errorResponse(error);
  }
}

export async function PUT(request: NextRequest) {
  try {
    await requireBlogOwner();
    const formData = await request.formData();
    const file = formData.get("file");
    const slug = String(formData.get("slug") ?? "");
    if (!(file instanceof File)) throw new Error("Select an image to upload.");
    const path = await saveBlogFeaturedImage(file, slug);
    return Response.json({ path });
  } catch (error) {
    return errorResponse(error);
  }
}

export async function DELETE(request: NextRequest) {
  let postId: Id<"blogPosts"> | undefined;
  try {
    const { client } = await requireBlogOwner();
    const body = (await request.json()) as {
      contentFile: string;
      postId: Id<"blogPosts">;
    };
    postId = body.postId;
    await client.mutation(beginBlogSync, { postId });
    await deleteBlogContentFile(body.contentFile);
    await client.mutation(removeBlogPost, { postId });
    const contentFile = body.contentFile;
    return Response.json({ contentFile });
  } catch (error) {
    await recordFailure(postId, error);
    return errorResponse(error);
  }
}

type OwnerClient = Awaited<ReturnType<typeof requireBlogOwner>>["client"];
type WriteResult = Awaited<ReturnType<typeof createBlogContentFile>>;

async function recordSuccess(
  client: OwnerClient,
  postId: Id<"blogPosts">,
  result: WriteResult,
) {
  await client.mutation(setBlogSyncResult, {
    postId,
    status: "synced",
    githubPath: result.path,
    githubSha: result.sha,
    lastCommitSha: result.mode === "github" ? result.commitSha : undefined,
    lastCommitUrl: result.mode === "github" ? result.commitUrl : undefined,
    clearCommitMetadata: result.mode === "local",
  });
}

async function recordFailure(postId: Id<"blogPosts"> | undefined, error: unknown) {
  if (!postId) return;
  try {
    const { client } = await requireBlogOwner();
    await client.mutation(setBlogSyncResult, {
      postId,
      status: "failed",
      error: safeError(error),
    });
  } catch {
    // Preserve the original publishing error when sync-state reporting also fails.
  }
}

function safeError(error: unknown) {
  const message = error instanceof Error ? error.message : "Repository sync failed.";
  return message.slice(0, 500);
}

function errorResponse(error: unknown) {
  const message = safeError(error);
  const status = message.includes("Authentication")
    ? 401
    : message.includes("owner")
      ? 403
      : 400;
  return Response.json({ error: message }, { status });
}
