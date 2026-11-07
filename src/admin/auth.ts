// Real admin sign-in: account check by the auth service, admin access by the
// user_roles table (has_role). "Remember me" off = session ends with the tab.
import { supabase } from "@/integrations/supabase/client";
import { refreshContent } from "./data/store";

const TAB_KEY = "admin-tab-session";
const EPHEMERAL_KEY = "admin-ephemeral";

export type SignInResult = "ok" | "invalid" | "forbidden";

// Short-lived positive cache so every in-panel navigation doesn't hit the network.
const CACHE_MS = 30_000;
let adminOkAt = 0;

async function isAdmin(userId: string) {
  const { data } = await supabase.rpc("has_role", { _user_id: userId, _role: "admin" });
  return data === true;
}

export async function signIn(email: string, password: string, remember = false): Promise<SignInResult> {
  const { data, error } = await supabase.auth.signInWithPassword({ email: email.trim(), password });
  if (error || !data.user) return "invalid";
  if (!(await isAdmin(data.user.id))) { await supabase.auth.signOut(); return "forbidden"; }
  window.sessionStorage.setItem(TAB_KEY, "1");
  if (remember) window.localStorage.removeItem(EPHEMERAL_KEY);
  else window.localStorage.setItem(EPHEMERAL_KEY, "1");
  adminOkAt = Date.now();
  await refreshContent();
  return "ok";
}

/** Resolves to true only for a signed-in admin. */
export async function checkAdmin(): Promise<boolean> {
  if (window.localStorage.getItem(EPHEMERAL_KEY) === "1" && !window.sessionStorage.getItem(TAB_KEY)) {
    await signOut();
    return false;
  }
  if (Date.now() - adminOkAt < CACHE_MS) return true;
  const { data } = await supabase.auth.getUser();
  const ok = !!data.user && (await isAdmin(data.user.id));
  adminOkAt = ok ? Date.now() : 0;
  return ok;
}

export async function signOut() {
  adminOkAt = 0;
  window.sessionStorage.removeItem(TAB_KEY);
  window.localStorage.removeItem(EPHEMERAL_KEY);
  // Local scope: signing out here must not kill the admin's other sessions.
  await supabase.auth.signOut({ scope: "local" });
  // Drafts and cached content must not outlive the session on a shared browser.
  window.localStorage.removeItem("admin-content-v1");
  await refreshContent();
}
