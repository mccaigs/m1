"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMutation, useQuery } from "convex/react";
import { Archive, CalendarClock, Eye, GitBranch, RefreshCw, Save, Send, Trash2, Upload } from "lucide-react";
import { useEffect, useState, type ReactNode } from "react";
import type { Id } from "../../../convex/_generated/dataModel";
import { api } from "../../../convex/_generated/api";
import { blogAuthors } from "@/lib/blog-authors";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useWorkspace } from "@/components/portal/workspace-shell";
import { normaliseTags } from "@/lib/blog-tags";

type Status = "draft" | "scheduled" | "published" | "archived";

export function BlogEditor({ postId }: { postId?: Id<"blogPosts"> }) {
  const router = useRouter();
  const { role } = useWorkspace();
  const post = useQuery(
    api.blogPosts.getForOwner,
    role === "owner" && postId ? { postId } : "skip",
  );
  const createPost = useMutation(api.blogPosts.create);
  const updatePost = useMutation(api.blogPosts.update);
  const [error, setError] = useState<string>();
  const [saving, setSaving] = useState(false);
  const [featuredImage, setFeaturedImage] = useState<string>();
  const [titleDraft, setTitleDraft] = useState<string>();
  const [slugDraft, setSlugDraft] = useState<string>();
  const [mdxContent, setMdxContent] = useState("");
  const [contentLoading, setContentLoading] = useState(Boolean(postId));
  const [createdPostId, setCreatedPostId] = useState<Id<"blogPosts">>();
  const currentFeaturedImage = featuredImage ?? post?.featuredImage ?? "";
  const currentTitle = titleDraft ?? post?.title ?? "";
  const currentSlug = post?.slug ?? slugDraft ?? slugify(currentTitle);

  useEffect(() => {
    if (!post?.contentFile) return;
    let cancelled = false;
    void fetch(`/api/blog-files?contentFile=${encodeURIComponent(post.contentFile)}`)
      .then(async (response) => {
        const result = (await response.json()) as { content?: string; error?: string };
        if (!response.ok) throw new Error(result.error ?? "MDX content could not be loaded.");
        if (!cancelled) setMdxContent(result.content ?? "");
      })
      .catch((caught: unknown) => {
        if (!cancelled) {
          setError(caught instanceof Error ? caught.message : "MDX content could not be loaded.");
        }
      })
      .finally(() => {
        if (!cancelled) setContentLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [post?.contentFile]);

  if (role !== "owner") {
    return <p className="text-sm text-muted-foreground">Owner access is required.</p>;
  }
  if (postId && post === undefined) {
    return <p className="text-sm text-muted-foreground">Loading blog metadata...</p>;
  }
  if (postId && post === null) {
    return <p className="text-sm text-muted-foreground">Blog post not found.</p>;
  }

  async function submit(formElement: HTMLFormElement, status: Status) {
    setSaving(true);
    setError(undefined);
    try {
      const form = new FormData(formElement);
      const title = String(form.get("title"));
      const nextSlug = post?.slug ?? slugify(String(form.get("slug") || title));
      const contentFile = post?.contentFile ?? `${nextSlug}.mdx`;
      const scheduledFor =
        status === "scheduled"
          ? new Date(String(form.get("scheduledFor"))).getTime()
          : undefined;
      const publishedAt =
        status === "published"
          ? post?.publishedAt ?? Date.now()
          : post?.publishedAt;
      const metadata = {
        title,
        slug: nextSlug,
        excerpt: String(form.get("excerpt")),
        authorKey: String(form.get("authorKey")),
        featuredImage: currentFeaturedImage,
        category: String(form.get("category")),
        tags: normaliseTags(form.get("tags")),
        seoTitle: String(form.get("seoTitle")),
        seoDescription: String(form.get("seoDescription")),
        status,
        contentFile,
        publishedAt,
        scheduledFor,
      } as const;

      const existingPostId = post?._id ?? createdPostId;
      let syncPostId: Id<"blogPosts">;
      if (existingPostId) {
        await updatePost({ postId: existingPostId, ...metadata });
        syncPostId = existingPostId;
      } else {
        syncPostId = await createPost(metadata);
        setCreatedPostId(syncPostId);
      }
      await syncPost(
        syncPostId,
        metadata,
        mdxContent,
        existingPostId ? "PATCH" : "POST",
      );
      if (!post) router.replace(`/app/blog/${syncPostId}`);
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Blog post could not be saved.");
    } finally {
      setSaving(false);
    }
  }

  async function uploadImage(file?: File) {
    if (!file) return;
    const imageSlug = currentSlug;
    if (!imageSlug) {
      setError("Add a slug before uploading the featured image.");
      return;
    }
    const body = new FormData();
    body.set("slug", imageSlug);
    body.set("file", file);
    const response = await fetch("/api/blog-files", { method: "PUT", body });
    const result = (await response.json()) as { error?: string; path?: string };
    if (!response.ok || !result.path) {
      setError(result.error ?? "Image upload failed.");
      return;
    }
    setFeaturedImage(result.path);
  }

  async function deletePost() {
    if (!post || !window.confirm("Delete this blog post and its repository MDX file?")) return;
    setSaving(true);
    setError(undefined);
    try {
      const response = await fetch("/api/blog-files", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contentFile: post.contentFile, postId: post._id }),
      });
      const result = (await response.json()) as { error?: string };
      if (!response.ok) throw new Error(result.error ?? "MDX file could not be deleted.");
      router.replace("/app/blog");
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Blog post could not be deleted.");
    } finally {
      setSaving(false);
    }
  }

  async function retrySync() {
    if (!post) return;
    setSaving(true);
    setError(undefined);
    try {
      await syncPost(post._id, {
        title: post.title,
        slug: post.slug,
        excerpt: post.excerpt,
        authorKey: post.authorKey,
        featuredImage: post.featuredImage,
        category: post.category,
        tags: normaliseTags(post.tags),
        seoTitle: post.seoTitle,
        seoDescription: post.seoDescription,
        status: post.status,
        contentFile: post.contentFile,
        publishedAt: post.publishedAt,
        scheduledFor: post.scheduledFor,
      }, mdxContent, "PATCH");
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "GitHub sync could not be retried.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <form
      className="space-y-6"
      onSubmit={(event) => {
        event.preventDefault();
        void submit(event.currentTarget, "draft");
      }}
    >
      <Card className="border-white/10 bg-card/55">
        <CardContent className="grid gap-4 p-5 sm:p-6 md:grid-cols-2">
          <Field label="Title"><Input name="title" onChange={(event) => setTitleDraft(event.target.value)} required value={currentTitle} /></Field>
          <Field label="Slug">
            <Input
              disabled={Boolean(post)}
              name="slug"
              onChange={(event) => setSlugDraft(slugify(event.target.value))}
              placeholder="generated-from-title"
              value={currentSlug}
            />
          </Field>
          <Field className="md:col-span-2" label="Excerpt"><Textarea defaultValue={post?.excerpt} name="excerpt" required /></Field>
          <Field label="Author">
            <select className="h-8 rounded-lg border border-input bg-background px-3 text-sm" defaultValue={post?.authorKey ?? "david"} name="authorKey">
              {blogAuthors.map((author) => <option key={author.key} value={author.key}>{author.name} / {author.role}</option>)}
            </select>
          </Field>
          <Field label="Category"><Input defaultValue={post?.category} name="category" /></Field>
          <Field className="md:col-span-2" label="Tags (comma separated)"><Input defaultValue={normaliseTags(post?.tags).join(", ")} name="tags" /></Field>
          <Field label="SEO title"><Input defaultValue={post?.seoTitle} name="seoTitle" /></Field>
          <Field label="SEO description"><Input defaultValue={post?.seoDescription} name="seoDescription" required /></Field>
          <Field label="Featured image path"><Input onChange={(event) => setFeaturedImage(event.target.value)} value={currentFeaturedImage} /></Field>
          <Field label="Upload featured image">
            <label className="flex h-8 cursor-pointer items-center gap-2 rounded-lg border border-input bg-background px-3 text-sm">
              <Upload className="size-4" /> Select image
              <input accept="image/jpeg,image/png,image/webp" className="sr-only" onChange={(event) => void uploadImage(event.target.files?.[0])} type="file" />
            </label>
          </Field>
          <Field label="Schedule publication">
            <Input defaultValue={toLocalDateTime(post?.scheduledFor)} name="scheduledFor" type="datetime-local" />
          </Field>
          <Field label="Content file"><Input disabled value={post?.contentFile ?? `${currentSlug || "article-slug"}.mdx`} /></Field>
        </CardContent>
      </Card>

      <Card className="border-white/10 bg-card/55">
        <CardContent className="p-5 sm:p-6">
          <Field label="MDX Content">
            <Textarea
              className="min-h-[32rem] resize-y font-mono text-sm leading-6"
              disabled={contentLoading}
              name="mdxContent"
              onChange={(event) => setMdxContent(event.target.value)}
              placeholder="# Article heading&#10;&#10;Article body here..."
              value={contentLoading ? "Loading MDX content..." : mdxContent}
            />
          </Field>
          <p className="mt-2 text-xs text-muted-foreground">
            Enter the article body. Metadata fields generate the final frontmatter automatically; pasted frontmatter is ignored.
          </p>
        </CardContent>
      </Card>

      {post ? (
        <Card className="border-white/10 bg-card/55">
          <CardContent className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
            <div>
              <p className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.16em] text-signal">
                <GitBranch className="size-4" /> Repository sync
              </p>
              <p className="mt-2 text-sm text-foreground">
                {syncLabel(post.githubSyncStatus, post.lastCommitSha)}
              </p>
              {post.lastGitHubSyncAt ? (
                <p className="mt-1 text-xs text-muted-foreground">
                  Last checked {new Intl.DateTimeFormat("en-GB", { dateStyle: "medium", timeStyle: "short" }).format(post.lastGitHubSyncAt)}
                </p>
              ) : null}
              {post.githubSyncError ? <p className="mt-2 text-sm text-destructive">{post.githubSyncError}</p> : null}
              {post.lastCommitSha ? (
                post.lastCommitUrl ? (
                  <a className="mt-2 inline-block font-mono text-[10px] text-signal hover:underline" href={post.lastCommitUrl} rel="noreferrer" target="_blank">
                    Commit {post.lastCommitSha.slice(0, 7)}
                  </a>
                ) : (
                  <p className="mt-2 font-mono text-[10px] text-muted-foreground">Commit {post.lastCommitSha.slice(0, 7)}</p>
                )
              ) : null}
            </div>
            {post.githubSyncStatus === "failed" ? (
              <Button disabled={saving} onClick={() => void retrySync()} type="button" variant="outline">
                <RefreshCw /> Retry GitHub sync
              </Button>
            ) : null}
          </CardContent>
        </Card>
      ) : null}

      {error ? <p className="rounded-lg border border-destructive/20 bg-destructive/10 p-3 text-sm text-destructive">{error}</p> : null}

      <div className="flex flex-wrap gap-2">
        <Button disabled={saving || contentLoading} type="submit"><Save /> Save draft</Button>
        <ActionButton disabled={saving || contentLoading} icon={<Send />} label="Publish now" onClick={(form) => void submit(form, "published")} />
        <ActionButton disabled={saving || contentLoading} icon={<CalendarClock />} label="Schedule" onClick={(form) => void submit(form, "scheduled")} variant="secondary" />
        <ActionButton disabled={saving || contentLoading} icon={<Archive />} label="Archive" onClick={(form) => void submit(form, "archived")} variant="outline" />
        {post ? <Button asChild variant="outline"><Link href={`/app/blog/${post._id}/preview`}><Eye /> Preview</Link></Button> : null}
        {post ? <Button disabled={saving} onClick={() => void deletePost()} type="button" variant="destructive"><Trash2 /> Delete</Button> : null}
      </div>
    </form>
  );
}

async function syncPost(
  postId: Id<"blogPosts">,
  metadata: {
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
    status: Status;
    tags: string[];
    title: string;
  },
  content: string,
  method: "PATCH" | "POST",
) {
  const response = await fetch("/api/blog-files", {
    method,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ content, metadata, postId }),
  });
  const result = (await response.json()) as { error?: string };
  if (!response.ok) throw new Error(result.error ?? "Repository sync failed.");
}

function syncLabel(status?: "failed" | "pending" | "synced", commitSha?: string) {
  if (status === "synced" && commitSha) return "Committed to GitHub.";
  if (status === "synced") return "Content file synced in local write mode.";
  if (status === "failed") return "Saved in Convex, but repository sync failed.";
  return "Saved in Convex and waiting for repository sync.";
}

function ActionButton({ disabled, icon, label, onClick, variant }: { disabled: boolean; icon: ReactNode; label: string; onClick: (form: HTMLFormElement) => void; variant?: "secondary" | "outline" }) {
  return <Button disabled={disabled} onClick={(event) => onClick(event.currentTarget.form!)} type="button" variant={variant}>{icon}{label}</Button>;
}

function Field({ children, className = "", label }: { children: ReactNode; className?: string; label: string }) {
  return <label className={`grid gap-2 text-sm ${className}`}><span className="text-muted-foreground">{label}</span>{children}</label>;
}

function slugify(value: string) {
  return value.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

function toLocalDateTime(value?: number) {
  if (!value) return "";
  const date = new Date(value - new Date(value).getTimezoneOffset() * 60_000);
  return date.toISOString().slice(0, 16);
}
