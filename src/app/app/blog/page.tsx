import { BlogListPanel } from "@/components/portal/blog-list-panel";
import { PortalHeading } from "@/components/portal/portal-heading";

export default function BlogAdminPage() {
  return (
    <div>
      <PortalHeading copy="Manage repository-backed MDX articles, public authors, metadata, and publication timing." eyebrow="Studio OS / publishing" title="Blog" />
      <div className="mt-7"><BlogListPanel /></div>
    </div>
  );
}
