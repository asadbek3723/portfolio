import { createFileRoute } from "@tanstack/react-router";
import { ServiceDetail } from "@/portfolio/pages/ServiceDetail";
import { detailHead, loadSeo } from "@/lib/seo";

export const Route = createFileRoute("/services/$slug")({
  loader: () => loadSeo(),
  head: ({ params, loaderData }) => detailHead("services", params.slug, loaderData),
  component: ServiceDetail,
});
