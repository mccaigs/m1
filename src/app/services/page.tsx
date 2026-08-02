import { ContactCta } from "@/components/marketing/contact-cta";
import { PageHero } from "@/components/marketing/page-hero";
import { PageFaqSection } from "@/components/marketing/page-faq-section";
import { SiteFrame } from "@/components/marketing/site-frame";
import { JsonLd } from "@/components/seo/json-ld";
import { Button } from "@/components/ui/button";
import { aeoPackages } from "@/lib/aeo-content";
import { createBreadcrumbStructuredData, createPageMetadata, publicRoutes } from "@/lib/seo";
import { scotlandPageMap, type ScotlandPageSlug } from "@/lib/scotland-service-content";
import { commonServiceProblems, services, typicalEngagements } from "@/lib/studio-content";
import { ArrowUpRight, Check } from "lucide-react";
import Link from "next/link";

export const metadata = createPageMetadata(publicRoutes[2]);

const serviceFaqs = [
  {
    question: "What does mccaigs build?",
    answer: "mccaigs builds practical AI systems, automation, websites, internal tools, SaaS products, and modern digital platforms around real business problems.",
  },
  {
    question: "Who does mccaigs work with?",
    answer: "mccaigs works with startups, Scottish SMEs, owner-managed businesses, professional services firms, specialist organisations, and teams that need useful software built properly.",
  },
  {
    question: "Can mccaigs improve an existing system?",
    answer: "Yes. Many projects begin with an existing website, workflow, spreadsheet, software process, or AI idea that needs to become clearer, faster, or easier to maintain.",
  },
] as const;

const scotlandServiceSlugs = [
  "answer-engine-optimisation-scotland",
  "ai-visibility-scotland",
  "ai-automation-scotland",
  "deterministic-assistants-scotland",
  "internal-business-systems-scotland",
  "bespoke-software-development-scottish-smes",
  "answer-engine-optimisation-oban",
  "ai-visibility-inverness",
] as const satisfies readonly ScotlandPageSlug[];

export default function ServicesPage() {
  return (
    <SiteFrame>
      <JsonLd data={createBreadcrumbStructuredData([{ name: "Home", path: "/" }, { name: "Services", path: "/services" }])} />
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
                  <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-deep-blue/75">0{index + 1}</span>
                </div>
                <h3 className="mt-7 text-xl font-semibold">{title}</h3>
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
                <h3 className="mt-6 text-xl font-semibold">{title}</h3>
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
                  <span className="font-mono text-[10px] tracking-[0.16em] text-deep-blue/75">0{index + 1}</span>
                  <span className="rounded-full border border-deep-blue/15 px-3 py-1 font-mono text-[9px] uppercase tracking-[0.14em] text-deep-blue/70">{duration}</span>
                </div>
                <h3 className="mt-7 text-xl font-semibold">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-ink/65">{copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-signal">Answer Engine Optimisation & AI Visibility</p>
            <h2 className="mt-5 max-w-3xl text-3xl font-semibold tracking-tight sm:text-4xl">Want your business recommended by ChatGPT, Google AI, and Gemini?</h2>
            <p className="mt-5 text-base leading-7 text-muted-foreground">
              mccaigs helps businesses structure their websites so modern answer engines can understand, trust, and cite them. The work combines technical SEO, structured data, entity optimisation, content architecture, llms.txt, deterministic assistants, and fast modern websites.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild>
                <Link href="/answer-engine-optimisation">Explore AEO <ArrowUpRight /></Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/ai-visibility">View AI visibility <ArrowUpRight /></Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/aeo-agency-edinburgh">AEO agency Edinburgh <ArrowUpRight /></Link>
              </Button>
            </div>
          </div>
          <div className="grid gap-3">
            {aeoPackages.map((item) => (
              <article className="rounded-xl border border-white/10 bg-card/55 p-5" key={item.title}>
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <h3 className="text-xl font-semibold">{item.title}</h3>
                  <span className="rounded-full border border-signal/20 px-3 py-1 font-mono text-[9px] uppercase tracking-[0.14em] text-signal">{item.price}</span>
                </div>
                <div className="mt-4 grid gap-2 sm:grid-cols-2">
                  {item.includes.slice(0, 6).map((included) => (
                    <p className="flex gap-2 text-sm leading-6 text-muted-foreground" key={included}>
                      <Check className="mt-1 size-3.5 shrink-0 text-signal" /> {included}
                    </p>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="border-y border-ink/10 bg-off-white text-ink">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-deep-blue/65">Scotland-wide technical services</p>
          <h2 className="mt-5 max-w-3xl text-3xl font-semibold tracking-tight sm:text-4xl">Clear routes for visibility, controlled AI, internal systems, and bespoke software.</h2>
          <p className="mt-5 max-w-3xl text-base leading-7 text-ink/65">mccaigs is based in Edinburgh and delivers suitable projects across Scotland. National and regional pages are separated by real service intent, audience questions, and operating context.</p>
          <div className="mt-9 grid gap-px overflow-hidden rounded-xl border border-ink/10 bg-ink/10 md:grid-cols-2 lg:grid-cols-4">
            {scotlandServiceSlugs.map((slug) => {
              const service = scotlandPageMap[slug];
              return (
                <Link className="group bg-off-white p-5 transition-colors hover:bg-white" href={service.path} key={slug}>
                  <h3 className="font-semibold leading-6">{service.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-ink/60">{service.definition}</p>
                  <span className="mt-5 inline-flex items-center gap-1 font-mono text-[9px] uppercase tracking-[0.15em] text-deep-blue">View service <ArrowUpRight className="size-3 transition-transform group-hover:translate-x-0.5" /></span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
      <section className="border-y border-white/8 bg-deep-blue/20">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-signal">Edinburgh services</p>
          <h2 className="mt-5 max-w-3xl text-3xl font-semibold tracking-tight sm:text-4xl">Technical delivery for local organisations and teams across Scotland.</h2>
          <p className="mt-5 max-w-3xl text-base leading-7 text-muted-foreground">Explore <Link className="text-signal-soft underline underline-offset-4" href="/ai-systems-edinburgh">AI systems in Edinburgh</Link>, <Link className="text-signal-soft underline underline-offset-4" href="/business-automation-edinburgh">business automation</Link>, <Link className="text-signal-soft underline underline-offset-4" href="/custom-software-edinburgh">custom software</Link>, <Link className="text-signal-soft underline underline-offset-4" href="/seo-agency-edinburgh">technical SEO</Link>, and <Link className="text-signal-soft underline underline-offset-4" href="/web-development-edinburgh">modern web development</Link>. Each page explains the fit, limitations, and practical starting point.</p>
        </div>
      </section>
      <PageFaqSection eyebrow="Services FAQ" items={[...serviceFaqs]} />
      <ContactCta />
    </SiteFrame>
  );
}
