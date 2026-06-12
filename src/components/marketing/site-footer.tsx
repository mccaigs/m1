import Link from "next/link";
import { Logo } from "@/components/brand/logo";
import { siteConfig } from "@/lib/seo";

const navigation = [
  ["Studio", "/studio"],
  ["Services", "/services"],
  ["Systems", "/systems"],
  ["Process", "/process"],
  ["Assistant", "/assistant"],
  ["Insights", "/insights"],
  ["Contact", "/contact"],
] as const;

const technologies = ["OpenAI", "Anthropic", "Google AI", "Convex", "Clerk", "Vercel", "Next.js", "TypeScript"] as const;

function XMark() {
  return (
    <svg aria-hidden="true" className="size-3.5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24h-6.657l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231 5.45-6.231Zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77Z" />
    </svg>
  );
}

function LinkedInMark() {
  return (
    <svg aria-hidden="true" className="size-3.5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.34V8.98h3.42v1.57h.05c.47-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.29ZM5.32 7.41a2.07 2.07 0 1 1 0-4.13 2.07 2.07 0 0 1 0 4.13Zm1.78 13.04H3.54V8.98H7.1v11.47Z" />
    </svg>
  );
}

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/8 bg-background">
      <div className="mx-auto max-w-7xl px-5 py-6 text-sm text-muted-foreground sm:px-8 sm:py-7">
        <div className="grid gap-5 border-b border-white/8 pb-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-[1.35fr_0.9fr_1fr_0.65fr]">
          <div>
            <Logo className="text-foreground" size="sm" />
            <p className="mt-2.5 max-w-sm text-xs leading-5">Scotland&apos;s Elite Technical Studio. Practical AI, automation, websites, internal systems, and digital products built properly.</p>
            <p className="mt-2.5 font-mono text-[9px] uppercase tracking-[0.16em] text-signal">Edinburgh, Scotland</p>
          </div>
          <nav aria-label="Footer navigation">
            <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-signal">Navigation</p>
            <div className="mt-2.5 grid grid-cols-2 gap-x-4 gap-y-0.5">
              {navigation.map(([label, href]) => (
                <Link className="inline-flex min-h-7 items-center text-xs transition-colors hover:text-foreground focus-visible:text-foreground" href={href} key={href}>{label}</Link>
              ))}
            </div>
          </nav>
          <div>
            <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-signal">Technologies</p>
            <div className="mt-2.5 flex flex-wrap gap-1.5">
              {technologies.map((technology) => (
                <span className="rounded-full border border-white/10 px-2.5 py-1 font-mono text-[8px] uppercase tracking-[0.12em] text-muted-foreground" key={technology}>{technology}</span>
              ))}
            </div>
          </div>
          <div>
            <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-signal">Company</p>
            <div className="mt-2.5 flex flex-col">
              <Link className="inline-flex min-h-7 items-center text-xs transition-colors hover:text-foreground focus-visible:text-foreground" href="/about">About</Link>
              <Link className="inline-flex min-h-7 items-center text-xs transition-colors hover:text-foreground focus-visible:text-foreground" href="/app">Client portal</Link>
              <a className="inline-flex min-h-7 items-center text-xs transition-colors hover:text-foreground focus-visible:text-foreground" href={siteConfig.linkedIn} rel="noreferrer" target="_blank">LinkedIn</a>
              <a className="inline-flex min-h-7 items-center text-xs transition-colors hover:text-foreground focus-visible:text-foreground" href={siteConfig.twitter} rel="noreferrer" target="_blank">X</a>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-3 pt-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap gap-x-5 gap-y-1.5 font-mono text-[8px] uppercase tracking-[0.14em] text-muted-foreground/80">
            <span>{siteConfig.legalName}</span>
            <span>Edinburgh, Scotland</span>
            <span>&copy; {year} McCaigs</span>
            <span className="normal-case tracking-[0.08em]">McCaigs&reg; is a registered trademark.</span>
          </div>
          <div className="flex shrink-0 gap-2">
              <a aria-label="McCaigs on LinkedIn" className="flex size-9 items-center justify-center rounded-full border border-white/10 transition-colors hover:border-signal/50 hover:text-foreground focus-visible:border-signal/50 focus-visible:text-foreground" href={siteConfig.linkedIn} rel="noreferrer" target="_blank"><LinkedInMark /></a>
              <a aria-label="McCaigs on X" className="flex size-9 items-center justify-center rounded-full border border-white/10 transition-colors hover:border-signal/50 hover:text-foreground focus-visible:border-signal/50 focus-visible:text-foreground" href={siteConfig.twitter} rel="noreferrer" target="_blank"><XMark /></a>
          </div>
        </div>
      </div>
    </footer>
  );
}
