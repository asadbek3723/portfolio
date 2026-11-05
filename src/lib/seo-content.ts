// Pure helpers shared by the server loader and the client fallback: a small projection of the
// content that SEO needs (titles, summaries, covers) without article bodies.
import * as seed from "@/portfolio/data/portfolioData";

export type Loc = { uz: string; en?: string; ru?: string };
type Rec = Record<string, unknown>;

export interface SeoContent {
  profile: { name: string; role: Loc; bio: Loc; portrait?: string | undefined; socials: { label: string; url: string }[]; location?: Loc | undefined };
  projects: { slug: string; title: Loc; summary: Loc; cover: string; images: string[]; year?: number | undefined; stack: string[]; liveUrl?: string | undefined; category?: string | undefined }[];
  services: { slug: string; title: Loc; description: Loc; tagline?: Loc | undefined; cover?: string | undefined }[];
  blog: { slug: string; title: Loc; excerpt: Loc; date: string; tags: string[]; readMin?: number | undefined }[];
  certificates: { slug: string; title: string; issuer: string; date: string; image?: string | undefined; skills: string[] }[];
  achievements: { slug: string; title: Loc; description: Loc; date: string; cover?: string | undefined }[];
  events: { slug: string; title: string; description: Loc; date: string; location: string; cover: string }[];
  gallery: { id: string; src: string; caption: Loc }[];
  faq: { q: Loc; a: Loc }[];
  /** number of published testimonials (empty pages are kept out of search results) */
  testimonials: number;
}

const arr = (v: unknown): Rec[] => (Array.isArray(v) ? (v as Rec[]) : []);
const s = (v: unknown) => (typeof v === "string" ? v : "");
const strs = (v: unknown) => (Array.isArray(v) ? (v as string[]) : []);

export function slim(r: Rec): SeoContent {
  const p = (r["profile"] ?? {}) as Rec;
  return {
    profile: { name: s(p["name"]) || "Asadbek Jumanazarov", role: p["role"] as Loc, bio: p["bio"] as Loc, portrait: s(p["portrait"]) || undefined, socials: arr(p["socials"]) as { label: string; url: string }[], location: p["location"] as Loc },
    projects: arr(r["projects"]).map((x) => ({ slug: s(x["slug"]), title: x["title"] as Loc, summary: x["summary"] as Loc, cover: s(x["cover"]), images: strs(x["images"]), year: x["year"] as number, stack: strs(x["stack"]), liveUrl: s(x["liveUrl"]) || undefined, category: s(x["category"]) })),
    services: arr(r["services"]).map((x) => ({ slug: s(x["slug"]), title: x["title"] as Loc, description: x["description"] as Loc, tagline: x["tagline"] as Loc, cover: s(x["cover"]) || undefined })),
    blog: arr(r["blog"]).map((x) => ({ slug: s(x["slug"]), title: x["title"] as Loc, excerpt: x["excerpt"] as Loc, date: s(x["date"]), tags: strs(x["tags"]), readMin: x["readMin"] as number })),
    certificates: arr(r["certificates"]).map((x) => ({ slug: s(x["slug"]), title: s(x["title"]), issuer: s(x["issuer"]), date: s(x["date"]), image: s(x["image"]) || undefined, skills: strs(x["skills"]) })),
    achievements: arr(r["achievements"]).map((x) => ({ slug: s(x["slug"]), title: x["title"] as Loc, description: x["description"] as Loc, date: s(x["date"]), cover: s(x["cover"]) || undefined })),
    events: arr(r["events"]).map((x) => ({ slug: s(x["slug"]), title: s(x["title"]), description: x["description"] as Loc, date: s(x["date"]), location: s(x["location"]), cover: s(x["cover"]) })),
    gallery: arr(r["gallery"]).map((x) => ({ id: s(x["id"]), src: s(x["src"]), caption: x["caption"] as Loc })),
    faq: arr(r["faq"]).map((x) => ({ q: x["q"] as Loc, a: x["a"] as Loc })),
    testimonials: arr(r["testimonials"]).length,
  };
}

export const seedRaw = (): Rec => ({
  profile: seed.profileData, projects: seed.projectsData, services: seed.servicesData, blog: seed.blogData,
  certificates: seed.certificatesData, achievements: seed.achievementsData, events: seed.eventsData,
  gallery: seed.galleryData, faq: seed.faqData, testimonials: seed.testimonialsData,
});
export const seedSeo = () => slim(seedRaw());
