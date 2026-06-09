"use client";

import { useMutation, useQuery } from "convex/react";
import { CheckCircle2, DatabaseZap } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { AuthDiagnostics } from "@/components/portal/auth-diagnostics";
import { SetupState } from "@/components/portal/setup-state";
import { useWorkspace, type StudioRole } from "@/components/portal/workspace-shell";
import { api } from "../../../convex/_generated/api";

export function SettingsPanel() {
  const { configured, role } = useWorkspace();
  const [seedResult, setSeedResult] = useState<{
    client: "created" | "already-existed";
    projectsCreated: number;
    projectsSkipped: number;
    updatesCreated: number;
    assignmentsCreated: number;
  }>();
  const [seedError, setSeedError] = useState<string>();
  const [seeding, setSeeding] = useState(false);
  const users = useQuery(
    api.userRoles.list,
    configured && role === "owner" ? {} : "skip",
  );
  const updateRole = useMutation(api.userRoles.setRole);
  const seedStudioData = useMutation(api.studioSeed.seedStudioData);

  async function handleSeedStudioData() {
    setSeeding(true);
    setSeedError(undefined);

    try {
      const result = await seedStudioData({});
      setSeedResult(result);
    } catch (error) {
      setSeedError(
        error instanceof Error
          ? error.message
          : "Studio seed data could not be installed.",
      );
    } finally {
      setSeeding(false);
    }
  }

  if (!configured) return <SetupState />;
  if (role !== "owner") {
    return (
      <div className="space-y-6">
        <AuthDiagnostics />
        <Card className="border-white/10 bg-card/55">
          <CardContent className="p-6 text-sm text-muted-foreground">
            Studio settings and role management are restricted to the owner workspace.
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <AuthDiagnostics />
      <Card className="border-white/10 bg-card/55">
        <CardContent className="p-5 sm:p-6">
          <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-signal">
            Users and access
          </p>
          <div className="mt-4 divide-y divide-white/8">
            {(users ?? []).map((user) => (
              <div
                className="flex flex-col gap-3 py-4 sm:flex-row sm:items-center sm:justify-between"
                key={user._id}
              >
                <div>
                  <p className="text-sm">{user.email || user.clerkUserId}</p>
                  <p className="mt-1 font-mono text-[8px] uppercase tracking-[0.12em] text-muted-foreground">
                    {user.clerkUserId}
                  </p>
                </div>
                <select
                  className="h-8 rounded-lg border border-input bg-background px-3 text-sm"
                  onChange={(event) =>
                    void updateRole({
                      userRoleId: user._id,
                      role: event.target.value as StudioRole,
                    })
                  }
                  value={user.role}
                >
                  <option value="owner">Owner</option>
                  <option value="admin">Admin</option>
                  <option value="staff">Staff</option>
                  <option value="client">Client</option>
                </select>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      <Card className="border-white/10 bg-card/35">
        <CardContent className="grid gap-4 p-5 md:grid-cols-3">
          {["Team invitations", "Client access", "Future integrations"].map((item) => (
            <div className="rounded-lg border border-white/8 bg-background/30 p-4" key={item}>
              <p className="font-medium">{item}</p>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                Prepared for the next Clerk and Studio OS integration pass.
              </p>
            </div>
          ))}
        </CardContent>
      </Card>
      <Card className="border-signal/20 bg-signal/5">
        <CardContent className="p-5 sm:p-6">
          <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-signal">
            Developer Tools
          </p>
          <div className="mt-4 flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
            <div className="max-w-2xl">
              <h2 className="text-lg font-semibold text-signal-soft">
                Install the initial McCaigs project portfolio.
              </h2>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                Creates the internal McCaigs Studio client, six core projects,
                initial updates, and project assignments. The operation is safe to
                run more than once.
              </p>
            </div>
            <Button
              disabled={seeding}
              onClick={() => void handleSeedStudioData()}
              type="button"
            >
              <DatabaseZap />
              {seeding ? "Seeding..." : "Seed Studio Data"}
            </Button>
          </div>

          {seedResult ? (
            <div className="mt-5 rounded-lg border border-emerald-300/20 bg-emerald-300/5 p-4">
              <p className="flex items-center gap-2 font-medium text-emerald-200">
                <CheckCircle2 className="size-4" />
                Studio seed data installed.
              </p>
              <dl className="mt-4 grid gap-3 text-sm sm:grid-cols-2 lg:grid-cols-5">
                <SeedMetric
                  label="Client"
                  value={
                    seedResult.client === "created"
                      ? "Created"
                      : "Already existed"
                  }
                />
                <SeedMetric
                  label="Projects created"
                  value={seedResult.projectsCreated}
                />
                <SeedMetric
                  label="Projects skipped"
                  value={seedResult.projectsSkipped}
                />
                <SeedMetric
                  label="Updates created"
                  value={seedResult.updatesCreated}
                />
                <SeedMetric
                  label="Assignments created"
                  value={seedResult.assignmentsCreated}
                />
              </dl>
            </div>
          ) : null}

          {seedError ? (
            <p className="mt-4 rounded-lg border border-destructive/20 bg-destructive/10 p-3 text-sm text-destructive">
              {seedError}
            </p>
          ) : null}
        </CardContent>
      </Card>
    </div>
  );
}

function SeedMetric({
  label,
  value,
}: {
  label: string;
  value: number | string;
}) {
  return (
    <div className="rounded-lg border border-white/10 bg-background/30 p-3">
      <dt className="text-xs text-muted-foreground">{label}</dt>
      <dd className="mt-1 font-mono text-sm text-foreground">{value}</dd>
    </div>
  );
}
