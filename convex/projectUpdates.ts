import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { canAccessProject } from "./studioAuth";

export const list = query({
  args: { projectId: v.id("projects") },
  handler: async (ctx, { projectId }) => {
    const project = await ctx.db.get(projectId);
    if (!project) return [];
    const access = await canAccessProject(ctx, project);
    if (!access.allowed) throw new Error("Project access denied.");
    const updates = await ctx.db
      .query("projectUpdates")
      .withIndex("by_project", (q) => q.eq("projectId", projectId))
      .order("desc")
      .collect();
    return access.viewer.role === "client"
      ? updates.filter((update) => update.visibility === "client")
      : updates;
  },
});

export const create = mutation({
  args: {
    projectId: v.id("projects"),
    title: v.string(),
    body: v.string(),
    visibility: v.union(v.literal("internal"), v.literal("client")),
  },
  handler: async (ctx, args) => {
    const project = await ctx.db.get(args.projectId);
    if (!project) throw new Error("Project not found.");
    const access = await canAccessProject(ctx, project);
    if (!access.allowed || access.viewer.role === "client") {
      throw new Error("Update edit access denied.");
    }
    const now = Date.now();
    return ctx.db.insert("projectUpdates", {
      ...args,
      title: args.title.trim(),
      body: args.body.trim(),
      createdAt: now,
      updatedAt: now,
    });
  },
});
