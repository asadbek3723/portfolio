// Groq chat client with automatic failover across every (model, API key) pair.
// When a key hits a rate/daily limit it is put on cooldown and the next key (then the next model) is used.

const ENDPOINT = "https://api.groq.com/openai/v1/chat/completions";

/** Text models available on Groq, best quality first. Override with GROQ_MODELS (comma separated). */
const DEFAULT_MODELS = ["openai/gpt-oss-120b", "qwen/qwen3.8-27b", "openai/gpt-oss-20b", "qwen/qwen3.6-27b"];

const MAX_ATTEMPTS = 14;
const TIME_BUDGET_MS = 55_000;
const REQUEST_TIMEOUT_MS = 30_000;

export type GroqFailure = "busy" | "credits" | "unavailable";
export type GroqResult = { ok: true; content: string; model: string } | { ok: false; error: GroqFailure };

const cooldown = new Map<string, number>(); // "model|keyIndex" -> epoch ms until usable again
const deadKeys = new Set<number>(); // keys rejected with 401 (invalid / revoked)
let cursor = 0; // rotating start offset so load spreads over all keys

function list(value: string | undefined): string[] {
  return (value ?? "").split(",").map((s) => s.trim()).filter(Boolean);
}

export function groqKeys(): string[] {
  const env = process.env;
  return [...new Set([...list(env["GROQ_API_KEYS"]), ...list(env["GROQ_API_KEYS_EXTRA"]), ...list(env["GROQ_API_KEY"])])];
}

function groqModels(): string[] {
  const custom = list(process.env["GROQ_MODELS"]);
  return custom.length ? custom : DEFAULT_MODELS;
}

export function hasGroq(): boolean {
  return groqKeys().length > 0;
}

function modelParams(model: string): Record<string, unknown> {
  if (model.startsWith("openai/gpt-oss")) return { reasoning_effort: "low", include_reasoning: false };
  if (model.startsWith("qwen/")) return { reasoning_effort: "none", reasoning_format: "hidden" };
  return {};
}

function retryAfterMs(res: Response): number {
  const header = res.headers.get("retry-after");
  const seconds = header ? Number(header) : NaN;
  // Daily limits can say hours; cap so a recovered key is retried reasonably soon.
  return Number.isFinite(seconds) ? Math.min(Math.max(seconds, 1), 3600) * 1000 : 60_000;
}

export async function groqJson(system: string, user: string): Promise<GroqResult> {
  const keys = groqKeys();
  if (!keys.length) return { ok: false, error: "unavailable" };
  const models = groqModels();
  const started = Date.now();
  let attempts = 0;
  let sawLimit = false;
  let sawOther = false;

  for (const model of models) {
    const offset = cursor++ % keys.length;
    for (let n = 0; n < keys.length; n++) {
      const index = (offset + n) % keys.length;
      if (deadKeys.has(index)) continue;
      if ((cooldown.get(`${model}|${index}`) ?? 0) > Date.now()) { sawLimit = true; continue; }
      if (attempts >= MAX_ATTEMPTS || Date.now() - started > TIME_BUDGET_MS) return { ok: false, error: sawLimit ? "busy" : "unavailable" };
      attempts++;
      try {
        const res = await fetch(ENDPOINT, {
          method: "POST",
          headers: { "content-type": "application/json", authorization: `Bearer ${keys[index]}` },
          signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
          body: JSON.stringify({
            model,
            temperature: 0.2,
            response_format: { type: "json_object" },
            messages: [{ role: "system", content: system }, { role: "user", content: user }],
            ...modelParams(model),
          }),
        });
        if (res.ok) {
          const json = (await res.json()) as { choices?: { message?: { content?: string } }[] };
          const content = json.choices?.[0]?.message?.content;
          if (content) return { ok: true, content, model };
          sawOther = true;
          continue; // empty answer: try the next key/model
        }
        if (res.status === 429) { sawLimit = true; cooldown.set(`${model}|${index}`, Date.now() + retryAfterMs(res)); continue; }
        if (res.status === 401) { deadKeys.add(index); continue; }
        if (res.status === 413) { sawLimit = true; break; } // too big for this model: move to the next model
        if (res.status === 402 || res.status === 403) { cooldown.set(`${model}|${index}`, Date.now() + 3600_000); continue; }
        sawOther = true; // 400 (bad json/model), 5xx: try another pair
        console.error("groq failed", res.status, model);
      } catch (err) {
        sawOther = true;
        console.error("groq request error", model, err instanceof Error ? err.message : err);
      }
    }
  }
  return { ok: false, error: sawLimit && !sawOther ? "busy" : "unavailable" };
}
