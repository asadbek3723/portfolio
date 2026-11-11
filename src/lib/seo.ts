import { createServerFn } from "@tanstack/react-start";
import { abs, COMPANY, JOB_TITLE, PERSON_NAME, SHARE_CARD, SITE_NAME, SITE_URL } from "./site";
import { OG_FILES } from "./og-files";
import { jsonForScript, safeIso } from "./safe-url";
import { seedSeo, type Loc, type SeoContent } from "./seo-content";

export type { SeoContent } from "./seo-content";

// ---------------------------------------------------------------- data ---------------------------------
const fetchSeo = createServerFn({ method: "GET" }).handler(async () => (await import("./content.server")).getSeoContent());

let memo: { at: number; value: Promise<SeoContent> } | null = null;
/** Route loader: published content for meta tags. Server: always fresh (cached 60s there). Browser: reused for 5 min. */
export async function loadSeo(): Promise<SeoContent> {
  if (typeof window === "undefined") return fetchSeo().catch(() => seedSeo());
  if (!memo || Date.now() - memo.at > 300_000) memo = { at: Date.now(), value: fetchSeo().catch(() => seedSeo()) };
  return memo.value;
}

// ---------------------------------------------------------------- helpers ------------------------------
const t = (v: Loc | string | undefined): string => (typeof v === "string" ? v : (v?.uz || v?.en || v?.ru || ""));
const clip = (text: string, n: number) => (text.length <= n ? text : `${text.slice(0, n - 1).replace(/\s+\S*$/, "")}…`);
const clean = (text: string) => text.replace(/\s+/g, " ").trim();

/** Share image: the 1200x630 copy when it exists, otherwise the image itself, otherwise the business card. */
export function shareImage(src?: string): string {
  if (!src) return abs(SHARE_CARD);
  const file = src.split("?")[0]!.split("/").pop() ?? "";
  return OG_FILES.has(file) ? abs(`/og/${file}`) : abs(src);
}

const ROBOTS = "index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1";

type Json = Record<string, unknown>;
interface HeadInput {
  path: string;
  title: string;
  description: string;
  image?: string;
  imageAlt?: string;
  type?: "website" | "article" | "profile";
  published?: string;
  tags?: string[];
  jsonLd?: Json[];
  noindex?: boolean | undefined;
}

export function buildHead(i: HeadInput) {
  const url = abs(i.path === "/" ? "/" : i.path);
  const description = clip(clean(i.description), 300);
  const image = i.image ?? abs(SHARE_CARD);
  const meta: Array<Record<string, string>> = [
    { title: i.title },
    { name: "description", content: clip(description, 160) },
    { name: "robots", content: i.noindex ? "noindex,nofollow" : ROBOTS },
    { name: "author", content: PERSON_NAME },
    { name: "theme-color", content: "#050607" },
    { property: "og:site_name", content: SITE_NAME },
    { property: "og:title", content: i.title },
    { property: "og:description", content: clip(description, 200) },
    { property: "og:type", content: i.type ?? "website" },
    { property: "og:url", content: url },
    { property: "og:locale", content: "uz_UZ" },
    { property: "og:locale:alternate", content: "en_US" },
    { property: "og:locale:alternate", content: "ru_RU" },
    { property: "og:image", content: image },
    { property: "og:image:secure_url", content: image },
    // Only the generated /og copies are known to be 1200x630; other images keep their own size.
    ...(image.includes("/og/") ? [{ property: "og:image:width", content: "1200" }, { property: "og:image:height", content: "630" }] : []),
    { property: "og:image:alt", content: i.imageAlt ?? `${PERSON_NAME} — ${JOB_TITLE}, Co-Founder of ${COMPANY.name}` },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: i.title },
    { name: "twitter:description", content: clip(description, 200) },
    { name: "twitter:image", content: image },
    { name: "twitter:image:alt", content: i.imageAlt ?? `${PERSON_NAME} — ${JOB_TITLE}` },
  ];
  if (i.type === "article") {
    meta.push({ property: "article:author", content: abs("/about") });
    const published = safeIso(i.published);
    if (published) meta.push({ property: "article:published_time", content: published });
    for (const tag of i.tags ?? []) meta.push({ property: "article:tag", content: tag });
  }
  const scripts = (i.jsonLd?.length && !i.noindex ? [{ type: "application/ld+json", children: jsonForScript({ "@context": "https://schema.org", "@graph": i.jsonLd }) }] : []) as { type: string; children: string }[];
  return { meta, links: [{ rel: "canonical", href: url }], scripts };
}

// ---------------------------------------------------------------- structured data --------------------
const personId = `${SITE_URL}/#person`;
const websiteId = `${SITE_URL}/#website`;

/** Photos of the person: the portrait first, then every gallery photo (all of them show Asadbek or his team). */
function personImages(seo: SeoContent): Json[] {
  const p = seo.profile;
  const portrait = abs(p.portrait || SHARE_CARD);
  const photos: Json[] = [{ "@type": "ImageObject", "@id": `${portrait}#image`, url: portrait, contentUrl: portrait, caption: `${p.name} — ${JOB_TITLE}, Co-Founder of ${COMPANY.name}`, creditText: SITE_NAME, creator: { "@id": personId }, copyrightNotice: `© ${SITE_NAME}`, acquireLicensePage: abs("/contact"), representativeOfPage: true }];
  for (const g of seo.gallery) {
    const url = abs(g.src);
    if (url !== portrait) photos.push({ "@type": "ImageObject", "@id": `${url}#image`, url, contentUrl: url, caption: t(g.caption) || p.name, creditText: SITE_NAME, creator: { "@id": personId }, copyrightNotice: `© ${SITE_NAME}`, acquireLicensePage: abs("/contact") });
  }
  return photos;
}

function person(seo: SeoContent): Json {
  const p = seo.profile;
  const skillNames = seo.skills.map((x) => x.name);
  const knowsAbout = [...new Set(["Web development", "Full-stack development", ...skillNames, "Application security", "Penetration testing", "AI integration"])];
  return {
    "@type": "Person", "@id": personId, name: p.name,
    alternateName: ["Asadbek Jumanazarov Azamat o'g'li", "Jumanazarov Asadbek", "Asadbek Jumanazarov Azamatovich", "Асадбек Жуманазаров", "Жуманазаров Асадбек"],
    givenName: "Asadbek", familyName: "Jumanazarov",
    jobTitle: [JOB_TITLE, "Full-Stack Developer", `Co-Founder of ${COMPANY.name}`],
    description: clip(clean(t(p.bio)), 300), disambiguatingDescription: `${JOB_TITLE} and Co-Founder of ${COMPANY.name} from Shovot, Khorezm, Uzbekistan; 1st place winner of the National AI Hackathon: Khorezm 2026 with CarVision.`,
    url: SITE_URL, mainEntityOfPage: abs("/about"),
    image: personImages(seo),
    sameAs: p.socials.map((x) => x.url).filter((u) => /^https?:\/\//.test(u)),
    worksFor: { "@type": "Organization", name: COMPANY.name },
    hasOccupation: seo.timeline.filter((x) => !x.noindex).map((x) => ({ "@type": "Occupation", name: t(x.title), description: clip(clean(t(x.description)), 300), occupationLocation: { "@type": "Place", name: x.place } })),
    address: { "@type": "PostalAddress", addressLocality: "Shovot", addressRegion: "Xorazm", addressCountry: "UZ" },
    homeLocation: { "@type": "Place", name: "Shovot, Khorezm, Uzbekistan" },
    nationality: { "@type": "Country", name: "Uzbekistan" },
    knowsLanguage: ["uz", "en", "ru"],
    knowsAbout,
    award: seo.achievements.map((x) => `${t(x.title)} (${x.date})`),
    hasCredential: seo.certificates.map((x) => ({ "@type": "EducationalOccupationalCredential", name: x.title, url: abs(`/certificates/${x.slug}`), recognizedBy: { "@type": "Organization", name: x.issuer }, ...(x.date ? { dateCreated: x.date } : {}) })),
    performerIn: seo.events.map((x) => ({ "@type": "Event", name: x.title, startDate: x.date, url: abs(`/events/${x.slug}`), location: { "@type": "Place", name: x.location } })),
    subjectOf: seo.achievements.map((x) => ({ "@id": `${abs(`/achievements/${x.slug}`)}#article` })),
  };
}

/** Projects as CreativeWorks made by the person, for the home and about pages. */
const projectWorks = (seo: SeoContent): Json[] => seo.projects.filter((x) => !x.noindex).map((x) => ({ "@type": "CreativeWork", "@id": `${abs(`/projects/${x.slug}`)}#project`, name: t(x.title), description: clip(clean(t(x.summary)), 300), url: abs(`/projects/${x.slug}`), image: abs(x.cover), creator: { "@id": personId }, keywords: x.stack.join(", "), ...(x.year ? { dateCreated: String(x.year) } : {}) }));
const website = (): Json => ({ "@type": "WebSite", "@id": websiteId, url: SITE_URL, name: `${SITE_NAME} — ${JOB_TITLE}`, inLanguage: ["uz", "en", "ru"], publisher: { "@id": personId } });
const webpage = (path: string, name: string, description: string, type = "WebPage", extra: Json = {}): Json => ({ "@type": type, "@id": `${abs(path)}#webpage`, url: abs(path), name, description: clip(clean(description), 300), isPartOf: { "@id": websiteId }, about: { "@id": personId }, inLanguage: "uz", ...extra });
const crumbs = (items: [string, string][]): Json => ({ "@type": "BreadcrumbList", itemListElement: items.map(([name, path], idx) => ({ "@type": "ListItem", position: idx + 1, name, item: abs(path) })) });
const itemList = (items: { name: string; path: string }[]): Json => ({ "@type": "ItemList", itemListElement: items.map((x, idx) => ({ "@type": "ListItem", position: idx + 1, name: x.name, url: abs(x.path) })) });

// ---------------------------------------------------------------- static pages -----------------------
const TAIL = `${SITE_NAME}`;
interface Page { title: string; description: string; ld?: (seo: SeoContent, path: string) => Json[] }

const PAGES: Record<string, Page> = {
  "/": {
    title: `${SITE_NAME} — ${JOB_TITLE} | Co-Founder of ${COMPANY.name}`,
    description: `${SITE_NAME} — Full-Stack dasturchi (Software Developer) va ${COMPANY.name} hammuassisi, Xorazm, O'zbekiston. Veb-platformalar, admin panellar, AI integratsiyali web-ilovalar va ilovalar xavfsizligi. Loyihalar, xizmatlar va aloqa.`,
    ld: (seo) => [website(), person(seo), webpage("/", `${SITE_NAME} — ${JOB_TITLE}`, t(seo.profile.bio), "ProfilePage", { mainEntity: { "@id": personId }, primaryImageOfPage: { "@id": `${abs(seo.profile.portrait || SHARE_CARD)}#image` } }), ...projectWorks(seo)],
  },
  "/about": {
    title: `Men haqimda — ${SITE_NAME} | ${JOB_TITLE}`,
    description: `${SITE_NAME} kim? Full-Stack dasturchi, ${COMPANY.name} hammuassisi. Tajriba, ko'nikmalar, hackathon g'alabasi va ish tarixi: React, TypeScript, Node.js, Python, PostgreSQL, Supabase.`,
    ld: (seo, p) => [person(seo), webpage(p, `Men haqimda — ${SITE_NAME}`, t(seo.profile.bio), "ProfilePage", { mainEntity: { "@id": personId }, primaryImageOfPage: { "@id": `${abs(seo.profile.portrait || SHARE_CARD)}#image` } }), ...projectWorks(seo), crumbs([["Bosh sahifa", "/"], ["Men haqimda", p]])],
  },
  "/projects": {
    title: `Loyihalar — ${TAIL} | Veb-platformalar va ilovalar`,
    description: `${SITE_NAME} yaratgan haqiqiy loyihalar: UZEX AI, IELTS Imperia, House Mobile, Döner Food. React, Next.js, Electron va Supabase asosidagi veb-platformalar.`,
    ld: (seo, p) => [webpage(p, "Loyihalar", "Loyihalar ro'yxati", "CollectionPage"), itemList(seo.projects.filter((x) => !x.noindex).map((x) => ({ name: t(x.title), path: `/projects/${x.slug}` }))), crumbs([["Bosh sahifa", "/"], ["Loyihalar", p]])],
  },
  "/services": {
    title: `Xizmatlar — veb-sayt, web-ilova, backend | ${TAIL}`,
    description: `Veb-sayt yaratish, web-ilovalar, UI/UX dizayn, backend va API, tezlikni optimallash va xavfsizlik. ${SITE_NAME} — ${COMPANY.name} hammuassisi.`,
    ld: (seo, p) => [webpage(p, "Xizmatlar", "Xizmatlar ro'yxati", "CollectionPage"), itemList(seo.services.filter((x) => !x.noindex).map((x) => ({ name: t(x.title), path: `/services/${x.slug}` }))), crumbs([["Bosh sahifa", "/"], ["Xizmatlar", p]])],
  },
  "/skills": {
    title: `Ko'nikmalar — React, TypeScript, Node.js, Python | ${TAIL}`,
    description: `${SITE_NAME} texnologiyalari: React, TypeScript, JavaScript, Next.js, Node.js, Python, PostgreSQL, Supabase, Tailwind CSS, Git, Figma va AI/LLM integratsiyasi.`,
    ld: (_s, p) => [webpage(p, "Ko'nikmalar", "Texnologiyalar va ko'nikmalar", "CollectionPage"), crumbs([["Bosh sahifa", "/"], ["Ko'nikmalar", p]])],
  },
  "/certificates": {
    title: `Sertifikatlar — ${TAIL} | Software Developer`,
    description: `${SITE_NAME} sertifikatlari va ta'lim yutuqlari: CEFR B2 ingliz tili va dasturlash bo'yicha kurslar.`,
    ld: (seo, p) => [webpage(p, "Sertifikatlar", "Sertifikatlar ro'yxati", "CollectionPage"), itemList(seo.certificates.filter((x) => !x.noindex).map((x) => ({ name: x.title, path: `/certificates/${x.slug}` }))), crumbs([["Bosh sahifa", "/"], ["Sertifikatlar", p]])],
  },
  "/achievements": {
    title: `Yutuqlar — National AI Hackathon 1-o'rin | ${TAIL}`,
    description: `${SITE_NAME} yutuqlari: 2026-yil National AI Hackathon (Xorazm) g'olibi, 1-o'rin, CarVision loyihasi bilan jamoada.`,
    ld: (seo, p) => [webpage(p, "Yutuqlar", "Yutuqlar ro'yxati", "CollectionPage"), itemList(seo.achievements.filter((x) => !x.noindex).map((x) => ({ name: t(x.title), path: `/achievements/${x.slug}` }))), crumbs([["Bosh sahifa", "/"], ["Yutuqlar", p]])],
  },
  "/events": {
    title: `Tadbirlar — hackathon va konferensiyalar | ${TAIL}`,
    description: `${SITE_NAME} qatnashgan tadbirlar: National AI Hackathon: Khorezm (17–20 sentabr 2026), hackathonlar va dasturchilar tadbirlari.`,
    ld: (seo, p) => [webpage(p, "Tadbirlar", "Tadbirlar ro'yxati", "CollectionPage"), itemList(seo.events.filter((x) => !x.noindex).map((x) => ({ name: x.title, path: `/events/${x.slug}` }))), crumbs([["Bosh sahifa", "/"], ["Tadbirlar", p]])],
  },
  "/gallery": {
    title: `Galereya — fotosuratlar | ${TAIL}, Software Developer`,
    description: `${SITE_NAME} fotogalereyasi: National AI Hackathon 2026 g'oliblari, CarVision taqdimoti, jamoa va tadbirlardan lavhalar.`,
    ld: (seo, p) => [
      webpage(p, "Galereya", "Fotogalereya", "ImageGallery", { associatedMedia: seo.gallery.map((g) => ({ "@id": `${abs(g.src)}#image` })) }),
      ...seo.gallery.map((g): Json => ({ "@type": "ImageObject", "@id": `${abs(g.src)}#image`, contentUrl: abs(g.src), url: abs(g.src), name: clip(clean(t(g.caption)), 110), caption: t(g.caption), description: `${t(g.caption)} — ${SITE_NAME}`, creator: { "@id": personId }, creditText: SITE_NAME, copyrightNotice: `© ${new Date().getFullYear()} ${SITE_NAME}`, acquireLicensePage: abs("/contact"), representativeOfPage: false })),
      crumbs([["Bosh sahifa", "/"], ["Galereya", p]]),
    ],
  },
  "/blog": {
    title: `Blog — dasturlash, xavfsizlik va AI haqida | ${TAIL}`,
    description: `${SITE_NAME} blogi: veb-xavfsizlik, Supabase RLS, arxitektura, AI bilan dasturlash va karyera haqida amaliy maqolalar.`,
    ld: (seo, p) => [webpage(p, "Blog", "Maqolalar", "Blog"), itemList(seo.blog.filter((x) => !x.noindex).map((x) => ({ name: t(x.title), path: `/blog/${x.slug}` }))), crumbs([["Bosh sahifa", "/"], ["Blog", p]])],
  },
  "/testimonials": {
    title: `Fikrlar — mijozlar sharhlari | ${TAIL}`,
    description: `${SITE_NAME} bilan ishlagan mijozlar va hamkorlarning fikrlari.`,
    ld: (_s, p) => [webpage(p, "Fikrlar", "Mijozlar fikrlari"), crumbs([["Bosh sahifa", "/"], ["Fikrlar", p]])],
  },
  "/faq": {
    title: `Ko'p so'raladigan savollar — FAQ | ${TAIL}`,
    description: `Veb-sayt yaratish muddati, narx, texnologiyalar, xavfsizlik va hamkorlik haqida savollarga javoblar. ${SITE_NAME}.`,
    ld: (seo, p) => [
      webpage(p, "FAQ", "Ko'p so'raladigan savollar"),
      { "@type": "FAQPage", "@id": `${abs(p)}#faq`, mainEntity: seo.faq.map((x) => ({ "@type": "Question", name: t(x.q), acceptedAnswer: { "@type": "Answer", text: t(x.a) } })) },
      crumbs([["Bosh sahifa", "/"], ["FAQ", p]]),
    ],
  },
  "/cv": {
    title: `CV / Rezyume — ${TAIL} | Full-Stack Developer`,
    description: `${SITE_NAME} rezyumesi: Full-Stack dasturchi, ${COMPANY.name} hammuassisi. Ish tajribasi, ko'nikmalar, yutuqlar. PDF yuklab olish.`,
    ld: (seo, p) => [person(seo), webpage(p, "CV", "Rezyume", "ProfilePage", { mainEntity: { "@id": personId } }), crumbs([["Bosh sahifa", "/"], ["CV", p]])],
  },
  "/uses": {
    title: `Uses — asboblar va texnologiyalar | ${TAIL}`,
    description: `${SITE_NAME} ishlatadigan asboblar: kompyuter, kod muharriri, dasturlar va ish stack'i.`,
    ld: (_s, p) => [webpage(p, "Uses", "Asboblar"), crumbs([["Bosh sahifa", "/"], ["Uses", p]])],
  },
  "/match": {
    title: `AI tanlov — loyihangizga mos xizmatni toping | ${TAIL}`,
    description: `Loyihangizni tasvirlang: AI sizga mos xizmat, o'xshash loyiha va foydali maqolalarni tavsiya qiladi. ${SITE_NAME}.`,
    ld: (_s, p) => [webpage(p, "AI tanlov", "AI yordamida xizmat tanlash"), crumbs([["Bosh sahifa", "/"], ["AI tanlov", p]])],
  },
  "/contact": {
    title: `Aloqa — loyiha buyurtma qilish | ${TAIL}`,
    description: `${SITE_NAME} bilan bog'laning: veb-sayt, web-ilova yoki tizim buyurtma qilish. Email, telefon, Telegram va LinkedIn. Shovot, Xorazm, O'zbekiston.`,
    ld: (seo, p) => [person(seo), webpage(p, "Aloqa", "Aloqa ma'lumotlari", "ContactPage"), crumbs([["Bosh sahifa", "/"], ["Aloqa", p]])],
  },
};

/** Head for a listing / static page. `seo` comes from the route loader. */
export function pageHead(path: string, seo: SeoContent | undefined) {
  const page = PAGES[path];
  const data = seo ?? seedSeo();
  if (!page) return buildHead({ path, title: `${SITE_NAME}`, description: `${SITE_NAME} — ${JOB_TITLE}` });
  const image = shareImage();
  const thin = path === "/testimonials" && data.testimonials === 0;
  return buildHead({ path, title: page.title, description: page.description, image, jsonLd: page.ld?.(data, path) ?? [], noindex: thin });
}

// ---------------------------------------------------------------- detail pages -----------------------
export type Kind = "projects" | "blog" | "services" | "certificates" | "achievements" | "events";
const LABEL: Record<Kind, [string, string]> = {
  projects: ["Loyihalar", "/projects"], blog: ["Blog", "/blog"], services: ["Xizmatlar", "/services"],
  certificates: ["Sertifikatlar", "/certificates"], achievements: ["Yutuqlar", "/achievements"], events: ["Tadbirlar", "/events"],
};

export function detailHead(kind: Kind, slug: string, seo: SeoContent | undefined) {
  const data = seo ?? seedSeo();
  const path = `/${kind}/${slug}`;
  const [label, listPath] = LABEL[kind];
  const missing = () => buildHead({ path, title: `${label} — ${SITE_NAME}`, description: `${label} — ${SITE_NAME}`, noindex: true });
  const trail = (name: string) => crumbs([["Bosh sahifa", "/"], [label, listPath], [name, path]]);
  const creator = { "@id": personId };

  if (kind === "projects") {
    const x = data.projects.find((i) => i.slug === slug); if (!x) return missing();
    const name = t(x.title); const description = t(x.summary);
    const image = shareImage(x.cover);
    return buildHead({
      path, noindex: x.noindex, title: `${name} — loyiha | ${SITE_NAME}`, description: `${description}. ${x.stack.join(", ")}.`, image, imageAlt: `${name} — ${SITE_NAME} loyihasi`,
      jsonLd: [webpage(path, name, description, "WebPage", { primaryImageOfPage: { "@id": `${abs(x.cover)}#image` } }), { "@type": "ImageObject", "@id": `${abs(x.cover)}#image`, contentUrl: abs(x.cover), caption: name, creator },
        { "@type": "CreativeWork", "@id": `${abs(path)}#project`, name, description, url: abs(path), image: abs(x.cover), creator, author: creator, keywords: x.stack.join(", "), ...(x.year ? { dateCreated: String(x.year) } : {}), ...(x.liveUrl ? { sameAs: x.liveUrl } : {}), inLanguage: ["uz", "en", "ru"] }, trail(name)],
    });
  }
  if (kind === "blog") {
    const x = data.blog.find((i) => i.slug === slug); if (!x) return missing();
    const name = t(x.title); const description = t(x.excerpt);
    return buildHead({
      path, noindex: x.noindex, title: `${name} | ${SITE_NAME}`, description, type: "article", published: x.date, tags: x.tags, imageAlt: name,
      jsonLd: [webpage(path, name, description, "WebPage"), { "@type": "BlogPosting", "@id": `${abs(path)}#article`, headline: clip(name, 110), description, url: abs(path), mainEntityOfPage: abs(path), datePublished: x.date, dateModified: x.date, image: [shareImage()], author: creator, publisher: creator, keywords: x.tags.join(", "), inLanguage: "uz", ...(x.readMin ? { timeRequired: `PT${x.readMin}M` } : {}) }, trail(name)],
    });
  }
  if (kind === "services") {
    const x = data.services.find((i) => i.slug === slug); if (!x) return missing();
    const name = t(x.title); const description = t(x.tagline) || t(x.description);
    return buildHead({
      path, noindex: x.noindex, title: `${name} — xizmat | ${SITE_NAME}`, description: `${description} ${t(x.description)}`, image: shareImage(x.cover),
      jsonLd: [webpage(path, name, description), { "@type": "Service", "@id": `${abs(path)}#service`, name, description: t(x.description), url: abs(path), provider: creator, areaServed: ["UZ", "Worldwide"], serviceType: name }, trail(name)],
    });
  }
  if (kind === "certificates") {
    const x = data.certificates.find((i) => i.slug === slug); if (!x) return missing();
    return buildHead({
      path, noindex: x.noindex, title: `${x.title} — sertifikat | ${SITE_NAME}`, description: `${x.title} (${x.issuer}, ${x.date}). ${x.skills.join(", ")}.`, image: shareImage(x.image),
      jsonLd: [webpage(path, x.title, `${x.title} — ${x.issuer}`), { "@type": "EducationalOccupationalCredential", "@id": `${abs(path)}#credential`, name: x.title, description: x.skills.join(", "), url: abs(path), recognizedBy: { "@type": "Organization", name: x.issuer }, about: x.skills }, trail(x.title)],
    });
  }
  if (kind === "achievements") {
    const x = data.achievements.find((i) => i.slug === slug); if (!x) return missing();
    const name = t(x.title); const description = t(x.description);
    return buildHead({
      path, noindex: x.noindex, title: `${name} | ${SITE_NAME}`, description, type: "article", published: x.date.length === 7 ? `${x.date}-01` : x.date, image: shareImage(x.cover),
      jsonLd: [webpage(path, name, description), { "@type": "Article", "@id": `${abs(path)}#article`, headline: clip(name, 110), description, url: abs(path), datePublished: x.date, image: shareImage(x.cover), author: creator, about: creator, inLanguage: "uz" }, trail(name)],
    });
  }
  const x = data.events.find((i) => i.slug === slug); if (!x) return missing();
  const description = t(x.description);
  return buildHead({
    path, noindex: x.noindex, title: `${x.title} — tadbir | ${SITE_NAME}`, description, image: shareImage(x.cover), imageAlt: `${x.title} — ${SITE_NAME}`,
    jsonLd: [webpage(path, x.title, description), { "@type": "Event", "@id": `${abs(path)}#event`, name: x.title, description, url: abs(path), startDate: x.date, endDate: x.date === "2026-09-17" ? "2026-09-20" : x.date, eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode", eventStatus: "https://schema.org/EventCompleted", location: { "@type": "Place", name: x.location, address: { "@type": "PostalAddress", addressRegion: "Xorazm", addressCountry: "UZ" } }, image: shareImage(x.cover), performer: creator }, trail(x.title)],
  });
}
