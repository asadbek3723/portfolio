// Server-side read of the published site content (Supabase, public RLS) for SEO: meta tags,
// structured data and the sitemap. Cached for a minute; falls back to the built-in seed data.
import { createClient } from "@supabase/supabase-js";
import { slim, seedRaw, type SeoContent } from "./seo-content";
import { LIST_TABLES, SINGLE_TABLES, rowToItem, rowToSingle, type Row } from "@/admin/data/tables";

type Rec = Record<string, unknown>;

async function fetchRaw(): Promise<Rec> {
  const url = process.env["SUPABASE_URL"] ?? (import.meta.env["VITE_SUPABASE_URL"] as string | undefined);
  const key = process.env["SUPABASE_PUBLISHABLE_KEY"] ?? (import.meta.env["VITE_SUPABASE_PUBLISHABLE_KEY"] as string | undefined);
  if (!url || !key) return seedRaw();
  const sb = createClient(url, key, { auth: { persistSession: false, autoRefreshToken: false } });
  const out: Rec = {};
  await Promise.all([
    ...LIST_TABLES.filter((t) => t.status).map(async (t) => {
      const { data, error } = await sb.from(t.table).select("*").order("position", { ascending: true });
      if (error) throw error;
      out[t.key] = ((data ?? []) as Row[]).map((r) => rowToItem(t, r));
    }),
    ...SINGLE_TABLES.filter((t) => t.key === "profile").map(async (t) => {
      const { data, error } = await sb.from(t.table).select("*").eq("id", 1).maybeSingle();
      if (error) throw error;
      if (data) out[t.key] = rowToSingle(t, data as Row);
    }),
  ]);
  return { ...seedRaw(), ...out };
}

let cache: { at: number; raw: Rec } | null = null;
export async function getRawContent(): Promise<Rec> {
  if (cache && Date.now() - cache.at < 60_000) return cache.raw;
  try { cache = { at: Date.now(), raw: await fetchRaw() }; }
  catch (e) { console.error("seo content fetch failed, using seed", e); cache = { at: Date.now() - 50_000, raw: seedRaw() }; }
  return cache.raw;
}

export async function getSeoContent(): Promise<SeoContent> {
  return slim(await getRawContent());
}

// Everything the public pages render (all published collections, profile, settings), so the server HTML
// already contains the database content instead of the bundled seed. Missing keys fall back to the seed in the store.
let publicCache: { at: number; raw: Rec } | null = null;
export async function getPublicContent(): Promise<Rec> {
  if (publicCache && Date.now() - publicCache.at < 60_000) return publicCache.raw;
  const url = process.env["SUPABASE_URL"] ?? (import.meta.env["VITE_SUPABASE_URL"] as string | undefined);
  const key = process.env["SUPABASE_PUBLISHABLE_KEY"] ?? (import.meta.env["VITE_SUPABASE_PUBLISHABLE_KEY"] as string | undefined);
  if (!url || !key) return {};
  try {
    const sb = createClient(url, key, { auth: { persistSession: false, autoRefreshToken: false } });
    const out: Rec = {};
    await Promise.all([
      ...LIST_TABLES.filter((t) => t.status).map(async (t) => {
        const { data, error } = await sb.from(t.table).select("*").order("position", { ascending: true });
        if (error) throw error;
        out[t.key] = ((data ?? []) as Row[]).map((r) => rowToItem(t, r));
      }),
      ...SINGLE_TABLES.map(async (t) => {
        const { data, error } = await sb.from(t.table).select("*").eq("id", 1).maybeSingle();
        if (error) throw error;
        if (data) out[t.key] = rowToSingle(t, data as Row);
      }),
    ]);
    publicCache = { at: Date.now(), raw: out };
    return out;
  } catch (e) {
    console.error("public content fetch failed, using seed", e);
    publicCache = { at: Date.now() - 50_000, raw: publicCache?.raw ?? {} };
    return publicCache.raw;
  }
}
