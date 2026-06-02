import type { Metadata } from "next";
import { CircleDot } from "lucide-react";
import { AssistantConsultation } from "@/components/marketing/assistant-consultation";
import { SiteFrame } from "@/components/marketing/site-frame";

export const metadata: Metadata = {
  title: "Deterministic Studio Assistant",
  description: "Talk to the McCaigs studio assistant about practical AI, automation, websites, internal systems, project fit, and delivery.",
};

export default function AssistantPage() {
  return (
    <SiteFrame>
      <section className="border-b border-white/8 bg-deep-blue/16">
        <div className="mx-auto max-w-7xl px-5 py-10 sm:px-8 sm:py-14">
          <p className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-signal">
            <CircleDot className="size-3" /> Assistant / approved studio knowledge
          </p>
          <h1 className="mt-5 max-w-3xl text-4xl font-semibold tracking-tight sm:text-5xl">Deterministic Studio Assistant</h1>
          <p className="mt-5 max-w-3xl text-base leading-7 text-muted-foreground sm:text-lg">
            Ask about McCaigs, practical AI, automation, websites, internal systems, project fit, timelines, and how we work.
          </p>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-signal-soft">
            This assistant answers from approved McCaigs knowledge only. If it does not know, it says so.
          </p>
        </div>
      </section>
      <section className="border-b border-ink/10 bg-[#f6f3ec]">
        <div className="mx-auto max-w-6xl px-5 py-10 sm:px-8 sm:py-14">
          <AssistantConsultation />
        </div>
      </section>
    </SiteFrame>
  );
}
