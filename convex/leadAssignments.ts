import { v } from "convex/values";
import { mutation } from "./_generated/server";
import { requireStudioAdmin } from "./studioAuth";

const source = v.union(
  v.literal("enquiry"),
  v.literal("projectBuilderSubmission"),
);

export const convertToClient = mutation({
  args: {
    leadId: v.string(),
    source,
    name: v.string(),
    company: v.string(),
    email: v.string(),
    phone: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    await requireStudioAdmin(ctx);
    const now = Date.now();
    const clientId = await ctx.db.insert("clients", {
      name: args.name.trim(),
      company: args.company.trim(),
      email: args.email.trim().toLowerCase(),
      phone: args.phone?.trim() || undefined,
      status: "active",
      createdAt: now,
      updatedAt: now,
    });
    await ctx.db.insert("leadAssignments", {
      leadId: args.leadId,
      source: args.source,
      clientId,
      status: "converted",
      createdAt: now,
      updatedAt: now,
    });
    return clientId;
  },
});

export const assign = mutation({
  args: {
    leadId: v.string(),
    source,
    clientId: v.optional(v.id("clients")),
    projectId: v.optional(v.id("projects")),
  },
  handler: async (ctx, args) => {
    await requireStudioAdmin(ctx);
    const now = Date.now();
    return ctx.db.insert("leadAssignments", {
      ...args,
      status: "assigned",
      createdAt: now,
      updatedAt: now,
    });
  },
});

export const createProjectFromLead = mutation({
  args: {
    leadId: v.string(),
    source,
    name: v.string(),
    company: v.string(),
    email: v.string(),
    title: v.string(),
    description: v.string(),
    type: v.string(),
  },
  handler: async (ctx, args) => {
    await requireStudioAdmin(ctx);
    const now = Date.now();
    const existingClient = await ctx.db
      .query("clients")
      .withIndex("by_email", (q) =>
        q.eq("email", args.email.trim().toLowerCase()),
      )
      .first();
    const clientId =
      existingClient?._id ??
      (await ctx.db.insert("clients", {
        name: args.name.trim(),
        company: args.company.trim(),
        email: args.email.trim().toLowerCase(),
        status: "active",
        createdAt: now,
        updatedAt: now,
      }));
    const slug = args.title
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
    const projectId = await ctx.db.insert("projects", {
      clientId,
      title: args.title.trim(),
      slug,
      description: args.description.trim(),
      summary: args.description.trim(),
      type: args.type,
      projectType: args.type,
      status: "enquiry",
      priority: "normal",
      commercialSensitivity: true,
      createdAt: now,
      updatedAt: now,
    });
    await ctx.db.insert("leadAssignments", {
      leadId: args.leadId,
      source: args.source,
      clientId,
      projectId,
      status: "project-created",
      createdAt: now,
      updatedAt: now,
    });
    return projectId;
  },
});
