import { OverviewPanel } from "@/components/portal/overview-panel";
import { PortalHeading } from "@/components/portal/portal-heading";

export default function DashboardPage() {
  return (
    <div>
      <PortalHeading
        copy="A calm operational view of leads, active delivery, client feedback, and the projects that need attention."
        eyebrow="Studio OS / operations centre"
        title="Studio OS"
      />
      <div className="mt-7">
        <OverviewPanel />
      </div>
    </div>
  );
}
