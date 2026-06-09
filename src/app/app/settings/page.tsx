import { PortalHeading } from "@/components/portal/portal-heading";
import { SettingsPanel } from "@/components/portal/settings-panel";

export default function SettingsPage() {
  return (
    <div>
      <PortalHeading
        copy="Control workspace roles, client access, team membership, and future operational integrations."
        eyebrow="Studio OS / administration"
        title="Settings"
      />
      <div className="mt-7">
        <SettingsPanel />
      </div>
    </div>
  );
}
