import { AeoMarketingPage } from "@/components/marketing/aeo-page";
import { aeoPageMap } from "@/lib/aeo-content";
import { createPageMetadata } from "@/lib/seo";

const page = aeoPageMap["llms-txt"];

export const metadata = createPageMetadata(page);

export default function LlmsTxtPage() {
  return <AeoMarketingPage page={page} />;
}
