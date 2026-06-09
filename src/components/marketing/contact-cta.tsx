import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ContactCta() {
  return (
    <section className="border-t border-white/8 bg-deep-blue/20">
      <div className="mx-auto flex max-w-7xl flex-col gap-5 px-5 py-12 sm:gap-7 sm:px-8 sm:py-16 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-signal">Start a conversation</p>
          <h2 className="mt-4 max-w-2xl text-3xl font-semibold tracking-tight sm:text-4xl">Bring us the part that should work better.</h2>
          <p className="mt-4 max-w-xl text-sm leading-6 text-muted-foreground">A useful first conversation can start with a messy workflow, a website that is not pulling its weight, or an AI opportunity that needs a practical route forward.</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Button asChild className="min-h-11 sm:min-h-0" size="lg"><Link href="/start-project">Start a project <ArrowUpRight /></Link></Button>
          <Button asChild className="min-h-11 sm:min-h-0" size="lg" variant="outline"><Link href="/assistant">Ask the Assistant</Link></Button>
        </div>
      </div>
    </section>
  );
}
