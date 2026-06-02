import { NextResponse } from "next/server";
import { contactSubmissionSchema } from "@/lib/validation/contact";

export async function POST(request: Request) {
  let requestBody: unknown;

  try {
    requestBody = await request.json();
  } catch {
    return NextResponse.json({ error: "The enquiry payload is invalid." }, { status: 400 });
  }

  const submission = contactSubmissionSchema.safeParse(requestBody);

  if (!submission.success) {
    return NextResponse.json(
      {
        error: "Check the enquiry and add the missing detail.",
        fields: submission.error.flatten().fieldErrors,
      },
      { status: 400 },
    );
  }

  const webhookUrl = process.env.GOOGLE_APPS_SCRIPT_WEBHOOK_URL;
  const directMobile = process.env.DIRECT_CONTACT_MOBILE;

  if (!webhookUrl || !directMobile) {
    return NextResponse.json(
      {
        error:
          "The qualified enquiry route is not connected in this preview. Please try again once the production service is configured.",
      },
      { status: 503 },
    );
  }

  const enquiry = {
    budgetRange: submission.data.budgetRange,
    company: submission.data.company,
    consent: submission.data.consent,
    email: submission.data.email,
    message: submission.data.message,
    name: submission.data.name,
    projectType: submission.data.projectType,
    timeline: submission.data.timeline,
  };
  const payload = {
    enquiry,
    qualification: {
      captchaPassed: true,
      consentGranted: true,
      source: "mccaigs.com/contact",
    },
    submittedAt: new Date().toISOString(),
    version: "contact-enquiry-v1",
  };

  try {
    const webhookResponse = await fetch(webhookUrl, {
      body: JSON.stringify(payload),
      headers: { "content-type": "application/json" },
      method: "POST",
      signal: AbortSignal.timeout(10_000),
    });

    if (!webhookResponse.ok) {
      throw new Error("Webhook rejected the enquiry.");
    }
  } catch {
    return NextResponse.json(
      {
        error:
          "The enquiry could not be sent just now. Please try again shortly.",
      },
      { status: 502 },
    );
  }

  return NextResponse.json({
    directContact: { mobile: directMobile },
    message: "Your qualified enquiry has been received.",
    ok: true,
  });
}
