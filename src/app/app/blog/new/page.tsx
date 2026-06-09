import { BlogEditor } from "@/components/portal/blog-editor";
import { PortalHeading } from "@/components/portal/portal-heading";

export default function NewBlogPostPage() {
  return (
    <div>
      <PortalHeading copy="Create metadata and generate a version-controlled MDX article from the approved template." eyebrow="Studio OS / publishing" title="New blog post" />
      <div className="mt-7"><BlogEditor /></div>
    </div>
  );
}
