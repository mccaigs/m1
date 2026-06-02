import { CircleDot } from "lucide-react";

export function PageHero({
  copy,
  eyebrow,
  title,
}: {
  copy: string;
  eyebrow: string;
  title: string;
}) {
  return (
    <section className="relative border-b border-white/8">
      <div className="hero-glow absolute -top-36 right-0 -z-10 h-[32rem] w-[32rem] opacity-60" />
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-24">
        <p className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.22em] text-signal">
          <CircleDot className="size-3" /> {eyebrow}
        </p>
        <h1 className="mt-6 max-w-4xl text-5xl font-semibold leading-[0.96] tracking-[-0.06em] sm:text-7xl">
          {title}
        </h1>
        <p className="mt-7 max-w-2xl text-lg leading-8 text-muted-foreground">{copy}</p>
      </div>
    </section>
  );
}
