import { createFileRoute } from "@tanstack/react-router";
import { BlogPost } from "@/portfolio/pages/BlogPost";
import { detailHead, loadSeo } from "@/lib/seo";

export const Route = createFileRoute("/blog/$slug")({
  loader: () => loadSeo(),
  head: ({ params, loaderData }) => detailHead("blog", params.slug, loaderData),
  component: BlogPost,
});
