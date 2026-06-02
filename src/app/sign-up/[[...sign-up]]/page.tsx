import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  if (!process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-background p-6 text-center">
        <p className="max-w-md text-sm leading-6 text-muted-foreground">Add the Clerk environment variables to enable client portal registration.</p>
      </main>
    );
  }

  return <main className="flex min-h-screen items-center justify-center bg-background p-6"><SignUp /></main>;
}
