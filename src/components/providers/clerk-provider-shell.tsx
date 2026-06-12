"use client";

import { ClerkProvider } from "@clerk/nextjs";
import type { ReactNode } from "react";

export function ClerkProviderShell({ children }: { children: ReactNode }) {
  const clerkKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;

  if (!clerkKey) {
    return children;
  }

  return (
    <ClerkProvider
      signInFallbackRedirectUrl="/app"
      signInUrl="/sign-in"
      signUpFallbackRedirectUrl="/app"
      signUpUrl="/sign-up"
      appearance={{
        elements: {
          card: "border border-black/10 shadow-xl",
          formButtonPrimary: "bg-[#0B1720] text-white hover:bg-[#111827] hover:text-white",
          footerActionLink: "text-[#0B1720] hover:text-[#1D4ED8]",
          headerSubtitle: "text-[#4B5563]",
          headerTitle: "text-[#0B1720]",
          modalBackdrop: "bg-[#071421]/80 backdrop-blur-sm",
          socialButtonsBlockButton: "border border-black/10 bg-white text-[#0B1720] hover:bg-[#F5F1EA]",
        },
        layout: {
          logoImageUrl: "/brand/mccaigs-logo.svg",
          logoPlacement: "inside",
        },
        variables: {
          borderRadius: "14px",
          colorBackground: "#F6F3EC",
          colorPrimary: "#0B1720",
          colorText: "#0B1720",
          colorTextSecondary: "#4B5563",
          fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
        },
      }}
      publishableKey={clerkKey}
    >
      {children}
    </ClerkProvider>
  );
}
