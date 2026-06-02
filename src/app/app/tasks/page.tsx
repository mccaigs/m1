import { ListChecks } from "lucide-react";
import { EmptyState } from "@/components/portal/empty-state";
import { PortalHeading } from "@/components/portal/portal-heading";

export default function TasksPage() {
  return (
    <div>
      <PortalHeading
        copy="A focused action queue for delivery work, client decisions, and operational follow-ups."
        eyebrow="Workspace / tasks"
        title="Tasks"
      />
      <div className="mt-7">
        <EmptyState
          description="Open actions will appear here as projects move through delivery. The queue stays deliberately narrow: owner, status, due date, and project context."
          icon={ListChecks}
          title="The action queue is clear"
        />
      </div>
    </div>
  );
}
