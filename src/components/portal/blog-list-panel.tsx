"use client";

import Link from "next/link";
import { useQuery } from "convex/react";
import { Archive, CalendarClock, CircleAlert, Cloud, FilePenLine, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useWorkspace } from "@/components/portal/workspace-shell";
import { api } from "../../../convex/_generated/api";

export function BlogListPanel() {
  const { role } = useWorkspace();
  const posts = useQuery(api.blogPosts.listForOwner, role === "owner" ? {} : "skip");

  if (role !== "owner") {
    return <p className="text-sm text-muted-foreground">Owner access is required.</p>;
  }

  return (
    <div className="space-y-5">
      <div className="flex justify-end">
        <Button asChild>
          <Link href="/app/blog/new"><Plus /> New post</Link>
        </Button>
      </div>
      <div className="grid gap-3">
        {(posts ?? []).map((post) => (
          <Link href={`/app/blog/${post._id}`} key={post._id}>
            <Card className="border-white/10 bg-card/55 transition-colors hover:border-signal/25">
              <CardContent className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <h2 className="font-semibold text-signal-soft">{post.title}</h2>
                    <span className="rounded-full border border-signal/20 bg-signal/5 px-2 py-0.5 font-mono text-[8px] uppercase tracking-[0.12em] text-signal">
                      {post.status}
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {post.category || "Uncategorised"} / {post.contentFile}
                  </p>
                  <p className={`mt-2 flex items-center gap-1.5 text-xs ${post.githubSyncStatus === "failed" ? "text-destructive" : "text-muted-foreground"}`}>
                    {post.githubSyncStatus === "failed" ? <CircleAlert className="size-3.5" /> : <Cloud className="size-3.5" />}
                    {post.githubSyncStatus === "synced"
                      ? post.lastCommitSha
                        ? `GitHub ${post.lastCommitSha.slice(0, 7)}`
                        : "Local content synced"
                      : post.githubSyncStatus === "failed"
                        ? "Repository sync failed"
                        : "Convex saved / sync pending"}
                  </p>
                  {post.lastGitHubSyncAt ? (
                    <p className="mt-1 text-[11px] text-muted-foreground">
                      Synced {new Intl.DateTimeFormat("en-GB", { dateStyle: "medium", timeStyle: "short" }).format(post.lastGitHubSyncAt)}
                    </p>
                  ) : null}
                  {post.githubSyncError ? <p className="mt-1 text-xs text-destructive">{post.githubSyncError}</p> : null}
                </div>
                <span className="flex items-center gap-2 text-xs text-muted-foreground">
                  {post.status === "scheduled" ? <CalendarClock className="size-4" /> : post.status === "archived" ? <Archive className="size-4" /> : <FilePenLine className="size-4" />}
                  {new Intl.DateTimeFormat("en-GB", { dateStyle: "medium" }).format(post.updatedAt)}
                </span>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
      {posts?.length === 0 ? (
        <p className="rounded-xl border border-dashed border-white/12 p-8 text-center text-sm text-muted-foreground">
          No blog metadata exists yet. Create the first repository-backed post.
        </p>
      ) : null}
    </div>
  );
}
