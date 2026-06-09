import { LeadIntakePanel } from "@/components/portal/lead-intake-panel";
import { PortalHeading } from "@/components/portal/portal-heading";

export default function LeadsPage() {
  return (
    <div>
      <PortalHeading
        copy="Review contact enquiries and Project Builder submissions, then convert or assign each opportunity."
        eyebrow="Studio OS / lead operations"
        title="Leads"
      />
      <div className="mt-7">
        <LeadIntakePanel />
      </div>
    </div>
  );
}
