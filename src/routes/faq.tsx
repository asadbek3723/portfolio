import { createFileRoute } from "@tanstack/react-router";
import { FAQ } from "@/portfolio/pages/FAQ";
import { loadSeo, pageHead } from "@/lib/seo";

export const Route = createFileRoute("/faq")({
  loader: () => loadSeo(),
  head: ({ loaderData }) => pageHead("/faq", loaderData),
  component: FAQ,
});
