import {
  Activity,
  FolderKanban,
  Gauge,
  ListChecks,
  Network,
} from "lucide-react";

export const portalNavigation = [
  { label: "Overview", href: "/app", icon: Gauge },
  { label: "Projects", href: "/app/projects", icon: FolderKanban },
  { label: "Systems", href: "/app/systems", icon: Network },
  { label: "Tasks", href: "/app/tasks", icon: ListChecks },
  { label: "Activity", href: "/app/activity", icon: Activity },
] as const;

export const portalSummary = [
  { label: "Active projects", value: "00", detail: "Workspace ready" },
  { label: "Tracked systems", value: "00", detail: "No live systems" },
  { label: "Open actions", value: "00", detail: "Queue clear" },
] as const;

export const previewActivity = [
  {
    label: "Workspace foundation",
    detail: "Studio OS shell initialised",
    time: "Preview",
  },
  {
    label: "Service connection",
    detail: "Awaiting Clerk and Convex configuration",
    time: "Setup",
  },
] as const;
