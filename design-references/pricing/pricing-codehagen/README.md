# Pricing (Switch + Confetti + Tucked Side Cards)

- **Section:** Pricing
- **Source:** https://21st.dev/@Codehagen/components/pricing
- **Stack:** React + TypeScript, Tailwind CSS (shadcn tokens), `cn()`, `framer-motion`, `canvas-confetti`, `@number-flow/react`, `lucide-react` (`Check`, `Star`), shadcn/ui `buttonVariants`, `Label`, `Switch`
- **Files:** `pricing.tsx` (component `Pricing` + inlined `useMediaQuery`), `demo.tsx` (original demo source, newline bug fixed), `preview.webp`, `preview.mp4`

## What it looks like

Centered header: bold, tight `text-4xl`→`sm:text-5xl` title and a large muted two-line description
(`whitespace-pre-line`). Below, a shadcn switch followed by bold "Annual billing **(Save 20%)**" (the
parenthetical in `text-primary`).

Three centered-text cards in a row on `md+`. The middle "popular" card has a thick 2 px primary border,
sits higher and in front; a black tab in its top-right corner (`rounded-bl-xl rounded-tr-xl`) reads
"★ Popular". The two side cards have a thin border, start 20 px lower (`mt-5`), are scaled to 94% and
slide 30 px inward so they tuck *behind* the middle card — a subtle "center stage" composition.

Each card: uppercase plan name in muted semibold, a huge bold price (`text-5xl`) with "/ per month",
"billed monthly/annually" caption, left-aligned check list, a divider, a full-width outline CTA (filled
primary on the popular card; hover fills primary with a 2 px primary ring), and the plan description as
small muted text at the very bottom.

Motion: when the grid scrolls into view (desktop only), cards spring from 50 px below into their staged
positions after 0.4 s. Toggling to annual rolls the price digits (NumberFlow, 500 ms ease-out) and fires a
small burst of round confetti from the switch.

## How it works

1. **Billing state** — `isMonthly` (default `true`). Switch `checked={!isMonthly}`; `onCheckedChange(checked)`
   sets `isMonthly = !checked`. Price = `Number(isMonthly ? price : yearlyPrice)`.
2. **Confetti** — only when switching *to* annual: take the switch's `getBoundingClientRect()` center,
   normalize by viewport (`x / innerWidth`, `y / innerHeight`) as `origin`, then
   `confetti({ particleCount: 50, spread: 60, ticks: 200, gravity: 1.2, decay: 0.94, startVelocity: 30, shapes: ["circle"], colors: [...] })`.
3. **Card staging (desktop, `min-width: 768px` via `useMediaQuery`)** — `initial {y: 50, opacity: 1}` →
   `whileInView { y: popular ? -20 : 0, x: i===0 ? 30 : i===2 ? -30 : 0, scale: side ? 0.94 : 1 }`,
   `viewport { once: true }`, `transition { type: "spring", stiffness: 100, damping: 30, duration: 1.6, delay: 0.4, opacity: { duration: 0.5 } }`.
   On mobile `whileInView` is `{}` so cards just stay at `y: 50` (initial).
4. **Stacking** — side cards `z-0`, middle `z-10`; `origin-right` on the first and `origin-left` on the third
   so the 0.94 scale shrinks toward the middle card.
5. **Price** — `NumberFlow` with `format { style: "currency", currency: "USD", min/maxFractionDigits: 0 }`,
   `transformTiming { duration: 500, easing: "ease-out" }`, `willChange`. The period is hidden if it equals
   `"Next 3 months"` (leftover special case from the source project).

## Reproduction notes / gotchas

- **Confetti colors don't work**: canvas-confetti only parses hex colors; `"hsl(var(--primary))"` is not
  resolved (CSS vars aren't available to canvas), so particles get an invalid color. Pass hex values
  (e.g. read `getComputedStyle(document.documentElement)` and convert, or hard-code brand hex).
- **3D classes are dead**: `-translate-z-[50px] rotate-y-[10deg]` were not generated in the bundle's
  (Tailwind v3) CSS, and there's no `perspective` on the parent, so they do nothing. The "tilt" you see
  comes only from framer's `x`/`scale`. To actually tilt, use Tailwind v4 3D utilities plus
  `perspective-[1000px]` on the grid — and note framer's inline `transform` overrides v3 `transform` classes.
- On mobile, cards remain offset 50 px down (initial `y: 50` never animates back) — harmless but odd; set
  `whileInView={{ y: 0 }}` for mobile.
- `className="font-variant-numeric: tabular-nums"` on NumberFlow is not a valid class (no effect); use
  `tabular-nums`. `sm:2` in the grid classes is also meaningless.
- The Switch is wrapped in both a native `<label>` and shadcn `<Label>` with no text — screen readers get
  no name. Add `aria-label="Annual billing"` or wrap the text in the label.
- In Tailwind v4 projects `container` is not centered by default — add `mx-auto px-4`.
- The demo's description was a plain JSX attribute string, so `\n` rendered literally in the original
  preview; `demo.tsx` uses a JS string expression to fix it.
- Reduced motion: confetti has `disableForReducedMotion` option; framer can use `MotionConfig reducedMotion="user"`.

## Adapting

Good for 3-tier SaaS pricing where the middle plan should dominate. Tweak the tuck (`x: ±30`,
`scale: 0.94`) for more/less depth, swap confetti for a subtler highlight, or reuse the switch-origin
confetti trick on any "you saved money" toggle.
