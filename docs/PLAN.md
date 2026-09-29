# Web Design App — Plan

Agreed on 2026-09-29 (grill session). Vision and content pipeline: [PROJECT_VISION.md](PROJECT_VISION.md).

## Decisions

| Topic | Decision |
|---|---|
| UI language | English |
| Stack | Vite + React + TypeScript, Tailwind CSS v4, react-router |
| Data | No backend. `import.meta.glob` over `design-references/` (README/source as `?raw`, media as hashed assets) |
| Item model | One folder per item: `design-references/<section>/<item>/` with `README.md`, `meta.json`, media, optional source files |
| Sections | Web App, Pricing, Team, Scroll Effects, Logo Marquee, Auth, Blog, Footer, Lists & Items. Empty sections are hidden, and new ones appear when a folder exists. Web App uses subtype chips (Dashboard, Profile, Settings, ...) |
| Home | Header with anchors to each section, client-side text search, subtype chips |
| Detail | Own route `/effect/<section>/<item>`. Video loop or full image, actions (Copy description, Download .zip, per-file download, Source link), tabs Description (rendered README) and Code (shiki-highlighted at build time, hidden for image-only items) |
| Previews | v1 shows video/image only. Live previews are phase 3 (planned below) |
| Agent access | Build emits `catalog.json`, `llms.txt`, `llms-full.txt` |
| Deploy | Vercel, linked to GitHub `gabriel-castro-dev/Web-Design-App`, builds on every push |
| Commits | Many small commits, one feature slice each |

## `meta.json` schema

```json
{
  "title": "Interactive Photo Stack",
  "section": "team",
  "subtype": null,
  "kind": "component",
  "source": { "name": "21st.dev", "url": "https://21st.dev/@ravikatiyar162/components/photo-stack" },
  "tags": ["hover", "scatter", "polaroid"],
  "animated": true,
  "stack": ["react", "tailwind"],
  "summary": "One-line description shown on the card."
}
```

`kind` is `component` (has source files) or `image` (static reference). `subtype` is used for Web App (and later any section that grows).

## Phase 0 — Content restructure (done)

1. Convert Dribbble and Pinterest files into item folders under their section (`web-app/<slug>/`, `auth/<slug>/`) and drop the `INDEX.md` files.
2. Write a detailed visual-style `README.md` for every image item (48): layout, palette with hex values, typography, components, spacing and signature details, written so an agent can reproduce the style.
3. Add `meta.json` to every item (component items included).
4. Rename section folders to match section ids (`team-people` → `team`, `lists-items` → `lists`, ...).

## Phase 1 — Visual direction bake-off (done)

Outcome: **Dark Studio / taste-skill** won and became the app (`src/app/`). The other five variants and the bake-off page were removed (see git history).

1. Tailwind v4 + router + shared data layer (`src/data/`): loads items, sections, README, media URLs.
2. Three directions, each implemented twice (impeccable and taste-skill), each variant covering Home and the detail page with real data:
   - **Print Archive**: Swiss grid, mono + condensed grotesk, raw paper, one accent, sheet numbering and crop marks (`industrial-brutalist-ui`).
   - **Dark Studio**: near-black, media-first with videos as the hero, serif display, soft motion (`high-end-visual-design`, `design-taste-frontend`).
   - **Warm Paper**: warm monochrome, flat bento, muted pastels, magazine type (`minimalist-ui`).
3. Variants are isolated per route: `/variants/<direction>/<impeccable|taste>/`.
4. `bakeoff.html`: tabs for the 3 directions (keys 1–3), split view with impeccable on the left and taste on the right (iframes), and `F` for fullscreen on one side.
5. Deploy to Vercel. The owner picks one variant, and the rest are deleted.

## Phase 2 — Final app (done)

1. Promote the chosen variant to the real app shell (header, sections, search, subtype chips).
2. Detail page: media, actions, Description/Code tabs.
3. Downloads: client-side zip (JSZip) and per-file download.
4. Build step: `catalog.json`, `llms.txt`, `llms-full.txt` in `dist/`.
5. Performance: `loading="lazy"` for images, and `preload="none"` plus an IntersectionObserver play/pause for videos. `vercel.json` sets `Cache-Control: public, max-age=31536000, immutable` for `/assets/*` and adds an SPA rewrite.
6. Polish pass (a11y, responsive, reduced motion): the chosen variant already covers these; revisit after real use.

## Phase 3 — Live previews (done)

Shipped: `preview.html?item=<section>/<slug>` renders any component demo in isolation (own Tailwind build scanning `design-references/`, shadcn theme, error boundary); the detail page has a Recording / Live toggle; `npm run typecheck:refs` (part of `tsc -b`) keeps every reference compiling. Original plan below.


- Install the union of the effect dependencies: `motion`, `framer-motion`, `gsap`, `@gsap/react`, `lenis`, `@number-flow/react`, `canvas-confetti`, `react-intersection-observer`, `react-use-measure`, `class-variance-authority`, `lucide-react`, `react-icons`, and the shadcn primitives used (Button, Badge, Card, Switch, Item, Separator, ...) in `src/components/ui/`.
- Make every reconstructed `.tsx` compile (`tsc` over `design-references/**`), fixing the gaps listed in each README (missing keyframes, custom theme tokens).
- Render each `demo.tsx` inside a sandboxed iframe route (`/preview/<section>/<item>`) so global CSS (Lenis, GSAP pins, body rules) cannot leak into the gallery.
- Lazy-load each preview chunk (`import.meta.glob` without `eager`) so the gallery bundle stays small.
- Add a "Live / Video" toggle on the detail page.

## Adding content (ongoing)

- 21st.dev: `scripts/fetch-21st.sh <out> <urls...>`, then reconstruct the component into an item folder.
- Images: create the item folder with the image, `README.md` and `meta.json`.
- Component items need a `demo.tsx` (default export) to get a live preview; run `npm run typecheck:refs` and open `/preview.html?item=<id>` to check it.
- Always run `npm run compress` before committing media.
