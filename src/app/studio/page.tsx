import { ContactCta } from "@/components/marketing/contact-cta";
import { PageHero } from "@/components/marketing/page-hero";
import { SiteFrame } from "@/components/marketing/site-frame";
import { PrinciplesSection } from "@/components/marketing/studio-sections";
import { createPageMetadata, publicRoutes } from "@/lib/seo";
import { studioAudiences } from "@/lib/studio-content";

export const metadata = createPageMetadata(publicRoutes[1]);

export default function StudioPage() {
  return (
    <SiteFrame>
      <PageHero
        copy="A creative technical studio for ambitious businesses that need practical AI, automation, websites, internal systems, and digital products built properly."
        eyebrow="Studio / Edinburgh, Scotland"
        title="Scotland's Elite Technical Studio"
      />
      <section className="border-b border-ink/10 bg-off-white text-ink">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 py-20 sm:px-8 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-deep-blue/65">Studio model</p>
            <h2 className="mt-5 text-3xl font-semibold tracking-tight sm:text-4xl">High-calibre technical work for real businesses.</h2>
          </div>
          <div className="space-y-5 text-base leading-7 text-ink/70">
            <p>McCaigs is not a generic AI agency, a traditional consultancy, or a normal web design studio. The work starts with what the business is trying to do better, then combines technical creativity with practical delivery.</p>
            <p>The point is not to add AI everywhere. It is to use AI where it helps, software where it matters, and human judgement where it counts.</p>
          </div>
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8">
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-signal">Who the studio is for</p>
        <h2 className="mt-5 max-w-2xl text-3xl font-semibold tracking-tight sm:text-4xl">More capable than a standard agency. More grounded than a consultancy.</h2>
        <div className="mt-10 grid gap-px overflow-hidden rounded-xl border border-white/10 bg-white/10 md:grid-cols-3">
          {studioAudiences.map((audience) => (
            <article className="bg-background/95 p-6" key={audience.title}>
              <h3 className="text-xl font-semibold">{audience.title}</h3>
              <p className="mt-4 text-sm leading-6 text-muted-foreground">{audience.copy}</p>
            </article>
          ))}
        </div>
      </section>
      <PrinciplesSection />
      <ContactCta />
    </SiteFrame>
  );
}
