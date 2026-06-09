"use client";

import Link from "next/link";
import { useQuery } from "convex/react";
import { makeFunctionReference } from "convex/server";
import { ArrowRight, Clock3 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { SetupState } from "@/components/portal/setup-state";
import { useWorkspace } from "@/components/portal/workspace-shell";

type Project = {
  _id: string;
  title: string;
  status: string;
  updatedAt: number;
  targetLaunchDate?: number;
  client?: { company: string } | null;
};

const listProjects = makeFunctionReference<
  "query",
  {
    status?:
      | "enquiry"
      | "discovery"
      | "research"
      | "planning"
      | "proposal"
      | "build"
      | "review"
      | "live"
      | "archived";
  },
  Project[]
>("projects:list");
const listEnquiries = makeFunctionReference<
  "query",
  { limit?: number },
  Array<{ _id: string; status: string }>
>("enquiries:listForStudio");
const listBuilderSubmissions = makeFunctionReference<
  "query",
  { limit?: number },
  Array<{ _id: string; status: string }>
>("quoteBuilderSubmissions:listForStudio");

export function OverviewPanel() {
  const { configured, role } = useWorkspace();
  const projects = useQuery(listProjects, configured ? {} : "skip");
  const canSeeLeads = configured && role !== "client";
  const enquiries = useQuery(listEnquiries, canSeeLeads ? { limit: 100 } : "skip");
  const submissions = useQuery(
    listBuilderSubmissions,
    canSeeLeads ? { limit: 100 } : "skip",
  );

  if (!configured) return <SetupState />;

  const leadCount = [...(enquiries ?? []), ...(submissions ?? [])].filter(
    (lead) => lead.status === "new",
  ).length;
  const activeProjects = (projects ?? []).filter((project) =>
    ["discovery", "research", "planning", "proposal", "build"].includes(
      project.status,
    ),
  ).length;
  const inReview = (projects ?? []).filter(
    (project) => project.status === "review",
  ).length;
  const cards = [
    ...(role === "client" ? [] : [{ label: "New leads", value: leadCount }]),
    { label: "Active projects", value: activeProjects },
    { label: "In review", value: inReview },
    { label: "Awaiting client feedback", value: inReview },
  ];

  return (
    <div className="space-y-6">
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {cards.map((card) => (
          <Card className="border-white/10 bg-card/55" key={card.label}>
            <CardContent className="p-5">
              <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-muted-foreground">
                {card.label}
              </p>
              <p className="mt-3 text-3xl font-semibold text-signal-soft">
                {card.value.toString().padStart(2, "0")}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
      <Card className="border-white/10 bg-card/55">
        <CardContent className="p-5 sm:p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-signal">
                Recently updated projects
              </p>
              <h2 className="mt-2 text-xl font-semibold text-signal-soft">
                Current delivery pulse
              </h2>
            </div>
            <Link
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-signal-soft"
              href="/app/projects"
            >
              View all <ArrowRight className="size-4" />
            </Link>
          </div>
          <div className="mt-5 divide-y divide-white/8">
            {(projects ?? []).slice(0, 5).map((project) => (
              <Link
                className="flex items-center justify-between gap-4 py-4 hover:text-signal-soft"
                href={`/app/projects/${project._id}`}
                key={project._id}
              >
                <div>
                  <p className="font-medium">{project.title}</p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {project.client?.company ?? "Unassigned client"} / {project.status}
                  </p>
                </div>
                <span className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.12em] text-muted-foreground">
                  <Clock3 className="size-3" />
                  {new Intl.DateTimeFormat("en-GB", { dateStyle: "medium" }).format(
                    project.updatedAt,
                  )}
                </span>
              </Link>
            ))}
            {projects?.length === 0 ? (
              <p className="py-8 text-center text-sm text-muted-foreground">
                No projects yet. Create the first project from Projects or convert a lead.
              </p>
            ) : null}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
