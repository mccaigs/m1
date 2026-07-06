import { AeoMarketingPage } from "@/components/marketing/aeo-page";
import { aeoPageMap } from "@/lib/aeo-content";
import { createPageMetadata } from "@/lib/seo";

const page = aeoPageMap["ai-visibility-case-study"];

export const metadata = createPageMetadata(page);

export default function AiVisibilityCaseStudyPage() {
  return <AeoMarketingPage page={page} />;
}
