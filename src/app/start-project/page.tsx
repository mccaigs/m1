import { ProjectBuilder } from "@/components/marketing/project-builder";
import { PageHero } from "@/components/marketing/page-hero";
import { PageFaqSection } from "@/components/marketing/page-faq-section";
import { SiteFrame } from "@/components/marketing/site-frame";
import { JsonLd } from "@/components/seo/json-ld";
import { specialOffers } from "@/lib/approved-knowledge";
import { createBreadcrumbStructuredData, createPageMetadata, publicRoutes } from "@/lib/seo";

export const metadata = createPageMetadata(publicRoutes[8]);

const startProjectFaqs = [
  {
    question: "What happens after I submit a project?",
    answer: "McCaigs reviews the structured enquiry, checks the fit and likely route, then follows up with a practical next step rather than treating the estimate as a binding quote.",
  },
  {
    question: "Do I need a full brief?",
    answer: "No. The workflow is designed to help shape the brief. A messy workflow, rough idea, or underperforming website is enough to begin.",
  },
  {
    question: "Can we start with a small MVP?",
    answer: "Yes. Many projects are best started with a focused first release that proves one useful improvement before expanding the system.",
  },
] as const;

export default function StartProjectPage() {
  return (
    <SiteFrame>
      <JsonLd data={createBreadcrumbStructuredData([{ name: "Home", path: "/" }, { name: "Start a Project", path: "/start-project" }])} />
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
      <PageFaqSection eyebrow="Start a Project FAQ" items={[...startProjectFaqs]} />
    </SiteFrame>
  );
}
