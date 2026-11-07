import { IMAGE_VARIANTS } from "./image-variants";

/**
 * Spread onto an <img>: `{...responsiveImage(src, sizes)}`. Local /assets JPEG/PNG files get a WebP
 * `srcSet` (see scripts/optimize-images.mjs) with the original as the `src` fallback. The seeded images
 * also live in the Supabase `media/site/` folder under the same file names (that is what the database
 * stores), so those URLs get the same srcSet, served from this site. Any other URL (admin uploads,
 * external) is returned unchanged.
 */
export function responsiveImage(src: string | undefined, sizes: string): { src: string; srcSet?: string; sizes?: string } {
  const url = src ?? "";
  const m = /^(?:\/assets\/|https:\/\/[^/]+\/storage\/v1\/object\/public\/media\/site\/)([^/?#]+)\.(jpe?g|png)(?:\?.*)?$/i.exec(url);
  const widths = m ? IMAGE_VARIANTS[`${m[1]}.${m[2]}`] : undefined;
  if (!m || !widths?.length) return { src: url };
  const srcSet = widths.map((w) => `/assets/opt/${m[1]}-${w}.webp ${w}w`).join(", ");
  return { src: url, srcSet, sizes };
}
