import { Badge } from "@/components/ui/badge";

export function PortalHeading({
  copy,
  eyebrow,
  title,
}: {
  copy: string;
  eyebrow: string;
  title: string;
}) {
  return (
    <div className="flex flex-col gap-4 border-b border-white/10 pb-7 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-signal">{eyebrow}</p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">{title}</h1>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground">{copy}</p>
      </div>
      <Badge className="w-fit border-signal/20 bg-signal/8 font-mono text-[9px] uppercase tracking-[0.14em] text-signal-soft" variant="outline">
        Live workspace
      </Badge>
    </div>
  );
}
