import { createFileRoute } from "@tanstack/react-router";
import { Skills } from "@/portfolio/pages/Skills";
import { loadSeo, pageHead } from "@/lib/seo";

export const Route = createFileRoute("/skills")({
  loader: () => loadSeo(),
  head: ({ loaderData }) => pageHead("/skills", loaderData),
  component: Skills,
});
