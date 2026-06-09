import { mutation } from "./_generated/server";
import { requireOwner } from "./studioAuth";

const CLIENT_EMAIL = "studio@mccaigs.com";
const UPDATE_TITLE = "Project created";
const UPDATE_BODY = "Imported from Studio OS seed data.";

const projects = [
  {
    title: "McCaigs Website Redesign",
    slug: "mccaigs-website-redesign",
    status: "build",
    type: "internal",
    priority: "high",
  },
  {
    title: "Sites.scot",
    slug: "sites-scot",
    status: "discovery",
    type: "saas",
    priority: "high",
  },
  {
    title: "Answers.scot",
    slug: "answers-scot",
    status: "research",
    type: "saas",
    priority: "high",
  },
  {
    title: "Homes.scot",
    slug: "homes-scot",
    status: "planning",
    type: "saas",
    priority: "medium",
  },
  {
    title: "Scottish AI Guy",
    slug: "scottish-ai-guy",
    status: "build",
    type: "content-platform",
    priority: "high",
  },
  {
    title: "Ads.scot",
    slug: "ads-scot",
    status: "planning",
    type: "saas",
    priority: "medium",
  },
] as const;

export const seedStudioData = mutation({
  args: {},
  handler: async (ctx) => {
    const viewer = await requireOwner(ctx);
    const now = Date.now();
    let clientCreated = false;
    let projectsCreated = 0;
    let projectsSkipped = 0;
    let updatesCreated = 0;
    let assignmentsCreated = 0;

    let client = await ctx.db
      .query("clients")
      .withIndex("by_email", (q) => q.eq("email", CLIENT_EMAIL))
      .first();

    if (!client) {
      const clientId = await ctx.db.insert("clients", {
        name: "McCaigs Studio",
        company: "McCaigs Studio",
        email: CLIENT_EMAIL,
        status: "internal",
        createdAt: now,
        updatedAt: now,
      });
      client = await ctx.db.get(clientId);
      clientCreated = true;
    } else if (
      client.name !== "McCaigs Studio" ||
      client.company !== "McCaigs Studio" ||
      client.status !== "internal"
    ) {
      await ctx.db.patch(client._id, {
        name: "McCaigs Studio",
        company: "McCaigs Studio",
        status: "internal",
        updatedAt: now,
      });
      client = await ctx.db.get(client._id);
    }

    if (!client) {
      throw new Error("Studio seed client could not be created.");
    }

    for (const projectSeed of projects) {
      let project = await ctx.db
        .query("projects")
        .withIndex("by_slug", (q) => q.eq("slug", projectSeed.slug))
        .first();

      if (!project) {
        const projectId = await ctx.db.insert("projects", {
          clientId: client._id,
          title: projectSeed.title,
          slug: projectSeed.slug,
          description: `${projectSeed.title} internal Studio OS project.`,
          summary: `${projectSeed.title} internal Studio OS project.`,
          status: projectSeed.status,
          type: projectSeed.type,
          projectType: projectSeed.type,
          priority: projectSeed.priority,
          commercialSensitivity: true,
          createdAt: now,
          updatedAt: now,
        });
        project = await ctx.db.get(projectId);
        projectsCreated += 1;
      } else {
        projectsSkipped += 1;
        if (
          project.clientId !== client._id ||
          project.title !== projectSeed.title ||
          project.status !== projectSeed.status ||
          project.type !== projectSeed.type ||
          project.projectType !== projectSeed.type ||
          project.priority !== projectSeed.priority
        ) {
          await ctx.db.patch(project._id, {
            clientId: client._id,
            title: projectSeed.title,
            status: projectSeed.status,
            type: projectSeed.type,
            projectType: projectSeed.type,
            priority: projectSeed.priority,
            updatedAt: now,
          });
          project = await ctx.db.get(project._id);
        }
      }

      if (!project) {
        throw new Error(`Seed project ${projectSeed.slug} could not be created.`);
      }

      const existingUpdates = await ctx.db
        .query("projectUpdates")
        .withIndex("by_project", (q) => q.eq("projectId", project._id))
        .collect();
      const hasInitialUpdate = existingUpdates.some(
        (update) =>
          update.title === UPDATE_TITLE &&
          update.body === UPDATE_BODY &&
          update.visibility === "internal",
      );

      if (!hasInitialUpdate) {
        await ctx.db.insert("projectUpdates", {
          projectId: project._id,
          title: UPDATE_TITLE,
          body: UPDATE_BODY,
          visibility: "internal",
          createdAt: now,
          updatedAt: now,
        });
        updatesCreated += 1;
      }

      const assignment = await ctx.db
        .query("leadAssignments")
        .withIndex("by_lead", (q) =>
          q.eq("source", "studioSeed").eq("leadId", projectSeed.slug),
        )
        .first();

      if (!assignment) {
        await ctx.db.insert("leadAssignments", {
          leadId: projectSeed.slug,
          source: "studioSeed",
          clientId: client._id,
          projectId: project._id,
          status: "assigned",
          createdAt: now,
          updatedAt: now,
        });
        assignmentsCreated += 1;
      } else if (
        assignment.clientId !== client._id ||
        assignment.projectId !== project._id ||
        assignment.status !== "assigned"
      ) {
        await ctx.db.patch(assignment._id, {
          clientId: client._id,
          projectId: project._id,
          status: "assigned",
          updatedAt: now,
        });
      }
    }

    await ctx.db.insert("auditLogs", {
      action: "studio.seed.completed",
      entityType: "studio",
      entityId: "initial-project-portfolio",
      metadata: {
        actor: viewer.clerkUserId,
        assignmentsCreated,
        clientCreated,
        projectsCreated,
        projectsSkipped,
        updatesCreated,
      },
      createdAt: now,
    });

    return {
      client: clientCreated ? "created" as const : "already-existed" as const,
      projectsCreated,
      projectsSkipped,
      updatesCreated,
      assignmentsCreated,
    };
  },
});
