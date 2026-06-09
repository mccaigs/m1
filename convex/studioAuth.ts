import type { UserIdentity } from "convex/server";
import type { MutationCtx, QueryCtx } from "./_generated/server";

export const OWNER_EMAIL = "mccaigsgroup@gmail.com";

export type StudioRole = "owner" | "admin" | "staff" | "client";
type StudioCtx = QueryCtx | MutationCtx;

export function isOwner(role: StudioRole) {
  return role === "owner";
}

export function isAdmin(role: StudioRole) {
  return role === "owner" || role === "admin";
}

export function isStaff(role: StudioRole) {
  return role === "owner" || role === "admin" || role === "staff";
}

export function isClient(role: StudioRole) {
  return role === "client";
}

export async function getStudioViewer(ctx: StudioCtx) {
  const identity = await ctx.auth.getUserIdentity();
  if (!identity) {
    console.error("studio_auth_identity_missing", {
      function: "getStudioViewer",
    });
    throw new Error("Authenticated Clerk user was not available to Convex.");
  }

  return getStudioViewerFromIdentity(ctx, identity);
}

export async function getStudioViewerFromIdentity(
  ctx: StudioCtx,
  identity: UserIdentity,
) {
  const clerkUserId = identity.subject;
  const isPrimaryOwner =
    clerkUserId === process.env.OWNER_CLERK_USER_ID ||
    String(identity.email ?? "").trim().toLowerCase() === OWNER_EMAIL;
  const email = isPrimaryOwner
    ? OWNER_EMAIL
    : String(identity.email ?? "").trim().toLowerCase();
  if (!email) {
    console.warn("studio_auth_email_claim_missing", {
      clerkUserId,
      hint: 'Add "email": "{{user.primary_email_address}}" to the Clerk Convex JWT template.',
    });
  }
  const roleRecord = await ctx.db
    .query("userRoles")
    .withIndex("by_clerk_user_id", (q) => q.eq("clerkUserId", clerkUserId))
    .unique();
  const role: StudioRole =
    isPrimaryOwner ? "owner" : roleRecord?.role ?? "client";

  return { clerkUserId, email, isPrimaryOwner, role, roleRecord };
}

export async function requireStudioStaff(ctx: StudioCtx) {
  const viewer = await getStudioViewer(ctx);
  if (!isStaff(viewer.role)) {
    throw new Error("Studio team access required.");
  }
  return viewer;
}

export async function requireStudioAdmin(ctx: StudioCtx) {
  const viewer = await getStudioViewer(ctx);
  if (!isAdmin(viewer.role)) {
    throw new Error("Administrator access required.");
  }
  return viewer;
}

export async function requireOwner(ctx: StudioCtx) {
  const viewer = await getStudioViewer(ctx);
  if (!isOwner(viewer.role)) {
    throw new Error("Owner access required.");
  }
  return viewer;
}

export async function canAccessProject(
  ctx: StudioCtx,
  project: {
    clientId?: string;
    staffClerkUserIds?: string[];
  },
) {
  const viewer = await getStudioViewer(ctx);
  if (isAdmin(viewer.role)) return { allowed: true, viewer };
  if (
    viewer.role === "staff" &&
    project.staffClerkUserIds?.includes(viewer.clerkUserId)
  ) {
    return { allowed: true, viewer };
  }
  if (viewer.role === "client" && project.clientId) {
    const client = await ctx.db.get(project.clientId as never);
    const allowed =
      Boolean(client) &&
      ((client as { clerkUserId?: string }).clerkUserId === viewer.clerkUserId ||
        (client as { email?: string }).email === viewer.email);
    return { allowed, viewer };
  }
  return { allowed: false, viewer };
}
