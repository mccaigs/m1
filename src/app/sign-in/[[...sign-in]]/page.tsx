import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  if (!process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY) {
    return <AuthSetupMessage />;
  }

  return <main className="flex min-h-screen items-center justify-center bg-background p-6"><SignIn /></main>;
}

function AuthSetupMessage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-background p-6 text-center">
      <div className="max-w-md rounded-2xl border border-white/10 bg-card p-7">
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-signal">Client portal setup</p>
        <h1 className="mt-4 text-2xl font-semibold">Authentication is ready to connect.</h1>
        <p className="mt-3 text-sm leading-6 text-muted-foreground">Add the Clerk environment variables to enable sign-in for the protected studio application.</p>
      </div>
    </main>
  );
}
