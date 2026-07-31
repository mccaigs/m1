import { EdinburghServicePage } from "@/components/marketing/edinburgh-service-page";
import { edinburghPageMap } from "@/lib/edinburgh-service-content";
import { createPageMetadata } from "@/lib/seo";

const page = edinburghPageMap["business-automation-edinburgh"];

export const metadata = createPageMetadata(page);

export default function BusinessAutomationEdinburghPage() {
  return <EdinburghServicePage page={page} />;
}
