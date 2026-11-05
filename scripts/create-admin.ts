// Creates (or updates) the admin account and grants it the `admin` role.
// Usage: ADMIN_EMAIL=you@example.com ADMIN_PASSWORD='...' bun run db:admin
import { createClient } from "@supabase/supabase-js";

const url = process.env.SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
const email = process.env.ADMIN_EMAIL?.trim().toLowerCase();
const password = process.env.ADMIN_PASSWORD;
if (!url || !key) throw new Error("SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are required");
if (!email || !password) throw new Error("Set ADMIN_EMAIL and ADMIN_PASSWORD");
if (password.length < 8) throw new Error("ADMIN_PASSWORD must be at least 8 characters");

const sb = createClient(url, key, { auth: { persistSession: false, autoRefreshToken: false } });
const { data: list, error: listError } = await sb.auth.admin.listUsers({ perPage: 1000 });
if (listError) throw listError;
let user = list.users.find((u) => u.email?.toLowerCase() === email);
if (user) {
  const { error } = await sb.auth.admin.updateUserById(user.id, { password, email_confirm: true });
  if (error) throw error;
} else {
  const { data, error } = await sb.auth.admin.createUser({ email, password, email_confirm: true });
  if (error) throw error;
  user = data.user;
}
const { error } = await sb.from("user_roles").upsert({ user_id: user!.id, role: "admin" }, { onConflict: "user_id,role" });
if (error) throw error;
console.log(`admin ready: ${email}`);
