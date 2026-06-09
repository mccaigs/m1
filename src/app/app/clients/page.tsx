import { ClientsPanel } from "@/components/portal/clients-panel";
import { PortalHeading } from "@/components/portal/portal-heading";

export default function ClientsPage() {
  return (
    <div>
      <PortalHeading
        copy="Maintain client records, portal identity links, and the organisations attached to active delivery."
        eyebrow="Studio OS / relationships"
        title="Clients"
      />
      <div className="mt-7">
        <ClientsPanel />
      </div>
    </div>
  );
}
