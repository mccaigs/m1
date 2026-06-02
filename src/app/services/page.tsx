import type { Metadata } from "next";
import { ContactCta } from "@/components/marketing/contact-cta";
import { PageHero } from "@/components/marketing/page-hero";
import { SiteFrame } from "@/components/marketing/site-frame";
import { commonServiceProblems, services, typicalEngagements } from "@/lib/studio-content";

export const metadata: Metadata = {
  title: "Services",
  description: "Practical websites, systems, and improvements for ambitious Scottish businesses with operational problems to solve.",
};

export default function ServicesPage() {
  return (
    <SiteFrame>
      <PageHero
        copy="Start with the part of the business that is taking too much time, losing opportunities, or making everyday work harder than it should be."
        eyebrow="Services / Practical business improvements"
        title="Solve the operational problem first."
      />
      <section className="border-y border-ink/10 bg-off-white text-ink">
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-24">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-deep-blue/65">Common problems we solve</p>
          <h2 className="mt-5 max-w-3xl text-3xl font-semibold tracking-tight sm:text-4xl">The work should feel clearer than it does today.</h2>
          <p className="mt-5 max-w-2xl text-base leading-7 text-ink/65">Most useful projects begin with a familiar frustration: missed opportunities, repeated admin, scattered information, or tools that no longer fit the business.</p>
          <div className="mt-10 grid gap-px overflow-hidden rounded-xl border border-ink/10 bg-ink/10 md:grid-cols-2 lg:grid-cols-3">
            {commonServiceProblems.map(({ copy, icon: Icon, outcome, title }, index) => (
              <article className="bg-off-white p-6" key={title}>
                <div className="flex items-center justify-between gap-3">
                  <div className="flex size-10 items-center justify-center rounded-lg border border-deep-blue/15 bg-deep-blue/5 text-deep-blue">
                    <Icon className="size-5" />
                  </div>
                  <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-deep-blue/50">0{index + 1}</span>
                </div>
                <h2 className="mt-7 text-xl font-semibold">{title}</h2>
                <p className="mt-3 text-sm leading-6 text-ink/65">{copy}</p>
                <div className="mt-6 border-t border-ink/10 pt-5">
                  <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-deep-blue/65">Useful outcome</p>
                  <p className="mt-2 text-sm leading-6 text-ink/70">{outcome}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8">
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-signal">Ways we can help</p>
        <h2 className="mt-5 max-w-3xl text-3xl font-semibold tracking-tight sm:text-4xl">The right build depends on the problem in front of you.</h2>
        <p className="mt-5 max-w-2xl text-base leading-7 text-muted-foreground">Each service is a practical response to a real business need. The aim is to improve the way the work gets done.</p>
        <div className="mt-10 space-y-4">
          {services.map(({ description, forWhom, icon: Icon, outcome, title }, index) => (
            <article className="grid gap-5 rounded-xl border border-white/10 bg-card/55 p-6 lg:grid-cols-[0.8fr_1fr_1fr]" key={title}>
              <div>
                <div className="flex items-center gap-3">
                  <div className="flex size-10 items-center justify-center rounded-lg border border-signal/20 bg-signal/8 text-signal"><Icon className="size-5" /></div>
                  <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-muted-foreground">0{index + 1}</span>
                </div>
                <h2 className="mt-6 text-xl font-semibold">{title}</h2>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">{description}</p>
              </div>
              <div className="border-t border-white/10 pt-5 lg:border-l lg:border-t-0 lg:pl-6 lg:pt-0">
                <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-signal">Good fit for</p>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">{forWhom}</p>
              </div>
              <div className="border-t border-white/10 pt-5 lg:border-l lg:border-t-0 lg:pl-6 lg:pt-0">
                <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-signal">Useful outcome</p>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">{outcome}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
      <section className="border-y border-ink/10 bg-off-white text-ink">
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-deep-blue/65">Typical engagements</p>
          <h2 className="mt-5 max-w-3xl text-3xl font-semibold tracking-tight sm:text-4xl">A sensible starting point for the problem in front of you.</h2>
          <p className="mt-5 max-w-2xl text-base leading-7 text-ink/65">Most engagements are shaped around the problem, the budget available, and the first useful improvement.</p>
          <div className="mt-10 grid gap-px overflow-hidden rounded-xl border border-ink/10 bg-ink/10 md:grid-cols-2">
            {typicalEngagements.map(({ copy, duration, title }, index) => (
              <article className="bg-off-white p-6" key={title}>
                <div className="flex items-center justify-between gap-4">
                  <span className="font-mono text-[10px] tracking-[0.16em] text-deep-blue/55">0{index + 1}</span>
                  <span className="rounded-full border border-deep-blue/15 px-3 py-1 font-mono text-[9px] uppercase tracking-[0.14em] text-deep-blue/70">{duration}</span>
                </div>
                <h3 className="mt-7 text-xl font-semibold">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-ink/65">{copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <ContactCta />
    </SiteFrame>
  );
}
