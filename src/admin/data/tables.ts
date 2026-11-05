// Maps the admin's content model onto the Postgres tables (one table per collection).
// Pure functions only, shared by the browser sync (remote.ts) and the seed script.
// A field listed in `cols` becomes a real column; every other field is kept in the `extra` jsonb column.

export type Row = Record<string, unknown>;
type Item = Record<string, unknown>;
type Kind = "text" | "int" | "bool" | "json" | "text[]";
interface Col { f: string; c: string; k: Kind }

const col = (f: string, k: Kind = "text", c = f.replace(/[A-Z]/g, (m) => `_${m.toLowerCase()}`)): Col => ({ f, c, k });
const loc = (f: string, c?: string) => col(f, "json", c);

export interface ListTable { key: string; table: string; cols: Col[]; status: boolean }
export interface SingleTable { key: string; table: string; cols: Col[] }

const list = (key: string, table: string, cols: Col[], status = true): ListTable => ({ key, table, cols, status });

/** Collections that are arrays of items. `status` tables carry the published/draft flag. */
export const LIST_TABLES: ListTable[] = [
  list("projects", "projects", [col("slug"), col("featured", "bool"), col("year", "int"), col("category"), loc("title"), loc("summary"), loc("problem"), loc("solution"), col("stack", "text[]"), col("cover"), col("images", "text[]"), col("liveUrl"), col("repoUrl")]),
  list("services", "services", [col("slug"), col("icon"), loc("title"), loc("tagline"), loc("description"), loc("price"), loc("timeline"), col("cover")]),
  list("blog", "blog_posts", [col("slug"), col("date", "text", "published_on"), col("readMin", "int"), col("tags", "text[]"), loc("title"), loc("excerpt"), loc("body")]),
  list("skills", "skills", [col("name"), col("category"), col("level", "int")]),
  list("certificates", "certificates", [col("slug"), col("title"), col("issuer"), col("date", "text", "issued_on"), col("skills", "text[]"), col("credentialId"), col("hours", "int"), col("verifyUrl"), col("image")]),
  list("achievements", "achievements", [col("slug"), col("date", "text", "awarded_on"), loc("title"), loc("description"), loc("place"), col("cover")]),
  list("events", "events", [col("slug"), col("title"), col("location"), col("date", "text", "event_date"), loc("role"), loc("description"), col("cover")]),
  list("gallery", "gallery_items", [col("src"), loc("caption")]),
  list("testimonials", "testimonials", [col("name"), col("role"), loc("quote")]),
  list("faq", "faq_items", [loc("q", "question"), loc("a", "answer")]),
  list("timeline", "timeline_items", [col("year", "text", "period"), loc("title"), col("place"), loc("description")]),
  list("uses", "uses_items", [col("group", "text", "group_name"), col("name"), loc("note")]),
  list("media", "media_assets", [col("name"), col("src"), col("size", "int"), col("path"), col("createdAt", "text", "created_at")], false),
  list("history", "change_history", [col("at"), col("who"), col("action"), col("collection"), col("label")], false),
];

export const SINGLE_TABLES: SingleTable[] = [
  { key: "profile", table: "profile", cols: [col("name"), loc("role"), loc("bio"), col("email"), col("phone"), loc("location"), loc("socials"), loc("stats"), col("cvUrl"), col("portrait"), col("available", "bool")] },
  { key: "settings", table: "site_settings", cols: [col("siteName"), col("defaultLang", "text", "default_lang"), col("hiddenSections", "text[]", "hidden_sections"), col("adminTheme", "text", "admin_theme")] },
];

/** seo is a map: page path -> { title, description, image } */
export const SEO_TABLE = "seo_entries";

const META = new Set(["_status", "_updatedAt"]);

function split(item: Item, cols: Col[]): { row: Row; extra: Item } {
  const row: Row = {};
  const used = new Set<string>();
  for (const { f, c } of cols) {
    used.add(f);
    const v = item[f];
    row[c] = v === undefined ? null : v;
  }
  const extra: Item = {};
  for (const [f, v] of Object.entries(item)) if (!used.has(f) && !META.has(f) && f !== "id" && v !== undefined) extra[f] = v;
  return { row, extra };
}

function join(row: Row, cols: Col[]): Item {
  const out: Item = {};
  for (const { f, c } of cols) {
    const v = row[c];
    if (v !== null && v !== undefined) out[f] = v;
  }
  const extra = row["extra"];
  if (extra && typeof extra === "object") Object.assign(out, extra);
  return out;
}

export function itemToRow(t: ListTable, item: Item, position: number): Row {
  const { row, extra } = split(item, t.cols);
  const base: Row = { id: String(item["id"]), position, ...row, extra };
  if (t.status) base["status"] = item["_status"] === "draft" ? "draft" : "published";
  // keep the original edit time when present, otherwise the database default applies
  if (typeof item["_updatedAt"] === "string") base["updated_at"] = item["_updatedAt"];
  return base;
}

export function rowToItem(t: ListTable, row: Row): Item {
  const item: Item = { id: String(row["id"]), ...join(row, t.cols) };
  if (t.status) {
    item["_status"] = row["status"] === "draft" ? "draft" : "published";
    if (typeof row["updated_at"] === "string") item["_updatedAt"] = row["updated_at"];
  }
  return item;
}

export function singleToRow(t: SingleTable, value: Item): Row {
  const { row, extra } = split(value, t.cols);
  return { id: 1, ...row, extra: t.table === "profile" ? extra : undefined, updated_at: new Date().toISOString() };
}

export function rowToSingle(t: SingleTable, row: Row): Item {
  return join(row, t.cols);
}

export type SeoMap = Record<string, { title: string; description: string; image: string }>;
export const seoToRows = (seo: SeoMap) => Object.entries(seo ?? {}).map(([path, v]) => ({ path, title: v.title ?? "", description: v.description ?? "", image: v.image ?? "" }));
export const rowsToSeo = (rows: Row[]): SeoMap => Object.fromEntries(rows.map((r) => [String(r["path"]), { title: String(r["title"] ?? ""), description: String(r["description"] ?? ""), image: String(r["image"] ?? "") }]));
