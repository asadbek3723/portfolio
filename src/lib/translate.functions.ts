import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import type { TranslateResult } from "./translate.server";

const inputSchema = z.object({
  entries: z.array(z.object({ id: z.string().max(300), text: z.string().max(12000) })).min(1).max(150),
  context: z.string().max(200).default(""),
  mode: z.enum(["improve", "translate"]).default("translate"),
  instruction: z.string().max(300).default(""),
});

// Admins only: the caller's Supabase session is verified before any AI credit is spent.
export const translateContent = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => inputSchema.parse(data))
  .handler(async ({ data }): Promise<TranslateResult> => {
    const { checkAdmin } = await import("./admin-guard.server");
    const { runTranslate } = await import("./translate.server");
    const who = await checkAdmin();
    if (who !== "ok") return { ok: false, error: who };
    return runTranslate(data.entries, data.context, data.mode, data.instruction);
  });
