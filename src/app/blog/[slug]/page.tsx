import { redirect } from "next/navigation";

export default async function BlogArticlePage({ params }: PageProps<"/blog/[slug]">) {
  const { slug } = await params;
  redirect(`/insights/${slug}`);
}
