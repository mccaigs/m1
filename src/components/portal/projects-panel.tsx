"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { useMutation, useQuery } from "convex/react";
import { makeFunctionReference } from "convex/server";
import { ArrowUpRight, Plus } from "lucide-react";
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
type Client = { _id: string; company: string };
type Project = {
  _id: string;
  title: string;
  status: Status;
  priority?: string;
  updatedAt: number;
  targetLaunchDate?: number;
  client?: Client | null;
};

const listProjects = makeFunctionReference<"query", { status?: Status }, Project[]>(
  "projects:list",
);
const listClients = makeFunctionReference<"query", Record<string, never>, Client[]>(
  "clients:list",
);
const createProject = makeFunctionReference<
  "mutation",
  {
    clientId: string;
    title: string;
    slug: string;
    description: string;
    type: string;
    status: Status;
    priority: string;
    budgetRange: string;
    startDate?: number;
    targetLaunchDate?: number;
  },
  string
>("projects:create");

export function ProjectsPanel() {
  const { configured, role } = useWorkspace();
  const [status, setStatus] = useState<Status | "all">("all");
  const [open, setOpen] = useState(false);
  const projects = useQuery(
    listProjects,
    configured ? (status === "all" ? {} : { status }) : "skip",
  );
  const clients = useQuery(listClients, configured ? {} : "skip");
  const create = useMutation(createProject);
  const canCreate = role === "owner" || role === "admin";

  if (!configured) return <SetupState />;

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const title = String(form.get("title"));
    await create({
      clientId: String(form.get("clientId")),
      title,
      slug: title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""),
      description: String(form.get("description")),
      type: String(form.get("type")),
      status: "discovery",
      priority: String(form.get("priority")),
      budgetRange: String(form.get("budgetRange")),
      startDate: dateValue(form.get("startDate")),
      targetLaunchDate: dateValue(form.get("targetLaunchDate")),
    });
    event.currentTarget.reset();
    setOpen(false);
  }

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <select
          className="h-8 rounded-lg border border-white/10 bg-background px-3 text-sm"
          onChange={(event) => setStatus(event.target.value as Status | "all")}
          value={status}
        >
          <option value="all">All statuses</option>
          {["enquiry", "discovery", "research", "planning", "proposal", "build", "review", "live", "archived"].map(
            (value) => (
              <option key={value} value={value}>
                {value}
              </option>
            ),
          )}
        </select>
        {canCreate ? (
          <Button onClick={() => setOpen((value) => !value)}>
            <Plus /> New project
          </Button>
        ) : null}
      </div>
      {open ? (
        <Card className="border-signal/20 bg-card/70">
          <CardContent className="p-5">
            <form className="grid gap-3 md:grid-cols-2" onSubmit={submit}>
              <Input name="title" placeholder="Project title" required />
              <select
                className="h-8 rounded-lg border border-input bg-background px-3 text-sm"
                name="clientId"
                required
              >
                <option value="">Select client</option>
                {(clients ?? []).map((client) => (
                  <option key={client._id} value={client._id}>
                    {client.company}
                  </option>
                ))}
              </select>
              <Input name="type" placeholder="Project type" required />
              <Input name="budgetRange" placeholder="Budget range" required />
              <select
                className="h-8 rounded-lg border border-input bg-background px-3 text-sm"
                defaultValue="normal"
                name="priority"
              >
                <option value="low">Low priority</option>
                <option value="normal">Normal priority</option>
                <option value="high">High priority</option>
              </select>
              <Input name="startDate" type="date" />
              <Input name="targetLaunchDate" type="date" />
              <Textarea
                className="md:col-span-2"
                name="description"
                placeholder="Project description"
                required
              />
              <Button className="md:w-fit" type="submit">
                Create project
              </Button>
            </form>
          </CardContent>
        </Card>
      ) : null}
      <div className="grid gap-4">
        {(projects ?? []).map((project) => (
          <Link href={`/app/projects/${project._id}`} key={project._id}>
            <Card className="border-white/10 bg-card/55 transition-colors hover:border-signal/25">
              <CardContent className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <h2 className="font-semibold text-signal-soft">{project.title}</h2>
                    <span className="rounded-full border border-signal/20 bg-signal/5 px-2 py-0.5 font-mono text-[8px] uppercase tracking-[0.12em] text-signal">
                      {project.status}
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {project.client?.company ?? "Unassigned client"}
                    {project.targetLaunchDate
                      ? ` / target ${new Intl.DateTimeFormat("en-GB", {
                          dateStyle: "medium",
                        }).format(project.targetLaunchDate)}`
                      : ""}
                  </p>
                </div>
                <ArrowUpRight className="size-4 text-muted-foreground" />
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
      {projects?.length === 0 ? (
        <p className="rounded-xl border border-dashed border-white/12 p-8 text-center text-sm text-muted-foreground">
          No projects match this view.
        </p>
      ) : null}
    </div>
  );
}

function dateValue(value: FormDataEntryValue | null) {
  const text = String(value || "");
  return text ? new Date(`${text}T12:00:00`).getTime() : undefined;
}
