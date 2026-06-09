import { AuthDiagnostics } from "@/components/portal/auth-diagnostics";
import { PortalHeading } from "@/components/portal/portal-heading";

export default function DebugAuthPage() {
  return (
    <div>
      <PortalHeading
        copy="Live Clerk, Convex, identity, and role-record state for diagnosing Studio OS access."
        eyebrow="Studio OS / temporary diagnostics"
        title="Authentication diagnostics"
      />
      <div className="mt-7">
        <AuthDiagnostics alwaysVisible />
      </div>
    </div>
  );
}
