import type { Metadata } from "next";
import { ContactCta } from "@/components/marketing/contact-cta";
import { PageHero } from "@/components/marketing/page-hero";
import { SiteFrame } from "@/components/marketing/site-frame";
import { SystemsSection } from "@/components/marketing/studio-sections";

export const metadata: Metadata = {
  title: "Systems",
  description: "Explore the workflow engines, internal tools, practical AI systems, websites, and digital products McCaigs builds.",
};

const systemTypes = [
  ["Practical AI systems", "Useful AI assistance with clear rules, review, and a sensible fallback when the answer is not known."],
  ["Workflow engines", "Structured routing, operational state, ownership, and reliable hand-offs."],
  ["Internal tools", "Calm specialist interfaces shaped around the real work of the team."],
  ["SaaS builds", "Credible first-release foundations for products intended to serve real users."],
  ["Automation layers", "Practical removal of repeated handling without obscuring responsibility."],
  ["Decision systems", "Explainable scoring, matching, qualification, and evidence-backed recommendations."],
] as const;

export default function SystemsPage() {
  return (
    <SiteFrame>
      <PageHero
        copy="McCaigs builds websites, workflows, internal tools, and AI-assisted systems around the way a business actually works. The result should make the operation clearer, not more complicated."
        eyebrow="Systems / Selected technical builds"
        title="Systems that earn their place in the operation."
      />
      <SystemsSection />
      <section className="border-y border-ink/10 bg-off-white text-ink">
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-deep-blue/65">System categories</p>
          <h2 className="mt-5 max-w-2xl text-3xl font-semibold tracking-tight sm:text-4xl">Different problems. The same practical standard.</h2>
          <div className="mt-10 grid gap-x-10 md:grid-cols-2">
            {systemTypes.map(([title, copy], index) => (
              <article className="flex gap-4 border-t border-ink/12 py-5" key={title}>
                <span className="font-mono text-[10px] text-deep-blue/60">0{index + 1}</span>
                <div>
                  <h3 className="font-semibold">{title}</h3>
                  <p className="mt-2 text-sm leading-6 text-ink/65">{copy}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
      <ContactCta />
    </SiteFrame>
  );
}
