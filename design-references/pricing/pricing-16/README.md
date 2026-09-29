# Pricing 16 (Two Plans, Recommended Pill)

- **Section:** Pricing
- **Source:** https://21st.dev/@ln-dev7/components/pricing-16
- **Stack:** React + TypeScript, Tailwind CSS (shadcn tokens: `bg-card`, `border-border`, `text-muted-foreground`, `bg-foreground`), `cn()`, `lucide-react` (`Check`, `ArrowRight`), shadcn/ui `Button`. No animation.
- **Files:** `pricing-16.tsx` (component, reconstructed from bundle), `demo.tsx` (original demo), `preview.webp`

## What it looks like

Minimal monochrome section (`py-20` / `sm:py-28`), content `max-w-4xl`. Centered header: semibold
`text-3xl`→`sm:text-4xl` tight headline "Two plans. No subscriptions." with a small muted subline
("Free gets you in the door. Pro gets you everything — once.").

Two equal cards side by side from `md` (stacked on mobile), `gap-4`. Each card: white `bg-card`,
`rounded-2xl`, 1 px border, `p-7`, vertical stack with `gap-7`:
- plan name (`text-xl` semibold) + one-line muted description,
- a price band framed by top and bottom hairlines (`border-y`, `py-5`): either the word **Free** or
  **$119** (`text-4xl`, `tabular-nums`) followed by a small muted cadence "one-time" on the baseline,
- checklist with small thick check icons (`size-3.5`, `strokeWidth 2.5`),
- full-width `lg` CTA with a trailing arrow, pushed to the bottom (`mt-auto`) so both cards' buttons align.

The highlighted card (Pro) gets a slightly darker border (`border-foreground/20`) plus a faint
`ring-1 ring-foreground/10` (double-line look), a solid black CTA (vs. outline on the free card), and a
black pill "RECOMMENDED" sitting on the top border, left-aligned (`left-6`), in 10 px mono uppercase
with wide tracking. Footer: centered `text-xs` muted "All sales final. No refunds, no chargebacks."

## How it works

1. Static `plans` array `{ name, price, cadence, description, cta, features, highlight? }` mapped into `<article>`s.
2. `price === 0` → renders "Free" and hides the cadence; otherwise `$price` + cadence.
3. Highlight branch via `cn()`: `border-foreground/20 ring-1 ring-foreground/10`; badge
   `absolute -top-3 left-6` (half the pill height above the border); button `variant="default"` vs `"outline"`.
4. Equal heights come from the grid row stretch; `mt-auto` on the Button fills the leftover space.

## Reproduction notes / gotchas

- Only hover states are the shadcn Button defaults (`hover:bg-primary/90`, outline `hover:bg-accent`). Cards
  themselves have no hover.
- Data is hard-coded inside the component — no props. Lift `plans` into props to reuse.
- The badge sits outside the card box; if a parent has `overflow-hidden`, it gets clipped. The grid has no
  top padding, so the pill relies on the header's `mb-12` for room.
- `text-balance` / `text-pretty` need Tailwind ≥ 3.4.
- Dark mode works automatically through tokens (pill inverts: `bg-foreground text-background`).
- The em dash in the subline is a real `—` character (U+2014).

## Adapting

Great for "free vs. lifetime" or "free vs. pro" choices; extend to 3 columns with `md:grid-cols-3`.
Swap cadence to "/month" for subscriptions; move the pill to `left-1/2 -translate-x-1/2` for a centered
badge; add a feature-diff line ("Everything in Solo, plus:") at the top of the Pro list.
