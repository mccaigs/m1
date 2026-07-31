import { EdinburghServicePage } from "@/components/marketing/edinburgh-service-page";
import { edinburghPageMap } from "@/lib/edinburgh-service-content";
import { createPageMetadata } from "@/lib/seo";

const page = edinburghPageMap["ai-systems-edinburgh"];

export const metadata = createPageMetadata(page);

export default function AiSystemsEdinburghPage() {
  return <EdinburghServicePage page={page} />;
}
