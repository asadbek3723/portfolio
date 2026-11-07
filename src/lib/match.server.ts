import { createOpenAI } from "@ai-sdk/openai";
import { Output, streamText, type LanguageModel } from "ai";
import { z } from "zod";
import { blogData, projectsData, servicesData } from "@/portfolio/data/portfolioData";
import type { Language } from "@/portfolio/types";

export type MatchInput = { goals: string; budget?: string; timeline?: string; lang: Language };
export type MatchItem = { slug: string; reason: string };
export type MatchResult =
  | { ok: true; services: MatchItem[]; projects: MatchItem[]; posts: MatchItem[] }
  | { ok: false; error: "busy" | "credits" | "unavailable" | "invalid" };

const schema = z.object({
  services: z.array(z.object({ slug: z.string(), reason: z.string() })),
  projects: z.array(z.object({ slug: z.string(), reason: z.string() })),
  posts: z.array(z.object({ slug: z.string(), reason: z.string() })),
});

const LANG_NAME: Record<Language, string> = { uz: "Uzbek (Latin script)", en: "English", ru: "Russian" };

function buildCatalog() {
  return {
    services: servicesData.map((s) => ({
      slug: s.slug,
      title: s.title.en,
      summary: s.description.en,
    })),
    projects: projectsData.map((p) => ({
      slug: p.slug,
      title: p.title.en,
      summary: p.summary.en,
      stack: p.stack,
      category: p.category,
    })),
    posts: blogData.map((b) => ({
      slug: b.slug,
      title: b.title.en,
      excerpt: b.excerpt.en,
      tags: b.tags,
    })),
  };
}

/** Keeps only slugs that exist in the catalog, de-duplicated, max 3. */
export function filterMatches(items: MatchItem[], allowed: Set<string>): MatchItem[] {
  const seen = new Set<string>();
  const out: MatchItem[] = [];
  for (const it of items) {
    if (!allowed.has(it.slug) || seen.has(it.slug)) continue;
    seen.add(it.slug);
    out.push({ slug: it.slug, reason: it.reason.slice(0, 400) });
    if (out.length === 3) break;
  }
  return out;
}

export async function runMatch(input: MatchInput): Promise<MatchResult> {
  const apiKey = process.env["LOVABLE_API_KEY"];
  if (!apiKey) return { ok: false, error: "unavailable" };
  const catalog = buildCatalog();
  const provider = createOpenAI({
    baseURL: "https://ai.gateway.lovable.dev/v1",
    apiKey,
    headers: { "Lovable-API-Key": apiKey, "X-Lovable-AIG-SDK": "vercel-ai-sdk" },
  });

  try {
    const result = streamText({
      // Cast: ai and @ai-sdk/openai pin slightly different provider-spec patch versions.
      model: provider.responses("openai/gpt-6-astra") as unknown as LanguageModel,
      maxRetries: 0,
      maxOutputTokens: 1500,
      abortSignal: AbortSignal.timeout(30_000),
      output: Output.object({ schema }),
      system: `You help prospective clients of a freelance software engineer pick relevant services and past portfolio projects.
Choose ONLY from the catalog slugs below. Return 1-3 services, 1-3 projects and 0-2 blog posts (only posts that genuinely help this client) ranked by relevance, each with a one-sentence reason addressed to the client, written in ${LANG_NAME[input.lang]}.
Catalog JSON: ${JSON.stringify(catalog)}`,
      messages: [
        {
          role: "user",
          content: `Project goals: ${input.goals}\nBudget: ${input.budget || "not specified"}\nTimeline: ${input.timeline || "not specified"}`,
        },
      ],
      providerOptions: {
        openai: {
          forceReasoning: true,
          reasoningEffort: "low",
          reasoningSummary: "auto",
          store: false,
          include: ["reasoning.encrypted_content"],
        },
      },
    });
    const output = await result.output;
    return {
      ok: true,
      services: filterMatches(output.services, new Set(catalog.services.map((s) => s.slug))),
      projects: filterMatches(output.projects, new Set(catalog.projects.map((p) => p.slug))),
      posts: filterMatches(output.posts, new Set(catalog.posts.map((b) => b.slug))).slice(0, 2),
    };
  } catch (err) {
    const status = (err as { statusCode?: number }).statusCode;
    console.error("match failed", status, err instanceof Error ? err.message : err);
    if (status === 429) return { ok: false, error: "busy" };
    if (status === 402 || status === 403) return { ok: false, error: "credits" };
    return { ok: false, error: "unavailable" };
  }
}
