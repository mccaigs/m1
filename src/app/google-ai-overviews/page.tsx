import { AeoMarketingPage } from "@/components/marketing/aeo-page";
import { aeoPageMap } from "@/lib/aeo-content";
import { createPageMetadata } from "@/lib/seo";

const page = aeoPageMap["google-ai-overviews"];

export const metadata = createPageMetadata(page);

export default function GoogleAiOverviewsPage() {
  return <AeoMarketingPage page={page} />;
}
