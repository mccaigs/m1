import Link from "next/link";
import { Logo } from "@/components/brand/logo";

export function SiteFooter() {
  return (
    <footer className="border-t border-white/8 bg-background">
      <div className="mx-auto flex max-w-7xl flex-col gap-7 px-5 py-8 text-sm text-muted-foreground sm:px-8 md:flex-row md:items-end md:justify-between">
        <div>
          <Logo className="text-foreground" size="sm" />
          <p className="mt-2 max-w-sm text-xs leading-5">Scotland&apos;s Elite Technical Studio. Practical AI, automation, websites, internal systems, and digital products built properly.</p>
        </div>
        <div className="flex flex-wrap gap-5 text-xs">
          <Link href="/studio">Studio</Link>
          <Link href="/systems">Systems</Link>
          <Link href="/services">Services</Link>
          <Link href="/assistant">Assistant</Link>
          <Link href="/insights">Insights</Link>
          <Link href="/process">Process</Link>
          <Link href="/contact">Contact</Link>
          <Link href="/app">Client portal</Link>
          <span>Edinburgh, Scotland</span>
        </div>
      </div>
    </footer>
  );
}
