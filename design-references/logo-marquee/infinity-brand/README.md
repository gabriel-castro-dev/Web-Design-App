# Infinity Brand (CSS social-icon marquee)

- **Section:** Logo marquee / Brand strip
- **Source:** https://21st.dev/@uilayout.contact/components/infinity-brand (bundle published under `larsen66/infinity-brand`; author credit in code: naymur / ui-layouts)
- **Stack:** React + TypeScript, Tailwind CSS v4, shadcn-style tokens (`bg-primary`, `text-primary-foreground`, `fill-primary-foreground`, `border`). No npm deps, no JS animation — one CSS `@keyframes` injected via an inline `<style>`.
- **Files:** `infinity-brand.tsx` (component, reconstructed from bundle; exported as `InfinityBrand` and as the original name `Component`), `demo.tsx` (original demo source, import path fixed), `preview.webp`, `preview.mp4`

## What it looks like

A single full-width horizontal strip of small square tiles scrolling continuously to the left. Each
tile is a `bg-primary` rounded square (`rounded-md`, `p-2`, 1px border) with a social-network glyph
(X, YouTube, GitHub, repeating) in `primary-foreground`, ~36–40px icons. In dark theme (preview) that
is light-gray tiles with black glyphs on a near-black page; in light theme, black tiles with white
glyphs. Tiles are spaced 32px each side (`mx-8`) on ≥640px.

The edges fade out via a CSS mask: transparent at the very left, fully opaque from 128px, and fading
again over the last 200px on the right (asymmetric fade). No hover state, no pause; the tiles are
links (`target="_blank"`).

## How it works

1. **Structure** — outer `div.w-full.inline-flex.flex-nowrap.overflow-hidden.py-8` containing two
   `<ul class="flex items-center">` lists side by side. The second list is `aria-hidden="true"`
   (visual clone for the loop).
2. **Animation** — each `<ul>` gets inline `animation: infinite-scroll 25s linear infinite` with
   `@keyframes infinite-scroll { from { translateX(0) } to { translateX(-100%) } }`. `-100%` is
   relative to the list's own width, so when list 1 has fully scrolled out, list 2 has moved into
   its place, then both snap back to 0 → loop.
3. **Mask** — arbitrary Tailwind class
   `[mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-200px),transparent_100%)]`.
4. **Spacing** — `[&_li]:mx-4 sm:[&_li]:mx-8`; `[&_img]:max-w-none` (for image logos, unused here).
   `md:justify-start` / `justify-center` on the lists.
5. **Tiles** — `a.border.bg-primary.text-primary-foreground.text-2xl.sm:grid.hidden.place-content-center.p-2.rounded-md`;
   SVG `w-9 h-9` (X) or `w-10 h-10` (YouTube, GitHub), `fill-primary-foreground`.

## Reproduction notes / gotchas

- **Not seamless (bug in the original):** list 1 has the 3 links ×3 (9 tiles) while the clone has
  them ×2 (6 tiles). The lists have different widths, so each translates a different distance in the
  same 25s → they drift apart and the loop visibly jumps/gaps at the 25s reset. Fix: render the same
  item array in both lists (and ensure one list is wider than the viewport).
- **Empty on mobile:** tiles use `sm:grid hidden` → `display:none` below 640px. The strip renders
  nothing on phones. Remove `hidden` (use `grid`) if you want it everywhere.
- The keyframes live in a `<style>` rendered by the component on every mount; move them to your
  global CSS (or Tailwind v4 `@theme { --animate-... }`) in a real project.
- `text-5xl` on the wrapper has no visible effect (the icons are SVGs with fixed size).
- No `prefers-reduced-motion` handling — add `motion-reduce:[animation:none]` to the lists.
- The `aria-label` on each link is an addition in this reconstruction (the original links had no
  accessible name). Links lack `rel="noopener noreferrer"`.
- Classes in the bundle had stray double spaces; they were normalized (no semantic change).

## Adapting

Swap `socialLinks` for brand logos (`<img>` — `[&_img]:max-w-none` is already there to keep them
from shrinking). Tune speed via the `25s`, the edge fade via the `128px` / `200px` mask stops, and
reverse direction with `animation-direction: reverse`. For a variable-speed or hover-slowdown version,
see `../infinite-slider` (motion-driven).
