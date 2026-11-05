import { createFileRoute } from "@tanstack/react-router";
import { Events } from "@/portfolio/pages/Events";
import { loadSeo, pageHead } from "@/lib/seo";

export const Route = createFileRoute("/events/")({
  loader: () => loadSeo(),
  head: ({ loaderData }) => pageHead("/events", loaderData),
  component: Events,
});
