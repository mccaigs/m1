import { notFound } from "next/navigation";
import { compileMDX } from "next-mdx-remote/rsc";
import { ArticleLayout } from "@/components/insights/article-layout";
import { mdxComponents } from "@/components/insights/mdx-components";
import type { Id } from "../../../../../../convex/_generated/dataModel";
import { getOwnerBlogPost } from "@/lib/blog-convex";
import { hydrateBlogPost } from "@/lib/blog-posts";

export default async function BlogPreviewPage({ params }: PageProps<"/app/blog/[id]/preview">) {
  const { id } = await params;
  const metadata = await getOwnerBlogPost(id as Id<"blogPosts">);
  if (!metadata) notFound();
  const hydrated = await hydrateBlogPost(metadata);
  if (!hydrated) notFound();
  const { post } = hydrated;
  const { content } = await compileMDX({ components: mdxComponents, source: post.content });
  return <ArticleLayout authorKey={metadata.authorKey as "david" | "matt" | "kirsty"} backHref={`/app/blog/${id}`} backLabel="Back to editor" post={post} relatedPosts={[]}>{content}</ArticleLayout>;
}
