import type { ReactNode } from "react";
import { ClerkProviderShell } from "@/components/providers/clerk-provider-shell";

export default function SignInLayout({ children }: { children: ReactNode }) {
  return <ClerkProviderShell>{children}</ClerkProviderShell>;
}
