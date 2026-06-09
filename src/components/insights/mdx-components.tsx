import type { ComponentProps, ReactNode } from "react";
import Link from "next/link";
import type { MDXComponents } from "mdx/types";

function MdxLink({ href = "", ...props }: ComponentProps<"a">) {
  const className = "font-medium text-deep-blue underline decoration-signal/45 underline-offset-4 transition-colors hover:text-signal";

  if (href.startsWith("/")) {
    return <Link className={className} href={href} {...props} />;
  }

  return <a className={className} href={href} rel="noreferrer" target="_blank" {...props} />;
}

export function Callout({ children, title = "Practical point" }: { children: ReactNode; title?: string }) {
  return (
    <aside className="my-8 rounded-xl border border-deep-blue/15 bg-white/65 p-5 shadow-sm sm:p-6">
      <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-deep-blue/65">{title}</p>
      <div className="mt-3 text-sm leading-7 text-ink/75">{children}</div>
    </aside>
  );
}

export function StudioNote({ children, label = "From the studio" }: { children: ReactNode; label?: string }) {
  return (
    <aside className="my-8 border-l-2 border-signal bg-deep-blue px-5 py-5 text-off-white sm:px-6">
      <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-signal">{label}</p>
      <div className="mt-3 text-sm leading-7 text-signal-soft [&_a]:text-off-white [&_a]:decoration-signal/60 [&_p]:my-0 [&_p]:text-signal-soft">{children}</div>
    </aside>
  );
}

export function BuildMetric({ label, note, value }: { label: string; note?: string; value: string }) {
  return (
    <div className="my-6 rounded-lg border border-deep-blue/15 bg-white/55 p-5">
      <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-deep-blue/60">{label}</p>
      <p className="mt-2 text-3xl font-semibold tracking-tight text-deep-blue">{value}</p>
      {note ? <p className="mt-2 text-sm leading-6 text-ink/60">{note}</p> : null}
    </div>
  );
}

export function QuoteBlock({ children }: { children: ReactNode }) {
  return <blockquote className="my-8 border-y border-deep-blue/15 py-6 text-xl font-semibold leading-8 tracking-tight text-deep-blue sm:text-2xl [&_p]:my-0 [&_p]:text-xl [&_p]:font-semibold [&_p]:leading-8 [&_p]:text-deep-blue sm:[&_p]:text-2xl">{children}</blockquote>;
}

export function SectionDivider() {
  return <div aria-hidden="true" className="my-10 flex items-center gap-3"><span className="size-1.5 rounded-full bg-signal" /><span className="h-px flex-1 bg-deep-blue/15" /></div>;
}

export const mdxComponents: MDXComponents = {
  BuildMetric,
  Callout,
  QuoteBlock,
  SectionDivider,
  StudioNote,
  a: MdxLink,
  h1: ({ children }) => <h2 className="mb-3 mt-10 text-3xl font-semibold tracking-tight text-deep-blue sm:text-4xl">{children}</h2>,
  h2: ({ children }) => <h2 className="mb-3 mt-10 text-3xl font-semibold tracking-tight text-deep-blue sm:text-4xl">{children}</h2>,
  h3: ({ children }) => <h3 className="mb-2 mt-7 text-xl font-semibold tracking-tight text-deep-blue sm:text-2xl">{children}</h3>,
  li: ({ children }) => <li className="pl-1">{children}</li>,
  ol: ({ children }) => <ol className="my-4 list-decimal space-y-1 pl-5 text-base leading-7 text-ink/75">{children}</ol>,
  p: ({ children }) => <p className="my-4 text-base leading-7 text-ink/75">{children}</p>,
  strong: ({ children }) => <strong className="font-semibold text-deep-blue">{children}</strong>,
  ul: ({ children }) => <ul className="my-4 list-disc space-y-1 pl-5 text-base leading-7 text-ink/75 marker:text-signal">{children}</ul>,
};
