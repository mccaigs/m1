import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { JsonLd } from "@/components/seo/json-ld";
import { faqStructuredData, frequentlyAskedQuestions } from "@/lib/seo";

export function FaqSection() {
  return (
    <section className="border-y border-ink/10 bg-off-white text-ink">
      <JsonLd data={faqStructuredData} />
      <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8 sm:py-24">
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-deep-blue/65">Frequently asked questions</p>
        <h2 className="mt-4 max-w-3xl text-3xl font-semibold tracking-tight sm:mt-5 sm:text-4xl">Clear answers before the first conversation.</h2>
        <p className="mt-4 max-w-2xl text-base leading-7 text-ink/65 sm:mt-5">A concise guide to the studio, the work, and the practical route into a project.</p>
        <div className="mt-7 grid gap-x-10 sm:mt-10 md:grid-cols-2">
          {frequentlyAskedQuestions.map(({ answer, question }) => (
            <article className="border-t border-ink/12 py-4 sm:py-5" key={question}>
              <h3 className="font-semibold">{question}</h3>
              <p className="mt-2 text-sm leading-6 text-ink/65">{answer}</p>
            </article>
          ))}
        </div>
        <Link className="mt-6 inline-flex min-h-11 items-center gap-2 font-mono text-[9px] uppercase tracking-[0.18em] text-deep-blue hover:text-signal sm:min-h-0" href="/assistant">
          Ask the deterministic Assistant <ArrowUpRight className="size-3" />
        </Link>
      </div>
    </section>
  );
}
