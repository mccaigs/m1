import { Activity, ArrowUpRight, CheckCircle2, Circle, FolderKanban } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { EmptyState } from "@/components/portal/empty-state";
import { PortalHeading } from "@/components/portal/portal-heading";
import { portalSummary, previewActivity } from "@/lib/portal-content";

const setupSteps = [
  ["Application shell", true],
  ["Clerk authentication", false],
  ["Convex workspace data", false],
] as const;

export default function DashboardPage() {
  const configured = Boolean(process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY);

  return (
    <div>
      <PortalHeading
        copy="A calm operational view for live projects, delivery systems, actions, and the decisions that matter."
        eyebrow="Overview / studio operating system"
        title="Workspace overview"
      />
      {!configured && (
        <div className="mt-6 rounded-xl border border-signal/20 bg-signal/5 p-4 text-sm leading-6 text-signal-soft">
          Clerk is not configured in this preview. The protected workspace activates when the environment variables are connected.
        </div>
      )}
      <div className="mt-7 grid gap-3 sm:grid-cols-3">
        {portalSummary.map(({ detail, label, value }) => (
          <Card className="border-white/10 bg-card/55" key={label}>
            <CardContent className="p-5">
              <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-muted-foreground">{label}</p>
              <p className="mt-7 text-4xl font-semibold tracking-tight text-signal-soft">{value}</p>
              <p className="mt-2 text-xs text-muted-foreground">{detail}</p>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="mt-7 grid gap-4 xl:grid-cols-[1.2fr_0.8fr]">
        <EmptyState
          description="Once the first workspace is connected, current project status, upcoming milestones, and delivery risk will be visible here."
          eyebrow="Project portfolio"
          icon={FolderKanban}
          title="No live projects in this workspace"
        />
        <Card className="border-white/10 bg-card/55">
          <CardContent className="p-5">
            <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-signal">Activation path</p>
            <div className="mt-5 space-y-4">
              {setupSteps.map(([label, complete]) => (
                <div className="flex items-center justify-between gap-4 border-b border-white/8 pb-4 text-sm" key={label}>
                  <span>{label}</span>
                  {complete ? <CheckCircle2 className="size-4 text-signal" /> : <Circle className="size-4 text-muted-foreground" />}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
      <Card className="mt-7 border-white/10 bg-card/55">
        <CardContent className="p-5">
          <div className="flex items-center justify-between">
            <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-signal">Recent activity / preview</p>
            <Activity className="size-4 text-muted-foreground" />
          </div>
          <div className="mt-5 space-y-3">
            {previewActivity.map((item) => (
              <div className="flex items-start justify-between gap-5 border-t border-white/8 pt-3" key={item.label}>
                <div>
                  <p className="text-sm font-medium">{item.label}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{item.detail}</p>
                </div>
                <span className="flex items-center gap-1 font-mono text-[9px] uppercase tracking-[0.14em] text-muted-foreground">{item.time} <ArrowUpRight className="size-3" /></span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
