import { createFileRoute } from "@tanstack/react-router";
import { Contact } from "@/portfolio/pages/Contact";
import { loadSeo, pageHead } from "@/lib/seo";

export const Route = createFileRoute("/contact")({
  loader: () => loadSeo(),
  head: ({ loaderData }) => pageHead("/contact", loaderData),
  component: Contact,
});
