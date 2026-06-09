import { ContactCta } from "@/components/marketing/contact-cta";
import { PageHero } from "@/components/marketing/page-hero";
import { SiteFrame } from "@/components/marketing/site-frame";
import { JsonLd } from "@/components/seo/json-ld";
import { createBreadcrumbStructuredData, createPageMetadata, publicRoutes } from "@/lib/seo";
import { processSteps } from "@/lib/studio-content";

export const metadata = createPageMetadata(publicRoutes[4]);

export default function ProcessPage() {
  return (
    <SiteFrame>
      <JsonLd data={createBreadcrumbStructuredData([{ name: "Home", path: "/" }, { name: "Process", path: "/process" }])} />
      <PageHero
        copy="A clear studio process keeps the work close to the business problem, creates feedback early, and turns useful ideas into working systems."
        eyebrow="Process / Senior-led delivery"
        title="A practical route from operational problem to useful system."
      />
      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8">
        <div className="space-y-3">
          {processSteps.map(([number, title, copy]) => (
            <article className="grid gap-5 rounded-xl border border-white/10 bg-card/55 p-6 md:grid-cols-[7rem_0.65fr_1.35fr] md:items-center" key={title}>
              <p className="font-mono text-3xl tracking-[-0.08em] text-signal/75">{number}</p>
              <h2 className="text-2xl font-semibold">{title}</h2>
              <p className="text-sm leading-6 text-muted-foreground">{copy}</p>
            </article>
          ))}
        </div>
        <div className="mt-10 max-w-2xl border-l border-signal/45 pl-5">
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-signal">Commercial focus</p>
          <p className="mt-3 text-sm leading-6 text-muted-foreground">The method is deliberately simple. The difficult work is applying judgement: deciding what matters, what should be automated, where AI can help, and what a useful first release actually needs.</p>
        </div>
      </section>
      <ContactCta />
    </SiteFrame>
  );
}
