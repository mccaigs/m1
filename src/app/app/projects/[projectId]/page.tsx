import { ProjectDetailPanel } from "@/components/portal/project-detail-panel";

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ projectId: string }>;
}) {
  const { projectId } = await params;
  return <ProjectDetailPanel projectId={projectId} />;
}
