import { createFileRoute } from "@tanstack/react-router";
import { CV } from "@/portfolio/pages/CV";
import { loadSeo, pageHead } from "@/lib/seo";

export const Route = createFileRoute("/cv")({
  loader: () => loadSeo(),
  head: ({ loaderData }) => pageHead("/cv", loaderData),
  component: CV,
});
