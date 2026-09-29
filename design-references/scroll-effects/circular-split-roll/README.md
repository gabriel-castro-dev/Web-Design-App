# Circular Split Roll (Twin-Orbit Pinned Gallery)

- **Section:** Scroll effects
- **Source:** https://21st.dev/@hyperiux/components/circular-split-roll
- **Stack:** React + TypeScript, Tailwind CSS v4 (uses v4 syntax `text-(length:--var,…)`, `h-(--var,…)`, `max-[1025px]:`, `not-sr-only`), shadcn tokens (`bg-background`, `text-foreground`), `gsap` + `ScrollTrigger` (`gsap.matchMedia`, `gsap.context`)
- **Files:** `circular-split-roll.tsx` (component, reconstructed from bundle), `demo.tsx` (original demo), `images/*.jpg` (10 default images extracted from base64 data URIs in the bundle), `preview.webp`, `preview.mp4`

## What it looks like

A full-screen section (theme background — near-black in dark mode) that pins while you scroll.
The screen is split in two halves:

- **Left:** a column of project titles (`font-medium`, `leading-none`, tight `-0.04em` tracking,
  `clamp(28px, 3vw, 56px)`), laid out along the right arc of a big invisible circle.
- **Right:** square image cards (205px in the demo, `rounded-[18px]`, beige `#f5f2eb` placeholder
  bg, deep double drop shadow) laid out along the left arc of a second circle.

The two arcs bulge toward each other, like a pair of parentheses `) (`. Exactly one title and its
matching card sit at vertical centre on the inner edges: full size, full opacity. Moving away from
the centre, items slide along the arc, shrink (titles to 0.68, cards to 0.58) and fade out hard
(titles 0.18, cards 0.14), so only the centre pair reads clearly and the rest are ghosts
disappearing off the top/bottom. Scrolling rotates both wheels in sync (with 1.2 s scrub lag), so
each title/card pair rolls into focus in turn; the list loops around the circle.

Under 1025px, or with `prefers-reduced-motion`, the whole animation is replaced by a plain
3-column (2 below 768px) grid of square cards with titles underneath.

## How it works

1. **Pin** — `ScrollTrigger.create({ trigger: section, start: "top top", end: "+=" + sectionHeight * items.length + "%", pin: stage, scrub, pinSpacing, invalidateOnRefresh: true, onUpdate: self => render(self.progress) })`.
   Public wrapper default `sectionHeight = 100` → 10 items = 1000% of viewport height of scroll.
   Inner comp default is 260. `scrub = 1.2`.
2. **Per-item phase** — `p = wrap(index / count - progress + focusPhase / count)` (`focusPhase = 0.5`,
   `wrap` keeps it in [0,1)). Over the full scroll, progress 0→1 rotates the circle exactly once.
3. **Circle position** — `angle = p * 2π + angleOffset`, `x = sin(angle) * radiusX`,
   `y = cos(angle) * radiusY`. Left titles use `angleOffset = π`, right cards `0`.
4. **Focus strength** — `strength = mapRange(-1, 1, 0, 1, depth)`, clamped; titles use
   `depth = sin(angle)` (focus at the right edge of their circle), cards use `-sin(angle)` (focus at
   the left edge). Then `focus = clamp((strength - start) / (1 - start)) ^ power` — titles
   `start 0.42, power 2.6`; cards `start 0.45, power 3.2`. The high power makes focus very narrow.
5. **Mapping** — `scale = lerp(side, center, focus)`, `opacity = lerp(sideOpacity, centerOpacity, focus)`,
   `zIndex = round(lerp(1, depthMax, focus))` (titles max 30, cards 40). Applied with `gsap.set`
   (no tweens — ScrollTrigger's scrub is the only smoothing).
6. **Column placement** — each half is `w-[50vw]`; left half `translateX(calc(5vw - 500px))`, right
   half `translateX(calc(500px - 5vw))` (`columnSpreadVw = 5`, `columnOffsetPx = 500`). With
   radius 500 the offsets cancel the radius, so the focused title lands at ≈30vw and the focused
   card at ≈70vw.
7. **Responsive scale** — between 768 and 1200px viewport width, radii and card size are multiplied by
   `innerWidth / 1200`; card size is written into `--css-card-width/height` CSS vars on the section.
   A resize listener re-renders at the last progress and calls `trigger.refresh()`.
8. **Gating** — the GSAP setup lives inside `gsap.matchMedia().add("(min-width: 769px)")` and a
   `gsap.context(..., section)` (scoped class selectors); cleanup kills the trigger, reverts the
   context and the matchMedia.

## Reproduction notes / gotchas

- **Breakpoint mismatch:** GSAP runs at ≥769px but the stage is `max-[1025px]:hidden`. Between 769 and
  1025px the ScrollTrigger still pins a `display:none` stage (pin-spacing adds a big blank scroll
  area) while the grid fallback is shown. Align both on the same breakpoint (e.g. matchMedia
  `(min-width: 1026px) and (prefers-reduced-motion: no-preference)`).
- Reduced motion hides the stage but the ScrollTrigger is still created — same blank-scroll issue.
- `columnOffsetPx` is not scaled with viewport while radii are, so at 768–1200px the focus
  points drift inward. Scale it together if you change widths.
- Titles are `absolute left-1/2 w-full` inside a `relative h-[78vh]` box that has **no width**, so the
  title box is 0px wide and the `whitespace-nowrap` text overflows from the anchor point; the
  translate then positions it. If you restyle, give the wrapper a width or add `-translate-x-1/2`.
- Items start `opacity-0` and are revealed by `gsap.set(..., { opacity: 1 })` before the first
  render — without JS the stage stays invisible (grid is still in the DOM as `sr-only`).
- The stage is `aria-hidden`; the sr-only grid carries the accessible content. Good pattern — keep it.
- Default images were inlined as base64 in the bundle; they are extracted to `images/`. The
  component imports them as static assets (works in Vite/Next; `src()` handles Next's `{ src }` objects).
  Swap for your own via `items`.
- Tailwind v3 won't understand `text-(length:--css-title-size,…)` / `h-(--css-card-height,210px)`;
  use `text-[length:var(--css-title-size)]` / `h-[var(--css-card-height)]` there.

## Adapting

Works for project indexes, team rosters (name ↔ portrait), service lists, testimonials (quote ↔
logo). Try: elliptical paths (`leftRadiusX ≠ leftRadiusY`); lower `imageFocusPower` for a softer
falloff; `focusPhase` to change which item starts centred; swap sides with the angle offsets;
add a snap (`snap: 1 / (count)`) to the ScrollTrigger so each pair locks in focus.
