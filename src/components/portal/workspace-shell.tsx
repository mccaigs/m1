"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { UserButton, useAuth } from "@clerk/nextjs";
import { useConvexAuth, useMutation, useQuery } from "convex/react";
import { Bug, CircleDot, LogIn, RotateCcw } from "lucide-react";
import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { Logo } from "@/components/brand/logo";
import {
  SetupState,
  type StudioEnvironmentStatus,
} from "@/components/portal/setup-state";
import { Button } from "@/components/ui/button";
import {
  clientNavigation,
  ownerNavigation,
  studioNavigation,
} from "@/lib/portal-content";
import { cn } from "@/lib/utils";
import { api } from "../../../convex/_generated/api";

export type StudioRole = "owner" | "admin" | "staff" | "client";
type Viewer = { clerkUserId: string; email: string; role: StudioRole };
type BootstrapPhase =
  | "waiting-auth"
  | "bootstrapping"
  | "verifying-role"
  | "error"
  | "timed-out";

const WorkspaceContext = createContext<{
  configured: boolean;
  role: StudioRole;
  viewer?: Viewer;
}>({ configured: false, role: "client" });

export function useWorkspace() {
  return useContext(WorkspaceContext);
}

export function WorkspaceShell({
  authenticated,
  children,
  environment,
}: {
  authenticated: boolean;
  children: ReactNode;
  environment: StudioEnvironmentStatus;
}) {
  const configured = Object.values(environment).every(Boolean);
  if (!configured || !authenticated) {
    return <UnauthenticatedWorkspace environment={environment} />;
  }
  return <ConnectedWorkspaceShell>{children}</ConnectedWorkspaceShell>;
}

function ConnectedWorkspaceShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const { isLoaded, isSignedIn, userId } = useAuth();
  const { isAuthenticated, isLoading } = useConvexAuth();
  const canUseConvex =
    isLoaded && isSignedIn === true && !isLoading && isAuthenticated;
  const [attempt, setAttempt] = useState(0);
  const [phase, setPhase] = useState<BootstrapPhase>("waiting-auth");
  const [bootstrapError, setBootstrapError] = useState<string>();
  const startedAttemptRef = useRef(-1);
  const runRef = useRef(0);
  const roleLookup = useQuery(
    api.userRoles.current,
    canUseConvex && phase === "verifying-role" ? {} : "skip",
  );
  const ensureViewer = useMutation(api.userRoles.ensureCurrentUser);
  const viewer = roleLookup ?? undefined;
  const roleLookupError =
    phase === "verifying-role" && roleLookup === null
      ? "The workspace role record was not available after user bootstrap."
      : undefined;
  const isWorkspaceReady = phase === "verifying-role" && Boolean(viewer);
  const bootstrapStateRef = useRef({
    canUseConvex,
    isWorkspaceReady,
    phase,
  });

  useEffect(() => {
    bootstrapStateRef.current = { canUseConvex, isWorkspaceReady, phase };
  }, [canUseConvex, isWorkspaceReady, phase]);

  useEffect(() => {
    if (process.env.NODE_ENV !== "development") return;
    console.info("[Studio OS auth] Clerk loaded", { isLoaded, userId });
    console.info("[Studio OS auth] Clerk signed in", { isSignedIn });
    console.info("[Studio OS auth] Convex auth state", {
      isAuthenticated,
      isLoading,
    });
  }, [isAuthenticated, isLoaded, isLoading, isSignedIn, userId]);

  useEffect(() => {
    if (!canUseConvex) return;
    if (startedAttemptRef.current === attempt) return;

    startedAttemptRef.current = attempt;
    const run = ++runRef.current;
    setBootstrapError(undefined);
    setPhase("bootstrapping");

    if (process.env.NODE_ENV === "development") {
      console.info("[Studio OS auth] ensureCurrentUser start", {
        attempt,
        userId,
      });
    }

    void ensureViewer({})
      .then((result) => {
        if (run !== runRef.current) return;
        if (!result.ok) {
          if (process.env.NODE_ENV === "development") {
            console.error("[Studio OS auth] ensureCurrentUser failure", result);
          }
          setBootstrapError(result.error);
          setPhase("error");
          return;
        }

        if (process.env.NODE_ENV === "development") {
          console.info("[Studio OS auth] ensureCurrentUser success", result);
        }
        setPhase("verifying-role");
      })
      .catch((error: unknown) => {
        if (run !== runRef.current) return;
        const message =
          error instanceof Error
            ? error.message
            : "Studio OS could not initialise the current user.";
        console.error("[Studio OS auth] ensureCurrentUser failure", error);
        setBootstrapError(message);
        setPhase("error");
      });
  }, [attempt, canUseConvex, ensureViewer, userId]);

  useEffect(() => {
    if (phase !== "verifying-role" || roleLookup === undefined) return;

    if (process.env.NODE_ENV === "development") {
      console.info("[Studio OS auth] role lookup result", roleLookup);
    }
  }, [phase, roleLookup]);

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      const current = bootstrapStateRef.current;
      if (
        current.isWorkspaceReady ||
        current.phase === "error" ||
        current.phase === "timed-out"
      ) {
        return;
      }

      runRef.current += 1;
      console.error("[Studio OS auth] workspace bootstrap timed out", {
        attempt,
        canUseConvex: current.canUseConvex,
        phase: current.phase,
      });
      setBootstrapError("Unable to verify workspace permissions.");
      setPhase("timed-out");
    }, 5_000);

    return () => window.clearTimeout(timeout);
  }, [attempt]);

  function retryBootstrap() {
    if (process.env.NODE_ENV === "development") {
      console.info("[Studio OS auth] retry requested");
    }
    runRef.current += 1;
    startedAttemptRef.current = -1;
    setBootstrapError(undefined);
    setPhase("waiting-auth");
    setAttempt((value) => value + 1);
  }

  if (pathname === "/app/debug-auth") {
    return (
      <WorkspaceFrame role={viewer?.role ?? "client"} viewer={viewer}>
        {children}
      </WorkspaceFrame>
    );
  }

  if (!isWorkspaceReady || !viewer) {
    return (
      <AuthenticatedLoadingWorkspace
        error={bootstrapError ?? roleLookupError}
        onRetry={retryBootstrap}
        showActions={
          Boolean(roleLookupError) || phase === "error" || phase === "timed-out"
        }
      />
    );
  }

  return (
    <WorkspaceFrame role={viewer.role} viewer={viewer}>
      {children}
    </WorkspaceFrame>
  );
}

function AuthenticatedLoadingWorkspace({
  error,
  onRetry,
  showActions = false,
}: {
  error?: string;
  onRetry?: () => void;
  showActions?: boolean;
}) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b border-white/10 bg-card/45 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-[100rem] items-center justify-between px-5 sm:px-8">
          <Link className="flex items-center gap-3 font-semibold" href="/">
            <Logo size="sm" />
            <span className="h-4 w-px bg-white/20" />
            <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-signal">
              Studio OS
            </span>
          </Link>
          <UserButton />
        </div>
      </header>
      <main className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-3xl items-center px-5 py-12 sm:px-8">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-signal">
            Studio OS / identity
          </p>
          <h1 className="mt-4 text-3xl font-semibold tracking-tight text-signal-soft">
            {error ? "Workspace authentication needs attention." : "Loading your workspace."}
          </h1>
          <p className="mt-3 text-sm text-muted-foreground">
            {error ?? "Confirming your Clerk identity and Studio OS role with Convex."}
          </p>
          {showActions ? (
            <div className="mt-6 flex flex-wrap gap-3">
              <Button onClick={onRetry} type="button">
                <RotateCcw /> Retry
              </Button>
              <Button asChild variant="outline">
                <Link href="/app/debug-auth">
                  <Bug /> Open diagnostics
                </Link>
              </Button>
            </div>
          ) : null}
        </div>
      </main>
    </div>
  );
}

function WorkspaceFrame({
  children,
  role,
  viewer,
}: {
  children: ReactNode;
  role: StudioRole;
  viewer?: Viewer;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const navigation =
    role === "client"
      ? clientNavigation
      : role === "owner"
        ? ownerNavigation
        : studioNavigation;

  useEffect(() => {
    if (role === "client" && pathname === "/app") {
      router.replace("/app/projects");
    }
  }, [pathname, role, router]);

  if (role === "client" && pathname === "/app") {
    return <AuthenticatedLoadingWorkspace />;
  }

  return (
    <WorkspaceContext.Provider value={{ configured: true, role, viewer }}>
      <div className="min-h-screen bg-background text-foreground">
        <header className="border-b border-white/10 bg-card/45 backdrop-blur">
          <div className="mx-auto flex h-16 max-w-[100rem] items-center justify-between px-5 sm:px-8">
            <Link className="flex items-center gap-3 font-semibold" href="/">
              <Logo size="sm" />
              <span className="h-4 w-px bg-white/20" />
              <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-signal">
                Studio OS
              </span>
            </Link>
            <div className="flex items-center gap-3">
              <span className="hidden items-center gap-2 font-mono text-[9px] uppercase tracking-[0.16em] text-muted-foreground sm:flex">
                <CircleDot className="size-3 text-signal" />
                {role} workspace
              </span>
              <UserButton />
            </div>
          </div>
        </header>
        <nav
          className="overflow-x-auto border-b border-white/10 bg-background md:hidden"
          aria-label="Studio OS navigation"
        >
          <div className="flex min-w-max gap-1 px-4 py-3">
            {navigation.map(({ label, href, icon: Icon }) => (
              <Link
                className={cn(
                  "flex items-center gap-2 rounded-md px-3 py-2 text-xs",
                  pathname === href
                    ? "bg-signal/10 text-signal-soft"
                    : "text-muted-foreground hover:bg-white/5 hover:text-foreground",
                )}
                href={href}
                key={`${label}-${href}`}
              >
                <Icon className="size-3.5" /> {label}
              </Link>
            ))}
          </div>
        </nav>
        <div className="mx-auto grid max-w-[100rem] md:grid-cols-[15rem_1fr]">
          <aside className="hidden min-h-[calc(100vh-4rem)] border-r border-white/10 bg-card/15 px-4 py-6 md:block">
            <p className="px-3 font-mono text-[9px] uppercase tracking-[0.18em] text-muted-foreground">
              {role === "client" ? "Client access" : "Operations centre"}
            </p>
            <nav className="mt-4 space-y-1" aria-label="Studio OS navigation">
              {navigation.map(({ label, href, icon: Icon }) => (
                <Link
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm",
                    pathname === href
                      ? "bg-signal/10 text-signal-soft"
                      : "text-muted-foreground hover:bg-white/5 hover:text-foreground",
                  )}
                  href={href}
                  key={`${label}-${href}`}
                >
                  <Icon className="size-4" /> {label}
                </Link>
              ))}
            </nav>
            <div className="mt-12 rounded-lg border border-white/10 bg-background/55 p-3">
              <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-signal">
                System state
              </p>
              <p className="mt-2 text-xs leading-5 text-muted-foreground">
                Clerk identity and Convex operations connected.
              </p>
            </div>
          </aside>
          <main className="min-w-0 p-5 sm:p-8 lg:p-10">
            {children}
          </main>
        </div>
      </div>
    </WorkspaceContext.Provider>
  );
}

function UnauthenticatedWorkspace({
  environment,
}: {
  environment: StudioEnvironmentStatus;
}) {
  const configured = Object.values(environment).every(Boolean);

  return (
    <WorkspaceContext.Provider
      value={{ configured: false, role: "client", viewer: undefined }}
    >
      <div className="min-h-screen bg-background text-foreground">
        <header className="border-b border-white/10 bg-card/45 backdrop-blur">
          <div className="mx-auto flex h-16 max-w-[100rem] items-center justify-between px-5 sm:px-8">
            <Link className="flex items-center gap-3 font-semibold" href="/">
              <Logo size="sm" />
              <span className="h-4 w-px bg-white/20" />
              <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-signal">
                Studio OS
              </span>
            </Link>
            <Button asChild size="sm" variant="outline">
              <Link href="/sign-in">
                <LogIn /> Sign in
              </Link>
            </Button>
          </div>
        </header>
        <main className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-3xl items-center px-5 py-12 sm:px-8">
          <div className="w-full">
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-signal">
              Studio OS / private workspace
            </p>
            <h1 className="mt-4 text-3xl font-semibold tracking-tight text-signal-soft sm:text-4xl">
              Authentication is required.
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground">
              Sign in with an authorised McCaigs account to access studio operations,
              client records, leads, projects, tasks, and activity.
            </p>
            {!configured ? (
              <div className="mt-7">
                <SetupState status={environment} />
              </div>
            ) : null}
          </div>
        </main>
      </div>
    </WorkspaceContext.Provider>
  );
}
