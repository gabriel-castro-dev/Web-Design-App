# Gradient Tiers (Pastel-Washed 3-Column Pricing Table)

- **Section:** Pricing
- **Source:** https://21st.dev/@arihantcodes_1f7b8c4d/components/gradient-tiers
- **Stack:** React + TypeScript, Tailwind CSS v4 (container queries, arbitrary values, hard-coded hex palette, no shadcn tokens), `cn()`, `lucide-react` (`FileText`, `TrendingUp`, `Building2`/"building-complex", `ArrowRight`). No animation library: CSS keyframes injected via `<style>` + IntersectionObserver.
- **Files:** `gradient-tiers.tsx` (component, reconstructed from bundle), `demo.tsx` (original demo), `preview.webp`

## What it looks like

An editorial, paper-like pricing table. Centered header (`max-w-[54ch]`): an eyebrow made of three tiny
dots (blue `#4a7dfc`, olive `#7f931c`, purple `#a34df0`) + "PRICING" in 12 px semibold uppercase with
`0.12em` tracking in warm grey; a large **serif** headline (Spectral via `--font-spectral`, Georgia fallback,
weight 400, 28 → 34 → 42 px by container width, `leading-[1.08]`, `-0.5px` tracking); a 16 px warm-grey subline.

Below: one bordered box (`#e2e0dd` hairline, square corners, white bg) split into 3 columns by vertical
hairlines (stacked with horizontal hairlines on narrow containers). Each column has a **pastel wash**
gradient from the top fading to transparent at 46% height: pale blue, pale lime, pale lavender. Per column:
- a colored 24 px outline icon (stroke 1.8) at top-left; Growth also has a "Popular" pill on the right
  (lime `#e7edc4` bg, olive `#5b661c` text, 14 px),
- serif plan name (30 → 34 → 38 px), 16.5 px tagline,
- price row: `$29` in 27 px semibold on the left, note ("per user / month") right-aligned in 15 px grey,
  baseline aligned; missing price renders "Custom pricing",
- a 52 px tall CTA with almost-square 3 px corners: column 1 is solid charcoal `#3a3733` with an inner 1 px
  white/14% hairline; columns 2+ are white outlined (`#d9d6d2`) with purple-grey text and a right arrow
  that nudges 2 px right on hover,
- a small colored uppercase label: "CORE FUNCTIONALITY" (grey) or "EVERYTHING IN STARTER, PLUS:" (olive)
  / "EVERYTHING IN GROWTH, PLUS:" (blue),
- checklist with a custom thin SVG check (stroke 1.6) and 16.5 px items spaced 18 px,
- optional centered footnote ("Volume discounts available for annual billing.").

Dark mode has its own hand-picked palette (`#0f0f11` bg, `#2b2b30` borders, deep tinted washes, light CTA).

**Motion:** when the section scrolls into view, the header and each column fade up 14 px over 480 ms
(`cubic-bezier(0.23,1,0.32,1)`, strong ease-out), columns staggered 70 ms apart. Buttons press to
`scale(0.98)` on active.

## How it works

1. **Reveal hook** — `useReveal()` observes the `<section>` with `threshold: 0.18`,
   `rootMargin: "0px 0px -8% 0px"`; sets `shown = true` once and disconnects. Without IntersectionObserver
   it sets `shown` on the next animation frame.
2. **Reveal CSS** — when shown, elements get the arbitrary class
   `[animation:su-reveal_480ms_cubic-bezier(0.23,1,0.32,1)_both] motion-reduce:animate-none`, and columns get
   inline `animationDelay: index * 70ms`. `both` fill mode keeps them at opacity 0 during the delay.
   Keyframes `su-reveal` (opacity 0, translateY 14px → none) are injected with a `<style>` tag.
3. **Theming by index** — `tierThemes[index % 3]` supplies icon, wash gradient `from-*`, icon color and label
   color. Plans beyond 3 cycle the palette.
4. **Data split** — `plans` (name, tagline, cta, badge, inherits, features) and `notes` (price, priceNote,
   footnote) are separate arrays matched by index.
5. **Responsiveness via container queries** — the section is `@container`; grid switches to 3 columns at
   `@3xl` (48rem container width), headings step up at `@sm` / `@lg`. Dividers swap from `border-t` (stacked)
   to `border-l` (row) with `first:` resets.
6. **CTA branch** — `index === 0` = solid dark button without arrow; others = outline with `ArrowRight`
   (`transition-transform 180ms`, `group-hover:translate-x-0.5`).

## Reproduction notes / gotchas

- **Before the observer fires, nothing is hidden** — the reveal class is only added once `shown` is true, so
  content first paints visible, then gets the animation (which starts from opacity 0) → a brief flash on
  initial render when the section is already in view. For a clean entrance, apply `opacity-0` while
  `!shown`.
- `motion-reduce:animate-none` only kills the keyframe; content is fully visible, fine.
- `--font-spectral` isn't defined by the component. Load Spectral (Google Fonts / `next/font`) and set
  `--font-spectral` on a parent, else Georgia is used (the preview shows Georgia).
- Keyframes `su-draw` and `su-sheen` are injected but unused (leftovers from a sibling component).
- Label colors are offset from icon colors (col 1 label grey, col 3 label blue while its icon is purple) —
  intentional in the source, copy as-is or align them.
- In the preview, the Growth column's content sits ~14 px lower than its neighbors: the "Popular" pill is
  taller than the 24 px icon in the `items-start` header row, pushing the name down. Give the header row a
  fixed height (e.g. `h-9 items-center`) if you want rows aligned across columns.
- `variant` only knows `"Tinted"`; any other value just removes the wash (the name of the alternate value
  isn't in the bundle — `"Plain"` here is a placeholder type).
- Tailwind v4 required: `@container` / `@3xl:` (built in), `outline-hidden`, `bg-gradient-to-b` still works.
  On v3 you need `@tailwindcss/container-queries`.
- Buttons have no `onClick`/`href` — wire them up.
- Icon name: lucide-react v1 renamed `Building2` → `BuildingComplex` (alias kept); older versions only
  have `Building2`.

## Adapting

Good for calm, editorial SaaS/agency pricing. Swap the three pastel washes for brand tints, move the
"Popular" highlight to any column, add a monthly/yearly toggle feeding `notes`, or reuse the useReveal +
keyframe pattern for any staggered fade-up grid.
