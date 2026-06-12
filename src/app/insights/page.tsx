import { ContactCta } from "@/components/marketing/contact-cta";
import { InsightCard } from "@/components/insights/insight-card";
import { PageHero } from "@/components/marketing/page-hero";
import { SiteFrame } from "@/components/marketing/site-frame";
import { JsonLd } from "@/components/seo/json-ld";
import { getPublishedBlogPosts } from "@/lib/blog-convex";
import { hydrateBlogPost } from "@/lib/blog-posts";
import { getPublishedInsights } from "@/lib/insights";
import { createBreadcrumbStructuredData, createPageMetadata, publicRoutes } from "@/lib/seo";

export const metadata = createPageMetadata(publicRoutes[6]);
export const dynamic = "force-dynamic";

export default async function InsightsPage() {
  const [insightPosts, blogMetadata] = await Promise.all([
    getPublishedInsights(),
    getPublishedBlogPosts(),
  ]);
  const hydratedBlogPosts = (
    await Promise.all(blogMetadata.map((post) => hydrateBlogPost(post)))
  ).filter((post) => post !== undefined);
  const posts = [
    ...insightPosts.map((post) => ({ href: `/insights/${post.slug}`, post })),
    ...hydratedBlogPosts
      .filter(({ metadata }) => !insightPosts.some((post) => post.filename === metadata.contentFile))
      .map(({ post }) => ({ href: `/insights/${post.slug}`, post })),
  ].sort(
    (a, b) =>
      Date.parse(b.post.publishedAt || "1970-01-01") -
      Date.parse(a.post.publishedAt || "1970-01-01"),
  );

  return (
    <SiteFrame>
      <JsonLd data={createBreadcrumbStructuredData([{ name: "Home", path: "/" }, { name: "Insights", path: "/insights" }])} />
      <PageHero
        copy="Field notes from the McCaigs studio: deterministic AI, technical systems, fast MVPs, useful automation, and practical software for ordinary businesses."
        eyebrow="Insights / Studio field notes"
        title="Useful thinking for businesses that need things built properly."
      />
      <section className="mx-auto max-w-7xl px-5 py-14 sm:px-8 sm:py-20">
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-signal">Published notes</p>
        <h2 className="mt-4 max-w-3xl text-3xl font-semibold tracking-tight sm:text-4xl">Clear notes. Practical subjects. No hype.</h2>
        <p className="mt-4 max-w-2xl text-base leading-7 text-muted-foreground">Short, careful explanations from the workshop: what works, what should stay simple, and where the first useful release begins.</p>
        {posts.length > 0 ? (
          <div className="mt-8 grid gap-3 md:grid-cols-2">{posts.map(({ href, post }) => <InsightCard href={href} key={href} post={post} />)}</div>
        ) : (
          <div className="mt-8 rounded-xl border border-white/10 bg-card/55 p-6 sm:p-8">
            <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-signal">Editorial queue</p>
            <h2 className="mt-4 text-2xl font-semibold tracking-tight">The first studio notes are being prepared.</h2>
            <p className="mt-3 max-w-xl text-sm leading-6 text-muted-foreground">There are no published notes yet. The journal will collect practical explanations and build observations as they are approved.</p>
          </div>
        )}
      </section>
      <ContactCta />
    </SiteFrame>
  );
}
