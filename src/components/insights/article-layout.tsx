import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, CircleDot } from "lucide-react";
import { InsightCard } from "@/components/insights/insight-card";
import { Button } from "@/components/ui/button";
import { getAvailableInsightCoverImage, type InsightPost } from "@/lib/insights";
import type { BlogAuthorKey } from "@/lib/blog-authors";
import { getBlogAuthor } from "@/lib/blog-authors";

const dateFormatter = new Intl.DateTimeFormat("en-GB", { day: "2-digit", month: "long", timeZone: "UTC", year: "numeric" });

function formatArticleDate(date: string) {
  return dateFormatter.format(new Date(`${date}T00:00:00Z`));
}

export function ArticleLayout({
  authorKey,
  backHref = "/insights",
  backLabel = "Back to Insights",
  children,
  post,
  relatedPosts,
}: {
  authorKey?: BlogAuthorKey;
  backHref?: string;
  backLabel?: string;
  children: ReactNode;
  post: InsightPost;
  relatedPosts: InsightPost[];
}) {
  const coverImage = getAvailableInsightCoverImage(post.coverImage);
  const author = authorKey ? getBlogAuthor(authorKey) : undefined;

  return (
    <>
      <article>
        <header className="border-b border-white/8 bg-deep-blue/16">
          <div className="mx-auto max-w-5xl px-5 py-14 sm:px-8 sm:py-20">
            <Link className="inline-flex min-h-10 items-center gap-2 font-mono text-[9px] uppercase tracking-[0.18em] text-signal-soft transition-colors hover:text-signal" href={backHref}>
              <ArrowLeft className="size-3" /> {backLabel}
            </Link>
            <p className="mt-7 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-signal"><CircleDot className="size-3" /> Insights / {post.category}</p>
            <h1 className="mt-5 max-w-4xl text-4xl font-semibold leading-[1.02] tracking-[-0.05em] sm:text-6xl">{post.title}</h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-muted-foreground">{post.excerpt}</p>
            <div className="mt-7 flex flex-wrap gap-x-5 gap-y-2 font-mono text-[9px] uppercase tracking-[0.15em] text-signal-soft">
              <span>{post.author}</span>
              <time dateTime={post.publishedAt}>{formatArticleDate(post.publishedAt)}</time>
              {post.updatedAt ? <time dateTime={post.updatedAt}>Updated {formatArticleDate(post.updatedAt)}</time> : null}
              <span>{post.readingTime}</span>
            </div>
            <div className="mt-5 flex flex-wrap gap-1.5">
              {post.tags.map((tag) => <span className="rounded-full border border-white/10 px-2.5 py-1 font-mono text-[8px] uppercase tracking-[0.12em] text-muted-foreground" key={tag}>{tag}</span>)}
            </div>
          </div>
        </header>
        <div className="border-b border-ink/10 bg-[#f6f3ec] text-ink">
          {coverImage ? (
            <figure className="mx-auto max-w-5xl px-5 pt-8 sm:px-8 sm:pt-12">
              <div className="relative aspect-[16/9] overflow-hidden rounded-xl border border-deep-blue/10 bg-deep-blue/5 shadow-sm">
                <Image
                  alt={post.coverImageAlt ?? post.title}
                  className="object-cover"
                  fill
                  sizes="(max-width: 768px) calc(100vw - 2.5rem), 960px"
                  src={coverImage}
                />
              </div>
            </figure>
          ) : null}
          <div className="mx-auto max-w-[46rem] px-5 py-10 sm:px-8 sm:py-14">{children}</div>
          {author ? (
            <aside className="mx-auto max-w-[46rem] px-5 pb-12 sm:px-8 sm:pb-16">
              <div className="rounded-xl border border-deep-blue/10 bg-white/55 p-5">
                <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-deep-blue/55">About the author</p>
                <p className="mt-3 font-semibold text-deep-blue">{author.name}</p>
                <p className="mt-1 text-sm text-deep-blue/65">{author.role}</p>
                <p className="mt-3 text-sm leading-6 text-deep-blue/75">{author.bio}</p>
              </div>
            </aside>
          ) : null}
        </div>
      </article>
      {relatedPosts.length > 0 ? (
        <section className="mx-auto max-w-7xl px-5 py-14 sm:px-8 sm:py-20">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-signal">Related studio notes</p>
          <h2 className="mt-4 max-w-2xl text-3xl font-semibold tracking-tight sm:text-4xl">Continue with the practical detail.</h2>
          <div className="mt-7 grid gap-3 md:grid-cols-2 lg:grid-cols-3">{relatedPosts.map((relatedPost) => <InsightCard key={relatedPost.slug} post={relatedPost} />)}</div>
        </section>
      ) : null}
      <section className="border-t border-white/8 bg-deep-blue/20">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 px-5 py-12 sm:px-8 sm:py-16 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-signal">Move from note to working system</p>
            <h2 className="mt-4 max-w-2xl text-3xl font-semibold tracking-tight sm:text-4xl">Bring us the awkward part of the business.</h2>
            <p className="mt-4 max-w-xl text-sm leading-6 text-muted-foreground">Use the structured project builder or start with a practical conversation.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button asChild className="min-h-11" size="lg"><Link href="/start-project">Start a project <ArrowUpRight /></Link></Button>
            <Button asChild className="min-h-11" size="lg" variant="outline"><Link href="/contact">Contact McCaigs</Link></Button>
          </div>
        </div>
      </section>
    </>
  );
}
