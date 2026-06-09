import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import {
  canAccessProject,
  getStudioViewer,
  isAdmin,
  requireStudioAdmin,
} from "./studioAuth";

const projectStatus = v.union(
  v.literal("enquiry"),
  v.literal("discovery"),
  v.literal("research"),
  v.literal("planning"),
  v.literal("proposal"),
  v.literal("build"),
  v.literal("review"),
  v.literal("live"),
  v.literal("archived"),
);

export const list = query({
  args: { status: v.optional(projectStatus) },
  handler: async (ctx, args) => {
    const viewer = await getStudioViewer(ctx);
    const projects = args.status
      ? await ctx.db
          .query("projects")
          .withIndex("by_status", (q) => q.eq("status", args.status!))
          .collect()
      : await ctx.db.query("projects").withIndex("by_updated_at").order("desc").collect();

    const visible = [];
    for (const project of projects) {
      if (isAdmin(viewer.role)) {
        visible.push(project);
        continue;
      }
      const access = await canAccessProject(ctx, project);
      if (access.allowed) visible.push(project);
    }

    return Promise.all(
      visible.map(async (project) => ({
        ...project,
        client: project.clientId ? await ctx.db.get(project.clientId) : null,
      })),
    );
  },
});

export const get = query({
  args: { projectId: v.id("projects") },
  handler: async (ctx, { projectId }) => {
    const project = await ctx.db.get(projectId);
    if (!project) return null;
    const access = await canAccessProject(ctx, project);
    if (!access.allowed) throw new Error("Project access denied.");
    const client = project.clientId ? await ctx.db.get(project.clientId) : null;
    return { ...project, client, viewerRole: access.viewer.role };
  },
});

export const create = mutation({
  args: {
    clientId: v.id("clients"),
    title: v.string(),
    slug: v.string(),
    description: v.string(),
    type: v.string(),
    status: projectStatus,
    priority: v.string(),
    budgetRange: v.string(),
    startDate: v.optional(v.number()),
    targetLaunchDate: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const viewer = await requireStudioAdmin(ctx);
    const now = Date.now();
    const projectId = await ctx.db.insert("projects", {
      ...args,
      title: args.title.trim(),
      slug: args.slug.trim().toLowerCase(),
      description: args.description.trim(),
      projectType: args.type,
      summary: args.description.trim(),
      commercialSensitivity: true,
      createdAt: now,
      updatedAt: now,
    });
    await ctx.db.insert("auditLogs", {
      action: "project.created",
      entityType: "project",
      entityId: projectId,
      metadata: { actor: viewer.clerkUserId },
      createdAt: now,
    });
    return projectId;
  },
});

export const update = mutation({
  args: {
    projectId: v.id("projects"),
    title: v.optional(v.string()),
    description: v.optional(v.string()),
    status: v.optional(projectStatus),
    priority: v.optional(v.string()),
    targetLaunchDate: v.optional(v.number()),
    clientId: v.optional(v.id("clients")),
  },
  handler: async (ctx, { projectId, ...updates }) => {
    const project = await ctx.db.get(projectId);
    if (!project) throw new Error("Project not found.");
    const access = await canAccessProject(ctx, project);
    if (!access.allowed || access.viewer.role === "client") {
      throw new Error("Project edit access denied.");
    }
    await ctx.db.patch(projectId, {
      ...updates,
      title: updates.title?.trim(),
      description: updates.description?.trim(),
      summary: updates.description?.trim(),
      updatedAt: Date.now(),
    });
  },
});
