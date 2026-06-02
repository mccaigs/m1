"use client";

import { Button } from "@/components/ui/button";

export default function DashboardError({ reset }: { error: Error; reset: () => void }) {
  return (
    <div className="rounded-xl border border-destructive/40 bg-destructive/5 p-6">
      <p className="font-semibold">The dashboard could not load.</p>
      <p className="mt-2 text-sm text-muted-foreground">Try again. If the issue continues, check the configured services.</p>
      <Button className="mt-5" onClick={reset} variant="outline">Try again</Button>
    </div>
  );
}
