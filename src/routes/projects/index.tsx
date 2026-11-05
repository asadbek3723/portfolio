import { createFileRoute } from "@tanstack/react-router";
import { Projects } from "@/portfolio/pages/Projects";
import { loadSeo, pageHead } from "@/lib/seo";

export const Route = createFileRoute("/projects/")({
  loader: () => loadSeo(),
  head: ({ loaderData }) => pageHead("/projects", loaderData),
  component: Projects,
});
