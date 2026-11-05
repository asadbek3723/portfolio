import { createFileRoute } from "@tanstack/react-router";
import { BlogPost } from "@/portfolio/pages/BlogPost";
import { detailHead, getRequestOrigin } from "@/lib/seo";

export const Route = createFileRoute("/blog/$slug")({
  loader: async () => ({ origin: await getRequestOrigin().catch(() => undefined) }),
  head: ({ params, loaderData }) => detailHead("blog", params.slug, loaderData?.origin),
  component: BlogPost,
});
