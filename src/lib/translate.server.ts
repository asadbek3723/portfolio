import { createOpenAI } from "@ai-sdk/openai";
import { Output, streamText, type LanguageModel } from "ai";
import { z } from "zod";
import { groqJson, hasGroq } from "./groq.server";

export type TranslateEntry = { id: string; text: string };
export type AiMode = "improve" | "translate";
export type TranslateResult =
  | { ok: true; items: { id: string; uz: string; en: string; ru: string }[] }
  | { ok: false; error: "busy" | "credits" | "unavailable" | "unauthorized" | "forbidden" };

const schema = z.object({
  items: z.array(z.object({ id: z.string(), uz: z.string(), en: z.string(), ru: z.string() })),
});

const RULES = `Keep meaning, facts, numbers, URLs, names, brand and technology names unchanged. Never invent facts, clients, results or numbers.
Preserve formatting exactly: blank lines between paragraphs, lines starting with "## " (headings), lines starting with "- " (bullets) and fenced blocks between "~~~" lines (code must be kept byte-for-byte, only comments inside code may be translated).
Return exactly one output item per input id.`;

const PROMPTS: Record<AiMode, string> = {
  improve: `You are a senior editor and localizer for a software engineer's professional portfolio website.
Each input item is written in ANY language (detect it). Make it clearer, more professional, concise and confident: fix grammar and typos, remove filler and repetition, keep the author's first-person voice, and make it read like a polished portfolio. Then output three natural versions:
- uz: Uzbek in LATIN script (use o', g', sh, ch; apostrophe as ')
- en: English
- ru: Russian
Do not make text longer than needed and do not add content that is not in the source.`,
  translate: `You are a professional localizer for a freelance developer's portfolio website.
Each input item is written in ANY language (detect it). Rewrite every item into three natural, polished versions:
- uz: Uzbek in LATIN script (use o', g', sh, ch; apostrophe as ')
- en: English
- ru: Russian
Do not add content.`,
};

/** Gateway key (Lovable) first; otherwise a plain OpenAI key from OPENAI_API_KEY (model: AI_MODEL). */
function provider() {
  const gateway = process.env["LOVABLE_API_KEY"];
  if (gateway) {
    return {
      model: createOpenAI({ baseURL: "https://ai.gateway.lovable.dev/v1", apiKey: gateway, headers: { "Lovable-API-Key": gateway, "X-Lovable-AIG-SDK": "vercel-ai-sdk" } }).responses("openai/gpt-6-astra"),
      options: { openai: { forceReasoning: true, reasoningEffort: "low", reasoningSummary: "auto", store: false, include: ["reasoning.encrypted_content"] } },
    };
  }
  const openai = process.env["OPENAI_API_KEY"];
  if (openai) return { model: createOpenAI({ apiKey: openai }).responses(process.env["AI_MODEL"] ?? "gpt-4.1-mini"), options: { openai: { store: false } } };
  return null;
}

/** Groq first (all models x all keys, rotating on limits); the gateway/OpenAI provider is the last fallback. */
async function runGroq(entries: TranslateEntry[], system: string): Promise<TranslateResult | null> {
  if (!hasGroq()) return null;
  const res = await groqJson(
    `${system}\nRespond with a single JSON object only: {"items":[{"id":string,"uz":string,"en":string,"ru":string}]}.`,
    JSON.stringify(entries),
  );
  if (!res.ok) return res.error === "busy" ? { ok: false, error: "busy" } : null;
  try {
    const parsed = schema.parse(JSON.parse(res.content));
    const ids = new Set(entries.map((e) => e.id));
    const items = parsed.items.filter((i) => ids.has(i.id));
    if (items.length) return { ok: true, items };
  } catch (err) {
    console.error("groq output invalid", res.model, err instanceof Error ? err.message : err);
  }
  return null;
}

export async function runTranslate(entries: TranslateEntry[], context: string, mode: AiMode = "translate", instruction = ""): Promise<TranslateResult> {
  const system = `${PROMPTS[mode]}\n${RULES}\nContext: ${context.slice(0, 200)}${instruction ? `\nExtra instruction from the author (follow it if it does not break the rules above): ${instruction.slice(0, 300)}` : ""}`;
  const groq = await runGroq(entries, system);
  if (groq?.ok) return groq;
  const p = provider();
  if (!p) return groq ?? { ok: false, error: "unavailable" };
  try {
    const result = streamText({
      model: p.model as unknown as LanguageModel,
      maxRetries: 0,
      output: Output.object({ schema }),
      system,
      messages: [{ role: "user", content: JSON.stringify(entries) }],
      providerOptions: p.options as never,
    });
    const output = await result.output;
    const ids = new Set(entries.map((e) => e.id));
    return { ok: true, items: output.items.filter((i) => ids.has(i.id)) };
  } catch (err) {
    const status = (err as { statusCode?: number }).statusCode;
    console.error("ai failed", status, err instanceof Error ? err.message : err);
    if (status === 429) return { ok: false, error: "busy" };
    if (status === 402 || status === 403) return { ok: false, error: "credits" };
    return { ok: false, error: "unavailable" };
  }
}
