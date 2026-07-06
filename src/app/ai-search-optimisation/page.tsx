import { AeoMarketingPage } from "@/components/marketing/aeo-page";
import { aeoPageMap } from "@/lib/aeo-content";
import { createPageMetadata } from "@/lib/seo";

const page = aeoPageMap["ai-search-optimisation"];

export const metadata = createPageMetadata(page);

export default function AiSearchOptimisationPage() {
  return <AeoMarketingPage page={page} />;
}
