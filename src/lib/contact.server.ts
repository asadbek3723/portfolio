import { supabaseAdmin } from "@/integrations/supabase/client.server";

export type ContactInput = { name: string; email: string; subject: string; body: string };
export type ContactResult = { ok: true } | { ok: false; error: "busy" | "unavailable" };

// Best-effort per-instance limiter: 3 messages / 10 min per IP.
const WINDOW_MS = 10 * 60 * 1000;
const MAX_MESSAGES = 3;
const hits = new Map<string, number[]>();
function allow(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  if (recent.length >= MAX_MESSAGES) { hits.set(ip, recent); return false; }
  recent.push(now);
  hits.set(ip, recent);
  return true;
}

export async function saveContactMessage(input: ContactInput, ip: string): Promise<ContactResult> {
  if (!allow(ip)) return { ok: false, error: "busy" };
  const { error } = await supabaseAdmin.from("messages").insert({ ...input, read: false });
  if (error) {
    console.error("contact insert failed", error.message);
    return { ok: false, error: "unavailable" };
  }
  return { ok: true };
}
