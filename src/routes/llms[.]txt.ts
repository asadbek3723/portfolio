import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/llms.txt")({
  server: {
    handlers: {
      GET: async () => {
        const { buildLlms } = await import("@/lib/llms.server");
        return new Response(await buildLlms(false), { headers: { "content-type": "text/plain; charset=utf-8", "cache-control": "public, max-age=900, s-maxage=900" } });
      },
    },
  },
});
