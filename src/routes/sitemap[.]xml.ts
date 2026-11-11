import { createFileRoute } from "@tanstack/react-router";

const esc = (v: string) => v.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;");

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const { getRawContent } = await import("@/lib/content.server");
        const { abs } = await import("@/lib/site");
        const raw = await getRawContent();
        const list = (k: string) => (Array.isArray(raw[k]) ? (raw[k] as Record<string, unknown>[]) : []);
        const str = (v: unknown) => (typeof v === "string" ? v : "");
        const loc = (v: unknown) => { const o = v as { uz?: string; en?: string } | undefined; return o?.uz || o?.en || ""; };
        type Img = { src: string; title: string; caption?: string };
        type Entry = { path: string; lastmod?: string | undefined; priority: string; images: Img[] };
        const date = (d: string) => (/^\d{4}-\d{2}-\d{2}/.test(d) ? d.slice(0, 10) : /^\d{4}-\d{2}$/.test(d) ? `${d}-01` : undefined);
        const img = (src: unknown, title: string, caption?: string): Img[] => (str(src) ? [{ src: str(src), title, ...(caption ? { caption } : {}) }] : []);

        const profile = (raw["profile"] ?? {}) as Record<string, unknown>;
        const entries: Entry[] = [
          { path: "/", priority: "1.0", images: img(profile["portrait"], "Asadbek Jumanazarov — Software Developer, Co-Founder of TriCorp") },
          ...["/about", "/projects", "/services", "/blog", "/gallery", "/contact", "/cv", "/faq", "/skills", "/certificates", "/achievements", "/events", "/uses", "/match", ...(list("testimonials").length ? ["/testimonials"] : [])].map((path): Entry => ({ path, priority: path === "/about" || path === "/projects" || path === "/contact" ? "0.9" : "0.7", images: [] })),
        ];
        const gallery = list("gallery").flatMap((g) => img(g["src"], loc(g["caption"]) || "Asadbek Jumanazarov", loc(g["caption"])));
        const galleryEntry = entries.find((e) => e.path === "/gallery"); if (galleryEntry) galleryEntry.images = gallery;
        // The strongest pages also list every photo of Asadbek, so image search ties them to his name.
        const portrait = img(profile["portrait"], "Asadbek Jumanazarov — Software Developer, Co-Founder of TriCorp", "Asadbek Jumanazarov portreti");
        for (const e of entries) if (e.path === "/" || e.path === "/about") e.images = [...(e.path === "/" ? e.images : portrait), ...gallery.filter((g) => g.src !== str(profile["portrait"]))];
        for (const x of list("projects")) entries.push({ path: `/projects/${x["slug"]}`, priority: "0.8", images: [...img(x["cover"], `${loc(x["title"])} — loyiha`, loc(x["summary"])), ...(Array.isArray(x["images"]) ? (x["images"] as string[]).filter((s) => s !== x["cover"]).flatMap((s) => img(s, `${loc(x["title"])} — skrinshot`)) : [])] });
        for (const x of list("blog")) entries.push({ path: `/blog/${x["slug"]}`, lastmod: date(str(x["date"])), priority: "0.8", images: [] });
        for (const x of list("services")) entries.push({ path: `/services/${x["slug"]}`, priority: "0.7", images: img(x["cover"], loc(x["title"])) });
        for (const x of list("certificates")) entries.push({ path: `/certificates/${x["slug"]}`, lastmod: date(str(x["date"])), priority: "0.5", images: img(x["image"], str(x["title"])) });
        for (const x of list("achievements")) entries.push({ path: `/achievements/${x["slug"]}`, lastmod: date(str(x["date"])), priority: "0.7", images: img(x["cover"], loc(x["title"]), loc(x["description"])) });
        for (const x of list("events")) entries.push({ path: `/events/${x["slug"]}`, lastmod: date(str(x["date"])), priority: "0.7", images: img(x["cover"], str(x["title"]), loc(x["description"])) });

        const body = entries.map((e) => `  <url>\n    <loc>${esc(abs(e.path))}</loc>${e.lastmod ? `\n    <lastmod>${e.lastmod}</lastmod>` : ""}\n    <priority>${e.priority}</priority>${e.images.map((i) => `\n    <image:image>\n      <image:loc>${esc(abs(i.src))}</image:loc>\n      <image:title>${esc(i.title)}</image:title>${i.caption ? `\n      <image:caption>${esc(i.caption)}</image:caption>` : ""}\n    </image:image>`).join("")}\n  </url>`).join("\n");
        const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n${body}\n</urlset>\n`;
        return new Response(xml, { headers: { "content-type": "application/xml; charset=utf-8", "cache-control": "public, max-age=900, s-maxage=900" } });
      },
    },
  },
});
