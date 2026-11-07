// Content (admin-editable) ends up in href attributes. Only these schemes may be rendered as links,
// so a stored `javascript:` / `data:` URL can never run on click.
const ALLOWED = new Set(["http:", "https:", "mailto:", "tel:"]);

/** Returns the URL when it is a relative path or uses an allowed scheme, otherwise "#". */
export function safeUrl(value: string | undefined | null): string {
  const url = (value ?? "").trim();
  if (!url) return "#";
  if (url.startsWith("/") && !url.startsWith("//")) return url;
  if (url.startsWith("#")) return url;
  try {
    return ALLOWED.has(new URL(url).protocol) ? url : "#";
  } catch {
    return "#";
  }
}

/** JSON for an inline <script type="application/ld+json">: `<` is escaped so content cannot close the tag. */
export function jsonForScript(value: unknown): string {
  return JSON.stringify(value)
    .replace(/</g, "\\u003c")
    .replace(new RegExp(String.fromCharCode(0x2028), "g"), "\\u2028")
    .replace(new RegExp(String.fromCharCode(0x2029), "g"), "\\u2029");
}

/** ISO date string, or undefined when the (free-text) date is not parseable. */
export function safeIso(value: string | undefined): string | undefined {
  if (!value) return undefined;
  const d = new Date(value);
  return Number.isNaN(d.getTime()) ? undefined : d.toISOString();
}
