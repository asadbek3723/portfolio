import { createFileRoute } from "@tanstack/react-router";
import { ServiceDetail } from "@/portfolio/pages/ServiceDetail";
import { detailHead, getRequestOrigin } from "@/lib/seo";

export const Route = createFileRoute("/services/$slug")({
  loader: async () => ({ origin: await getRequestOrigin().catch(() => undefined) }),
  head: ({ params, loaderData }) => detailHead("services", params.slug, loaderData?.origin),
  component: ServiceDetail,
});
