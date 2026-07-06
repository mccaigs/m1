import { AeoMarketingPage } from "@/components/marketing/aeo-page";
import { aeoPageMap } from "@/lib/aeo-content";
import { createPageMetadata } from "@/lib/seo";

const page = aeoPageMap["answer-engine-optimisation-uk"];

export const metadata = createPageMetadata(page);

export default function AnswerEngineOptimisationUkPage() {
  return <AeoMarketingPage page={page} />;
}
