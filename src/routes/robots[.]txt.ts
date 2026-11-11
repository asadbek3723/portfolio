import { createFileRoute } from "@tanstack/react-router";

// Search engines, image search and AI assistants (ChatGPT, Claude, Perplexity, Gemini, Copilot, Apple)
// may read every public page, so "who is Asadbek Jumanazarov" can be answered from the site itself.
const AI_BOTS = [
  "GPTBot", "OAI-SearchBot", "ChatGPT-User", "ClaudeBot", "Claude-SearchBot", "Claude-User", "anthropic-ai",
  "PerplexityBot", "Perplexity-User", "Google-Extended", "Applebot", "Applebot-Extended", "Bingbot", "CCBot",
  "DuckAssistBot", "meta-externalagent", "YandexBot",
];

export const Route = createFileRoute("/robots.txt")({
  server: {
    handlers: {
      GET: async () => {
        const { abs } = await import("@/lib/site");
        const block = (agent: string) => `User-agent: ${agent}\nAllow: /\nDisallow: /admin\n`;
        const body = [
          "User-agent: *\nAllow: /\nDisallow: /admin\nDisallow: /admin/\n",
          "# Google Images may index every public photo.\nUser-agent: Googlebot-Image\nAllow: /\n",
          "# AI assistants and answer engines: a plain-text profile is at /llms.txt (full version: /llms-full.txt).",
          ...AI_BOTS.map(block),
          `Sitemap: ${abs("/sitemap.xml")}\n`,
        ].join("\n");
        return new Response(body, { headers: { "content-type": "text/plain; charset=utf-8", "cache-control": "public, max-age=3600, s-maxage=3600" } });
      },
    },
  },
});
