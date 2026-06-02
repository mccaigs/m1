import { Activity } from "lucide-react";
import { EmptyState } from "@/components/portal/empty-state";
import { PortalHeading } from "@/components/portal/portal-heading";

export default function ActivityPage() {
  return (
    <div>
      <PortalHeading
        copy="A readable audit trail for the project events, decisions, and workflow changes that should remain visible."
        eyebrow="Workspace / activity"
        title="Activity"
      />
      <div className="mt-7">
        <EmptyState
          description="Important workspace events will be recorded here once projects are active. The activity log is designed for useful traceability, not noise."
          icon={Activity}
          title="No workspace activity has been recorded"
        />
      </div>
    </div>
  );
}
