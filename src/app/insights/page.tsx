import type { Metadata } from "next";
import { MoveRight } from "lucide-react";
import { ContactCta } from "@/components/marketing/contact-cta";
import { PageHero } from "@/components/marketing/page-hero";
import { SiteFrame } from "@/components/marketing/site-frame";
import { insightAreas } from "@/lib/studio-content";

export const metadata: Metadata = {
  title: "Insights",
  description: "Practical notes from McCaigs on reliable AI, workflow improvement, internal systems, and building useful software.",
};

export default function InsightsPage() {
  return (
    <SiteFrame>
      <PageHero
        copy="Practical notes for business owners and operators who want technology to make the work clearer, faster, and more reliable."
        eyebrow="Insights / Studio notes"
        title="Useful thinking for businesses that need things built properly."
      />
      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-24">
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-signal">Editorial focus</p>
        <h2 className="mt-5 max-w-3xl text-3xl font-semibold tracking-tight sm:text-4xl">Clear notes. Practical subjects. No hype.</h2>
        <p className="mt-5 max-w-2xl text-base leading-7 text-muted-foreground">The Insights section is the publishing home for studio notes, build logs, practical guidance, and careful explanations of where AI is useful and where simpler software is the better answer.</p>
        <div className="mt-10 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          {insightAreas.map(([title, copy], index) => (
            <article className="rounded-xl border border-white/10 bg-card/55 p-6" key={title}>
              <div className="flex items-center justify-between gap-3">
                <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-signal">Coverage area</span>
                <span className="font-mono text-[9px] tracking-[0.16em] text-muted-foreground">0{index + 1}</span>
              </div>
              <h2 className="mt-7 text-xl font-semibold">{title}</h2>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">{copy}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="border-y border-ink/10 bg-off-white text-ink">
        <div className="mx-auto grid max-w-7xl gap-8 px-5 py-20 sm:px-8 sm:py-24 lg:grid-cols-[0.7fr_1.3fr]">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-deep-blue/65">Publishing foundation</p>
            <h2 className="mt-5 text-3xl font-semibold tracking-tight sm:text-4xl">Studio notes are being prepared.</h2>
          </div>
          <div className="max-w-2xl">
            <p className="text-base leading-7 text-ink/65">The first notes will focus on practical questions: when an internal tool is worth building, where controlled assistants fit, how to remove repeated admin, and how to improve a website so it contributes more to the business.</p>
            <p className="mt-5 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-deep-blue/70">
              <MoveRight className="size-3" /> Repository-managed publishing follows
            </p>
          </div>
        </div>
      </section>
      <ContactCta />
    </SiteFrame>
  );
}
