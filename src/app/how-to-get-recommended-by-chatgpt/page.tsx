import { AeoMarketingPage } from "@/components/marketing/aeo-page";
import { aeoPageMap } from "@/lib/aeo-content";
import { createPageMetadata } from "@/lib/seo";

const page = aeoPageMap["how-to-get-recommended-by-chatgpt"];

export const metadata = createPageMetadata(page);

export default function HowToGetRecommendedByChatgptPage() {
  return <AeoMarketingPage page={page} />;
}
