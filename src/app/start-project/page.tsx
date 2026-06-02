import type { Metadata } from "next";
import { ProjectBuilder } from "@/components/marketing/project-builder";
import { PageHero } from "@/components/marketing/page-hero";
import { SiteFrame } from "@/components/marketing/site-frame";
import { specialOffers } from "@/lib/approved-knowledge";

export const metadata: Metadata = {
  title: "Start a Project",
  description: "Scope a McCaigs project through a structured qualification workflow and receive an indicative planning estimate.",
};

export default function StartProjectPage() {
  return (
    <SiteFrame>
      <PageHero
        copy="Work through the business problem, desired outcome, and likely scope. The project builder uses approved rules to prepare an indicative planning estimate and a structured enquiry."
        eyebrow="Start a project / Operational discovery"
        title="Start with what should work better."
      />
      <section className="border-b border-ink/10 bg-[#f6f3ec]">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
          <ProjectBuilder offers={specialOffers} />
        </div>
      </section>
    </SiteFrame>
  );
}
