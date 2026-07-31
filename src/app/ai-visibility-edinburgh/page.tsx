import { EdinburghServicePage } from "@/components/marketing/edinburgh-service-page";
import { edinburghPageMap } from "@/lib/edinburgh-service-content";
import { createPageMetadata } from "@/lib/seo";

const page = edinburghPageMap["ai-visibility-edinburgh"];

export const metadata = createPageMetadata(page);

export default function AiVisibilityEdinburghPage() {
  return <EdinburghServicePage page={page} />;
}
