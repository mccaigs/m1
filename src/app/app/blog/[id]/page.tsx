import { BlogEditor } from "@/components/portal/blog-editor";
import { PortalHeading } from "@/components/portal/portal-heading";
import type { Id } from "../../../../../convex/_generated/dataModel";

export default async function EditBlogPostPage({ params }: PageProps<"/app/blog/[id]">) {
  const { id } = await params;
  return (
    <div>
      <PortalHeading copy="Edit repository metadata, publishing state, author attribution, and search presentation." eyebrow="Studio OS / publishing" title="Edit blog post" />
      <div className="mt-7"><BlogEditor postId={id as Id<"blogPosts">} /></div>
    </div>
  );
}
