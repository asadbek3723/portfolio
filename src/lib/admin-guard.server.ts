// Verifies the caller of a server function is a signed-in admin (Bearer token from the browser + has_role).
import { getRequest } from "@tanstack/react-start/server";
import { createClient } from "@supabase/supabase-js";

export type GuardResult = "ok" | "unauthorized" | "forbidden";

export async function checkAdmin(): Promise<GuardResult> {
  const url = process.env["SUPABASE_URL"] ?? import.meta.env["VITE_SUPABASE_URL"];
  const key = process.env["SUPABASE_PUBLISHABLE_KEY"] ?? import.meta.env["VITE_SUPABASE_PUBLISHABLE_KEY"];
  const header = getRequest()?.headers.get("authorization") ?? "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : "";
  if (!url || !key || !token) return "unauthorized";
  const sb = createClient(url, key, { global: { headers: { Authorization: `Bearer ${token}` } }, auth: { persistSession: false, autoRefreshToken: false } });
  const { data, error } = await sb.auth.getUser(token);
  if (error || !data.user) return "unauthorized";
  const { data: isAdmin } = await sb.rpc("has_role", { _user_id: data.user.id, _role: "admin" });
  return isAdmin === true ? "ok" : "forbidden";
}
