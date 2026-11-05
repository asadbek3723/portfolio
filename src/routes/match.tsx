import { createFileRoute } from "@tanstack/react-router";
import { Match } from "@/portfolio/pages/Match";
import { loadSeo, pageHead } from "@/lib/seo";

export const Route = createFileRoute("/match")({
  loader: () => loadSeo(),
  head: ({ loaderData }) => pageHead("/match", loaderData),
  component: Match,
});
