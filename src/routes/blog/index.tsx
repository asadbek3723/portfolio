import { createFileRoute } from "@tanstack/react-router";
import { Blog } from "@/portfolio/pages/Blog";
import { loadSeo, pageHead } from "@/lib/seo";

export const Route = createFileRoute("/blog/")({
  loader: () => loadSeo(),
  head: ({ loaderData }) => pageHead("/blog", loaderData),
  component: Blog,
});
