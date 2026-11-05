export function adminHead(title: string) {
  const full = `${title} — Asadbek Admin`;
  const description = `Asadbek Jumanazarov portfolio boshqaruvi: ${title}.`;
  return { meta: [{ title: full }, { name: "description", content: description }, { property: "og:title", content: full }, { property: "og:description", content: description }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary" }, { name: "robots", content: "noindex,nofollow" }] };
}