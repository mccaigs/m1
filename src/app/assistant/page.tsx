import { CircleDot } from "lucide-react";
import { AssistantConsultation } from "@/components/marketing/assistant-consultation";
import { PageFaqSection } from "@/components/marketing/page-faq-section";
import { SiteFrame } from "@/components/marketing/site-frame";
import { JsonLd } from "@/components/seo/json-ld";
import { createBreadcrumbStructuredData, createPageMetadata, publicRoutes } from "@/lib/seo";

export const metadata = createPageMetadata(publicRoutes[5]);

const assistantFaqs = [
  {
    question: "What is the McCaigs Assistant?",
    answer: "The McCaigs Assistant is a deterministic studio assistant that helps visitors understand services, fit, budgets, timelines, and practical next steps.",
  },
  {
    question: "Does it answer from approved knowledge?",
    answer: "Yes. It answers from approved McCaigs knowledge rather than behaving like a general-purpose chatbot.",
  },
  {
    question: "What happens when it does not know the answer?",
    answer: "If it does not have an approved answer, it says so and suggests the closest useful route, such as Services, Process, Insights, or Start a Project.",
  },
] as const;

export default async function AssistantPage({ searchParams }: PageProps<"/assistant">) {
  const { question } = await searchParams;
  const initialQuestion = typeof question === "string" ? question : "";

  return (
    <SiteFrame>
      <JsonLd data={createBreadcrumbStructuredData([{ name: "Home", path: "/" }, { name: "Assistant", path: "/assistant" }])} />
      <section className="border-b border-white/8 bg-deep-blue/16">
        <div className="mx-auto max-w-7xl px-5 py-10 sm:px-8 sm:py-14">
          <p className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-signal">
            <CircleDot className="size-3" /> Assistant / approved studio knowledge
          </p>
          <h1 className="mt-5 max-w-3xl text-4xl font-semibold tracking-tight sm:text-5xl">Deterministic Studio Assistant</h1>
          <p className="mt-5 max-w-3xl text-base leading-7 text-muted-foreground sm:text-lg">
            Ask about McCaigs, practical AI, automation, websites, internal systems, project fit, timelines, and how we work.
          </p>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-signal-soft">
            This assistant answers from approved McCaigs knowledge only. If it does not know, it says so.
          </p>
        </div>
      </section>
      <section className="border-b border-ink/10 bg-[#f6f3ec]">
        <div className="mx-auto max-w-6xl px-5 py-10 sm:px-8 sm:py-14">
          <AssistantConsultation initialQuestion={initialQuestion} />
        </div>
      </section>
      <PageFaqSection eyebrow="Assistant FAQ" items={[...assistantFaqs]} />
    </SiteFrame>
  );
}
