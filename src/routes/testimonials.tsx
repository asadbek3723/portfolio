import { createFileRoute } from "@tanstack/react-router";
import { Testimonials } from "@/portfolio/pages/Testimonials";
import { loadSeo, pageHead } from "@/lib/seo";

export const Route = createFileRoute("/testimonials")({
  loader: () => loadSeo(),
  head: ({ loaderData }) => pageHead("/testimonials", loaderData),
  component: Testimonials,
});
