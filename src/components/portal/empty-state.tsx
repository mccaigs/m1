import type { LucideIcon } from "lucide-react";

export function EmptyState({
  description,
  eyebrow = "Workspace empty",
  icon: Icon,
  title,
}: {
  description: string;
  eyebrow?: string;
  icon: LucideIcon;
  title: string;
}) {
  return (
    <div className="relative overflow-hidden rounded-xl border border-dashed border-white/15 bg-card/25 p-7 sm:p-10">
      <div className="technical-grid pointer-events-none absolute inset-0 opacity-35" />
      <div className="relative max-w-lg">
        <div className="flex size-10 items-center justify-center rounded-lg border border-signal/20 bg-signal/8 text-signal">
          <Icon className="size-5" />
        </div>
        <p className="mt-8 font-mono text-[9px] uppercase tracking-[0.2em] text-signal">{eyebrow}</p>
        <h2 className="mt-3 text-xl font-semibold tracking-tight">{title}</h2>
        <p className="mt-3 text-sm leading-6 text-muted-foreground">{description}</p>
      </div>
    </div>
  );
}
