# Infinite Slider (motion-primitives)

- **Section:** Logo marquee / Carousel strip
- **Source:** https://21st.dev/@ibelick/components/infinite-slider (motion-primitives by ibelick)
- **Stack:** React + TypeScript, Tailwind CSS, `cn()` (clsx + tailwind-merge), `framer-motion` (`motion`, `animate`, `useMotionValue`), `react-use-measure`
- **Files:** `infinite-slider.tsx` (component, reconstructed from bundle), `demo.tsx` (original demo source — 3 variants: basic logos, hover-speed album covers, two vertical columns; exported as a default *object*), `preview.webp`, `preview.mp4`

## What it looks like

A borderless horizontal row of items gliding at constant speed, looping forever with no visible seam.
The preview (basic demo) shows large brand logos (`h-[120px] w-auto` — Nintendo, jQuery, Prada, Apple
Music, Chrome, Strava) on white, 24px apart, moving **to the right** (`reverse`). No masks or fades —
items are hard-clipped by `overflow-hidden` at the container edges.

Other demo variants: square album covers (`w-[120px] aspect-square rounded-[4px]`) that **slow down**
smoothly while hovered (`durationOnHover={75}` vs default 25), and two vertical columns in a 350px-tall
box scrolling in opposite directions (up / down).

## How it works

1. **Track** — `div.overflow-hidden` (+ `className`) → `motion.div.flex.w-max` with inline
   `gap: {gap}px` and `flexDirection: row|column`. It renders `children` **twice**.
2. **Measure** — `useMeasure()` on the track gives `width` / `height`. `contentSize = size + gap`;
   half of that (`contentSize / 2`) is exactly one copy + one gap = the seamless loop distance.
3. **Loop** — a `useMotionValue(0)` drives `x` (horizontal) or `y` (vertical).
   `animate(translation, [from, to], { ease: "linear", duration: currentDuration, repeat: Infinity,
   repeatType: "loop", repeatDelay: 0, onRepeat: () => translation.set(from) })`.
   Normal: `from = 0`, `to = -contentSize/2` (moves left / up). `reverse`: `from = -contentSize/2`, `to = 0`.
4. **Defaults** — `gap = 16`, `duration = 25` s per loop, `direction = "horizontal"`, `reverse = false`.
5. **Hover speed change** (only when `durationOnHover` is set) — `onHoverStart` sets
   `isTransitioning = true` and `currentDuration = durationOnHover`; `onHoverEnd` does the same with
   `duration`. While transitioning, the effect animates from the *current* position to `to` with
   `duration = currentDuration * |(current - to) / contentSize|` (keeps a consistent rate for the
   remaining distance), then `onComplete` clears the flag and bumps a `key` state → effect re-runs and
   restarts the infinite loop from `from` at the new speed. Result: speed switches instantly with no jump.

## Reproduction notes / gotchas

- `duration` is **time per loop**, so px/s depends on content width: more/wider items = faster
  scroll. Normalize if you need a fixed px/s speed.
- The rate math uses `/ contentSize` but the loop distance is `contentSize / 2`, so during a hover
  transition the remaining distance runs at ~2× the steady speed of `currentDuration`. Subtle, but the
  "slow on hover" is less slow for the first partial pass. Faithful to the original; fix by dividing
  by `contentSize / 2`.
- Before measurement `width = 0`, so the first effect run is a tiny no-op; it re-runs after measure.
  Content must be wider than the container (one copy ≥ viewport) or a gap appears — repeat items.
- Images: give them explicit height/width so `useMeasure` gets a stable size; lazy-loaded images
  change width after load → effect restarts (small jump).
- The duplicated copy is not `aria-hidden` (screen readers read items twice); no reduced-motion
  support — gate the animation with `useReducedMotion()`.
- `demo.tsx` default-exports an **object** of three demo components (21st.dev convention); the live
  bundle only rendered `InfiniteSliderBasic`. Export the functions individually in a normal app.
- `"use client"` is required in Next.js App Router.
- `framer-motion` API; with the newer `motion` package import from `motion/react` (same names).

## Adapting

Logo clouds, testimonial rows, product thumbnails, vertical "wall" of cards (two columns with opposite
`reverse`). Add edge fades with a `mask-image` gradient on the wrapper. `durationOnHover` larger than
`duration` = slow on hover; smaller = speed up. See `../logo-marquee-grootstudio` for a packaged logo
strip built on this exact slider.
