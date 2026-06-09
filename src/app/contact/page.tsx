import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PageHero } from "@/components/marketing/page-hero";
import { SiteFrame } from "@/components/marketing/site-frame";
import { JsonLd } from "@/components/seo/json-ld";
import { Button } from "@/components/ui/button";
import { ContactForm } from "@/features/enquiries/components/contact-form";
import { createBreadcrumbStructuredData, createPageMetadata, publicRoutes } from "@/lib/seo";

export const metadata = createPageMetadata(publicRoutes[7]);

export default function ContactPage() {
  return (
    <SiteFrame>
      <JsonLd data={createBreadcrumbStructuredData([{ name: "Home", path: "/" }, { name: "Contact", path: "/contact" }])} />
      <PageHero
        copy="Tell us what is slowing the business down, what the website should be doing better, or where AI and automation might create a useful advantage."
        eyebrow="Contact / Qualified project enquiry"
        title="Bring us the part that should work better."
      />
      <section className="mx-auto grid max-w-7xl gap-5 px-5 py-16 sm:px-8 sm:py-20 lg:grid-cols-[0.78fr_1.22fr]">
        <div className="space-y-5">
          <div className="rounded-xl border border-white/10 bg-card/40 p-5 sm:p-6">
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-signal">A practical first conversation</p>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">Tell us what is taking too much time, where opportunities are being missed, or which part of the business should work more smoothly.</p>
          </div>
          <div className="rounded-xl border border-white/10 bg-card/40 p-5 sm:p-6">
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-signal">Not sure if we&apos;re the right fit?</p>
            <h2 className="mt-4 text-2xl font-semibold tracking-tight">Ask the Assistant</h2>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">Not ready to enquire yet? Ask the deterministic assistant first. Check project suitability, delivery process, typical timelines, and common business use cases.</p>
            <Button asChild className="mt-5" variant="outline">
              <Link href="/assistant">Open the Assistant <ArrowUpRight /></Link>
            </Button>
            <Button asChild className="mt-2" variant="outline">
              <Link href="/start-project">Start structured discovery <ArrowUpRight /></Link>
            </Button>
          </div>
        </div>
        <ContactForm />
      </section>
    </SiteFrame>
  );
}
