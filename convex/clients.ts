import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { getStudioViewer, isStaff, requireStudioAdmin } from "./studioAuth";

const clientFields = {
  name: v.string(),
  company: v.string(),
  email: v.string(),
  phone: v.optional(v.string()),
  clerkUserId: v.optional(v.string()),
  status: v.string(),
};

function clean(value: string) {
  return value.trim();
}

export const list = query({
  args: {},
  handler: async (ctx) => {
    const viewer = await getStudioViewer(ctx);
    if (isStaff(viewer.role)) {
      return ctx.db.query("clients").collect();
    }

    const byClerk = await ctx.db
      .query("clients")
      .withIndex("by_clerk_user_id", (q) =>
        q.eq("clerkUserId", viewer.clerkUserId),
      )
      .collect();
    if (byClerk.length) return byClerk;
    return ctx.db
      .query("clients")
      .withIndex("by_email", (q) => q.eq("email", viewer.email))
      .collect();
  },
});

export const create = mutation({
  args: clientFields,
  handler: async (ctx, args) => {
    const viewer = await requireStudioAdmin(ctx);
    const now = Date.now();
    const clientId = await ctx.db.insert("clients", {
      ...args,
      name: clean(args.name),
      company: clean(args.company),
      email: clean(args.email).toLowerCase(),
      phone: args.phone ? clean(args.phone) : undefined,
      clerkUserId: args.clerkUserId ? clean(args.clerkUserId) : undefined,
      createdAt: now,
      updatedAt: now,
    });
    await ctx.db.insert("auditLogs", {
      action: "client.created",
      actorId: undefined,
      entityType: "client",
      entityId: clientId,
      metadata: { actor: viewer.clerkUserId },
      createdAt: now,
    });
    return clientId;
  },
});

export const update = mutation({
  args: { clientId: v.id("clients"), ...clientFields },
  handler: async (ctx, { clientId, ...args }) => {
    await requireStudioAdmin(ctx);
    await ctx.db.patch(clientId, {
      ...args,
      name: clean(args.name),
      company: clean(args.company),
      email: clean(args.email).toLowerCase(),
      phone: args.phone ? clean(args.phone) : undefined,
      clerkUserId: args.clerkUserId ? clean(args.clerkUserId) : undefined,
      updatedAt: Date.now(),
    });
  },
});
