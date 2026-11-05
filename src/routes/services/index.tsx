import { createFileRoute } from "@tanstack/react-router";
import { Services } from "@/portfolio/pages/Services";
import { loadSeo, pageHead } from "@/lib/seo";

export const Route = createFileRoute("/services/")({
  loader: () => loadSeo(),
  head: ({ loaderData }) => pageHead("/services", loaderData),
  component: Services,
});
