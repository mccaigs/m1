import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { getAvailableInsightCoverImage, type InsightPost } from "@/lib/insights";

const dateFormatter = new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "short", year: "numeric" });

export function InsightCard({ href, post, tone = "dark" }: { href?: string; post: InsightPost; tone?: "dark" | "light" }) {
  const isLight = tone === "light";
  const coverImage = getAvailableInsightCoverImage(post.coverImage);
  const articleHref = href ?? `/insights/${post.slug}`;

  return (
    <article className={`overflow-hidden ${isLight ? "rounded-xl border border-deep-blue/12 bg-white/55 shadow-sm" : "rounded-xl border border-white/10 bg-card/55"}`}>
      {coverImage ? (
        <Link className="relative block aspect-[16/9] overflow-hidden border-b border-white/10 bg-deep-blue/10" href={articleHref}>
          <Image alt={post.coverImageAlt ?? post.title} className="object-cover transition-transform duration-500 hover:scale-[1.02]" fill sizes="(max-width: 768px) calc(100vw - 2.5rem), 640px" src={coverImage} />
        </Link>
      ) : null}
      <div className="p-5 sm:p-6">
        <div className="flex flex-wrap items-center gap-2 font-mono text-[9px] uppercase tracking-[0.15em]">
          <span className={isLight ? "text-deep-blue/65" : "text-signal"}>{post.category}</span>
          <span className={isLight ? "text-ink/35" : "text-muted-foreground"}>/</span>
          <time className={isLight ? "text-ink/50" : "text-muted-foreground"} dateTime={post.publishedAt}>{dateFormatter.format(new Date(`${post.publishedAt}T00:00:00Z`))}</time>
          <span className={isLight ? "text-ink/35" : "text-muted-foreground"}>/</span>
          <span className={isLight ? "text-ink/50" : "text-muted-foreground"}>{post.readingTime}</span>
        </div>
        <h2 className={`mt-4 text-2xl font-semibold tracking-tight ${isLight ? "text-deep-blue" : "text-foreground"}`}>
          <Link className="transition-colors hover:text-signal" href={articleHref}>{post.title}</Link>
        </h2>
        <p className={`mt-3 text-sm leading-6 ${isLight ? "text-ink/65" : "text-muted-foreground"}`}>{post.excerpt}</p>
        <div className="mt-4 flex flex-wrap gap-1.5">
          {post.tags.map((tag) => <span className={`rounded-full border px-2.5 py-1 font-mono text-[8px] uppercase tracking-[0.12em] ${isLight ? "border-deep-blue/12 text-deep-blue/65" : "border-white/10 text-muted-foreground"}`} key={tag}>{tag}</span>)}
        </div>
        <Link className={`mt-5 inline-flex min-h-10 items-center gap-2 font-mono text-[9px] uppercase tracking-[0.16em] transition-colors hover:text-signal ${isLight ? "text-deep-blue" : "text-signal-soft"}`} href={articleHref}>
          Read studio note <ArrowUpRight className="size-3" />
        </Link>
      </div>
    </article>
  );
}
