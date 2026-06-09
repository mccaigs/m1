import {
  Activity,
  BookOpenText,
  BriefcaseBusiness,
  FolderKanban,
  Gauge,
  Inbox,
  ListChecks,
  Settings,
  Users,
} from "lucide-react";

export const studioNavigation = [
  { label: "Overview", href: "/app", icon: Gauge },
  { label: "Leads", href: "/app/leads", icon: Inbox },
  { label: "Clients", href: "/app/clients", icon: Users },
  { label: "Projects", href: "/app/projects", icon: FolderKanban },
  { label: "Tasks", href: "/app/tasks", icon: ListChecks },
  { label: "Activity", href: "/app/activity", icon: Activity },
  { label: "Settings", href: "/app/settings", icon: Settings },
] as const;

export const ownerNavigation = [
  ...studioNavigation.slice(0, 4),
  { label: "Blog", href: "/app/blog", icon: BookOpenText },
  ...studioNavigation.slice(4),
] as const;

export const clientNavigation = [
  { label: "My Projects", href: "/app/projects", icon: BriefcaseBusiness },
  { label: "Updates", href: "/app/activity", icon: Activity },
  { label: "Resources", href: "/app/projects", icon: FolderKanban },
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
