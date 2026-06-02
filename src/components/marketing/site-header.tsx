"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
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
          <Link className="border-l border-white/10 pl-4 text-xs text-muted-foreground transition-colors hover:text-foreground" href="/app">
            Client portal
          </Link>
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
          <SheetContent className="border-white/10 bg-background px-6 text-foreground" side="right">
            <SheetHeader className="border-b border-white/10 px-0 py-5">
              <SheetTitle className="text-left text-foreground"><Logo /></SheetTitle>
              <SheetDescription className="sr-only">Navigate the McCaigs technical studio website.</SheetDescription>
            </SheetHeader>
            <nav className="flex flex-col gap-1 py-6" aria-label="Mobile navigation">
              {navigation.map((item) => (
                <SheetClose asChild key={item.href}>
                  <Link className={cn("border-b border-white/8 py-4 text-lg", pathname === item.href && "text-signal-soft")} href={item.href}>{item.label}</Link>
                </SheetClose>
              ))}
            </nav>
            <div className="border-t border-white/10 pt-5">
              <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-muted-foreground">Existing customers</p>
              <SheetClose asChild>
                <Link className="mt-3 block text-sm text-muted-foreground hover:text-foreground" href="/app">Client portal</Link>
              </SheetClose>
            </div>
            <SheetClose asChild>
              <Button asChild className="w-full">
                <Link href="/start-project">Start a project <ArrowUpRight /></Link>
              </Button>
            </SheetClose>
            <p className="mt-auto py-6 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
              Built in Scotland / Senior technical delivery
            </p>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
