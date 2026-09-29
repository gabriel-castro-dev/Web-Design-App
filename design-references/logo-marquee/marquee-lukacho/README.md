# Marquee (lukacho) — CSS keyframe logo strip

- **Section:** Logo marquee / Tech stack strip
- **Source:** https://21st.dev/@lukacho/components/marquee
- **Stack:** React + TypeScript, Tailwind CSS (bundle compiled with v3.4.17, shadcn `hsl(var(--token))` tokens), `cn()` (clsx + tailwind-merge). No animation library — a custom `animate-marquee` utility (CSS keyframes) driven by a `--duration` CSS variable.
- **Files:** `marquee.tsx` (component, reconstructed from bundle; required CSS in a comment at the bottom), `demo.tsx` (original demo with 4 inline SVG logos — Tailwind CSS, Motion/Framer, Next.js, AWS), `preview.webp`, `preview.mp4`

## What it looks like

A single row of tech logos drifting slowly and steadily to the left on a plain background (white in
the preview). Logos are monochrome `fill-primary` (black in light / white in dark) with brand accents
where the SVG has them (Tailwind's cyan wave `fill-cyan-500`, AWS orange smile `#f90`). Each logo is
~20–40px tall and sits in a slot with 4rem (64px) horizontal margin on both sides, so the row is
airy — roughly 4 logos across a ~1000px viewport. No edge fade, no mask: logos are hard-clipped by
`overflow-hidden` at a max width of 90vw. Top margin: `mt-10` (40px) on mobile, `sm:mt-24` (96px) above.

Optional: hovering pauses the scroll (`pauseOnHover`).

## How it works

1. **Markup** — `div.w-full.overflow-hidden.sm:mt-24.mt-10.z-10` (+ `className`) →
   `div.relative.flex.max-w-[90vw].overflow-hidden.py-5` → track `div.flex.w-max.animate-marquee`.
2. **Duplication** — the track renders `children` twice back to back. `w-max` makes the track as wide
   as both copies.
3. **Keyframes** — `@keyframes marquee { to { transform: translateX(-50%) } }` (implicit `from` = 0).
   Moving by exactly half the track = one copy width, so the loop restart is seamless (as long as each
   copy's items have symmetric margins — the demo uses `mx-[4rem]` per item).
4. **Speed** — `animation: marquee var(--duration, 30s) linear infinite`; the component sets
   `style={{ "--duration": `${speed}s` }}`, `speed` default `30`. Higher = slower.
5. **Pause** — `pauseOnHover` adds `hover:[animation-play-state:paused]` on the track.
6. **Direction** — `direction="right"` adds class `animate-marquee-reverse` (see gotchas).

## Reproduction notes / gotchas

- **The CSS is not part of the component.** You must add the `marquee` keyframes + `animate-marquee`
  utility yourself (v3 config or v4 `@theme` — both snippets at the bottom of `marquee.tsx`). Without it
  nothing moves.
- **`direction="right"` is broken in the original:** `animate-marquee-reverse` is not defined in the
  bundle's CSS. Define it, e.g. `.animate-marquee-reverse { animation-direction: reverse; }` (must win
  over / combine with `animate-marquee`), or `animation: marquee var(--duration,30s) linear infinite reverse`.
- If the content (one copy) is narrower than the container, a blank gap shows on the right before the
  loop — repeat the items in the children until one copy ≥ container width.
- The original passed `children={[children, children]}` (an array of two unkeyed arrays → React key
  warning); the reconstruction renders `{children}{children}` which is equivalent.
- `max-w-[90vw]` on the inner wrapper caps width regardless of parent; `z-10` has no effect without
  positioning; the `sm:mt-24 mt-10` margin is baked in — override via `className` (`mt-0`).
- The duplicate copy is not `aria-hidden` → screen readers read every logo twice. Add `aria-hidden` to
  the second copy.
- No `prefers-reduced-motion` handling (add `motion-reduce:[animation-play-state:paused]`).
- Demo logo quirk: the Tailwind SVG is `w-[140px]` below `sm` and `w-auto` above.

## Adapting

Works for tech-stack strips, client logos, testimonial chips ("comments"), tag clouds. Add an edge fade
with `[mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]` on the inner
wrapper; stack two rows with opposite directions (after fixing `animate-marquee-reverse`); tune pace with
`speed`.
