import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { compileMDX } from "next-mdx-remote/rsc";
import { ArticleLayout } from "@/components/insights/article-layout";
import { mdxComponents } from "@/components/insights/mdx-components";
import { SiteFrame } from "@/components/marketing/site-frame";
import { JsonLd } from "@/components/seo/json-ld";
import { getPublishedBlogPost } from "@/lib/blog-convex";
import { hydrateBlogPost } from "@/lib/blog-posts";
import { getAvailableInsightCoverImage } from "@/lib/insights";
import { absoluteUrl, siteConfig } from "@/lib/seo";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const metadata = await getPublishedBlogPost(slug);
  const hydrated = metadata ? await hydrateBlogPost(metadata) : undefined;
  if (!hydrated) return {};
  const { author, post } = hydrated;
  const url = absoluteUrl(`/blog/${post.slug}`);
  const image = absoluteUrl(getAvailableInsightCoverImage(post.coverImage) ?? "/opengraph-image");
  return {
    alternates: { canonical: url },
    authors: [{ name: author?.name ?? post.author }],
    description: post.seoDescription,
    keywords: post.tags,
    openGraph: {
      authors: [author?.name ?? post.author],
      description: post.seoDescription,
      images: [{ alt: post.title, url: image }],
      locale: "en_GB",
      publishedTime: post.publishedAt,
      siteName: siteConfig.name,
      tags: post.tags,
      title: post.seoTitle,
      type: "article",
      url,
    },
    title: post.seoTitle,
    twitter: { card: "summary_large_image", description: post.seoDescription, images: [image], title: post.seoTitle },
  };
}

export default async function BlogArticlePage({ params }: PageProps<"/blog/[slug]">) {
  const { slug } = await params;
  const metadata = await getPublishedBlogPost(slug);
  if (!metadata) notFound();
  const hydrated = await hydrateBlogPost(metadata);
  if (!hydrated) notFound();
  const { author, post } = hydrated;
  const { content } = await compileMDX({ components: mdxComponents, source: post.content });
  const image = absoluteUrl(getAvailableInsightCoverImage(post.coverImage) ?? "/opengraph-image");
  return (
    <SiteFrame>
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "Article",
        author: { "@type": "Person", name: author?.name ?? post.author },
        datePublished: post.publishedAt,
        description: post.seoDescription,
        headline: post.title,
        image,
        mainEntityOfPage: absoluteUrl(`/blog/${post.slug}`),
        publisher: { "@id": "https://mccaigs.com/#organisation", "@type": "Organization", name: siteConfig.name },
      }} />
      <ArticleLayout authorKey={metadata.authorKey as "david" | "matt" | "kirsty"} backHref="/blog" backLabel="Back to Blog" post={post} relatedPosts={[]}>{content}</ArticleLayout>
    </SiteFrame>
  );
}
