import Link from "next/link";
import { ArrowUpRight, Check, MoveRight } from "lucide-react";
import { ContactCta } from "@/components/marketing/contact-cta";
import { PageFaqSection } from "@/components/marketing/page-faq-section";
import { PageHero } from "@/components/marketing/page-hero";
import { SiteFrame } from "@/components/marketing/site-frame";
import { JsonLd } from "@/components/seo/json-ld";
import { Button } from "@/components/ui/button";
import { createBreadcrumbStructuredData } from "@/lib/seo";
import { createEdinburghStructuredData, serviceComparison, type EdinburghPage } from "@/lib/edinburgh-service-content";

export function EdinburghServicePage({ page }: { page: EdinburghPage }) {
  return (
    <SiteFrame>
      <JsonLd data={createBreadcrumbStructuredData([{ name: "Home", path: "/" }, { name: page.title, path: page.path }])} />
      <JsonLd data={createEdinburghStructuredData(page)} />
      <nav aria-label="Breadcrumb" className="mx-auto max-w-7xl px-5 pt-6 sm:px-8">
        <ol className="flex flex-wrap items-center gap-2 font-mono text-[9px] uppercase tracking-[0.16em] text-muted-foreground">
          <li><Link className="transition-colors hover:text-foreground focus-visible:text-foreground" href="/">Home</Link></li>
          <li aria-hidden="true">/</li>
          <li aria-current="page" className="text-signal-soft">{page.title}</li>
        </ol>
      </nav>
      <PageHero copy={page.definition} eyebrow={page.eyebrow} title={page.h1} />

      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(18rem,0.85fr)]">
          <div className="space-y-10">
            {page.sections.map((section) => (
              <div key={section.heading}>
                <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">{section.heading}</h2>
                <div className="mt-5 space-y-4 text-base leading-7 text-muted-foreground">
                  {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                </div>
              </div>
            ))}
          </div>
          <aside className="h-fit rounded-xl border border-white/10 bg-card/55 p-6" aria-label="Engagement details">
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-signal">Starting point</p>
            <p className="mt-4 text-xl font-semibold">{page.price}</p>
            <p className="mt-6 border-t border-white/10 pt-5 text-sm leading-6 text-muted-foreground">Reviewed by David Robertson, founder of mccaigs, on {page.reviewed}.</p>
            <Button asChild className="mt-6 w-full" size="lg"><Link href="/start-project">{page.cta} <ArrowUpRight /></Link></Button>
          </aside>
        </div>
      </section>

      {page.kind === "comparison" ? <ComparisonTable /> : null}

      <section className="border-y border-ink/10 bg-off-white text-ink">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-deep-blue/65">How mccaigs approaches the work</p>
          <h2 className="mt-5 max-w-3xl text-3xl font-semibold tracking-tight sm:text-4xl">A controlled route from diagnosis to working implementation.</h2>
          <ol className="mt-10 grid gap-px overflow-hidden rounded-xl border border-ink/10 bg-ink/10 md:grid-cols-2 lg:grid-cols-5">
            {page.approach.map((item, index) => <li className="bg-off-white p-5" key={item}><span className="font-mono text-[10px] text-deep-blue/65">0{index + 1}</span><p className="mt-4 text-sm leading-6 text-ink/70">{item}</p></li>)}
          </ol>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20">
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-signal">Typical deliverables</p>
            <h2 className="mt-5 text-3xl font-semibold tracking-tight">What the engagement can produce</h2>
            <ul className="mt-7 space-y-3">{page.deliverables.map((item) => <li className="flex gap-3 text-sm leading-6 text-muted-foreground" key={item}><Check className="mt-1 size-4 shrink-0 text-signal" />{item}</li>)}</ul>
          </div>
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-signal">Provider fit</p>
            <h2 className="mt-5 text-3xl font-semibold tracking-tight">Who this is for, and when to choose differently</h2>
            <h3 className="mt-7 font-semibold">A good fit</h3>
            <ul className="mt-3 space-y-3">{page.fit.map((item) => <li className="flex gap-3 text-sm leading-6 text-muted-foreground" key={item}><Check className="mt-1 size-4 shrink-0 text-signal" />{item}</li>)}</ul>
            <h3 className="mt-7 font-semibold">When mccaigs may not be the right provider</h3>
            <ul className="mt-3 space-y-3">{page.limitations.map((item) => <li className="text-sm leading-6 text-muted-foreground" key={item}>{item}</li>)}</ul>
          </div>
        </div>
      </section>

      <section className="border-y border-white/8 bg-deep-blue/20">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 py-16 sm:px-8 sm:py-20 lg:grid-cols-2">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-signal">Verifiable proof</p>
            <h2 className="mt-5 text-3xl font-semibold tracking-tight">Evidence already published by mccaigs</h2>
            <div className="mt-7 space-y-3">{page.proof.map((item) => <Link className="block rounded-xl border border-white/10 bg-card/55 p-5 hover:border-signal/40 focus-visible:border-signal/40" href={item.href} key={item.href}><h3 className="font-semibold text-signal-soft">{item.label}</h3><p className="mt-2 text-sm leading-6 text-muted-foreground">{item.text}</p></Link>)}</div>
          </div>
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-signal">Related routes</p>
            <h2 className="mt-5 text-3xl font-semibold tracking-tight">Continue with the closest service or guide</h2>
            <div className="mt-7 grid gap-3">{page.related.map((item) => <Link className="group flex items-center justify-between rounded-xl border border-white/10 bg-card/55 p-4 hover:border-signal/40 focus-visible:border-signal/40" href={item.href} key={item.href}><span className="text-sm font-medium">{item.label}</span><MoveRight className="size-4 text-signal transition-transform group-hover:translate-x-1" /></Link>)}</div>
          </div>
        </div>
      </section>

      <PageFaqSection eyebrow={`${page.title} FAQ`} items={page.faqs} />
      <ContactCta />
    </SiteFrame>
  );
}

function ComparisonTable() {
  return <section className="border-y border-ink/10 bg-off-white text-ink"><div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20"><h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">Match the requirement to the best starting point</h2><div className="mt-8 overflow-x-auto rounded-xl border border-ink/10"><table className="w-full min-w-[40rem] border-collapse text-left"><thead className="bg-deep-blue text-white"><tr><th className="px-5 py-4 text-sm font-semibold" scope="col">Requirement</th><th className="px-5 py-4 text-sm font-semibold" scope="col">Best fit</th></tr></thead><tbody>{serviceComparison.map(([requirement, fit, href]) => <tr className="border-t border-ink/10" key={requirement}><th className="px-5 py-4 text-sm font-medium" scope="row">{requirement}</th><td className="px-5 py-4 text-sm"><Link className="font-semibold text-deep-blue underline decoration-deep-blue/30 underline-offset-4" href={href}>{fit}</Link></td></tr>)}</tbody></table></div></div></section>;
}
