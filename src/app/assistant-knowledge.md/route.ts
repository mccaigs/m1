import { renderPublicAiKnowledgeMarkdown } from "@/lib/public-ai-knowledge";

export const dynamic = "force-static";

export function GET() {
  return new Response(renderPublicAiKnowledgeMarkdown(), {
    headers: {
      "cache-control": "public, max-age=3600",
      "content-type": "text/markdown; charset=utf-8",
    },
  });
}
