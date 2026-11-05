# Portfolio upgrade: AI project matcher, visible sections, sharing previews, every screen size

## 1. AI "Find the right service" feature
- New page **/match** (linked from the menu, the home page and the contact page), in UZ/EN/RU.
- The visitor describes their goals in a text box, and can optionally pick a budget and timeline.
- The AI suggests 1–3 of your services and 1–3 of your portfolio projects. Each suggestion comes with a short reason and links to its page, plus a "Contact me" button at the end.
- The AI can only choose from your real services and projects. Anything it returns that doesn't match one of them is thrown away.
- Friendly messages for empty input, too much traffic and running out of AI credits. While it works, a loading state is shown.
- This turns on Lovable Cloud (for the AI connection only). No database or logins are added.

## 2. Sections that stay visible, and a reduced-motion option
- Every section is visible by default. The animation only runs when a section scrolls into view. If the animation fails or the browser has no support, the content is already showing.
- If the visitor's device asks for reduced motion, all fade, slide, cursor-glow, marquee and smooth-scroll effects turn off and content appears right away.
- This applies to the home page and to every page that uses the same animations (project cards, detail pages, page headers).

## 3. Sharing previews for project and blog pages
- Each project and blog post page gets its own title, description and preview image, taken from that item's content in the current language (Uzbek by default).
- Preview images are cropped to the size social apps expect, 1200×630, from each item's own cover photo.
- The service, certificate, achievement and event pages get the same treatment.
- Note: these previews reach real links only after you publish.

## 4. Premium on every screen size (320px phones up to large 2560px monitors)
- Check and fix all main pages at 320, 375, 768, 1280, 1920 and 2560 widths.
- Your name in the large home page title will no longer break mid-word (today it shows "Asadbe / k").
- On large screens the content width is capped and the spacing grows smoothly. On small screens there is no sideways scrolling and nothing overflows.
- The menu, the language switcher and the photo grids get bigger tap targets on phones.

## Technical details
- AI: a server function in `src/lib/match.functions.ts` (validated input, max 2000 chars) streams the reply from the AI Gateway's `/v1/responses` using `openai/gpt-6-astra`, with structured output (strict json_schema `{services:[{slug,reason}], projects:[{slug,reason}]}`). The server builds a compact catalog of slugs, titles and summaries from `portfolioData.ts`, then validates the returned slugs against it. 429/402/403 are mapped to safe messages. `LOVABLE_API_KEY` is provisioned if missing.
- Motion: add a `MotionConfig reducedMotion="user"` wrapper in the root layout. FadeIn, the Primitives stagger, ProjectCard and DetailLayout use the `useReducedMotion` fallback, which renders with no hidden initial state, and get a smaller viewport margin (`amount: 0.1`). Add a `prefers-reduced-motion` CSS block (orb, marquee, scroll-behavior). Fix the home page sections that stay hidden on load.
- SEO: dynamic `head()` on the `$slug` routes looks up the item by `params.slug`. It sets `og:type: article`, a relative canonical and og:url, and og:image/twitter:image built as an absolute URL from a `getRequestOrigin` server fn plus share-sized copies (`public/og/<slug>.jpg`, generated with magick at 1200×630).
- Responsive: rework `text-fluid-hero` (no `overflow-wrap:anywhere`, smaller clamp min, the name split per word), add a container max width with 2xl/3xl spacing, and run a Playwright screenshot sweep across the widths listed above.
