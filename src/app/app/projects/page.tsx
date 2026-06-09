import { PortalHeading } from "@/components/portal/portal-heading";
import { ProjectsPanel } from "@/components/portal/projects-panel";

export default function ProjectsPage() {
  return (
    <div>
      <PortalHeading
        copy="Track each engagement from discovery through delivery, with current state, ownership, and the next meaningful milestone."
        eyebrow="Workspace / projects"
        title="Projects"
      />
      <div className="mt-7">
        <ProjectsPanel />
      </div>
    </div>
  );
}
