"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { SignInButton, UserButton, useAuth } from "@clerk/nextjs";
import { ArrowUpRight, Menu } from "lucide-react";
import { Logo } from "@/components/brand/logo";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { navigation } from "@/lib/studio-content";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const pathname = usePathname();
  const clerkConfigured = Boolean(process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY);

  return (
    <header className="relative z-30 border-b border-white/8 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-5 sm:px-8">
        <Link aria-label="McCaigs home" href="/">
          <Logo priority />
        </Link>
        <nav className="hidden items-center gap-4 lg:flex xl:gap-6" aria-label="Primary navigation">
          {navigation.map((item) => (
            <Link className={cn("text-sm text-muted-foreground transition-colors hover:text-foreground", pathname === item.href && "text-signal-soft")} href={item.href} key={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="hidden items-center gap-4 lg:flex">
          {clerkConfigured ? <HeaderAuthActions /> : <FallbackAuthLinks />}
          <Button asChild size="sm">
            <Link href="/start-project">Start a project <ArrowUpRight /></Link>
          </Button>
        </div>
        <Sheet>
          <SheetTrigger asChild>
            <Button aria-label="Open navigation" className="lg:hidden" size="icon" variant="outline">
              <Menu />
            </Button>
          </SheetTrigger>
          <SheetContent className="h-[100dvh] max-h-[100dvh] w-[min(88vw,22rem)] gap-0 overflow-hidden border-white/10 bg-background p-0 text-foreground" side="right">
            <SheetHeader className="shrink-0 border-b border-white/10 px-5 py-4 pr-12">
              <SheetTitle className="text-left text-foreground"><Logo /></SheetTitle>
              <SheetDescription className="sr-only">Navigate the McCaigs technical studio website.</SheetDescription>
            </SheetHeader>
            <div className="flex min-h-0 flex-1 flex-col overflow-y-auto overscroll-contain px-5 pb-5">
              <nav className="flex flex-col py-3" aria-label="Mobile navigation">
                {navigation.map((item) => (
                  <SheetClose asChild key={item.href}>
                    <Link className={cn("flex min-h-11 items-center border-b border-white/8 py-2 text-base text-muted-foreground hover:text-foreground focus-visible:text-foreground", pathname === item.href && "text-signal-soft")} href={item.href}>{item.label}</Link>
                  </SheetClose>
                ))}
              </nav>
              <div className="mt-2 border-t border-white/10 pt-4">
                <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-muted-foreground">Existing customers</p>
                {clerkConfigured ? <MobileAuthActions /> : (
                  <SheetClose asChild>
                    <Link className="mt-2 flex min-h-11 items-center text-sm text-muted-foreground hover:text-foreground focus-visible:text-foreground" href="/app">Client portal</Link>
                  </SheetClose>
                )}
              </div>
              <SheetClose asChild>
                <Button asChild className="mt-4 min-h-11 w-full">
                  <Link href="/start-project">Start a project <ArrowUpRight /></Link>
                </Button>
              </SheetClose>
              <p className="mt-auto pt-5 font-mono text-[9px] uppercase leading-5 tracking-[0.18em] text-muted-foreground">
                Built in Scotland / Senior technical delivery
              </p>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}

function HeaderAuthActions() {
  const { isLoaded, isSignedIn } = useAuth();

  if (!isLoaded) return null;

  if (isLoaded && isSignedIn) {
    return (
      <div className="flex items-center gap-3 border-l border-white/10 pl-4">
        <Link className="text-xs text-signal-soft transition-colors hover:text-foreground" href="/app">
          Studio OS
        </Link>
        <UserButton />
      </div>
    );
  }

  return (
    <div className="flex items-center gap-3 border-l border-white/10 pl-4">
      <SignInButton mode="modal">
        <button className="text-xs text-muted-foreground transition-colors hover:text-foreground" type="button">
          Sign in
        </button>
      </SignInButton>
    </div>
  );
}

function MobileAuthActions() {
  const { isLoaded, isSignedIn } = useAuth();

  if (!isLoaded) return null;

  if (isLoaded && isSignedIn) {
    return (
      <div className="mt-2 grid gap-1">
        <SheetClose asChild>
          <Link className="flex min-h-11 items-center text-sm text-signal-soft hover:text-foreground" href="/app">
            Studio OS
          </Link>
        </SheetClose>
        <UserButton />
      </div>
    );
  }

  return (
    <div className="mt-2 grid gap-1">
      <SignInButton mode="modal">
        <button className="flex min-h-11 items-center text-left text-sm text-muted-foreground hover:text-foreground focus-visible:text-foreground" type="button">
          Sign in
        </button>
      </SignInButton>
    </div>
  );
}

function FallbackAuthLinks() {
  return (
    <Link className="border-l border-white/10 pl-4 text-xs text-muted-foreground transition-colors hover:text-foreground" href="/app">
      Client portal
    </Link>
  );
}
