"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useEffect, useState } from "react";

const ClerkHeaderAuth = dynamic(
  () =>
    import("@/components/marketing/clerk-header-auth").then(
      (module) => module.ClerkHeaderAuth,
    ),
  { ssr: false },
);

export function DeferredHeaderAuth({
  variant,
}: {
  variant: "desktop" | "mobile";
}) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const timeout = window.setTimeout(() => setReady(true), 30_000);
    return () => window.clearTimeout(timeout);
  }, []);

  return (
    <div
      onFocusCapture={() => setReady(true)}
      onPointerEnter={() => setReady(true)}
    >
      {ready ? (
        <ClerkHeaderAuth variant={variant} />
      ) : variant === "desktop" ? (
        <Link
          className="border-l border-white/10 pl-4 text-xs text-muted-foreground transition-colors hover:text-foreground"
          href="/sign-in"
        >
          Sign in
        </Link>
      ) : (
        <Link
          className="mt-2 flex min-h-11 items-center text-sm text-muted-foreground hover:text-foreground focus-visible:text-foreground"
          href="/sign-in"
        >
          Sign in
        </Link>
      )}
    </div>
  );
}
