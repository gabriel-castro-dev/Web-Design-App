# Logo Marquee (grootstudio)

- **Section:** Logo marquee / "Trusted by" strip
- **Source:** https://21st.dev/@grootstudio/components/logo-marquee
- **Stack:** React + TypeScript, Tailwind CSS v4 (`mask-[...]` utility, `dark:` variant, `bg-background` token), `cn()` (clsx + tailwind-merge), `motion` (`motion/react`: `motion`, `animate`, `useMotionValue`), `react-use-measure`
- **Files:** `logo-marquee.tsx` (component + internal `InfiniteSlider` + `LogoImage`, reconstructed from bundle), `demo.tsx` (original demo: 8 SVG logos — Nvidia, Supabase, OpenAI, Vercel, GitHub, Clerk, Turso, Claude — from the 21st CDN), `preview.webp`, `preview.mp4`

## What it looks like

A slim, centered band (max 1280px, `py-4`) of small full-color brand logos, each only 16px tall
(20px from `md`), spaced 42px apart, gliding slowly **to the right** in an endless loop. The band's
edges dissolve: logos fade in from transparent across the first quarter of the width, are fully
opaque through the middle half, and fade out across the last quarter — so only ~3–5 logos read
crisply at once (visible in the preview: Nvidia and Clerk semi-transparent at the ends).

In dark mode every logo is forced to flat white (`brightness-0` + `invert`), making a monochrome strip.
Hovering the strip **speeds it up** (80 s → 25 s per loop) with no jump, and it eases back to the
slow pace on leave (instant rate change, not an eased ramp). Logos are non-interactive
(`pointer-events-none select-none`).

## How it works

1. **Wrapper** — `div.max-w-7xl.mx-auto.overflow-hidden.py-4` +
   `mask-[linear-gradient(to_right,transparent,black_25%,black_75%,transparent)]` (+ `className`).
2. **Items** — `[...logos, ...logos]` mapped to memoized `<img>`s (key `${alt}-${index}`),
   `loading="lazy"`, `width/height = logo.width/height ?? "auto"`, class
   `pointer-events-none h-4 select-none md:h-5 dark:brightness-0 dark:invert`.
3. **Slider** — memoized copy of motion-primitives' InfiniteSlider with
   `gap={42} reverse duration={80} durationOnHover={25}`. The track (`flex w-max`, `gap: 42px`) renders
   the children twice (→ 4 copies of the logo list total). `useMeasure` gets track width;
   `contentSize = width + 42`; loop animates the `x` motion value `from = -contentSize/2` → `to = 0`
   (reverse = moves right), `ease: "linear"`, `duration: 80`, `repeat: Infinity`, `repeatType: "loop"`,
   `onRepeat` resets to `from`.
4. **Hover** — `onHoverStart` / `onHoverEnd` set `isTransitioning` + swap duration (25 / 80). While
   transitioning it animates current → `to` with `duration * |(current - to) / contentSize|`, then
   bumps a `key` state to restart the infinite loop at the new speed.

## Reproduction notes / gotchas

- **Description says "hover-to-slow", code does the opposite:** `durationOnHover` (25) is shorter
  than `duration` (80), so hover speeds the marquee up. Swap to e.g. `durationOnHover={160}` for a
  slowdown.
- `width="auto"` / `height="auto"` are not valid `<img>` attribute values (browsers ignore them); the
  real sizing comes from `h-4 md:h-5` + intrinsic aspect ratio. Pass numeric `width`/`height` per logo
  to avoid layout shift — with `loading="lazy"`, widths change after load and `useMeasure` restarts
  the loop (a small jump on first load).
- `mask-[...]` is Tailwind **v4** syntax. In v3 use `[mask-image:linear-gradient(...)]` (and add
  `-webkit-mask-image` for older Safari; v4 emits both).
- `dark:brightness-0 dark:invert` flattens colored logos to white — good for monochrome SVG
  wordmarks, bad for logos that rely on color/detail.
- Transition-rate quirk inherited from InfiniteSlider: during the hover transition the remaining
  distance runs ~2× faster than the target rate (divides by `contentSize`, not `contentSize / 2`).
- No `aria-hidden` on duplicates (each logo's `alt` is read 4×); no `prefers-reduced-motion`.
- `"use client"` required in Next.js App Router. The bundle had react-use-measure inlined; install it.

## Adapting

"Trusted by / Built with" bands under a hero, footer partner strips. Tweak pace (`duration`),
spacing (`gap`), logo size (`h-4 md:h-5`), fade width (the 25%/75% mask stops), or drop the dark
invert for colored logos. For a bare, content-agnostic slider see `../infinite-slider`.
