import { after, NextResponse } from "next/server";
import { createConvexQuoteBuilderSubmission } from "@/lib/convex-server";
import { estimateProject, getProjectShape } from "@/lib/project-builder-client";
import {
  projectBuilderSubmissionSchema,
  type ProjectBuilderSubmission,
} from "@/lib/validation/project-builder";

function createReference() {
  return `MCG-${crypto.randomUUID().replaceAll("-", "").slice(0, 10).toUpperCase()}`;
}

async function notifyProjectBuilderWebhook(
  webhookUrl: string,
  submission: ProjectBuilderSubmission,
  estimate: ReturnType<typeof estimateProject>,
  convexRecordId: string,
) {
  const projectShape = getProjectShape(estimate.complexity);
  let responseStatus: number | undefined;

  try {
    const webhookResponse = await fetch(webhookUrl, {
      body: JSON.stringify({
        type: "project_builder_submission",
        name: submission.name,
        email: submission.email,
        company: submission.company,
        industry: submission.industry,
        problem: submission.problem,
        problemDetail: submission.problemDetail,
        desiredOutcome: submission.desiredOutcome,
        desiredOutcomeDetail: submission.desiredOutcomeDetail,
        projectType: estimate.classification,
        recommendedRoute: estimate.recommendedRoute,
        projectShape: projectShape.label,
        indicativeBudget: estimate.indicativeBudget,
        estimatedTimeline: estimate.likelyTimeline,
        urgency: estimate.likelyTimeline,
        summary: estimate.summary,
        source: "mccaigs.com/start-project",
        createdAt: new Date().toISOString(),
        convexRecordId,
      }),
      headers: { "content-type": "application/json" },
      method: "POST",
      signal: AbortSignal.timeout(10_000),
    });

    responseStatus = webhookResponse.status;
    if (!webhookResponse.ok) {
      throw new Error("Webhook rejected the project builder submission.");
    }

    const webhookResult = (await webhookResponse.json()) as { ok?: boolean };
    if (!webhookResult.ok) {
      throw new Error("Webhook could not process the project builder submission.");
    }
  } catch {
    console.error("Project builder webhook notification failed.", {
      convexRecordId,
      responseStatus,
    });
  }
}

export async function POST(request: Request) {
  let requestBody: unknown;

  try {
    requestBody = await request.json();
  } catch {
    return NextResponse.json({ error: "The project builder payload is invalid." }, { status: 400 });
  }

  const submission = projectBuilderSubmissionSchema.safeParse(requestBody);

  if (!submission.success) {
    return NextResponse.json(
      {
        error: "Check the project builder answers and add the missing detail.",
        fields: submission.error.flatten().fieldErrors,
      },
      { status: 400 },
    );
  }

  const estimate = estimateProject(submission.data);
  const reference = createReference();

  try {
    const submissionId = await createConvexQuoteBuilderSubmission(submission.data, estimate);

    if (submissionId) {
      const webhookUrl = process.env.GOOGLE_APPS_SCRIPT_WEBHOOK_URL;
      if (webhookUrl) {
        after(() =>
          notifyProjectBuilderWebhook(
            webhookUrl,
            submission.data,
            estimate,
            submissionId,
          ),
        );
      }
    }

    return NextResponse.json({
      estimate,
      reference: submissionId ?? reference,
      stored: Boolean(submissionId),
    });
  } catch {
    return NextResponse.json(
      {
        estimate,
        error: "The project enquiry could not be stored just now.",
        reference,
        stored: false,
      },
      { status: 502 },
    );
  }
}
