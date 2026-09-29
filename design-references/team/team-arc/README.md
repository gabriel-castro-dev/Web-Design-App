# Animated Team Section (Arc Fan)

- **Section:** Team / People
- **Source:** https://21st.dev/@ravikatiyar162/components/team-section
- **Stack:** React + TypeScript, Tailwind CSS v4, shadcn-style tokens (`text-foreground`, `text-muted-foreground`, `border-background`), `cn()`, `framer-motion`, `react-intersection-observer`
- **Files:** `animated-team-section.tsx` (component, reconstructed from bundle), `demo.tsx` (original demo source), `preview.webp`, `preview.mp4`

## What it looks like

Centered section: big bold headline, muted paragraph below, and under it a row of square team photos
(rounded-xl, thin border, shadow) arranged like a hand of playing cards — fanned along a shallow
arc. The middle photo sits lowest and on top; photos toward the edges rise, tilt outward and tuck
underneath their neighbors.

When the section scrolls into view, all photos burst out from a single point in the center: they start
invisible and at half size, then spring one by one (left to right, 0.1 s apart) into their arc
positions with a slight overshoot. Hovering a photo springs it to 110% and brings it to the front.

## How it works

1. **Arc math** — for card `i` of `n`, `offset = i - (n - 1) / 2`:
   - `x = offset * 90` px (horizontal spacing; cards overlap because they are 112–176 px wide)
   - `y = |offset| * -30` px (edges rise → arc shape)
   - `rotate = offset * 12` deg (fan)
   - `zIndex = n - |offset|` (center on top)
2. **Layout** — all cards are `position: absolute` in one centered container (`min-height: 250px`),
   so the transforms alone place them. No grid/flex per card.
3. **Entry animation** — framer-motion variants. Parent `staggerChildren: 0.1`; child `hidden`
   `{opacity 0, scale 0.5, x 0, y 0, rotate 0}` → `visible` (function variant using `custom={index}`)
   with `type: "spring", stiffness: 120, damping: 12` (bouncy, visible overshoot).
4. **Trigger** — `useInView({ triggerOnce: true, threshold: 0.2 })` + `useAnimation().start("visible")`.
   Plays once when 20% of the arc is visible.
5. **Hover** — `whileHover: { scale: 1.1, zIndex: 99 }` with a stiffer spring (300 / 20).

## Reproduction notes / gotchas

- `x` spacing is fixed in px (90), not tied to card size. On mobile (`w-28` = 112 px) cards overlap
  less; on desktop (`w-44` = 176 px) heavily. With many members (> 9) the arc gets wider than small
  screens — `overflow-hidden` on the section clips it. Scale spacing by breakpoint or cap members.
- The `y` lift is negative so edge cards go *up*; the container needs top room (`mt-20`) or edges clip.
- The `ref` from `useInView` must be on the arc container, not the section (the section already
  uses the forwarded ref).
- Names are only used as `alt` — no visible name labels. Add a tooltip/caption on hover if needed.
- Respect `prefers-reduced-motion`: framer-motion's `useReducedMotion()` can skip the spring.

## Adapting

Works for team, founders, testimonials avatars, client logos, product shots. Try: adjust the arc
curvature (`-30`) and fan (`12deg`) for a tighter or wider hand; show a name tag on hover; tie
the stagger to scroll progress instead of a one-shot trigger.
