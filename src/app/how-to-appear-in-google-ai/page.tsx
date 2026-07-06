import { AeoMarketingPage } from "@/components/marketing/aeo-page";
import { aeoPageMap } from "@/lib/aeo-content";
import { createPageMetadata } from "@/lib/seo";

const page = aeoPageMap["how-to-appear-in-google-ai"];

export const metadata = createPageMetadata(page);

export default function HowToAppearInGoogleAiPage() {
  return <AeoMarketingPage page={page} />;
}
