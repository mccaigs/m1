import Link from "next/link";
import { ArrowUpRight, CircleDot } from "lucide-react";
import { ContactCta } from "@/components/marketing/contact-cta";
import { SiteFrame } from "@/components/marketing/site-frame";
import { JsonLd } from "@/components/seo/json-ld";
import { Button } from "@/components/ui/button";
import { absoluteUrl, createBreadcrumbStructuredData, createPageMetadata, siteConfig } from "@/lib/seo";

const aboutDescription = "McCaigs is a Scottish technical studio founded by David Robertson, building practical AI systems, automation, websites, internal tools, and digital products for startups, SMEs, and organisations.";

export const metadata = createPageMetadata({
  description: aboutDescription,
  path: "/about",
  title: "About McCaigs | Scotland's Elite Technical Studio",
});

const timeline = [
  ["2010", "David Robertson creates the McCaigs brand."],
  ["2015", "David Robertson wins The Pitch UK Digital Marketing Award."],
  ["2016", "McCaigs trademark registered."],
  ["2025", "McCaigs successfully completes the TechScaler Catalyst programme."],
  ["Today", "McCaigs operates as a Scottish technical studio focused on practical engineering, deterministic systems, AI, automation, websites, internal systems and fast MVP delivery."],
] as const;

const buildAreas = [
  "Deterministic AI systems",
  "Business automation",
  "Websites and digital platforms",
  "Internal tools",
  "Fast MVPs",
  "SaaS and product foundations",
] as const;

const aboutStructuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@id": `${absoluteUrl("/about")}#about-page`,
      "@type": "AboutPage",
      about: { "@id": `${absoluteUrl("/")}#organisation` },
      description: aboutDescription,
      mainEntity: { "@id": `${absoluteUrl("/")}#organisation` },
      name: "About McCaigs",
      url: absoluteUrl("/about"),
    },
    {
      "@id": `${absoluteUrl("/about")}#david-robertson`,
      "@type": "Person",
      affiliation: "McCaigs completed the TechScaler Catalyst programme in late 2025.",
      award: "The Pitch UK Digital Marketing Award 2015",
      jobTitle: "Founder",
      name: siteConfig.founder,
      worksFor: { "@id": `${absoluteUrl("/")}#organisation`, name: siteConfig.name },
    },
  ],
};

export default function AboutPage() {
  return (
    <SiteFrame>
      <JsonLd data={createBreadcrumbStructuredData([{ name: "Home", path: "/" }, { name: "About", path: "/about" }])} />
      <JsonLd data={aboutStructuredData} />
      <section className="relative border-b border-white/8">
        <div className="hero-glow absolute -top-36 right-0 -z-10 h-[32rem] w-[32rem] opacity-60" />
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-22">
          <p className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.22em] text-signal">
            <CircleDot className="size-3" /> About / Scottish technical studio
          </p>
          <h1 className="mt-6 max-w-4xl text-5xl font-semibold leading-[0.98] tracking-[-0.06em] sm:text-7xl">McCaigs is Scotland&apos;s Elite Technical Studio.</h1>
          <p className="mt-7 max-w-2xl text-lg leading-8 text-muted-foreground">
            We design and build practical AI systems, automation, websites, internal tools and digital products for startups, SMEs and organisations that need useful software built properly.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Button asChild size="lg"><Link href="/start-project">Start a project <ArrowUpRight /></Link></Button>
            <Button asChild size="lg" variant="outline"><Link href="/systems">View systems</Link></Button>
          </div>
        </div>
      </section>
      <section className="border-b border-ink/10 bg-[#f6f3ec] text-ink">
        <div className="mx-auto grid max-w-7xl gap-8 px-5 py-14 sm:px-8 sm:py-20 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-deep-blue/65">What McCaigs is</p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">A hands-on studio for practical engineering.</h2>
          </div>
          <div className="space-y-5 text-base leading-7 text-ink/70">
            <p>
              <Link className="font-medium text-deep-blue underline decoration-signal/40 underline-offset-4 hover:text-signal" href="/">McCaigs</Link> works at the point where business operations, software, AI and commercial judgement meet. The studio focuses on systems that help real businesses handle enquiries, reduce administration, organise information, support customers and move faster without adding unnecessary complexity.
            </p>
            <p>
              The work is deliberately practical: diagnose the awkward part of the operation, design the simplest reliable route, build with modern tools, evaluate against reality, and improve from evidence.
            </p>
          </div>
        </div>
      </section>
      <section className="mx-auto grid max-w-7xl gap-8 px-5 py-14 sm:px-8 sm:py-20 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-signal">Founder / Scottish roots</p>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">Founded by David Robertson.</h2>
        </div>
        <div className="space-y-5 text-sm leading-7 text-muted-foreground">
          <p id="founder">
            <span className="text-foreground">David Robertson</span> created the McCaigs brand in 2010. The brand has since developed from early digital work into a Scottish technical studio focused on practical engineering, deterministic systems, AI, automation, websites, internal tools and fast MVPs.
          </p>
          <p>
            McCaigs is based in Edinburgh, Scotland, and works with startups, SMEs, owner-managed businesses and specialist organisations across Scotland and the wider United Kingdom.
          </p>
        </div>
      </section>
      <section className="border-y border-ink/10 bg-off-white text-ink">
        <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8 sm:py-20">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-deep-blue/65">Company timeline</p>
          <h2 className="mt-4 max-w-3xl text-3xl font-semibold tracking-tight sm:text-4xl">A factual record of the brand&apos;s development.</h2>
          <div className="mt-8 grid gap-px overflow-hidden rounded-xl border border-ink/10 bg-ink/10 md:grid-cols-5">
            {timeline.map(([year, copy]) => (
              <article className="bg-off-white p-5" key={year}>
                <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-deep-blue/60">{year}</p>
                <p className="mt-4 text-sm leading-6 text-ink/70">{copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="mx-auto grid max-w-7xl gap-8 px-5 py-14 sm:px-8 sm:py-20 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-signal">What we build</p>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">Useful systems for ordinary business problems.</h2>
        </div>
        <div>
          <div className="grid gap-2 sm:grid-cols-2">
            {buildAreas.map((area) => (
              <div className="rounded-lg border border-white/10 bg-card/55 p-4 text-sm text-muted-foreground" key={area}>{area}</div>
            ))}
          </div>
        </div>
      </section>
      <section className="border-y border-ink/10 bg-off-white text-ink">
        <div className="mx-auto grid max-w-7xl gap-8 px-5 py-14 sm:px-8 sm:py-20 lg:grid-cols-2">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-deep-blue/65">How we work</p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">Diagnose first. Build what earns its place.</h2>
            <p className="mt-5 text-sm leading-7 text-ink/65">
              McCaigs starts with the business problem, the evidence, and the constraints. The first useful release is shaped around what will make the operation clearer, faster or easier to run.
            </p>
          </div>
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-deep-blue/65">Why deterministic systems matter</p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">Do not pay for intelligence when logic is enough.</h2>
            <p className="mt-5 text-sm leading-7 text-ink/65">
              Not every workflow needs AI. If logic, approved knowledge or a clear interface is enough, the system should use that first. AI is added where it creates practical value, such as summarisation, classification, research or language work.
            </p>
          </div>
        </div>
      </section>
      <section className="border-y border-ink/10 bg-[#f6f3ec] text-ink">
        <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8 sm:py-20">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-deep-blue/65">Continue</p>
          <h2 className="mt-4 max-w-3xl text-3xl font-semibold tracking-tight sm:text-4xl">Explore the studio from here.</h2>
          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {[
              ["Studio", "/studio"],
              ["Services", "/services"],
              ["Systems", "/systems"],
              ["Assistant", "/assistant"],
              ["Insights", "/insights"],
              ["Start a Project", "/start-project"],
            ].map(([label, href]) => (
              <Link className="rounded-xl border border-deep-blue/12 bg-white/55 p-5 text-sm font-medium text-deep-blue transition-colors hover:border-signal/50 hover:text-signal" href={href} key={href}>{label}</Link>
            ))}
          </div>
        </div>
      </section>
      <ContactCta />
    </SiteFrame>
  );
}
