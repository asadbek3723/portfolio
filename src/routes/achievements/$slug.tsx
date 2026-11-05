import { createFileRoute } from "@tanstack/react-router";
import { AchievementDetail } from "@/portfolio/pages/AchievementDetail";
import { detailHead, loadSeo } from "@/lib/seo";

export const Route = createFileRoute("/achievements/$slug")({
  loader: () => loadSeo(),
  head: ({ params, loaderData }) => detailHead("achievements", params.slug, loaderData),
  component: AchievementDetail,
});
