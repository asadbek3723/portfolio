import { createServerFn } from "@tanstack/react-start";
import { getRequest } from "@tanstack/react-start/server";
import { z } from "zod";

const inputSchema = z.object({
  name: z.string().trim().min(1).max(200),
  email: z.string().trim().email().max(320),
  subject: z.string().trim().max(300).default(""),
  body: z.string().trim().min(1).max(5000),
  // Honeypot: real visitors leave this empty.
  website: z.string().max(200).optional(),
});

export const sendContactMessage = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => inputSchema.parse(data))
  .handler(async ({ data }) => {
    // Pretend success to bots that fill the hidden field.
    if (data.website) return { ok: true as const };
    const headers = getRequest()?.headers;
    const ip = headers?.get("x-forwarded-for")?.split(",")[0]?.trim() || headers?.get("x-real-ip") || "unknown";
    const { saveContactMessage } = await import("./contact.server");
    const { website: _website, ...message } = data;
    return saveContactMessage(message, ip);
  });
