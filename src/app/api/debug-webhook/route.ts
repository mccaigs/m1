import { NextResponse } from "next/server";
import { deliverGoogleAppsScriptWebhook } from "@/lib/google-apps-script-webhook";

export const dynamic = "force-dynamic";

export async function GET() {
  if (process.env.NODE_ENV !== "development") {
    return new Response(null, { status: 404 });
  }

  const webhookUrlPresent = Boolean(process.env.GOOGLE_APPS_SCRIPT_WEBHOOK_URL);
  const createdAt = new Date().toISOString();
  const result = await deliverGoogleAppsScriptWebhook({
    type: "contact_enquiry",
    id: `debug-${crypto.randomUUID()}`,
    createdAt,
    name: "McCaigs Webhook Debug",
    email: "mccaigsgroup@gmail.com",
    company: "McCaigs",
    projectType: "Webhook integration test",
    budgetRange: "Not applicable",
    timeline: "Immediate",
    message: `Development webhook test sent at ${createdAt}.`,
    source: "mccaigs.com/api/debug-webhook",
    consent: true,
  });

  return NextResponse.json({
    webhookUrlPresent,
    status: result.status,
    ok: result.ok,
    responseTextPreview: result.responseTextPreview,
  });
}

export const POST = GET;
