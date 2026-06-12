import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { compileMDX } from "next-mdx-remote/rsc";
import { ArticleLayout } from "@/components/insights/article-layout";
import { mdxComponents } from "@/components/insights/mdx-components";
import { SiteFrame } from "@/components/marketing/site-frame";
import { JsonLd } from "@/components/seo/json-ld";
import { getPublishedBlogPost } from "@/lib/blog-convex";
import { hydrateBlogPost } from "@/lib/blog-posts";
import { getAvailableInsightCoverImage, getInsightBySlug, getPublishedInsights, getRelatedInsights } from "@/lib/insights";
import { absoluteUrl, createBreadcrumbStructuredData, siteConfig } from "@/lib/seo";

type InsightPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return (await getPublishedInsights()).map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: InsightPageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = await getPublishedArticle(slug);

  if (!article) {
    return {};
  }

  const { post } = article;
  const url = absoluteUrl(`/insights/${post.slug}`);
  const image = absoluteUrl(getAvailableInsightCoverImage(post.coverImage) ?? "/opengraph-image");

  return {
    alternates: { canonical: url },
    authors: [{ name: post.author }],
    description: post.seoDescription || post.excerpt,
    keywords: post.tags,
    openGraph: {
      authors: [post.author],
      description: post.seoDescription || post.excerpt,
      images: [{ alt: post.title, url: image }],
      locale: "en_GB",
      publishedTime: post.publishedAt,
      siteName: siteConfig.name,
      tags: post.tags,
      title: post.seoTitle || post.title,
      type: "article",
      modifiedTime: post.updatedAt,
      url,
    },
    title: post.seoTitle || post.title,
    twitter: {
      card: "summary_large_image",
      description: post.seoDescription || post.excerpt,
      images: [image],
      site: "@mccaigs",
      title: post.seoTitle || post.title,
    },
  };
}

export default async function InsightArticlePage({ params }: InsightPageProps) {
  const { slug } = await params;
  const article = await getPublishedArticle(slug);

  if (!article) {
    notFound();
  }

  const { authorKey, post } = article;
  const [{ content }, relatedPosts] = await Promise.all([
    compileMDX({ components: mdxComponents, source: post.content }),
    getRelatedInsights(post),
  ]);

  const articleStructuredData = {
    "@context": "https://schema.org",
    "@type": "Article",
    author: {
      "@type": authorKey ? "Person" : "Organization",
      name: post.author,
    },
    dateModified: post.updatedAt ?? post.publishedAt,
    datePublished: post.publishedAt,
    description: post.seoDescription || post.excerpt,
    headline: post.title,
    image: absoluteUrl(getAvailableInsightCoverImage(post.coverImage) ?? "/opengraph-image"),
    mainEntityOfPage: absoluteUrl(`/insights/${post.slug}`),
    publisher: {
      "@id": "https://mccaigs.com/#organisation",
      "@type": "Organization",
      logo: {
        "@type": "ImageObject",
        url: absoluteUrl("/logo.svg"),
      },
      name: siteConfig.name,
    },
  };

  return (
    <SiteFrame>
      <JsonLd data={articleStructuredData} />
      <JsonLd data={createBreadcrumbStructuredData([{ name: "Home", path: "/" }, { name: "Insights", path: "/insights" }, { name: post.title, path: `/insights/${post.slug}` }])} />
      <ArticleLayout authorKey={authorKey} post={post} relatedPosts={relatedPosts}>{content}</ArticleLayout>
    </SiteFrame>
  );
}

async function getPublishedArticle(slug: string) {
  const insight = await getInsightBySlug(slug);
  if (insight) return { post: insight };

  const metadata = await getPublishedBlogPost(slug);
  if (!metadata) return undefined;

  const hydrated = await hydrateBlogPost(metadata);
  if (!hydrated) return undefined;

  return {
    authorKey: metadata.authorKey as "david" | "matt" | "kirsty",
    post: hydrated.post,
  };
}
