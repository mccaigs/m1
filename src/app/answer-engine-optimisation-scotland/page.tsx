import { AeoMarketingPage } from "@/components/marketing/aeo-page";
import { aeoPageMap } from "@/lib/aeo-content";
import { createPageMetadata } from "@/lib/seo";

const page = aeoPageMap["answer-engine-optimisation-scotland"];

export const metadata = createPageMetadata(page);

export default function AnswerEngineOptimisationScotlandPage() {
  return <AeoMarketingPage page={page} />;
}
