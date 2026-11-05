// Database sync for the content store (one Postgres table per collection, see tables.ts).
// Loaded lazily so tests and SSR never touch the network client at import time.
import type { SupabaseClient } from "@supabase/supabase-js";
import { LIST_TABLES, SINGLE_TABLES, SEO_TABLE, itemToRow, rowToItem, rowsToSeo, seoToRows, singleToRow, rowToSingle, type Row, type SeoMap } from "./tables";

export type RemoteMessage = { id: string; name: string; email: string; subject: string; body: string; date: string; read: boolean };

// The generated Database type only knows messages; content tables are accessed untyped.
type Db = SupabaseClient;
const client = async () => (await import("@/integrations/supabase/client")).supabase as unknown as Db;

// Last known serialized row per table, so a save only writes what actually changed.
const snapshots = new Map<string, Map<string, string>>();
const remember = (table: string, rows: Row[]) => snapshots.set(table, new Map(rows.map((r) => [String(r["id"]), JSON.stringify(r)])));

export async function fetchContent(): Promise<Record<string, unknown>> {
  const sb = await client();
  const out: Record<string, unknown> = {};
  const jobs: Promise<void>[] = [];
  for (const t of LIST_TABLES) {
    jobs.push((async () => {
      const { data, error } = await sb.from(t.table).select("*").order("position", { ascending: true });
      if (error) throw error;
      const rows = (data ?? []) as Row[];
      remember(t.table, rows.map((r) => itemToRow(t, rowToItem(t, r), Number(r["position"] ?? 0))));
      out[t.key] = rows.map((r) => rowToItem(t, r));
    })());
  }
  for (const t of SINGLE_TABLES) {
    jobs.push((async () => {
      const { data, error } = await sb.from(t.table).select("*").eq("id", 1).maybeSingle();
      if (error) throw error;
      if (data) out[t.key] = rowToSingle(t, data as Row);
    })());
  }
  jobs.push((async () => {
    const { data, error } = await sb.from(SEO_TABLE).select("*");
    if (error) throw error;
    out["seo"] = rowsToSeo((data ?? []) as Row[]);
  })());
  await Promise.all(jobs);
  return out;
}

export async function fetchMessages(): Promise<RemoteMessage[] | null> {
  const sb = await client();
  const { data, error } = await sb.from("messages").select("*").order("created_at", { ascending: false });
  if (error) return null;
  return (data ?? []).map((m) => ({ id: m.id, name: m.name, email: m.email, subject: m.subject, body: m.body, read: m.read, date: m.created_at }));
}

async function saveList(sb: Db, key: string, items: Record<string, unknown>[]) {
  const t = LIST_TABLES.find((x) => x.key === key);
  if (!t) return;
  const rows = items.map((item, i) => itemToRow(t, item, i));
  const known = snapshots.get(t.table) ?? new Map<string, string>();
  const changed = rows.filter((r) => known.get(String(r["id"])) !== JSON.stringify(r));
  if (changed.length) {
    const { error } = await sb.from(t.table).upsert(changed);
    if (error) throw error;
  }
  const keep = new Set(rows.map((r) => String(r["id"])));
  const removed = [...known.keys()].filter((id) => !keep.has(id));
  if (removed.length) {
    const { error } = await sb.from(t.table).delete().in("id", removed);
    if (error) throw error;
  }
  remember(t.table, rows);
}

export async function saveKeys(entries: [string, unknown][]) {
  if (!entries.length) return;
  const sb = await client();
  for (const [key, value] of entries) {
    const single = SINGLE_TABLES.find((x) => x.key === key);
    if (single) {
      const { error } = await sb.from(single.table).upsert(singleToRow(single, value as Record<string, unknown>));
      if (error) throw error;
    } else if (key === "seo") {
      const rows = seoToRows(value as SeoMap);
      if (rows.length) { const { error } = await sb.from(SEO_TABLE).upsert(rows.map((r) => ({ ...r, updated_at: new Date().toISOString() }))); if (error) throw error; }
      const { data } = await sb.from(SEO_TABLE).select("path");
      const keep = new Set(rows.map((r) => r.path));
      const removed = ((data ?? []) as { path: string }[]).map((r) => r.path).filter((p) => !keep.has(p));
      if (removed.length) { const { error } = await sb.from(SEO_TABLE).delete().in("path", removed); if (error) throw error; }
    } else {
      await saveList(sb, key, value as Record<string, unknown>[]);
    }
  }
}

export async function syncMessages(prev: RemoteMessage[], next: RemoteMessage[]) {
  const sb = await client();
  const nextIds = new Set(next.map((m) => m.id));
  const removed = prev.filter((m) => !nextIds.has(m.id)).map((m) => m.id);
  if (removed.length) { const { error } = await sb.from("messages").delete().in("id", removed); if (error) throw error; }
  const before = new Map(prev.map((m) => [m.id, m.read]));
  for (const m of next) {
    if (before.has(m.id) && before.get(m.id) !== m.read) {
      const { error } = await sb.from("messages").update({ read: m.read }).eq("id", m.id);
      if (error) throw error;
    }
  }
}

export async function insertMessage(m: { name: string; email: string; subject: string; body: string }) {
  const sb = await client();
  const { error } = await sb.from("messages").insert({ ...m, read: false });
  if (error) throw error;
}

export async function watchContent(onChange: () => void) {
  const sb = await client();
  let channel = sb.channel(`site-content-${Math.random().toString(36).slice(2)}`);
  const tables = [...LIST_TABLES.filter((t) => t.status).map((t) => t.table), ...SINGLE_TABLES.map((t) => t.table), SEO_TABLE];
  for (const table of tables) channel = channel.on("postgres_changes", { event: "*", schema: "public", table }, onChange);
  channel.subscribe();
  return () => { void sb.removeChannel(channel); };
}

const BUCKET = "media";

/** Uploads an image to the public `media` bucket and returns its public URL. */
export async function uploadMedia(file: File): Promise<{ src: string; path: string }> {
  const sb = await client();
  const ext = (file.name.split(".").pop() ?? "bin").toLowerCase().replace(/[^a-z0-9]/g, "").slice(0, 8) || "bin";
  const path = `${new Date().toISOString().slice(0, 10)}/${crypto.randomUUID()}.${ext}`;
  const { error } = await sb.storage.from(BUCKET).upload(path, file, { contentType: file.type, cacheControl: "31536000" });
  if (error) throw error;
  return { src: sb.storage.from(BUCKET).getPublicUrl(path).data.publicUrl, path };
}

export async function removeMedia(path: string) {
  const sb = await client();
  const { error } = await sb.storage.from(BUCKET).remove([path]);
  if (error) throw error;
}
