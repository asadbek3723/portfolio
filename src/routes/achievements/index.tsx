import { createFileRoute } from "@tanstack/react-router";
import { Achievements } from "@/portfolio/pages/Achievements";
import { loadSeo, pageHead } from "@/lib/seo";

export const Route = createFileRoute("/achievements/")({
  loader: () => loadSeo(),
  head: ({ loaderData }) => pageHead("/achievements", loaderData),
  component: Achievements,
});
