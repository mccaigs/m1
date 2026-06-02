import type { ReactNode } from "react";
import { SiteFooter } from "@/components/marketing/site-footer";
import { SiteHeader } from "@/components/marketing/site-header";

export function SiteFrame({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen overflow-hidden bg-background text-foreground">
      <div className="technical-grid pointer-events-none fixed inset-0 opacity-60" />
      <SiteHeader />
      <main>{children}</main>
      <SiteFooter />
    </div>
  );
}
