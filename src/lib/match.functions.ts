import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { runMatch } from "./match.server";

const inputSchema = z.object({
  goals: z.string().trim().min(10).max(2000),
  budget: z.string().max(60).optional(),
  timeline: z.string().max(60).optional(),
  lang: z.enum(["uz", "en", "ru"]),
});

export const matchProject = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => inputSchema.parse(data))
  .handler(async ({ data }) => {
    const { budget, timeline, ...rest } = data;
    return runMatch({ ...rest, ...(budget ? { budget } : {}), ...(timeline ? { timeline } : {}) });
  });
