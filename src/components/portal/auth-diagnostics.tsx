"use client";

import { useAuth, useUser } from "@clerk/nextjs";
import { useConvexAuth, useQuery } from "convex/react";
import { Card, CardContent } from "@/components/ui/card";
import { api } from "../../../convex/_generated/api";

export function AuthDiagnostics({ alwaysVisible = false }: { alwaysVisible?: boolean }) {
  const { isLoaded, isSignedIn, userId } = useAuth();
  const { user } = useUser();
  const { isAuthenticated, isLoading } = useConvexAuth();
  const diagnostics = useQuery(
    api.userRoles.diagnostics,
    !isLoading && isAuthenticated ? {} : "skip",
  );

  if (!alwaysVisible && process.env.NODE_ENV !== "development") return null;

  const rows = [
    ["Clerk loaded", isLoaded],
    ["Clerk signed in", isSignedIn === true],
    ["Clerk user ID", userId ?? "Unavailable"],
    ["Clerk email", user?.primaryEmailAddress?.emailAddress ?? "Unavailable"],
    ["Convex auth loading", isLoading],
    ["Convex authenticated", isAuthenticated],
    ["Current role", diagnostics?.role ?? "Unavailable"],
    ["Role record", diagnostics?.roleRecord ?? null],
  ] as const;

  return (
    <Card className="border-amber-300/20 bg-amber-300/5">
      <CardContent className="p-5 sm:p-6">
        <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-amber-200">
          Development / authentication diagnostics
        </p>
        <dl className="mt-4 grid gap-3 sm:grid-cols-2">
          {rows.map(([label, value]) => (
            <div className="rounded-lg border border-white/10 bg-background/35 p-3" key={label}>
              <dt className="text-xs text-muted-foreground">{label}</dt>
              <dd className="mt-1 break-all font-mono text-xs text-foreground">
                {formatDiagnosticValue(value)}
              </dd>
            </div>
          ))}
        </dl>
        <div className="mt-4 rounded-lg border border-white/10 bg-background/35 p-3">
          <p className="text-xs text-muted-foreground">Convex identity payload</p>
          <pre className="mt-2 overflow-x-auto whitespace-pre-wrap break-all font-mono text-xs text-foreground">
            {diagnostics === undefined
              ? "Waiting for Convex diagnostics..."
              : JSON.stringify(diagnostics.identity, null, 2)}
          </pre>
        </div>
      </CardContent>
    </Card>
  );
}

function formatDiagnosticValue(value: unknown) {
  if (typeof value === "boolean") return value ? "Yes" : "No";
  if (typeof value === "string") return value;
  return JSON.stringify(value, null, 2);
}
