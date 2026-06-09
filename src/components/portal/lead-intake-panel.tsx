"use client";

import { useState } from "react";
import { Inbox, LoaderCircle, ReceiptText } from "lucide-react";
import { useMutation, useQuery_experimental as useQuery } from "convex/react";
import { makeFunctionReference } from "convex/server";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useWorkspace } from "@/components/portal/workspace-shell";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

const workflowStatuses = [
  "new",
  "reviewed",
  "contacted",
  "quoted",
  "won",
  "lost",
  "archived",
] as const;

type WorkflowStatus = (typeof workflowStatuses)[number];
type LeadStatus = WorkflowStatus | "accepted" | "rejected";
type StatusFilter = "all" | WorkflowStatus;
type DashboardTab = "enquiries" | "project-builder";

type Enquiry = {
  _id: string;
  budgetRange: string;
  company: string;
  createdAt: number;
  email: string;
  message: string;
  name: string;
  projectType: string;
  source: string;
  status: LeadStatus;
  timeline: string;
};

type ProjectBuilderSubmission = {
  _id: string;
  company: string;
  createdAt: number;
  email: string;
  estimatedBudget: string;
  estimatedTimeline: string;
  industry: string;
  name: string;
  projectType: string;
  recommendedRoute: string;
  source: string;
  status: LeadStatus;
  summary: string;
  urgency: string;
};

type ProjectOption = {
  _id: string;
  title: string;
};

const listEnquiries = makeFunctionReference<
  "query",
  { limit?: number; status?: LeadStatus },
  Enquiry[]
>("enquiries:listForStudio");
const updateEnquiryStatus = makeFunctionReference<
  "mutation",
  { enquiryId: string; status: WorkflowStatus },
  null
>("enquiries:updateStatus");
const listProjectBuilderSubmissions = makeFunctionReference<
  "query",
  { limit?: number; status?: LeadStatus },
  ProjectBuilderSubmission[]
>("quoteBuilderSubmissions:listForStudio");
const updateProjectBuilderSubmissionStatus = makeFunctionReference<
  "mutation",
  { status: WorkflowStatus; submissionId: string },
  null
>("quoteBuilderSubmissions:updateStatus");
const listProjects = makeFunctionReference<
  "query",
  Record<string, never>,
  ProjectOption[]
>("projects:list");
const convertLeadToClient = makeFunctionReference<
  "mutation",
  {
    leadId: string;
    source: "enquiry" | "projectBuilderSubmission";
    name: string;
    company: string;
    email: string;
    phone?: string;
  },
  string
>("leadAssignments:convertToClient");
const createProjectFromLead = makeFunctionReference<
  "mutation",
  {
    leadId: string;
    source: "enquiry" | "projectBuilderSubmission";
    name: string;
    company: string;
    email: string;
    title: string;
    description: string;
    type: string;
  },
  string
>("leadAssignments:createProjectFromLead");
const assignLead = makeFunctionReference<
  "mutation",
  {
    leadId: string;
    source: "enquiry" | "projectBuilderSubmission";
    projectId?: string;
  },
  string
>("leadAssignments:assign");

export function LeadIntakePanel() {
  const { role } = useWorkspace();
  const servicesConfigured = Boolean(
    process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY &&
      process.env.NEXT_PUBLIC_CONVEX_URL,
  );

  if (role === "client") {
    return (
      <Card className="border-white/10 bg-card/55">
        <CardContent className="p-6 text-sm text-muted-foreground">
          Lead operations are restricted to the studio team.
        </CardContent>
      </Card>
    );
  }

  if (!servicesConfigured) {
    return (
      <Card className="border-white/10 bg-card/55">
        <CardContent className="p-6">
          <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-signal">
            Lead dashboard / setup required
          </p>
          <p className="mt-3 text-sm leading-6 text-muted-foreground">
            Configure Clerk and Convex to activate authenticated lead management.
          </p>
        </CardContent>
      </Card>
    );
  }

  return <LeadDashboard />;
}

function LeadDashboard() {
  const [activeTab, setActiveTab] = useState<DashboardTab>("enquiries");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [pendingId, setPendingId] = useState<string>();
  const [mutationError, setMutationError] = useState<string>();
  const queryStatus = statusFilter === "all" ? undefined : statusFilter;
  const enquiries = useQuery({
    args: { limit: 100, status: queryStatus },
    query: listEnquiries,
    throwOnError: false,
  });
  const projectSubmissions = useQuery({
    args: { limit: 100, status: queryStatus },
    query: listProjectBuilderSubmissions,
    throwOnError: false,
  });
  const mutateEnquiryStatus = useMutation(updateEnquiryStatus);
  const mutateProjectStatus = useMutation(updateProjectBuilderSubmissionStatus);
  const projects = useQuery({
    args: {},
    query: listProjects,
    throwOnError: false,
  });
  const activeQuery = activeTab === "enquiries" ? enquiries : projectSubmissions;
  const queryError = activeQuery.status === "error" ? activeQuery.error : null;

  async function changeEnquiryStatus(enquiryId: string, status: WorkflowStatus) {
    setPendingId(enquiryId);
    setMutationError(undefined);
    try {
      await mutateEnquiryStatus({ enquiryId, status });
    } catch {
      setMutationError("The enquiry status could not be updated. Please try again.");
    } finally {
      setPendingId(undefined);
    }
  }

  async function changeProjectStatus(submissionId: string, status: WorkflowStatus) {
    setPendingId(submissionId);
    setMutationError(undefined);
    try {
      await mutateProjectStatus({ status, submissionId });
    } catch {
      setMutationError("The project submission status could not be updated. Please try again.");
    } finally {
      setPendingId(undefined);
    }
  }

  return (
    <section>
      <div className="flex flex-col gap-4 border-b border-white/10 pb-5 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-signal">
            Lead intake / Convex
          </p>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight text-signal-soft">
            Enquiries and project submissions
          </h2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
            Review incoming opportunities, record progress, and keep the next action visible.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-muted-foreground">
            Filter
          </span>
          <Select
            onValueChange={(value) => setStatusFilter(value as StatusFilter)}
            value={statusFilter}
          >
            <SelectTrigger className="w-36 border-white/10 bg-background/60">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All statuses</SelectItem>
              {workflowStatuses.map((status) => (
                <SelectItem key={status} value={status}>
                  {statusLabel(status)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="mt-5 flex gap-2" role="tablist" aria-label="Lead type">
        <TabButton
          active={activeTab === "enquiries"}
          icon={Inbox}
          label="Contact enquiries"
          onClick={() => setActiveTab("enquiries")}
        />
        <TabButton
          active={activeTab === "project-builder"}
          icon={ReceiptText}
          label="Project Builder"
          onClick={() => setActiveTab("project-builder")}
        />
      </div>

      {mutationError ? (
        <p className="mt-5 rounded-lg border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive">
          {mutationError}
        </p>
      ) : null}

      {queryError ? (
        <Card className="mt-5 border-signal/20 bg-signal/5">
          <CardContent className="p-5">
            <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-signal">
              Lead dashboard / access unavailable
            </p>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">
              Confirm the signed-in Clerk user can authenticate with the configured Convex deployment.
            </p>
          </CardContent>
        </Card>
      ) : null}

      {!queryError && activeTab === "enquiries" ? (
        <EnquiryList
          items={enquiries.status === "success" ? enquiries.data : undefined}
          onStatusChange={changeEnquiryStatus}
          pendingId={pendingId}
          projects={projects.status === "success" ? projects.data : []}
        />
      ) : null}

      {!queryError && activeTab === "project-builder" ? (
        <ProjectSubmissionList
          items={
            projectSubmissions.status === "success"
              ? projectSubmissions.data
              : undefined
          }
          onStatusChange={changeProjectStatus}
          pendingId={pendingId}
          projects={projects.status === "success" ? projects.data : []}
        />
      ) : null}
    </section>
  );
}

function EnquiryList({
  items,
  onStatusChange,
  pendingId,
  projects,
}: {
  items?: Enquiry[];
  onStatusChange: (id: string, status: WorkflowStatus) => Promise<void>;
  pendingId?: string;
  projects: ProjectOption[];
}) {
  if (!items) return <LoadingState />;
  if (!items.length) {
    return <EmptyState message="No contact enquiries match this status." />;
  }

  return (
    <div className="mt-5 grid gap-4">
      {items.map((item) => (
        <LeadCard
          createdAt={item.createdAt}
          email={item.email}
          id={item._id}
          key={item._id}
          name={item.name}
          company={item.company}
          pending={pendingId === item._id}
          status={item.status}
          onStatusChange={onStatusChange}
          action={{
            company: item.company,
            description: item.message,
            email: item.email,
            leadId: item._id,
            name: item.name,
            projectType: item.projectType,
            source: "enquiry",
          }}
          projects={projects}
        >
          <DetailGrid
            items={[
              ["Project type", item.projectType],
              ["Budget", item.budgetRange],
              ["Timeline", item.timeline],
              ["Source", item.source],
            ]}
          />
          <LeadNarrative label="Message" value={item.message} />
        </LeadCard>
      ))}
    </div>
  );
}

function ProjectSubmissionList({
  items,
  onStatusChange,
  pendingId,
  projects,
}: {
  items?: ProjectBuilderSubmission[];
  onStatusChange: (id: string, status: WorkflowStatus) => Promise<void>;
  pendingId?: string;
  projects: ProjectOption[];
}) {
  if (!items) return <LoadingState />;
  if (!items.length) {
    return <EmptyState message="No Project Builder submissions match this status." />;
  }

  return (
    <div className="mt-5 grid gap-4">
      {items.map((item) => (
        <LeadCard
          company={item.company}
          createdAt={item.createdAt}
          email={item.email}
          id={item._id}
          key={item._id}
          name={item.name}
          onStatusChange={onStatusChange}
          pending={pendingId === item._id}
          status={item.status}
          action={{
            company: item.company,
            description: item.summary,
            email: item.email,
            leadId: item._id,
            name: item.name,
            projectType: item.projectType,
            source: "projectBuilderSubmission",
          }}
          projects={projects}
        >
          <DetailGrid
            items={[
              ["Industry", item.industry],
              ["Project type", item.projectType],
              ["Budget", item.estimatedBudget],
              ["Timeline", item.estimatedTimeline],
              ["Urgency", item.urgency],
              ["Source", item.source],
            ]}
          />
          <LeadNarrative label="Recommended route" value={item.recommendedRoute} />
          <LeadNarrative label="Summary" value={item.summary} />
        </LeadCard>
      ))}
    </div>
  );
}

function LeadCard({
  children,
  company,
  createdAt,
  email,
  id,
  name,
  onStatusChange,
  pending,
  status,
  action,
  projects,
}: {
  children: React.ReactNode;
  company: string;
  createdAt: number;
  email: string;
  id: string;
  name: string;
  onStatusChange: (id: string, status: WorkflowStatus) => Promise<void>;
  pending: boolean;
  status: LeadStatus;
  action: {
    company: string;
    description: string;
    email: string;
    leadId: string;
    name: string;
    projectType: string;
    source: "enquiry" | "projectBuilderSubmission";
  };
  projects: ProjectOption[];
}) {
  return (
    <Card className="border-white/10 bg-card/55">
      <CardContent className="p-5 sm:p-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="text-lg font-semibold text-signal-soft">{company}</h3>
              <StatusBadge status={status} />
            </div>
            <p className="mt-2 text-sm text-muted-foreground">
              {name} /{" "}
              <a className="hover:text-signal-soft" href={`mailto:${email}`}>
                {email}
              </a>
            </p>
            <p className="mt-2 font-mono text-[9px] uppercase tracking-[0.14em] text-muted-foreground">
              {formatDate(createdAt)}
            </p>
          </div>
          <div className="flex items-center gap-2">
            {pending ? (
              <LoaderCircle className="size-4 animate-spin text-signal" aria-label="Updating status" />
            ) : null}
            <Select
              disabled={pending}
              onValueChange={(value) => void onStatusChange(id, value as WorkflowStatus)}
              value={workflowStatuses.includes(status as WorkflowStatus) ? status : undefined}
            >
              <SelectTrigger className="w-36 border-white/10 bg-background/60">
                <SelectValue placeholder="Update status" />
              </SelectTrigger>
              <SelectContent>
                {workflowStatuses.map((nextStatus) => (
                  <SelectItem key={nextStatus} value={nextStatus}>
                    {statusLabel(nextStatus)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="mt-5 border-t border-white/8 pt-5">{children}</div>
        <LeadActions action={action} projects={projects} />
      </CardContent>
    </Card>
  );
}

function LeadActions({
  action,
  projects,
}: {
  action: {
    company: string;
    description: string;
    email: string;
    leadId: string;
    name: string;
    projectType: string;
    source: "enquiry" | "projectBuilderSubmission";
  };
  projects: ProjectOption[];
}) {
  const convert = useMutation(convertLeadToClient);
  const createProject = useMutation(createProjectFromLead);
  const assign = useMutation(assignLead);
  const [projectId, setProjectId] = useState("");
  const [message, setMessage] = useState<string>();
  const [busy, setBusy] = useState(false);

  async function run(task: () => Promise<unknown>, success: string) {
    setBusy(true);
    setMessage(undefined);
    try {
      await task();
      setMessage(success);
    } catch {
      setMessage("The lead action could not be completed.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="mt-5 border-t border-white/8 pt-4">
      <p className="font-mono text-[9px] uppercase tracking-[0.14em] text-muted-foreground">
        Lead actions
      </p>
      <div className="mt-3 flex flex-wrap items-center gap-2">
        <Button
          disabled={busy}
          onClick={() =>
            void run(
              () =>
                convert({
                  leadId: action.leadId,
                  source: action.source,
                  name: action.name,
                  company: action.company,
                  email: action.email,
                }),
              "Client created.",
            )
          }
          size="sm"
          variant="outline"
        >
          Convert to client
        </Button>
        <Button
          disabled={busy}
          onClick={() =>
            void run(
              () =>
                createProject({
                  ...action,
                  title: `${action.company} / ${action.projectType}`,
                  type: action.projectType,
                }),
              "Client and project created.",
            )
          }
          size="sm"
        >
          Create project from lead
        </Button>
        <select
          className="h-7 max-w-56 rounded-lg border border-input bg-background px-2 text-xs"
          onChange={(event) => setProjectId(event.target.value)}
          value={projectId}
        >
          <option value="">Existing project...</option>
          {projects.map((project) => (
            <option key={project._id} value={project._id}>
              {project.title}
            </option>
          ))}
        </select>
        <Button
          disabled={busy || !projectId}
          onClick={() =>
            void run(
              () =>
                assign({
                  leadId: action.leadId,
                  source: action.source,
                  projectId,
                }),
              "Lead assigned to project.",
            )
          }
          size="sm"
          variant="secondary"
        >
          Assign
        </Button>
      </div>
      {message ? <p className="mt-2 text-xs text-muted-foreground">{message}</p> : null}
    </div>
  );
}

function DetailGrid({ items }: { items: Array<[string, string]> }) {
  return (
    <dl className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {items.map(([label, value]) => (
        <div key={label}>
          <dt className="font-mono text-[9px] uppercase tracking-[0.14em] text-muted-foreground">
            {label}
          </dt>
          <dd className="mt-1 text-sm leading-6 text-foreground/85">{value}</dd>
        </div>
      ))}
    </dl>
  );
}

function LeadNarrative({ label, value }: { label: string; value: string }) {
  return (
    <div className="mt-5 rounded-lg border border-white/8 bg-background/35 p-4">
      <p className="font-mono text-[9px] uppercase tracking-[0.14em] text-muted-foreground">
        {label}
      </p>
      <p className="mt-2 whitespace-pre-wrap text-sm leading-6 text-foreground/80">
        {value}
      </p>
    </div>
  );
}

function StatusBadge({ status }: { status: LeadStatus }) {
  return (
    <Badge className={cn("border px-2 py-1 capitalize", statusStyles[status])} variant="outline">
      {statusLabel(status)}
    </Badge>
  );
}

function TabButton({
  active,
  icon: Icon,
  label,
  onClick,
}: {
  active: boolean;
  icon: typeof Inbox;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      aria-selected={active}
      className={cn(
        "flex items-center gap-2 rounded-lg border px-4 py-2.5 text-sm transition-colors",
        active
          ? "border-signal/35 bg-signal/10 text-signal-soft"
          : "border-white/10 bg-card/35 text-muted-foreground hover:text-foreground",
      )}
      onClick={onClick}
      role="tab"
      type="button"
    >
      <Icon className="size-4" />
      {label}
    </button>
  );
}

function LoadingState() {
  return (
    <div className="mt-5 flex items-center gap-3 rounded-xl border border-white/10 bg-card/35 p-5 text-sm text-muted-foreground">
      <LoaderCircle className="size-4 animate-spin text-signal" />
      Loading submitted leads...
    </div>
  );
}

function EmptyState({ message }: { message: string }) {
  return (
    <div className="mt-5 rounded-xl border border-dashed border-white/12 bg-card/25 p-8 text-center">
      <p className="text-sm text-muted-foreground">{message}</p>
    </div>
  );
}

function formatDate(value: number) {
  return new Intl.DateTimeFormat("en-GB", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(value);
}

function statusLabel(status: LeadStatus) {
  return status.charAt(0).toUpperCase() + status.slice(1);
}

const statusStyles: Record<LeadStatus, string> = {
  new: "border-signal/35 bg-signal/10 text-signal",
  reviewed: "border-sky-400/30 bg-sky-400/10 text-sky-200",
  contacted: "border-violet-400/30 bg-violet-400/10 text-violet-200",
  quoted: "border-amber-400/30 bg-amber-400/10 text-amber-200",
  won: "border-emerald-400/30 bg-emerald-400/10 text-emerald-200",
  lost: "border-rose-400/30 bg-rose-400/10 text-rose-200",
  archived: "border-white/15 bg-white/5 text-muted-foreground",
  accepted: "border-emerald-400/30 bg-emerald-400/10 text-emerald-200",
  rejected: "border-rose-400/30 bg-rose-400/10 text-rose-200",
};
