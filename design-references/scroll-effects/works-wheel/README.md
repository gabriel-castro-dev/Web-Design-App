# Works Wheel (Ring → 3D Drum Carousel)

- **Section:** Scroll effects / Portfolio index
- **Source:** https://21st.dev/@crafterui/components/works-wheel
- **Stack:** React + TypeScript, Tailwind CSS v4 (shadcn tokens `bg-background`, `text-foreground`, `bg-muted`, `text-muted-foreground`), `cn()`. **No animation library** — a `requestAnimationFrame` loop writing CSS 3D transforms.
- **Files:** `works-wheel.tsx` (component, reconstructed from bundle), `demo.tsx` (original demo; images hot-linked from crafterui.com), `preview.webp`, `preview.mp4`

## What it looks like

Full-height, theme-colored panel (white in light mode). **Closed state:** 9 landscape artwork
cards (`rounded-lg`, soft long drop shadow tinted from the foreground color) are arranged in a
ring like clock numbers, each rotated so its top edge points outward (top card upright, side
cards turned 90°, bottom ones upside-down). In the middle of the ring, a large light-weight
title "Works '26" (`tracking-tight`). Top-right corner: a small right-aligned index of all titles
in muted grey, the active one in foreground color + `font-medium`.

**On wheel / drag / arrow keys**, the ring smoothly morphs into a vertical 3D **drum**: the cards
un-rotate, grow to full size, and wrap onto an invisible horizontal cylinder in front of the
viewer — the active card faces you flat in the centre, its neighbours tilt away above and below
(40° per step) and curve slightly to the left (a "bow"). Cards further than 1.6 steps disappear.
The centre label fades out and the active item's title fades in on the left (8% from edge,
vertically centred). Further scrolling turns the drum one item at a time, easing and snapping to
each card. Hovering a linked card reveals a small frosted pill bottom-right ("↗ View") that slides
up 4px and fades in. Clicking an index entry spins the drum to that item.

## How it works

1. **State model** — one number `target` in `[0, count]`: `0` = closed ring, `1` = drum on item 0,
   `1 + n` = drum on item n. `current` eases toward it every frame: `current += (target - current) * 0.12`
   (snaps when `|diff| < 5e-4`; with reduced motion factor is `1` = instant).
   `open = clamp(current, 0, 1)`, `drumPos = max(0, current - 1)`.
2. **Geometry from container size** (ResizeObserver): `cardW = min(h * 0.38 * 1.45, w * 0.34)`,
   `cardH = cardW / 1.45`; `ringR = cardH * 1.14`; `drumR = cardH * 2.22`; `bow = cardH * 1.82`;
   `perspective = cardH * 2.7`; big title font `cardH * 0.124`; index font `cardH * 0.04`;
   `ringScale = clamp(2π·ringR / count · 0.82 / cardW, 0.16, 1)` (cards shrink to fit the ring).
3. **One transform string, two layouts** — for card `i`, `offset = i - drumPos`, `tilt = offset * 40`:
   `translateX(open·bow·-(1 - cos tilt)) rotateZ((1-open)·offset·360/count) translateY(-(1-open)·ringR) rotateX(open·tilt) translateZ(open·drumR)`.
   At `open = 0` only the ring part survives; at `1` only the drum part. The inner `<span>` gets
   `scale(lerp(ringScale, 1, open))`. The stage gets `translateZ(-open·drumR)` so the front card
   lands at z = 0 (true size). Stage is `transform-style: preserve-3d`; cards `backface-visibility: hidden`;
   perspective on the viewport div.
4. **Per-card extras** — `opacity = open > 0.5 && |offset| > 1.6 ? 0 : 1` (hard cut, no fade);
   `zIndex = round(100 - |offset| * 2)`. Label opacity `1 - open`, left title opacity `open`.
   `active = clamp(round(drumPos), 0, last)` (setState only when it changes).
5. **Input**
   - Wheel (non-passive listener): `target += deltaY / 900`; `preventDefault()` only while
     `0 < next < count` so the page scrolls normally before/after; 140 ms after the last wheel
     event the target snaps to `round(target)` (note: this also snaps the ring/drum morph to 0 or 1).
   - Pointer drag (vertical, pointer capture): `target += (lastY - y) / 420`; on release snaps to the
     nearest item only if `target > 1`.
   - Keyboard (viewport is a focusable `role="listbox"`): ArrowDown / ArrowUp = `round(target) ± 1`.
   - Index buttons: `target = index + 1`.
   All go through `setTarget` which clamps to `[0, count]`.
6. **A11y** — cards are `role="option"` with `aria-selected`, viewport uses
   `aria-activedescendant="works-wheel-{active}"`; focus ring `outline-2 -outline-offset-4`.

## Reproduction notes / gotchas

- The component fills its parent (`h-full`, `min-h-[24rem]`): the parent needs a real height
  (demo: `h-screen`). Everything scales off that height, so it's fully fluid.
- Wheel hijacking: the page stops scrolling while the pointer is over the wheel and the drum is
  mid-range. On touch devices the viewport has `touch-pan-x`, so vertical swipes go to the pointer
  drag handler instead of scrolling the page — users can get "stuck" if the wheel fills the screen.
- The rAF loop runs forever while mounted (even when idle) and calls `setActive` each frame (no-op
  when unchanged). Fine for one instance; pause it when off-screen if you have several.
- Keys use `item.title` — titles must be unique.
- Card `href` makes the card an `<a>`; dragging over a link still fires a click on release — add a
  drag-distance guard if that matters.
- The shadow uses Tailwind v4's `shadow-foreground/12` to set `--tw-shadow-color`, consumed by
  `shadow-[0_18px_40px_-18px_var(--tw-shadow-color)]`.
- Demo images are hot-linked from `https://www.crafterui.com/art/*.jpg`; host your own for production.

## Adapting

Portfolio/project indexes, album or episode pickers, product collections, team grids. Try:
change `DRUM_STEP_DEG` (smaller = more cards visible), `VISIBLE_RANGE`, or `BOW_FACTOR = 0` for a
straight drum; make `EASE` smaller for heavier inertia; replace the left title with a richer info
panel (year, role, link) keyed on `active`.
