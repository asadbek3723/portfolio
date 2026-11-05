import { createFileRoute } from "@tanstack/react-router";
import { Uses } from "@/portfolio/pages/Uses";
import { loadSeo, pageHead } from "@/lib/seo";

export const Route = createFileRoute("/uses")({
  loader: () => loadSeo(),
  head: ({ loaderData }) => pageHead("/uses", loaderData),
  component: Uses,
});
