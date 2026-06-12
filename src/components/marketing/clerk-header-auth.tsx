"use client";

import { SignInButton, UserButton, useAuth } from "@clerk/nextjs";
import Link from "next/link";
import { ClerkProviderShell } from "@/components/providers/clerk-provider-shell";

export function ClerkHeaderAuth({
  variant,
}: {
  variant: "desktop" | "mobile";
}) {
  return (
    <ClerkProviderShell>
      <ClerkHeaderAuthContent variant={variant} />
    </ClerkProviderShell>
  );
}

function ClerkHeaderAuthContent({
  variant,
}: {
  variant: "desktop" | "mobile";
}) {
  const { isLoaded, isSignedIn } = useAuth();

  if (!isLoaded) return null;

  if (variant === "mobile") {
    return isSignedIn ? (
      <div className="mt-2 grid gap-1">
        <Link className="flex min-h-11 items-center text-sm text-signal-soft hover:text-foreground" href="/app">
          Studio OS
        </Link>
        <UserButton />
      </div>
    ) : (
      <div className="mt-2 grid gap-1">
        <SignInButton mode="modal">
          <button className="flex min-h-11 items-center text-left text-sm text-muted-foreground hover:text-foreground focus-visible:text-foreground" type="button">
            Sign in
          </button>
        </SignInButton>
      </div>
    );
  }

  return isSignedIn ? (
    <div className="flex items-center gap-3 border-l border-white/10 pl-4">
      <Link className="text-xs text-signal-soft transition-colors hover:text-foreground" href="/app">
        Studio OS
      </Link>
      <UserButton />
    </div>
  ) : (
    <div className="flex items-center gap-3 border-l border-white/10 pl-4">
      <SignInButton mode="modal">
        <button className="text-xs text-muted-foreground transition-colors hover:text-foreground" type="button">
          Sign in
        </button>
      </SignInButton>
    </div>
  );
}
