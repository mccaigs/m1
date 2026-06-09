import "server-only";

const RESPONSE_PREVIEW_LENGTH = 300;

export type WebhookDeliveryResult = {
  ok: boolean;
  responseTextPreview: string;
  status: number | null;
};

export async function deliverGoogleAppsScriptWebhook(
  payload: { type: string; [key: string]: unknown },
): Promise<WebhookDeliveryResult> {
  const webhookUrl = process.env.GOOGLE_APPS_SCRIPT_WEBHOOK_URL;

  console.info("[google-apps-script] webhook configuration", {
    webhookUrlPresent: Boolean(webhookUrl),
  });

  if (!webhookUrl) {
    return {
      ok: false,
      responseTextPreview: "GOOGLE_APPS_SCRIPT_WEBHOOK_URL is not configured.",
      status: null,
    };
  }

  console.info("[google-apps-script] sending webhook", {
    payloadType: payload.type,
  });

  try {
    const response = await fetch(webhookUrl, {
      body: JSON.stringify(payload),
      headers: { "content-type": "application/json" },
      method: "POST",
      signal: AbortSignal.timeout(10_000),
    });
    const responseText = await response.text();
    const responseTextPreview = previewResponse_(responseText);
    const responseBody = parseResponse_(responseText);
    const ok = response.ok && responseBody?.ok === true;

    console.info("[google-apps-script] webhook response", {
      ok,
      payloadType: payload.type,
      status: response.status,
    });

    if (!ok) {
      console.warn("[google-apps-script] webhook delivery rejected", {
        payloadType: payload.type,
        responseTextPreview,
        status: response.status,
      });
    }

    return {
      ok,
      responseTextPreview,
      status: response.status,
    };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown webhook error.";

    console.error("[google-apps-script] webhook request failed", {
      error: message,
      payloadType: payload.type,
    });

    return {
      ok: false,
      responseTextPreview: message,
      status: null,
    };
  }
}

function parseResponse_(responseText: string) {
  try {
    return JSON.parse(responseText) as { ok?: boolean };
  } catch {
    return null;
  }
}

function previewResponse_(responseText: string) {
  return responseText.replace(/\s+/g, " ").trim().slice(0, RESPONSE_PREVIEW_LENGTH);
}
