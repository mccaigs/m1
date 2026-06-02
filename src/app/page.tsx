import { ContactCta } from "@/components/marketing/contact-cta";
import { SiteFrame } from "@/components/marketing/site-frame";
import {
  CapabilitiesSection,
  HeroSection,
  PositioningSection,
  TechnologyEcosystemSection,
  TypicalProblemsSection,
} from "@/components/marketing/studio-sections";

export default function Home() {
  return (
    <SiteFrame>
      <HeroSection />
      <TechnologyEcosystemSection />
      <PositioningSection />
      <TypicalProblemsSection />
      <CapabilitiesSection preview />
      <ContactCta />
    </SiteFrame>
  );
}
