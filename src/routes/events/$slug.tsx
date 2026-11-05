import { createFileRoute } from "@tanstack/react-router";
import { EventDetail } from "@/portfolio/pages/EventDetail";
import { detailHead, getRequestOrigin } from "@/lib/seo";

export const Route = createFileRoute("/events/$slug")({
  loader: async () => ({ origin: await getRequestOrigin().catch(() => undefined) }),
  head: ({ params, loaderData }) => detailHead("events", params.slug, loaderData?.origin),
  component: EventDetail,
});
