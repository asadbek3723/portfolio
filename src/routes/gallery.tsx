import { createFileRoute } from "@tanstack/react-router";
import { Gallery } from "@/portfolio/pages/Gallery";
import { loadSeo, pageHead } from "@/lib/seo";

export const Route = createFileRoute("/gallery")({
  loader: () => loadSeo(),
  head: ({ loaderData }) => pageHead("/gallery", loaderData),
  component: Gallery,
});
