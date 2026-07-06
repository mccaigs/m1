import { AeoMarketingPage } from "@/components/marketing/aeo-page";
import { aeoPageMap } from "@/lib/aeo-content";
import { createPageMetadata } from "@/lib/seo";

const page = aeoPageMap["ai-ready-websites"];

export const metadata = createPageMetadata(page);

export default function AiReadyWebsitesPage() {
  return <AeoMarketingPage page={page} />;
}
