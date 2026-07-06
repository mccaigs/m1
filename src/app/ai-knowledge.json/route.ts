import { publicAiKnowledge } from "@/lib/public-ai-knowledge";

export const dynamic = "force-static";

export function GET() {
  return Response.json(publicAiKnowledge, {
    headers: {
      "cache-control": "public, max-age=3600",
    },
  });
}
