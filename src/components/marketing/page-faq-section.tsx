import { JsonLd } from "@/components/seo/json-ld";
import { createFaqStructuredData } from "@/lib/seo";

export type PageFaqItem = {
  answer: string;
  question: string;
};

export function PageFaqSection({
  eyebrow = "Questions",
  items,
  title = "Useful answers before the first conversation.",
}: {
  eyebrow?: string;
  items: PageFaqItem[];
  title?: string;
}) {
  return (
    <section className="border-y border-ink/10 bg-off-white text-ink">
      <JsonLd data={createFaqStructuredData(items)} />
      <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8 sm:py-18">
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-deep-blue/65">{eyebrow}</p>
        <h2 className="mt-4 max-w-3xl text-3xl font-semibold tracking-tight sm:text-4xl">{title}</h2>
        <div className="mt-8 grid gap-x-10 md:grid-cols-3">
          {items.map(({ answer, question }) => (
            <article className="border-t border-ink/12 py-5" key={question}>
              <h3 className="font-semibold">{question}</h3>
              <p className="mt-2 text-sm leading-6 text-ink/65">{answer}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
