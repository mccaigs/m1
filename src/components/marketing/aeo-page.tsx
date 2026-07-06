import Link from "next/link";
import { ArrowUpRight, Check, Gauge, MoveRight } from "lucide-react";
import { ContactCta } from "@/components/marketing/contact-cta";
import { PageFaqSection } from "@/components/marketing/page-faq-section";
import { PageHero } from "@/components/marketing/page-hero";
import { SiteFrame } from "@/components/marketing/site-frame";
import { JsonLd } from "@/components/seo/json-ld";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  aeoPackages,
  aiVisibilityMetrics,
  createAeoStructuredData,
  getAeoRelatedPages,
  type AeoPage,
} from "@/lib/aeo-content";
import { createBreadcrumbStructuredData } from "@/lib/seo";

export function AeoMarketingPage({ page }: { page: AeoPage }) {
  const relatedPages = getAeoRelatedPages(page.slug);

  return (
    <SiteFrame>
      <JsonLd data={createBreadcrumbStructuredData([{ name: "Home", path: "/" }, { name: page.title, path: page.path }])} />
      <JsonLd data={createAeoStructuredData(page)} />
      <PageHero copy={page.description} eyebrow={page.eyebrow} title={page.h1} />

      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-signal">Plain-English strategy</p>
            <h2 className="mt-5 max-w-2xl text-3xl font-semibold tracking-tight sm:text-4xl">
              Want your business recommended by ChatGPT, Google AI, and Gemini?
            </h2>
            <div className="mt-6 space-y-5 text-base leading-7 text-muted-foreground">
              {page.body.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg">
                <Link href="/start-project">{page.cta} <ArrowUpRight /></Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/assistant">Ask the assistant <ArrowUpRight /></Link>
              </Button>
            </div>
          </div>
          <div className="grid gap-3">
            {page.points.map((point, index) => (
              <Card className="border-white/10 bg-card/55" key={point}>
                <CardContent className="flex gap-4 p-5">
                  <span className="mt-1 flex size-8 shrink-0 items-center justify-center rounded-lg border border-signal/20 bg-signal/8 font-mono text-[9px] text-signal">
                    0{index + 1}
                  </span>
                  <p className="text-sm leading-6 text-muted-foreground">{point}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {page.evidence ? (
        <section className="border-y border-white/8 bg-deep-blue/20">
          <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20">
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-signal">Case study signals</p>
            <h2 className="mt-5 max-w-3xl text-3xl font-semibold tracking-tight sm:text-4xl">A practical system of public, crawlable signals.</h2>
            <div className="mt-10 grid gap-px overflow-hidden rounded-xl border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
              {page.evidence.map((item) => (
                <div className="bg-background/95 p-5" key={item.label}>
                  <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-signal">{item.label}</p>
                  <p className="mt-4 text-xl font-semibold">{item.value}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <section className="border-y border-ink/10 bg-off-white text-ink">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-deep-blue/65">Service packages</p>
          <h2 className="mt-5 max-w-3xl text-3xl font-semibold tracking-tight sm:text-4xl">
            Practical AEO work without promising impossible outcomes.
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-7 text-ink/65">
            These packages prepare, optimise, and improve the source material that answer engines may use. They do not guarantee rankings, recommendations, or inclusion in Google AI Overviews.
          </p>
          <div className="mt-10 grid gap-px overflow-hidden rounded-xl border border-ink/10 bg-ink/10 lg:grid-cols-3">
            {aeoPackages.map((item) => (
              <article className="bg-off-white p-6" key={item.title}>
                <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-deep-blue/70">{item.price}</p>
                <h3 className="mt-4 text-2xl font-semibold">{item.title}</h3>
                <div className="mt-6 space-y-3">
                  {item.includes.map((included) => (
                    <p className="flex gap-2 text-sm leading-6 text-ink/70" key={included}>
                      <Check className="mt-1 size-4 shrink-0 text-deep-blue/70" /> {included}
                    </p>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20">
        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-signal">AI Visibility Report</p>
            <h2 className="mt-5 text-3xl font-semibold tracking-tight sm:text-4xl">Measure the signals before changing the strategy.</h2>
            <p className="mt-5 text-base leading-7 text-muted-foreground">
              A useful AI visibility report turns uncertainty into a visible checklist. It shows where the business is clear, where answer engines may struggle, and what should be improved next.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {aiVisibilityMetrics.map((metric, index) => (
              <div className="rounded-xl border border-white/10 bg-card/55 p-4" key={metric}>
                <div className="flex items-center justify-between gap-3">
                  <Gauge className="size-5 text-signal" />
                  <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-muted-foreground">0{index + 1}</span>
                </div>
                <p className="mt-5 text-sm font-medium">{metric}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-white/8 bg-deep-blue/20">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-signal">Related AEO pages</p>
          <h2 className="mt-5 max-w-3xl text-3xl font-semibold tracking-tight sm:text-4xl">Build the whole AI discoverability picture.</h2>
          <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {relatedPages.map((related) => (
              <Link
                className="group rounded-xl border border-white/10 bg-card/55 p-5 transition-colors hover:border-signal/40 focus-visible:border-signal/40"
                href={related.path}
                key={related.path}
              >
                <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-signal">{related.eyebrow}</p>
                <h3 className="mt-4 text-lg font-semibold group-hover:text-signal-soft">{related.title}</h3>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">{related.description}</p>
                <span className="mt-5 inline-flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.18em] text-signal">
                  Read page <MoveRight className="size-3" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20">
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-signal">Core routes</p>
        <h2 className="mt-5 max-w-3xl text-3xl font-semibold tracking-tight sm:text-4xl">Follow the complete AEO and AI visibility path.</h2>
        <div className="mt-8 flex flex-wrap gap-2">
          {[
            ["AEO", "/answer-engine-optimisation"],
            ["AEO Scotland", "/answer-engine-optimisation-scotland"],
            ["AEO UK", "/answer-engine-optimisation-uk"],
            ["AI Search", "/ai-search-optimisation"],
            ["AI Visibility", "/ai-visibility"],
            ["ChatGPT SEO", "/chatgpt-seo"],
            ["Google AI Overviews", "/google-ai-overviews"],
            ["llms.txt", "/llms-txt"],
            ["Case study", "/ai-visibility-case-study"],
            ["Assistant", "/assistant"],
            ["Start a project", "/start-project"],
          ].map(([label, href]) => (
            <Button asChild key={href} size="sm" variant={href === page.path ? "default" : "outline"}>
              <Link href={href}>{label}</Link>
            </Button>
          ))}
        </div>
      </section>

      <PageFaqSection eyebrow="AEO FAQ" items={page.faqs} />
      <ContactCta />
    </SiteFrame>
  );
}
