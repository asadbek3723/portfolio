// Writes the site's built-in content (src/portfolio/data) into the content tables and
// uploads every image in public/assets to the Supabase `media` bucket (site/<file>),
// rewriting "/assets/<file>" paths in the content to the public Storage URLs.
// Tables that already hold rows are skipped unless you pass --force, so admin edits are never overwritten.
import { createClient } from "@supabase/supabase-js";
import { readdirSync, readFileSync } from "node:fs";
import { extname, join } from "node:path";
import { getDefaultContent } from "../src/admin/data/store";
import { LIST_TABLES, SINGLE_TABLES, SEO_TABLE, itemToRow, singleToRow, seoToRows, type SeoMap } from "../src/admin/data/tables";

const url = process.env.SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!url || !key) throw new Error("SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are required");
const force = process.argv.includes("--force");
const sb = createClient(url, key, { auth: { persistSession: false, autoRefreshToken: false } });

// 1. images -> Storage ---------------------------------------------------------------
const TYPES: Record<string, string> = { ".jpg": "image/jpeg", ".jpeg": "image/jpeg", ".png": "image/png", ".webp": "image/webp", ".gif": "image/gif", ".avif": "image/avif" };
const assetsDir = join(import.meta.dir, "..", "public", "assets");
let uploaded = 0;
for (const file of readdirSync(assetsDir)) {
  const type = TYPES[extname(file).toLowerCase()];
  if (!type) continue;
  const { error } = await sb.storage.from("media").upload(`site/${file}`, readFileSync(join(assetsDir, file)), { contentType: type, upsert: true, cacheControl: "31536000" });
  if (error) throw new Error(`upload ${file}: ${error.message}`);
  uploaded++;
}
const publicBase = `${url.replace(/\/+$/, "")}/storage/v1/object/public/media/site/`;
const toStorage = <T>(value: T): T => JSON.parse(JSON.stringify(value).replace(/"\/assets\/([^"]+)"/g, (_m, f: string) => `"${publicBase}${f}"`));
console.log(`uploaded ${uploaded} image(s) to media/site`);

// 2. content -> tables --------------------------------------------------------------------
const content = toStorage(getDefaultContent()) as unknown as Record<string, unknown>;
const done: string[] = [];

for (const t of LIST_TABLES) {
  if (t.key === "messages") continue;
  const items = (content[t.key] ?? []) as Record<string, unknown>[];
  if (["media", "history"].includes(t.key)) continue; // start empty, filled by the admin
  const { count } = await sb.from(t.table).select("id", { count: "exact", head: true });
  if (!force && (count ?? 0) > 0) continue;
  const rows = items.map((item, i) => itemToRow(t, item, i));
  if (rows.length) { const { error } = await sb.from(t.table).upsert(rows); if (error) throw new Error(`${t.table}: ${error.message}`); }
  // drop rows that are no longer part of the content
  const { data: existing } = await sb.from(t.table).select("id");
  const keep = new Set(rows.map((r) => String(r["id"])));
  const stale = ((existing ?? []) as { id: string }[]).map((r) => r.id).filter((id) => !keep.has(id));
  if (stale.length) { const { error } = await sb.from(t.table).delete().in("id", stale); if (error) throw error; }
  done.push(`${t.table}(${rows.length})`);
}

for (const t of SINGLE_TABLES) {
  const { count } = await sb.from(t.table).select("id", { count: "exact", head: true });
  if (!force && (count ?? 0) > 0) continue;
  const { error } = await sb.from(t.table).upsert(singleToRow(t, content[t.key] as Record<string, unknown>));
  if (error) throw new Error(`${t.table}: ${error.message}`);
  done.push(t.table);
}

const seoRows = seoToRows((content["seo"] ?? {}) as SeoMap);
if (seoRows.length) { const { error } = await sb.from(SEO_TABLE).upsert(seoRows); if (error) throw error; done.push(SEO_TABLE); }

console.log("seeded:", done.join(", ") || "nothing (tables already have data; use --force to overwrite)");
