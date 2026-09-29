# Pricing Card (cva variants, hover lift)

- **Section:** Pricing
- **Source:** https://21st.dev/@kavikatiyar/components/price
- **Stack:** React + TypeScript, Tailwind CSS v4 (shadcn tokens: `bg-card`, `border-primary`, `bg-primary/10`), `cn()`, `class-variance-authority`, `framer-motion`, shadcn/ui `Button`
- **Files:** `pricing-card.tsx` (component `PricingCard` + `pricingCardVariants`), `demo.tsx` (original demo source, staggered fade-in grid of 3 cards), `preview.webp`, `preview.mp4`

## What it looks like

A single reusable card (the demo shows three side by side, `lg:grid-cols-3`, `items-center`). Clean,
monochrome, lots of white space: `rounded-2xl`, 1px border, `p-8`, small shadow.

- Header row: a 40 px round icon chip (`bg-primary/10`, icon in `text-primary`), next to a bold `text-xl`
  plan name and a muted `text-sm` tagline.
- Price: huge bold `$299` (`text-5xl font-bold`) immediately followed by a muted `/month`.
- Full-width large button (`size="lg"`): filled black for the popular card, outlined for others, and a
  grey disabled "Current plan" button when `isCurrentPlan`.
- Feature list below the button: filled check-circle icons (`text-primary`, 20 px) + muted text, 16 px gaps.
- **Popular variant**: black border, bigger tinted shadow (`shadow-lg shadow-primary/10`), card shifted up
  8 px (`-translate-y-2`), and a black pill "POPULAR" label straddling the top border near the right corner
  (`absolute top-0 right-8 -translate-y-1/2`).

Motion: on hover the card scales to 1.02 over 0.2 s. In the demo, the three cards fade/slide up 20 px one
after another (stagger 0.2 s, 0.5 s `easeOut`) on mount.

## How it works

1. **Variants** — `cva("relative flex flex-col p-8 rounded-2xl border shadow-sm transition-all duration-300", { variant: { default: "bg-card border-border", popular: "bg-card border-primary shadow-lg shadow-primary/10 -translate-y-2" } })`.
2. **Root** is `motion.div` with `whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}`. Note `...props`
   is spread *before* `whileHover`, so a consumer cannot override the hover.
3. **Button variant logic** — `isCurrentPlan ? "secondary" : variant === "popular" ? "default" : "outline"`,
   `disabled={isCurrentPlan}`, label switches to "Current plan".
4. **Price** is rendered as `$` + raw `price` (no number formatting) + `billingCycle` string.
5. **Demo entrance** (in `demo.tsx`, not in the card): parent `motion.div` with `staggerChildren: 0.2`,
   each card wrapped in a `motion.div` with `hidden {opacity 0, y 20}` → `visible {opacity 1, y 0, duration 0.5, ease "easeOut"}`.

## Reproduction notes / gotchas

- `-translate-y-2` (Tailwind v4 `translate` property) and framer's `scale` (inline `transform`) are different
  CSS properties in v4, so they compose. In Tailwind v3, `-translate-y-2` uses `transform` and framer's inline
  transform would override it on hover, dropping the lift — use `y: -8` in motion instead if on v3.
- `transition-all duration-300` on the card also affects framer's inline transform; hover can feel slightly
  laggy/double-eased. Remove `transition-all` if you want pure framer timing.
- Prices are not localized (`$2300`, no thousands separator). Use `Intl.NumberFormat` if needed.
- The popular label is hard-coded "POPULAR"; the check icon is an inline Heroicons path.
- The type of `...props` is `HTMLMotionProps<"div">` here (the original typed it loosely); passing
  `variants`/`initial` to the card itself works, but the demo wraps cards instead.
- No reduced-motion handling; wrap with `MotionConfig reducedMotion="user"`.

## Adapting

Drop-in card for pricing grids, upgrade modals, or account "change plan" screens (the `isCurrentPlan`
state is handy there). Add a `badge` prop to customize the "POPULAR" text, or a monthly/yearly toggle in
the parent that feeds `price` / `billingCycle`.
