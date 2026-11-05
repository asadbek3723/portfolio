import { createFileRoute } from "@tanstack/react-router";
import { Home } from "@/portfolio/pages/Home";
import { loadSeo, pageHead } from "@/lib/seo";

export const Route = createFileRoute("/")({
  loader: () => loadSeo(),
  head: ({ loaderData }) => pageHead("/", loaderData),
  component: Home,
});
