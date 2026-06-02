import { Network } from "lucide-react";
import { EmptyState } from "@/components/portal/empty-state";
import { PortalHeading } from "@/components/portal/portal-heading";

export default function SystemsPage() {
  return (
    <div>
      <PortalHeading
        copy="A register of the workflows, engines, interfaces, and operational tools attached to each project."
        eyebrow="Workspace / systems"
        title="Systems"
      />
      <div className="mt-7">
        <EmptyState
          description="Systems will be registered here with their owner, state, visibility, and linked project. This view is intentionally empty until real workspace data exists."
          icon={Network}
          title="No tracked systems in this workspace"
        />
      </div>
    </div>
  );
}
