import { createServerFn } from "@tanstack/react-start";

const fetchPublicContent = createServerFn({ method: "GET" }).handler(async () => JSON.stringify(await (await import("./content.server")).getPublicContent()));
const parse = (json: string): Record<string, unknown> => JSON.parse(json) as Record<string, unknown>;

let memo: { at: number; value: Promise<Record<string, unknown>> } | null = null;
/** Root loader: published database content for server rendering. Browser: reused for 5 minutes. */
export async function loadPublicContent(): Promise<Record<string, unknown>> {
  if (typeof window === "undefined") return fetchPublicContent().then(parse, () => ({}));
  if (!memo || Date.now() - memo.at > 300_000) memo = { at: Date.now(), value: fetchPublicContent().then(parse, () => ({})) };
  return memo.value;
}
