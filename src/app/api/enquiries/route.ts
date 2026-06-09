import { after, NextResponse } from "next/server";
import { createConvexEnquiry } from "@/lib/convex-server";
import { deliverGoogleAppsScriptWebhook } from "@/lib/google-apps-script-webhook";
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
  let convexRecordId: string | null = null;

  try {
    convexRecordId = await createConvexEnquiry(enquiry);
  } catch {
    convexRecordId = null;
  }
  const convexStored = Boolean(convexRecordId);

  const webhookUrlPresent = Boolean(process.env.GOOGLE_APPS_SCRIPT_WEBHOOK_URL);
  const directMobile = process.env.DIRECT_CONTACT_MOBILE;

  if (!webhookUrlPresent && !convexStored) {
    return NextResponse.json(
      {
        error:
          "The qualified enquiry route is not connected in this preview. Please try again once the production service is configured.",
      },
      { status: 503 },
    );
  }

  const payload = {
    type: "contact_enquiry",
    ...enquiry,
    source: "mccaigs.com/contact",
    createdAt: new Date().toISOString(),
    convexId: convexRecordId,
    version: "contact-enquiry-v1",
  };

  console.info("[enquiries] webhook scheduling", {
    payloadType: payload.type,
    webhookUrlPresent,
  });

  if (webhookUrlPresent) {
    after(() => deliverGoogleAppsScriptWebhook(payload));
  }

  return NextResponse.json({
    directContact: directMobile ? { mobile: directMobile } : undefined,
    message: "Your qualified enquiry has been received.",
    ok: true,
    stored: convexStored,
  });
}
