import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import {
  getStudioViewer,
  getStudioViewerFromIdentity,
  OWNER_EMAIL,
  requireOwner,
} from "./studioAuth";

const role = v.union(
  v.literal("owner"),
  v.literal("admin"),
  v.literal("staff"),
  v.literal("client"),
);

export const ensureCurrentUser = mutation({
  args: {},
  handler: async (ctx) => {
    console.info("studio_auth_bootstrap_start", {
      function: "userRoles.ensureCurrentUser",
    });
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      console.error("studio_auth_identity_missing", {
        function: "userRoles.ensureCurrentUser",
      });
      return {
        ok: false as const,
        error: "Authenticated Clerk user was not available to Convex.",
      };
    }

    if (process.env.NODE_ENV === "development") {
      console.info("studio_auth_identity_received", {
        function: "userRoles.ensureCurrentUser",
        identity,
      });
    }

    const viewer = await getStudioViewerFromIdentity(ctx, identity);
    if (!viewer.email) {
      console.error("studio_auth_email_claim_missing", {
        clerkUserId: viewer.clerkUserId,
        function: "userRoles.ensureCurrentUser",
      });
      return {
        ok: false as const,
        error: "The Clerk identity received by Convex did not include an email address.",
      };
    }

    const now = Date.now();
    const nextRole = viewer.isPrimaryOwner ? "owner" : viewer.role;
    console.info("studio_auth_role_lookup", {
      clerkUserId: viewer.clerkUserId,
      email: viewer.email,
      existingRole: viewer.roleRecord?.role ?? null,
      nextRole,
      roleRecordId: viewer.roleRecord?._id ?? null,
    });

    if (viewer.roleRecord) {
      if (
        viewer.roleRecord.email !== viewer.email ||
        viewer.roleRecord.role !== nextRole
      ) {
        await ctx.db.patch(viewer.roleRecord._id, {
          email: viewer.email,
          role: nextRole,
          updatedAt: now,
        });
      }
      const roleRecord = await ctx.db.get(viewer.roleRecord._id);
      console.info("studio_auth_bootstrap_success", {
        action: "updated",
        clerkUserId: viewer.clerkUserId,
        email: viewer.email,
        role: nextRole,
        roleRecordId: viewer.roleRecord._id,
      });
      return {
        ok: true as const,
        clerkUserId: viewer.clerkUserId,
        email: viewer.email,
        role: nextRole,
        roleRecord,
      };
    }

    const roleRecordId = await ctx.db.insert("userRoles", {
      clerkUserId: viewer.clerkUserId,
      email: viewer.email,
      role: nextRole,
      createdAt: now,
      updatedAt: now,
    });
    const roleRecord = await ctx.db.get(roleRecordId);
    console.info("studio_auth_bootstrap_success", {
      action: "inserted",
      clerkUserId: viewer.clerkUserId,
      email: viewer.email,
      role: nextRole,
      roleRecordId,
    });
    return {
      ok: true as const,
      clerkUserId: viewer.clerkUserId,
      email: viewer.email,
      role: nextRole,
      roleRecord,
    };
  },
});

export const current = query({
  args: {},
  handler: async (ctx) => {
    const viewer = await getStudioViewer(ctx);
    console.info("studio_auth_current_role_lookup", {
      clerkUserId: viewer.clerkUserId,
      role: viewer.roleRecord?.role ?? null,
      roleRecordId: viewer.roleRecord?._id ?? null,
    });
    if (!viewer.roleRecord) return null;

    return {
      clerkUserId: viewer.clerkUserId,
      email: viewer.email,
      role: viewer.roleRecord.role,
      roleRecordId: viewer.roleRecord._id,
    };
  },
});

export const diagnostics = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      return {
        authenticated: false,
        identity: null,
        role: null,
        roleRecord: null,
      };
    }

    const viewer = await getStudioViewerFromIdentity(ctx, identity);
    return {
      authenticated: true,
      identity,
      role: viewer.roleRecord?.role ?? null,
      roleRecord: viewer.roleRecord,
    };
  },
});

export const list = query({
  args: {},
  handler: async (ctx) => {
    await requireOwner(ctx);
    return ctx.db.query("userRoles").collect();
  },
});

export const setRole = mutation({
  args: { userRoleId: v.id("userRoles"), role },
  handler: async (ctx, args) => {
    await requireOwner(ctx);
    const target = await ctx.db.get(args.userRoleId);
    if (!target) throw new Error("User role not found.");
    if (target.email === OWNER_EMAIL && args.role !== "owner") {
      throw new Error("The primary studio owner cannot be demoted.");
    }
    await ctx.db.patch(args.userRoleId, {
      role: args.role,
      updatedAt: Date.now(),
    });
  },
});
