# Interactive Photo Stack

- **Section:** Team / People
- **Source:** https://21st.dev/@ravikatiyar162/components/photo-stack
- **Stack:** React + TypeScript, Tailwind CSS v4, shadcn-style tokens (`bg-background`, `text-foreground`), `cn()` (clsx + tailwind-merge). No animation library — pure CSS transitions.
- **Files:** `interactive-photo-stack.tsx` (component + demo data), `demo.tsx` (re-exports the demo), `preview.webp`, `preview.mp4`

## What it looks like

At rest: up to 5 polaroid-style cards (white frame, `p-2`, photo on top, name below in italic serif)
stacked in the center. Cards behind the top one are slightly offset down, scaled down, and tilted
(±2°, ±4°, 6°), so it reads as a physical pile of photos. A bold title sits below.

On hover over the area: the pile explodes — every card flies to a random position across the
viewport with a random tilt, like photos tossed on a table. Hovering a scattered card scales it to 110%.

On click of a scattered card: that card spins, then the pile collapses back with it on top.
On mouse leave: the pile collapses back to the previous order.

## How it works

1. **Stack state** — `activeIndex` is the top card. Each card's `depth = (index - activeIndex) mod n`.
   Resting transform: `translateY(depth * 0.5rem) scale(1 - depth * 0.05)`, plus a Tailwind rotate
   class picked by depth; `zIndex = n - depth` (active card gets `n`).
2. **Scatter** — on `mouseenter`, generate one transform per card:
   `translate(Xvw, Yvh) rotate(Rdeg)` with X ∈ [-45, 45], Y ∈ [-25, 25], R ∈ [-25, 25].
   Rejection sampling: retry (max 100) until the card is ≥ 25vw horizontally OR ≥ 45vh vertically
   from all placed cards. New positions every hover, so it never looks the same twice.
3. **Motion** — all movement is `transition-all duration-500 ease-in-out` on the inline `transform`.
   Switching between the stacked transform and the scattered transform animates the fly-out/fly-in.
   Units are vw/vh, so cards travel relative to the viewport, not the container.
4. **Select** — click while scattered sets `spinningIndex` (zIndex 200, `animate-spin-y`), then after
   700 ms collapses and makes that card the new `activeIndex`.

## Reproduction notes / gotchas

- `animate-spin-y` is **not defined** in the original bundle's CSS, so in the original the spin does
  nothing. Define it to get the intended effect, e.g. in Tailwind v4:
  ```css
  @theme {
    --animate-spin-y: spin-y 0.7s ease-in-out;
    @keyframes spin-y {
      from { transform: rotateY(0deg); }
      to   { transform: rotateY(360deg); }
    }
  }
  ```
  Note the keyframe `transform` overrides the inline scattered transform while it runs; if that
  causes a jump, animate `rotate: y 360deg` (individual transform property) instead.
- The original `onMouseLeave` checks `!spinningIndex`, which is falsy for index 0 — a small bug (fixed in this file);
  use `spinningIndex === null` if reproducing.
- The scatter area uses viewport units; the section needs `overflow: hidden` on a parent or cards
  can create horizontal scroll.
- Works best with portrait photos (card is 16rem × 20rem, image 16rem tall, `object-cover`).
- Touch devices have no hover — add a tap-to-scatter toggle if mobile matters.

## Adapting

Good for team sections, testimonials, portfolio highlights, "meet the founders". Swap the italic serif
name for role + name, change the frame color to match the brand, or reduce scatter range to keep
cards inside the section instead of the full viewport.
