import Image from "next/image";
import Link from "next/link";
import { PageHero } from "@/components/marketing/page-hero";
import { SiteFrame } from "@/components/marketing/site-frame";
import { getBlogAuthor } from "@/lib/blog-authors";
import { getPublishedBlogPosts } from "@/lib/blog-convex";
import { getAvailableInsightCoverImage } from "@/lib/insights";
import { createPageMetadata } from "@/lib/seo";

export const dynamic = "force-dynamic";

export const metadata = createPageMetadata({
  description: "Studio articles from McCaigs on practical AI, software, websites, internal systems, and digital products.",
  path: "/blog",
  title: "McCaigs Blog",
});

export default async function BlogPage() {
  const posts = await getPublishedBlogPosts();
  return (
    <SiteFrame>
      <PageHero copy="Long-form studio perspectives backed by version-controlled MDX and carefully managed publishing metadata." eyebrow="Blog / Studio publishing" title="Practical ideas from the McCaigs studio." />
      <section className="mx-auto max-w-7xl px-5 py-14 sm:px-8 sm:py-20">
        <div className="grid gap-4 md:grid-cols-2">
          {posts.map((post) => {
            const author = getBlogAuthor(post.authorKey);
            const image = getAvailableInsightCoverImage(post.featuredImage);
            const publishedAt = post.publishedAt ?? post.scheduledFor ?? post.createdAt;
            return (
              <Link className="overflow-hidden rounded-xl border border-white/10 bg-card/55 transition-colors hover:border-signal/25" href={`/blog/${post.slug}`} key={post._id}>
                {image ? <div className="relative aspect-[16/9]"><Image alt={post.title} className="object-cover" fill sizes="(max-width: 768px) 100vw, 50vw" src={image} /></div> : null}
                <div className="p-5">
                  <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-signal">{post.category}</p>
                  <h2 className="mt-3 text-2xl font-semibold text-signal-soft">{post.title}</h2>
                  <p className="mt-3 text-sm leading-6 text-muted-foreground">{post.excerpt}</p>
                  <p className="mt-5 font-mono text-[9px] uppercase tracking-[0.12em] text-muted-foreground">
                    {author?.name ?? post.authorKey} / {new Intl.DateTimeFormat("en-GB", { dateStyle: "medium" }).format(publishedAt)}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-1">{post.tags.map((tag) => <span className="rounded-full border border-white/10 px-2 py-1 text-[9px] text-muted-foreground" key={tag}>{tag}</span>)}</div>
                </div>
              </Link>
            );
          })}
        </div>
        {posts.length === 0 ? <p className="rounded-xl border border-dashed border-white/12 p-8 text-center text-sm text-muted-foreground">No blog posts are published yet.</p> : null}
      </section>
    </SiteFrame>
  );
}
