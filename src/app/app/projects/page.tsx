import { FolderKanban } from "lucide-react";
import { EmptyState } from "@/components/portal/empty-state";
import { PortalHeading } from "@/components/portal/portal-heading";

export default function ProjectsPage() {
  return (
    <div>
      <PortalHeading
        copy="Track each engagement from discovery through delivery, with current state, ownership, and the next meaningful milestone."
        eyebrow="Workspace / projects"
        title="Projects"
      />
      <div className="mt-7">
        <EmptyState
          description="Client and internal builds will appear here when a project is created. Each record will hold status, milestones, decisions, and linked delivery systems."
          icon={FolderKanban}
          title="No projects have been added yet"
        />
      </div>
    </div>
  );
}
