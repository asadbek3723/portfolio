// Real admin sign-in: account check by the auth service, admin access by the
// user_roles table (has_role). "Remember me" off = session ends with the tab.
import { supabase } from "@/integrations/supabase/client";
import { refreshContent } from "./data/store";

const TAB_KEY = "admin-tab-session";
const EPHEMERAL_KEY = "admin-ephemeral";

export type SignInResult = "ok" | "invalid" | "forbidden";

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
  await refreshContent();
  return "ok";
}

/** Resolves to true only for a signed-in admin. */
export async function checkAdmin(): Promise<boolean> {
  if (window.localStorage.getItem(EPHEMERAL_KEY) === "1" && !window.sessionStorage.getItem(TAB_KEY)) {
    await signOut();
    return false;
  }
  const { data } = await supabase.auth.getUser();
  return !!data.user && (await isAdmin(data.user.id));
}

export async function signOut() {
  window.sessionStorage.removeItem(TAB_KEY);
  window.localStorage.removeItem(EPHEMERAL_KEY);
  await supabase.auth.signOut();
  await refreshContent();
}
