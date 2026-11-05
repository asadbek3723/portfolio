import { createFileRoute } from "@tanstack/react-router";
import { ProjectDetail } from "@/portfolio/pages/ProjectDetail";
import { detailHead, getRequestOrigin } from "@/lib/seo";

export const Route = createFileRoute("/projects/$slug")({
  loader: async () => ({ origin: await getRequestOrigin().catch(() => undefined) }),
  head: ({ params, loaderData }) => detailHead("projects", params.slug, loaderData?.origin),
  component: ProjectDetail,
});
