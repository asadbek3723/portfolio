import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { getRequest } from "@tanstack/react-start/server";
import { runMatch } from "./match.server";

// Best-effort per-instance limiter (5 requests / 10 min per IP). It bounds casual abuse and AI spend;
// a shared store (e.g. Upstash/Supabase) is needed for a strict global limit on serverless.
const WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS = 5;
const hits = new Map<string, number[]>();
function allowRequest(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  if (recent.length >= MAX_REQUESTS) { hits.set(ip, recent); return false; }
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) for (const [k, v] of hits) if (v.every((t) => now - t >= WINDOW_MS)) hits.delete(k);
  return true;
}

const inputSchema = z.object({
  goals: z.string().trim().min(10).max(2000),
  budget: z.string().max(60).optional(),
  timeline: z.string().max(60).optional(),
  lang: z.enum(["uz", "en", "ru"]),
});

export const matchProject = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => inputSchema.parse(data))
  .handler(async ({ data }) => {
    const headers = getRequest()?.headers;
    const ip = headers?.get("x-forwarded-for")?.split(",")[0]?.trim() || headers?.get("x-real-ip") || "unknown";
    if (!allowRequest(ip)) return { ok: false as const, error: "busy" as const };
    const { budget, timeline, ...rest } = data;
    return runMatch({ ...rest, ...(budget ? { budget } : {}), ...(timeline ? { timeline } : {}) });
  });
