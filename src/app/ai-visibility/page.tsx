import { AeoMarketingPage } from "@/components/marketing/aeo-page";
import { aeoPageMap } from "@/lib/aeo-content";
import { createPageMetadata } from "@/lib/seo";

const page = aeoPageMap["ai-visibility"];

export const metadata = createPageMetadata(page);

export default function AiVisibilityPage() {
  return <AeoMarketingPage page={page} />;
}
