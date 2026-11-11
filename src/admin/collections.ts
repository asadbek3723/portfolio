import type { ListKey } from "./data/store";

export type FieldType =
  | "text" | "textarea" | "url" | "email" | "date" | "number" | "boolean"
  | "image" | "tags" | "select" | "localized" | "object" | "array";

export interface Field {
  key: string;
  label: string;
  type: FieldType;
  multiline?: boolean;
  options?: string[];
  fields?: Field[];
  item?: Field;
  optional?: boolean;
  help?: string;
  wide?: boolean;
}

const f = {
  text: (key: string, label: string, extra: Partial<Field> = {}): Field => ({ key, label, type: "text", ...extra }),
  area: (key: string, label: string): Field => ({ key, label, type: "textarea", wide: true }),
  loc: (key: string, label: string, multiline = false): Field => ({ key, label, type: "localized", multiline, wide: multiline }),
  num: (key: string, label: string): Field => ({ key, label, type: "number" }),
  bool: (key: string, label: string): Field => ({ key, label, type: "boolean" }),
  img: (key: string, label: string, optional = false): Field => ({ key, label, type: "image", optional }),
  tags: (key: string, label: string): Field => ({ key, label, type: "tags", wide: true }),
  url: (key: string, label: string, optional = true): Field => ({ key, label, type: "url", optional }),
  date: (key: string, label: string): Field => ({ key, label, type: "date" }),
  sel: (key: string, label: string, options: string[]): Field => ({ key, label, type: "select", options }),
  obj: (key: string, label: string, fields: Field[], optional = false): Field => ({ key, label, type: "object", fields, optional, wide: true }),
  arr: (key: string, label: string, item: Field): Field => ({ key, label, type: "array", item, wide: true }),
};

const hide = f.bool("noindex", "Google/Bing qidiruvida chiqmasin (noindex)");

const media = f.obj("", "Media", [f.sel("type", "Turi", ["image", "video"]), f.img("src", "Fayl"), f.img("poster", "Poster", true), { ...f.loc("caption", "Izoh"), optional: true }]);

export interface CollectionConfig {
  key: ListKey;
  label: string;
  singular: string;
  icon: string;
  group: "content" | "about";
  title: (x: Record<string, unknown>) => string;
  subtitle?: (x: Record<string, unknown>) => string;
  image?: (x: Record<string, unknown>) => string | undefined;
  sitePath?: (x: Record<string, unknown>) => string;
  fields: Field[];
}

const locTitle = (v: unknown) => {
  if (typeof v === "string") return v;
  const o = v as { uz?: string; en?: string } | undefined;
  return o?.uz || o?.en || "—";
};

export const collections: CollectionConfig[] = [
  {
    key: "projects", label: "Loyihalar", singular: "loyiha", icon: "FolderKanban", group: "content",
    title: (x) => locTitle(x["title"]), subtitle: (x) => `${x["year"]} · ${x["category"]}`, image: (x) => x["cover"] as string,
    sitePath: (x) => `/projects/${x["slug"]}`,
    fields: [
      f.loc("title", "Sarlavha"), f.text("slug", "Slug (manzil)"), hide, f.num("year", "Yil"),
      f.sel("category", "Kategoriya", ["fullstack", "mobile", "web", "open-source"]), f.bool("featured", "Bosh sahifada"),
      f.img("cover", "Muqova"), f.loc("summary", "Qisqacha", true), f.loc("problem", "Muammo", true), f.loc("solution", "Yechim", true),
      f.tags("stack", "Texnologiyalar"), f.arr("images", "Rasmlar", f.img("", "Rasm")), f.url("liveUrl", "Sayt havolasi"), f.url("repoUrl", "Kod havolasi"),
      f.obj("detail", "Batafsil sahifa", [
        f.loc("role", "Rol"), f.text("client", "Mijoz"), f.loc("duration", "Davomiyligi"), f.loc("team", "Jamoa"), f.loc("status", "Holati"),
        f.loc("overview", "Umumiy ma'lumot", true),
        f.arr("contributions", "Hissalarim", f.loc("", "Hissa", true)),
        f.arr("features", "Imkoniyatlar", f.obj("", "Imkoniyat", [f.loc("title", "Nomi"), f.loc("text", "Matn", true)])),
        f.arr("metrics", "Raqamlar", f.obj("", "Raqam", [f.num("value", "Qiymat"), f.text("suffix", "Qo'shimcha", { optional: true }), f.loc("label", "Yorliq")])),
        f.arr("stackGroups", "Texnologiya guruhlari", f.obj("", "Guruh", [f.loc("group", "Guruh nomi"), f.tags("items", "Elementlar")])),
        f.arr("media", "Media", media),
      ], true),
    ],
  },
  {
    key: "services", label: "Xizmatlar", singular: "xizmat", icon: "Briefcase", group: "content",
    title: (x) => locTitle(x["title"]), subtitle: (x) => locTitle(x["price"]), image: (x) => x["cover"] as string | undefined,
    sitePath: (x) => `/services/${x["slug"]}`,
    fields: [
      f.loc("title", "Nomi"), f.text("slug", "Slug"), hide, f.text("icon", "Ikonka nomi"), f.loc("price", "Narx"),
      f.loc("description", "Tavsif", true), { ...f.loc("tagline", "Shior"), optional: true }, { ...f.loc("timeline", "Muddat"), optional: true }, f.img("cover", "Muqova", true),
      f.obj("detail", "Batafsil sahifa", [
        f.text("slug", "Slug"), f.img("cover", "Muqova"), f.loc("tagline", "Shior"), f.loc("overview", "Umumiy", true),
        f.arr("included", "Nimalar kiradi", f.loc("", "Band")),
        f.arr("process", "Jarayon", f.obj("", "Qadam", [f.loc("title", "Nomi"), f.loc("text", "Matn", true)])),
        f.arr("deliverables", "Natijalar", f.loc("", "Natija")), f.loc("timeline", "Muddat"),
        f.arr("packages", "Narx paketlari", f.obj("", "Paket", [f.loc("name", "Nomi"), f.loc("price", "Narx"), f.arr("features", "Imkoniyatlar", f.loc("", "Imkoniyat")), { ...f.bool("highlighted", "Ajratilgan"), optional: true }])),
        f.tags("relatedProjects", "Bog'liq loyihalar (slug)"),
        f.arr("faq", "Savollar", f.obj("", "Savol", [f.loc("q", "Savol"), f.loc("a", "Javob", true)])),
      ], true),
    ],
  },
  {
    key: "blog", label: "Blog", singular: "maqola", icon: "Newspaper", group: "content",
    title: (x) => locTitle(x["title"]), subtitle: (x) => `${x["date"]} · ${x["readMin"]} min`, sitePath: (x) => `/blog/${x["slug"]}`,
    fields: [
      f.loc("title", "Sarlavha"), f.text("slug", "Slug"), hide, f.date("date", "Sana"), f.num("readMin", "O'qish vaqti (daq)"),
      f.tags("tags", "Teglar"), f.loc("excerpt", "Qisqacha", true),
      { ...f.loc("body", "Matn (paragraflar bo'sh qator bilan ajratiladi)", true), help: "body" },
    ],
  },
  {
    key: "skills", label: "Ko'nikmalar", singular: "ko'nikma", icon: "Sparkles", group: "about",
    title: (x) => String(x["name"]), subtitle: (x) => `${x["category"]} · ${x["level"]}%`,
    fields: [f.text("name", "Nomi"), f.sel("category", "Kategoriya", ["frontend", "backend", "tools"]), f.num("level", "Daraja (0-100)")],
  },
  {
    key: "certificates", label: "Sertifikatlar", singular: "sertifikat", icon: "Award", group: "about",
    title: (x) => String(x["title"]), subtitle: (x) => `${x["issuer"]} · ${x["date"]}`, image: (x) => x["image"] as string | undefined,
    sitePath: (x) => `/certificates/${x["slug"]}`,
    fields: [
      f.text("title", "Nomi"), f.text("slug", "Slug"), hide, f.text("issuer", "Beruvchi"), f.date("date", "Sana"), f.tags("skills", "Ko'nikmalar"),
      f.text("credentialId", "ID", { optional: true }), f.num("hours", "Soat"), f.url("verifyUrl", "Tekshirish havolasi"), f.img("image", "Rasm", true),
      f.obj("detail", "Batafsil", [f.text("slug", "Slug"), f.text("credentialId", "ID"), f.num("hours", "Soat"), f.tags("skills", "Ko'nikmalar"), f.loc("description", "Tavsif", true), f.img("image", "Rasm"), f.url("verifyUrl", "Havola", false)], true),
    ],
  },
  {
    key: "achievements", label: "Yutuqlar", singular: "yutuq", icon: "Trophy", group: "about",
    title: (x) => locTitle(x["title"]), subtitle: (x) => `${locTitle(x["place"])} · ${x["date"]}`, image: (x) => x["cover"] as string | undefined,
    sitePath: (x) => `/achievements/${x["slug"]}`,
    fields: [
      f.loc("title", "Nomi"), f.text("slug", "Slug"), hide, f.date("date", "Sana"), f.loc("place", "O'rin"), f.loc("description", "Tavsif", true), f.img("cover", "Muqova", true),
      f.obj("detail", "Batafsil", [
        f.text("slug", "Slug"), f.img("cover", "Muqova"), f.loc("story", "Hikoya", true), f.loc("built", "Nima qurildi", true), f.loc("team", "Jamoa"),
        f.obj("feedback", "Fikr", [f.loc("quote", "Iqtibos", true), f.text("author", "Muallif")], true),
        f.arr("media", "Rasmlar", f.obj("", "Rasm", [f.sel("type", "Turi", ["image"]), f.img("src", "Fayl")])),
        f.text("relatedProject", "Bog'liq loyiha (slug)", { optional: true }),
      ], true),
    ],
  },
  {
    key: "events", label: "Tadbirlar", singular: "tadbir", icon: "CalendarDays", group: "about",
    title: (x) => String(x["title"]), subtitle: (x) => `${x["location"]} · ${x["date"]}`, image: (x) => x["cover"] as string,
    sitePath: (x) => `/events/${x["slug"]}`,
    fields: [
      f.text("title", "Nomi"), f.text("slug", "Slug"), hide, f.text("location", "Joy"), f.date("date", "Sana"), f.loc("role", "Rolim"), f.loc("description", "Tavsif", true), f.img("cover", "Muqova"),
      f.obj("detail", "Batafsil", [
        f.text("slug", "Slug"), f.img("cover", "Muqova"), f.loc("story", "Hikoya", true), f.arr("highlights", "Muhim lahzalar", f.loc("", "Lahza")),
        f.arr("outcomes", "Natijalar", f.obj("", "Natija", [f.num("value", "Qiymat"), f.text("suffix", "Qo'shimcha", { optional: true }), f.loc("label", "Yorliq")])),
        f.arr("media", "Media", media), f.arr("links", "Havolalar", f.obj("", "Havola", [f.text("label", "Nomi"), f.url("url", "URL", false)])),
      ], true),
    ],
  },
  {
    key: "gallery", label: "Galereya", singular: "rasm", icon: "Images", group: "content",
    title: (x) => locTitle(x["caption"]), image: (x) => x["src"] as string,
    fields: [f.img("src", "Rasm"), f.loc("caption", "Izoh"), f.bool("tall", "Baland format")],
  },
  {
    key: "testimonials", label: "Fikrlar", singular: "fikr", icon: "MessageSquareQuote", group: "content",
    title: (x) => String(x["name"]), subtitle: (x) => String(x["role"]),
    fields: [f.text("name", "Ism"), f.text("role", "Lavozim"), f.loc("quote", "Fikr", true)],
  },
  {
    key: "faq", label: "Savollar (FAQ)", singular: "savol", icon: "CircleHelp", group: "content",
    title: (x) => locTitle(x["q"]),
    fields: [f.loc("q", "Savol"), f.loc("a", "Javob", true)],
  },
  {
    key: "timeline", label: "Tajriba tarixi", singular: "bosqich", icon: "History", group: "about",
    title: (x) => locTitle(x["title"]), subtitle: (x) => `${x["year"]} · ${x["place"]}`,
    fields: [f.text("year", "Yil"), f.loc("title", "Nomi"), f.text("place", "Joy"), hide, f.loc("description", "Tavsif", true)],
  },
  {
    key: "uses", label: "Asboblar", singular: "asbob", icon: "Wrench", group: "about",
    title: (x) => String(x["name"]), subtitle: (x) => String(x["group"]),
    fields: [f.text("group", "Guruh"), f.text("name", "Nomi"), f.loc("note", "Izoh")],
  },
];

export const profileFields: Field[] = [
  f.text("name", "Ism"), { key: "email", label: "Email", type: "email" }, f.text("phone", "Telefon"), f.loc("role", "Kasb"), f.loc("location", "Manzil"),
  f.loc("bio", "Bio", true), f.text("cvUrl", "CV havolasi"), f.img("portrait", "Profil rasmi", true), f.bool("available", "Ishga tayyor"),
  f.arr("stats", "Bosh sahifa raqamlari", f.obj("", "Raqam", [f.num("value", "Qiymat"), f.text("suffix", "Qo'shimcha (masalan +)", { optional: true }), f.loc("label", "Yorliq")])),
  f.arr("socials", "Ijtimoiy tarmoqlar", f.obj("", "Tarmoq", [f.text("label", "Nomi"), f.url("url", "URL", false)])),
];

export const getCollection = (key: string) => collections.find((c) => c.key === key);

/** Builds an empty value for a field tree. */
export function blankFor(field: Field): unknown {
  switch (field.type) {
    case "number": return 0;
    case "boolean": return false;
    case "tags": case "array": return [];
    case "localized": return { uz: "", en: "", ru: "" };
    case "select": return field.options?.[0] ?? "";
    case "object": return Object.fromEntries((field.fields ?? []).filter((x) => !x["optional"] || x["type"] !== "object").map((x) => [x["key"], blankFor(x)]));
    default: return "";
  }
}
export function blankItem(cfg: CollectionConfig) {
  const o = blankFor({ key: "", label: "", type: "object", fields: cfg.fields }) as Record<string, unknown>;
  return { ...o, id: "", _status: "draft" as const };
}
