# Scroll Portrait Wall

- **Section:** Team / People (speakers / lineup)
- **Source:** https://21st.dev/@ruixen.ui/components/scroll-portrait-wall
- **Stack:** React + TypeScript, Tailwind CSS v4, shadcn tokens (`bg-background`, `text-foreground`, `text-muted-foreground`), `cn()` (clsx + tailwind-merge), `gsap` + `ScrollTrigger`, `@gsap/react` (`useGSAP`)
- **Files:** `scroll-portrait-wall.tsx` (component, reconstructed from bundle), `demo.tsx` (original demo), `preview.webp`, `preview.mp4`

## What it looks like

A tall, full-width, scroll-driven "lineup" wall (preview shown in dark mode: near-black page). A huge title
("The Lineup", semibold, `tracking-tighter`, `text-5xl` → `sm:7xl` → `md:8xl` → `lg:9xl`) with a tiny uppercase date
under it stays **pinned in the vertical center** of the viewport the whole time. The title is white with
`mix-blend-exclusion`, so where it overlaps a portrait it inverts — letters become black on the white parts of the
image (the "Lineup" letters split half white / half black in the preview).

Behind it, square portraits (grayscale, contrast 1.15) are scattered across an invisible grid of equal square
cells — mostly one portrait per row, alternating sides, sometimes two. As you scroll, each portrait **grows from a
point to full cell size** as it rises toward the middle of the screen, then **shrinks back to nothing** as it leaves
the top. Portraits in the left half grow out of their bottom-right corner, those in the right half out of their
bottom-left corner — so they bloom toward the center. Hovering a portrait scales the image to 95% (500 ms).

At the start, a small uppercase muted hint ("scroll to meet the lineup") sits at 60vh with a thin vertical gradient
line hanging below it; it fades out over the first ~40% viewport of scroll. Optional captions (name left,
"(role)" right, uppercase 11 px / `sm:text-sm`) hang just under each portrait.

## How it works

1. **Grid layout (`buildLayout`)** — rows of `cols` cells (`-1` = empty). Row `r` puts the next speaker at column
   `(r*2 + r%2) % cols`; when `r % 3 === 0` a second speaker goes at `(primary + 2) % cols` (or `+1` if that
   collides). With 4 columns: rows alternate col 0 / col 3, and rows 0, 3, 6… add a second portrait at col 2 / col 1.
   Each row is `flex w-full`; every cell (empty or not) is `aspect-square flex-1`, so cell size = viewport width / cols.
2. **Responsive columns (`useResponsiveColumns`)** — `matchMedia`: ≥1024 px → `columns` (default 4), ≥640 px →
   `min(columns, 3)`, else `min(columns, 2)`. Changing it rebuilds the layout and, via
   `useGSAP({ dependencies: [cols], revertOnUpdate: true })`, kills and recreates all ScrollTriggers.
3. **Portrait scrub** — for every `.spw-item`: `gsap.timeline({ scrollTrigger: { trigger: item, start: "top bottom",
   end: "bottom top", scrub: true } })` → `.fromTo(item, {scale: 0}, {scale: 1, ease: "power2.out", duration: 0.5})`
   → `.to(item, {scale: 0, ease: "power2.in", duration: 0.5})`. Full size exactly when the cell's center crosses the
   viewport center. `scrub: true` = locked 1:1 to scroll, no smoothing.
4. **Transform origin** — inline `transformOrigin: colIndex < cols/2 ? "right bottom" : "left bottom"`, plus inline
   `transform: scale(0)` so nothing flashes before GSAP runs.
5. **Sticky title** — `sticky top-1/2 -translate-y-1/2 z-20 pointer-events-none text-white mix-blend-exclusion`. The
   title block is placed *before* the grid in the flow, so it sticks for the whole section height. The grid has
   `mt-[50vh] mb-[50vh]` so the first portrait starts below the fold and the last one can scroll fully out.
6. **Hint** — `absolute left-1/2 top-[60vh] -translate-x-1/2`; the line is an `::after` (`h-16 w-px
   bg-gradient-to-b from-transparent to-muted-foreground/40`). Faded with `gsap.to(hint, {autoAlpha: 0, ease: "none",
   scrollTrigger: {trigger: section, start: "top top", end: "+=40%", scrub: true}})`.
7. **Reduced motion** — if `prefers-reduced-motion: reduce`, all items are `gsap.set` to `scale: 1` and no triggers
   are created (static wall; the hint stays visible).

## Reproduction notes / gotchas

- `gsap.utils.toArray(".spw-item")` relies on `useGSAP`'s `scope` to limit the selector to this section — keep
  `scope: sectionRef` or two walls on a page would animate each other's items.
- `mix-blend-exclusion` only inverts against content in the same stacking context; the grid is `relative z-0` and the
  title `z-20` in the same section. Don't put `isolation: isolate` / a transform / opacity on the title's parent or
  the blend stops working. On a light theme the white title becomes black over the white page (exclusion of white on
  white) — works in both themes.
- The title's sticky container sits in normal flow, so it adds its own height to the section (~one title height gap
  above the grid).
- `columns = 1` breaks `buildLayout`: the secondary slot resolves to the same column and overwrites a speaker
  (every 3rd row loses one person). Keep columns ≥ 2.
- The hover `hover:scale-95` is on the `<img>` inside the GSAP-scaled wrapper, so it doesn't fight GSAP's transform.
- Captions are positioned `absolute -bottom-2 translate-y-full` — they overflow the cell and can overlap the next row's
  cell (usually empty). `truncate` on the name, `shrink-0` on the role.
- Portraits are full-bleed squares with no gap; the scatter comes from empty cells.
- The hint uses `absolute` without the section having an explicit height — fine because the grid's margins make it
  tall. `ScrollTrigger.refresh()` may be needed if images without dimensions shift layout (here cells are
  aspect-locked, so no issue).
- The original export style is unknown (demo uses the named export); this file exports both named and default.

## Adapting

Conference speakers, podcast guests, "the people behind X", artist rosters. Swap grayscale for full color, set
`showCaptions` for names, tweak the scatter by changing the row formula or the every-3rd-row rule, use `scrub: 0.5`
for a smoother lag, or change the origins to `"center"` for a symmetric bloom.
