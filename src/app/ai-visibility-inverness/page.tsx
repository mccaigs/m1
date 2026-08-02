import { CommercialServicePage } from "@/components/marketing/edinburgh-service-page";
import { scotlandPageMap } from "@/lib/scotland-service-content";
import { createPageMetadata } from "@/lib/seo";

const page = scotlandPageMap["ai-visibility-inverness"];
export const metadata = createPageMetadata(page);
export default function Page() { return <CommercialServicePage page={page} />; }
