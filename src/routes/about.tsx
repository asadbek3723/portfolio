import { createFileRoute } from "@tanstack/react-router";
import { About } from "@/portfolio/pages/About";
import { loadSeo, pageHead } from "@/lib/seo";

export const Route = createFileRoute("/about")({
  loader: () => loadSeo(),
  head: ({ loaderData }) => pageHead("/about", loaderData),
  component: About,
});
