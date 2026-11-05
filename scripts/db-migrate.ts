// Applies supabase/migrations/*.sql to SUPABASE_DB_URL (idempotent files, run in order).
import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import postgres from "postgres";

const url = process.env.SUPABASE_DB_URL;
if (!url) throw new Error("SUPABASE_DB_URL is not set (see .env.example)");
const dir = join(import.meta.dir, "..", "supabase", "migrations");
const sql = postgres(url, { max: 1, onnotice: () => {} });
try {
  for (const file of readdirSync(dir).filter((f) => f.endsWith(".sql")).sort()) {
    await sql.unsafe(readFileSync(join(dir, file), "utf8"));
    console.log("applied", file);
  }
} finally { await sql.end(); }
