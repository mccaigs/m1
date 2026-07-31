import { EdinburghServicePage } from "@/components/marketing/edinburgh-service-page";
import { edinburghPageMap } from "@/lib/edinburgh-service-content";
import { createPageMetadata } from "@/lib/seo";

const page = edinburghPageMap["custom-software-edinburgh"];

export const metadata = createPageMetadata(page);

export default function CustomSoftwareEdinburghPage() {
  return <EdinburghServicePage page={page} />;
}
