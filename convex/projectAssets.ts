import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { canAccessProject } from "./studioAuth";

const assetType = v.union(
  v.literal("screenshot"),
  v.literal("previewLink"),
  v.literal("github"),
  v.literal("document"),
  v.literal("note"),
  v.literal("handover"),
  v.literal("figma"),
  v.literal("loom"),
  v.literal("other"),
);

export const list = query({
  args: { projectId: v.id("projects") },
  handler: async (ctx, { projectId }) => {
    const project = await ctx.db.get(projectId);
    if (!project) return [];
    const access = await canAccessProject(ctx, project);
    if (!access.allowed) throw new Error("Project access denied.");
    const assets = await ctx.db
      .query("projectAssets")
      .withIndex("by_project", (q) => q.eq("projectId", projectId))
      .collect();
    return access.viewer.role === "client"
      ? assets.filter((asset) => asset.approvedForClient)
      : assets;
  },
});

export const create = mutation({
  args: {
    projectId: v.id("projects"),
    type: assetType,
    title: v.string(),
    url: v.optional(v.string()),
    description: v.optional(v.string()),
    imageUrl: v.optional(v.string()),
    approvedForClient: v.boolean(),
  },
  handler: async (ctx, args) => {
    const project = await ctx.db.get(args.projectId);
    if (!project) throw new Error("Project not found.");
    const access = await canAccessProject(ctx, project);
    if (!access.allowed || access.viewer.role === "client") {
      throw new Error("Asset edit access denied.");
    }
    const now = Date.now();
    return ctx.db.insert("projectAssets", {
      ...args,
      title: args.title.trim(),
      url: args.url?.trim() || undefined,
      imageUrl: args.imageUrl?.trim() || undefined,
      description: args.description?.trim() || undefined,
      createdAt: now,
      updatedAt: now,
    });
  },
});
