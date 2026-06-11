import type { Metadata } from "next";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import type { StudioEnvironmentStatus } from "@/components/portal/setup-state";
import { WorkspaceShell } from "@/components/portal/workspace-shell";

export const metadata: Metadata = {
  robots: {
    follow: false,
    index: false,
  },
};

export default async function PortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const environment: StudioEnvironmentStatus = {
    clerkPublishableKey: Boolean(
      process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
    ),
    clerkSecretKey: Boolean(process.env.CLERK_SECRET_KEY),
    convexUrl: Boolean(process.env.NEXT_PUBLIC_CONVEX_URL),
  };
  const clerkConfigured =
    environment.clerkPublishableKey && environment.clerkSecretKey;
  let authenticated = false;

  if (clerkConfigured) {
    const { userId } = await auth();
    if (!userId) redirect("/sign-in");
    authenticated = true;
  }

  return (
    <WorkspaceShell authenticated={authenticated} environment={environment}>
      {children}
    </WorkspaceShell>
  );
}
