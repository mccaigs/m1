import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { SignIn } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  robots: {
    follow: false,
    index: false,
  },
};

export default async function SignInPage() {
  if (!process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY) {
    return <AuthSetupMessage />;
  }

  const { userId } = await auth();
  if (userId) redirect("/app");

  return (
    <main className="min-h-screen bg-[#f6f3ec] px-5 py-8 text-deep-blue">
      <div className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-6xl flex-col justify-center gap-8">
        <Link aria-label="McCaigs home" className="w-fit" href="/">
          <Image alt="McCaigs" className="h-10 w-auto" height={90} priority src="/brand/mccaigs-logo.svg" width={434} />
        </Link>
        <div className="grid items-center gap-8 lg:grid-cols-[0.8fr_1fr]">
          <div className="max-w-md">
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-signal">Client portal</p>
            <h1 className="mt-4 text-4xl font-semibold tracking-tight">Sign in to the studio workspace.</h1>
            <p className="mt-4 text-sm leading-6 text-ink/65">
              A private operating view for active projects, systems, tasks, and useful delivery records.
            </p>
          </div>
          <div className="flex justify-center lg:justify-end">
            <SignIn forceRedirectUrl="/app" signUpUrl="/sign-up" />
          </div>
        </div>
      </div>
    </main>
  );
}

function AuthSetupMessage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#f6f3ec] p-6 text-center text-deep-blue">
      <div className="max-w-md rounded-2xl border border-deep-blue/10 bg-white/70 p-7 shadow-xl">
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-signal">Client portal setup</p>
        <h1 className="mt-4 text-2xl font-semibold">Authentication is ready to connect.</h1>
        <p className="mt-3 text-sm leading-6 text-ink/65">Add the Clerk environment variables to enable sign-in for the protected studio application.</p>
      </div>
    </main>
  );
}
