import { FaqSection } from "@/components/marketing/faq-section";
import { ContactCta } from "@/components/marketing/contact-cta";
import { SiteFrame } from "@/components/marketing/site-frame";
import { JsonLd } from "@/components/seo/json-ld";
import { createBreadcrumbStructuredData, createPageMetadata, publicRoutes } from "@/lib/seo";
import {
  CapabilitiesSection,
  HeroSection,
  PositioningSection,
  TechnologyEcosystemSection,
  TypicalProblemsSection,
} from "@/components/marketing/studio-sections";

export const metadata = createPageMetadata(publicRoutes[0]);

export default function Home() {
  return (
    <SiteFrame>
      <JsonLd data={createBreadcrumbStructuredData([{ name: "Home", path: "/" }])} />
      <HeroSection />
      <TechnologyEcosystemSection />
      <PositioningSection />
      <TypicalProblemsSection />
      <CapabilitiesSection preview />
      <FaqSection />
      <ContactCta />
    </SiteFrame>
  );
}
