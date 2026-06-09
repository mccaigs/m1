import { Check, CircleAlert, PlugZap } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export type StudioEnvironmentStatus = {
  clerkPublishableKey: boolean;
  clerkSecretKey: boolean;
  convexUrl: boolean;
  convexJwtProvider: boolean;
};

export function SetupState({
  status = {
    clerkPublishableKey: false,
    clerkSecretKey: false,
    convexUrl: false,
    convexJwtProvider: false,
  },
}: {
  status?: StudioEnvironmentStatus;
}) {
  const checks = [
    ["Clerk publishable key", status.clerkPublishableKey],
    ["Clerk secret key", status.clerkSecretKey],
    ["Convex deployment URL", status.convexUrl],
    ["Convex Clerk JWT provider", status.convexJwtProvider],
  ] as const;

  return (
    <Card className="border-signal/20 bg-signal/5">
      <CardContent className="p-6">
        <div className="flex items-start gap-4">
          <div className="rounded-lg border border-signal/25 bg-signal/10 p-2 text-signal">
            <PlugZap className="size-5" />
          </div>
          <div>
            <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-signal">
              Studio OS / connection required
            </p>
            <h2 className="mt-2 text-lg font-semibold text-signal-soft">
              Connect Clerk and Convex to activate live operations.
            </h2>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
              Authentication is required before Studio OS routes or operational data
              can be shown. Complete the missing environment items, restart the Next.js
              server, then sign in.
            </p>
            <ul className="mt-5 grid gap-2 sm:grid-cols-2">
              {checks.map(([label, ready]) => (
                <li
                  className="flex items-center gap-2 rounded-lg border border-white/10 bg-background/35 px-3 py-2 text-sm"
                  key={label}
                >
                  {ready ? (
                    <Check className="size-4 text-emerald-300" />
                  ) : (
                    <CircleAlert className="size-4 text-amber-300" />
                  )}
                  <span className={ready ? "text-foreground" : "text-amber-100"}>
                    {label}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
