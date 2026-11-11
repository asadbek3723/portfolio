import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/llms-full.txt")({
  server: {
    handlers: {
      GET: async () => {
        const { buildLlms } = await import("@/lib/llms.server");
        return new Response(await buildLlms(true), { headers: { "content-type": "text/plain; charset=utf-8", "cache-control": "public, max-age=900, s-maxage=900" } });
      },
    },
  },
});
