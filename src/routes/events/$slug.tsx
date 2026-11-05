import { createFileRoute } from "@tanstack/react-router";
import { EventDetail } from "@/portfolio/pages/EventDetail";
import { detailHead, loadSeo } from "@/lib/seo";

export const Route = createFileRoute("/events/$slug")({
  loader: () => loadSeo(),
  head: ({ params, loaderData }) => detailHead("events", params.slug, loaderData),
  component: EventDetail,
});
