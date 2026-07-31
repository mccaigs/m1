import { EdinburghServicePage } from "@/components/marketing/edinburgh-service-page";
import { edinburghPageMap } from "@/lib/edinburgh-service-content";
import { createPageMetadata } from "@/lib/seo";

const page = edinburghPageMap["seo-vs-aeo-vs-ai-visibility"];

export const metadata = createPageMetadata(page);

export default function SeoVsAeoVsAiVisibilityPage() {
  return <EdinburghServicePage page={page} />;
}
