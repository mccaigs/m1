"use client";

import { useState, type FormEvent } from "react";
import { useMutation, useQuery } from "convex/react";
import { makeFunctionReference } from "convex/server";
import { ExternalLink, ImageIcon, MessageSquareText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { SetupState } from "@/components/portal/setup-state";
import { useWorkspace } from "@/components/portal/workspace-shell";

type Status =
  | "enquiry"
  | "discovery"
  | "research"
  | "planning"
  | "proposal"
  | "build"
  | "review"
  | "live"
  | "archived";
type AssetType = "screenshot" | "previewLink" | "github" | "document" | "note" | "handover" | "figma" | "loom" | "other";
type Project = {
  _id: string;
  title: string;
  description?: string;
  status: Status;
  type?: string;
  projectType: string;
  priority?: string;
  targetLaunchDate?: number;
  viewerRole: "owner" | "admin" | "staff" | "client";
  client?: {
    name: string;
    company: string;
    email: string;
    phone?: string;
  } | null;
};
type Update = {
  _id: string;
  title: string;
  body: string;
  visibility: "internal" | "client";
  createdAt: number;
};
type Asset = {
  _id: string;
  title: string;
  type: AssetType;
  url?: string;
  imageUrl?: string;
  description?: string;
  approvedForClient?: boolean;
};

const getProject = makeFunctionReference<"query", { projectId: string }, Project | null>(
  "projects:get",
);
const listUpdates = makeFunctionReference<"query", { projectId: string }, Update[]>(
  "projectUpdates:list",
);
const listAssets = makeFunctionReference<"query", { projectId: string }, Asset[]>(
  "projectAssets:list",
);
const updateProject = makeFunctionReference<
  "mutation",
  { projectId: string; status?: Status; title?: string; description?: string },
  null
>("projects:update");
const createUpdate = makeFunctionReference<
  "mutation",
  { projectId: string; title: string; body: string; visibility: "internal" | "client" },
  string
>("projectUpdates:create");
const createAsset = makeFunctionReference<
  "mutation",
  {
    projectId: string;
    type: AssetType;
    title: string;
    url?: string;
    imageUrl?: string;
    description?: string;
    approvedForClient: boolean;
  },
  string
>("projectAssets:create");

export function ProjectDetailPanel({ projectId }: { projectId: string }) {
  const { configured } = useWorkspace();
  const project = useQuery(getProject, configured ? { projectId } : "skip");
  const updates = useQuery(listUpdates, configured ? { projectId } : "skip");
  const assets = useQuery(listAssets, configured ? { projectId } : "skip");
  const patchProject = useMutation(updateProject);
  const addUpdate = useMutation(createUpdate);
  const addAsset = useMutation(createAsset);
  const [message, setMessage] = useState<string>();

  if (!configured) return <SetupState />;
  if (project === undefined) {
    return <p className="text-sm text-muted-foreground">Loading project workspace...</p>;
  }
  if (!project) {
    return <p className="text-sm text-muted-foreground">Project not found.</p>;
  }

  const editable = project.viewerRole !== "client";

  async function submitUpdate(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    await addUpdate({
      projectId,
      title: String(form.get("title")),
      body: String(form.get("body")),
      visibility: String(form.get("visibility")) as "internal" | "client",
    });
    event.currentTarget.reset();
    setMessage("Project update added.");
  }

  async function submitAsset(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const type = String(form.get("type")) as AssetType;
    const url = String(form.get("url") || "") || undefined;
    await addAsset({
      projectId,
      type,
      title: String(form.get("title")),
      url,
      imageUrl: type === "screenshot" ? url : undefined,
      description: String(form.get("description") || "") || undefined,
      approvedForClient: form.get("approvedForClient") === "on",
    });
    event.currentTarget.reset();
    setMessage("Project resource added.");
  }

  return (
    <div className="space-y-6">
      <Card className="border-white/10 bg-card/55">
        <CardContent className="p-5 sm:p-6">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
            <div>
              <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-signal">
                {project.client?.company ?? "Studio project"}
              </p>
              <h1 className="mt-3 text-3xl font-semibold tracking-tight text-signal-soft">
                {project.title}
              </h1>
              <p className="mt-3 max-w-3xl text-sm leading-6 text-muted-foreground">
                {project.description ?? "No project description has been added."}
              </p>
            </div>
            {editable ? (
              <select
                className="h-8 rounded-lg border border-white/10 bg-background px-3 text-sm"
                onChange={(event) =>
                  void patchProject({
                    projectId,
                    status: event.target.value as Status,
                  })
                }
                value={project.status}
              >
                {["enquiry", "discovery", "research", "planning", "proposal", "build", "review", "live", "archived"].map(
                  (status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ),
                )}
              </select>
            ) : (
              <span className="rounded-full border border-signal/20 bg-signal/5 px-3 py-1 font-mono text-[9px] uppercase tracking-[0.12em] text-signal">
                {project.status}
              </span>
            )}
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 xl:grid-cols-[1fr_20rem]">
        <div className="space-y-6">
          <Card className="border-white/10 bg-card/55">
            <CardContent className="p-5 sm:p-6">
              <div className="flex items-center gap-2 text-signal">
                <MessageSquareText className="size-4" />
                <p className="font-mono text-[9px] uppercase tracking-[0.16em]">
                  Project updates
                </p>
              </div>
              {editable ? (
                <form className="mt-4 grid gap-3" onSubmit={submitUpdate}>
                  <Input name="title" placeholder="Update title" required />
                  <Textarea name="body" placeholder="What changed?" required />
                  <div className="flex flex-wrap items-center gap-3">
                    <select
                      className="h-8 rounded-lg border border-input bg-background px-3 text-sm"
                      defaultValue="client"
                      name="visibility"
                    >
                      <option value="client">Client visible</option>
                      <option value="internal">Internal note</option>
                    </select>
                    <Button type="submit">Add update</Button>
                  </div>
                </form>
              ) : null}
              <div className="mt-5 space-y-3">
                {(updates ?? []).map((update) => (
                  <div
                    className="rounded-lg border border-white/8 bg-background/35 p-4"
                    key={update._id}
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <h3 className="font-medium text-signal-soft">{update.title}</h3>
                      <span className="font-mono text-[8px] uppercase tracking-[0.12em] text-muted-foreground">
                        {update.visibility}
                      </span>
                    </div>
                    <p className="mt-2 whitespace-pre-wrap text-sm leading-6 text-muted-foreground">
                      {update.body}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="border-white/10 bg-card/55">
            <CardContent className="p-5 sm:p-6">
              <div className="flex items-center gap-2 text-signal">
                <ImageIcon className="size-4" />
                <p className="font-mono text-[9px] uppercase tracking-[0.16em]">
                  Assets and links
                </p>
              </div>
              {editable ? (
                <form className="mt-4 grid gap-3 md:grid-cols-2" onSubmit={submitAsset}>
                  <Input name="title" placeholder="Resource title" required />
                  <select
                    className="h-8 rounded-lg border border-input bg-background px-3 text-sm"
                    defaultValue="previewLink"
                    name="type"
                  >
                    {["screenshot", "previewLink", "github", "figma", "document", "loom", "handover", "note", "other"].map(
                      (type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ),
                    )}
                  </select>
                  <Input className="md:col-span-2" name="url" placeholder="URL (optional for notes)" type="url" />
                  <Textarea className="md:col-span-2" name="description" placeholder="Context or note" />
                  <label className="flex items-center gap-2 text-sm text-muted-foreground">
                    <input name="approvedForClient" type="checkbox" />
                    Approved for client
                  </label>
                  <Button className="md:w-fit" type="submit">
                    Add resource
                  </Button>
                </form>
              ) : null}
              <div className="mt-5 grid gap-3 md:grid-cols-2">
                {(assets ?? []).map((asset) => (
                  <div
                    className="rounded-lg border border-white/8 bg-background/35 p-4"
                    key={asset._id}
                  >
                    <p className="font-mono text-[8px] uppercase tracking-[0.12em] text-signal">
                      {asset.type}
                    </p>
                    <h3 className="mt-2 font-medium">{asset.title}</h3>
                    {asset.description ? (
                      <p className="mt-2 text-sm leading-6 text-muted-foreground">
                        {asset.description}
                      </p>
                    ) : null}
                    {asset.url ? (
                      <a
                        className="mt-3 flex items-center gap-2 text-sm text-signal-soft hover:text-signal"
                        href={asset.url}
                        rel="noreferrer"
                        target="_blank"
                      >
                        Open resource <ExternalLink className="size-3.5" />
                      </a>
                    ) : null}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
        <aside>
          <Card className="border-white/10 bg-card/55">
            <CardContent className="p-5">
              <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-signal">
                Client details
              </p>
              <h2 className="mt-3 font-semibold text-signal-soft">
                {project.client?.company ?? "No client assigned"}
              </h2>
              {project.client ? (
                <div className="mt-4 space-y-2 text-sm text-muted-foreground">
                  <p>{project.client.name}</p>
                  <a className="block hover:text-signal-soft" href={`mailto:${project.client.email}`}>
                    {project.client.email}
                  </a>
                  {project.client.phone ? <p>{project.client.phone}</p> : null}
                </div>
              ) : null}
              <div className="mt-5 border-t border-white/8 pt-4">
                <p className="font-mono text-[8px] uppercase tracking-[0.12em] text-muted-foreground">
                  Delivery
                </p>
                <p className="mt-2 text-sm capitalize">{project.priority ?? "normal"} priority</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  {project.type ?? project.projectType}
                </p>
              </div>
            </CardContent>
          </Card>
        </aside>
      </div>
      {message ? <p className="text-sm text-muted-foreground">{message}</p> : null}
    </div>
  );
}
