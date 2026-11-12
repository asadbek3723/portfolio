// Canonical site identity used by SEO (meta tags, sitemap, structured data).
// Must be the host that answers 200: the hosting redirects jumanazarov.uz -> www.jumanazarov.uz, and a canonical
// pointing at a redirecting URL makes Google drop the favicon and split ranking between the two hosts.
export const SITE_URL = ((import.meta.env["VITE_SITE_URL"] as string | undefined) || "https://www.jumanazarov.uz").replace(/\/+$/, "");
export const SITE_NAME = "Asadbek Jumanazarov";
export const PERSON_NAME = "Asadbek Jumanazarov";
export const JOB_TITLE = "Software Developer";
export const COMPANY = { name: "TriCorp" };
/** 1200x630 business-card share image shown by Telegram, LinkedIn, Instagram, X, Facebook, Google Discover. */
export const SHARE_CARD = "/og/share-card.jpg";

export const abs = (path: string) => (/^https?:\/\//i.test(path) ? path : `${SITE_URL}${path.startsWith("/") ? "" : "/"}${path}`);
