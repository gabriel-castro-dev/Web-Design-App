# Web Design App — Project Vision

Status: early stage. Detailed planning still pending (will use the grill-me skill).

## Purpose

A personal inspiration library of web design effects. It exists so Claude agents have concrete
references (the owner's taste) to start from when building a new project, instead of producing
generic "AI slop" designs.

## Product shape

- **Stack:** React + TypeScript (TSX) on Vite (already scaffolded).
- **Home page:** gallery split into sections (e.g. Team / People, Hero, Cards, Scroll, Text...).
- **Header:** navigation that jumps straight to each section.
- **Effect detail (on click):** each effect offers
  1. **Download source** — the effect file(s): React component, plain JS animation, CSS, etc.
  2. **Download MD** — a markdown written so an agent can reproduce the effect.
  3. **Copy description** — button that copies the same MD content (effect explanation + how to reproduce) to the clipboard.
- **Storage (decided 2026-09-29):** no Supabase for now. The app reads `design-references/` directly
  via Vite `import.meta.glob` (README/tsx as `?raw` for copy/download, media as hashed assets so they
  can be cached `immutable`). Lazy-load images (`loading="lazy"`) and videos (`preload="none"` +
  IntersectionObserver). Move to Supabase Storage only if the repo gets too heavy.

## Content pipeline

- Effects are collected from 21st.dev, Pinterest and Dribbble.
- For 21st.dev, the owner sends the component page link (`21st.dev/@author/components/slug`).
  The page HTML exposes: `bundle.*.html` (compiled preview), `code.demo.*.tsx` (public demo source),
  `preview.*.png`, `video.*.mp4`, npm dependencies and description. The component source itself is in
  a private bucket, so it is reconstructed from the minified bundle (Tailwind classes, logic and
  framer-motion configs survive minification).
- Extracted effects live in `design-references/<section>/<effect-name>/` with:
  - `*.tsx` — reconstructed component (+ `demo.tsx` when available)
  - `README.md` — agent-facing explanation: what the effect is, how it works, how to reproduce
  - `preview.webp` + `preview.thumb.webp` / `preview.mp4` — for the gallery (after `npm run compress`)
  - source link (inside README)
- Dribbble: collection pages are fetchable, individual shot pages are behind an AWS WAF challenge,
  so only each shot's cover image is downloaded (`design-references/dribbble/<collection>/INDEX.md`).
- Pinterest: boards are not fetchable (client-rendered + 403 API). The owner sends direct image URLs
  (`i.pinimg.com/...`; swap the size segment for `originals/` for full res). Stored in
  `design-references/pinterest/<category>/` with a described `INDEX.md`.
- Media compression: `npm run compress` (sharp + ffmpeg). Images become `.webp` (max 1920px) plus
  `.thumb.webp` (640px), videos become H.264 at max 1280px with no audio. Run it after every new batch.
