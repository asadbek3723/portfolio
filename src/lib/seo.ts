import { createServerFn } from "@tanstack/react-start";
import { getRequest } from "@tanstack/react-start/server";
import {
  achievementsData,
  blogData,
  certificatesData,
  eventsData,
  projectsData,
  servicesData,
} from "@/portfolio/data/portfolioData";

export const getRequestOrigin = createServerFn({ method: "GET" }).handler(() => {
  const req = getRequest();
  const url = new URL(req.url);
  const sandboxHost = url.hostname === "localhost" ? req.headers.get("x-forwarded-host") : null;
  return sandboxHost ? `https://${sandboxHost}` : url.origin;
});

type Kind = "projects" | "blog" | "services" | "certificates" | "achievements" | "events";
type Loc = string | { uz: string; en?: string };
type Item = {
  slug: string;
  title: Loc;
  summary?: Loc;
  excerpt?: Loc;
  description?: Loc;
  cover?: string;
  image?: string;
};

const SOURCES: Record<Kind, { list: Item[]; label: string }> = {
  projects: { list: projectsData as unknown as Item[], label: "Project" },
  blog: { list: blogData as unknown as Item[], label: "Blog" },
  services: { list: servicesData as unknown as Item[], label: "Service" },
  certificates: { list: certificatesData as unknown as Item[], label: "Certificate" },
  achievements: { list: achievementsData as unknown as Item[], label: "Achievement" },
  events: { list: eventsData as unknown as Item[], label: "Event" },
};

const SITE = "Asadbek Jumanazarov";
const DEFAULT_IMAGE = "/assets/asadbek-portrait.jpg";
const text = (v: Loc | undefined) => (typeof v === "string" ? v : (v?.uz ?? ""));

/** Share-sized (1200x630) copy of a page image, generated into /public/og. */
export function shareImagePath(src: string) {
  const file = src.split("/").pop() ?? "";
  return `/og/${file}`;
}

export function detailHead(kind: Kind, slug: string, origin: string | undefined) {
  const { list, label } = SOURCES[kind];
  const item = list.find((i) => i.slug === slug);
  const path = `/${kind}/${slug}`;
  if (!item) {
    return { meta: [{ title: `${label} — ${SITE}` }, { name: "robots", content: "noindex" }] };
  }
  const title = `${text(item.title)} — ${SITE}`;
  const description = (text(item.summary) || text(item.excerpt) || text(item.description)).slice(0, 160);
  const image = shareImagePath(item.cover ?? item.image ?? DEFAULT_IMAGE);
  const meta: Array<Record<string, string>> = [
    { title },
    { name: "description", content: description },
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:type", content: "article" },
    { property: "og:url", content: path },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: title },
    { name: "twitter:description", content: description },
  ];
  if (origin) {
    meta.push(
      { property: "og:image", content: `${origin}${image}` },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { name: "twitter:image", content: `${origin}${image}` },
    );
  }
  return { meta, links: [{ rel: "canonical", href: path }] };
}
