import Link from "next/link";
import { UserButton } from "@clerk/nextjs";
import { CircleDot } from "lucide-react";
import { Logo } from "@/components/brand/logo";
import { portalNavigation } from "@/lib/portal-content";

export default function PortalLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b border-white/10 bg-card/45 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-[90rem] items-center justify-between px-5 sm:px-8">
          <Link className="flex items-center gap-3 font-semibold" href="/">
            <Logo size="sm" />
            <span className="h-4 w-px bg-white/20" />
            <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-signal">Studio OS</span>
          </Link>
          <div className="flex items-center gap-3">
            <span className="hidden items-center gap-2 font-mono text-[9px] uppercase tracking-[0.16em] text-muted-foreground sm:flex">
              <CircleDot className="size-3 text-signal" /> Preview workspace
            </span>
            {process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY ? <UserButton /> : null}
          </div>
        </div>
      </header>
      <nav className="overflow-x-auto border-b border-white/10 bg-background md:hidden" aria-label="Studio OS navigation">
        <div className="flex min-w-max gap-1 px-4 py-3">
          {portalNavigation.map(({ label, href, icon: Icon }) => (
            <Link className="flex items-center gap-2 rounded-md px-3 py-2 text-xs text-muted-foreground hover:bg-white/5 hover:text-foreground" href={href} key={href}>
              <Icon className="size-3.5" /> {label}
            </Link>
          ))}
        </div>
      </nav>
      <div className="mx-auto grid max-w-[90rem] md:grid-cols-[15rem_1fr]">
        <aside className="hidden min-h-[calc(100vh-4rem)] border-r border-white/10 bg-card/15 px-4 py-6 md:block">
          <p className="px-3 font-mono text-[9px] uppercase tracking-[0.18em] text-muted-foreground">Workspace</p>
          <nav className="mt-4 space-y-1" aria-label="Studio OS navigation">
            {portalNavigation.map(({ label, href, icon: Icon }) => (
              <Link className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-muted-foreground hover:bg-white/5 hover:text-foreground" href={href} key={href}>
                <Icon className="size-4" /> {label}
              </Link>
            ))}
          </nav>
          <div className="mt-12 rounded-lg border border-white/10 bg-background/55 p-3">
            <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-signal">System state</p>
            <p className="mt-2 text-xs leading-5 text-muted-foreground">Foundation ready. Connect services to activate live workspace data.</p>
          </div>
        </aside>
        <main className="p-5 sm:p-8 lg:p-10">{children}</main>
      </div>
    </div>
  );
}
