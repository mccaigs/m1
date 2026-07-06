import { AeoMarketingPage } from "@/components/marketing/aeo-page";
import { aeoPageMap } from "@/lib/aeo-content";
import { createPageMetadata } from "@/lib/seo";

const page = aeoPageMap["chatgpt-seo"];

export const metadata = createPageMetadata(page);

export default function ChatgptSeoPage() {
  return <AeoMarketingPage page={page} />;
}
