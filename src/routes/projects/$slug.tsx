import { createFileRoute } from "@tanstack/react-router";
import { ProjectDetail } from "@/portfolio/pages/ProjectDetail";
import { detailHead, loadSeo } from "@/lib/seo";

export const Route = createFileRoute("/projects/$slug")({
  loader: () => loadSeo(),
  head: ({ params, loaderData }) => detailHead("projects", params.slug, loaderData),
  component: ProjectDetail,
});
