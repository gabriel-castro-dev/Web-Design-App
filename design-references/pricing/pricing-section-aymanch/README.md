# Pricing Section (Tabs + 4 Tiers, Dub.co style)

- **Section:** Pricing
- **Source:** https://21st.dev/@aymanch-03/components/pricing-section
- **Stack:** React + TypeScript, Tailwind CSS (shadcn tokens: `bg-muted`, `bg-foreground`, `text-background`, `ring-primary`), `cn()`, `framer-motion` (shared `layoutId` pill), `@number-flow/react` (animated price), `lucide-react` (`BadgeCheck`, `ArrowRight`), shadcn/ui `Badge`, `Button`, `Card`
- **Files:** `pricing-section.tsx` (component: `PricingSection`, `Tab`, `PricingCard`), `demo.tsx` (original demo source), `preview.webp`, `preview.mp4`

## What it looks like

Centered header: large medium-weight title ("Simple Pricing", `text-4xl` → `md:text-5xl`), muted subtitle,
and under it a pill-shaped segmented control (`bg-muted`, `p-1`, fully rounded) with "Monthly" and
"Yearly" + a small secondary badge "Save 35%". The active option sits on a white pill with a soft shadow.

Below, a row of four equal cards (`xl:grid-cols-4`, 2 cols on `sm`, 1 on mobile), each with the plan name,
a big price (`text-4xl`), a tiny "Per month/user" caption, a short description, a list of features with
a badge-check icon, and a full-width black button with a right arrow. Variants:

- **Popular** ("Teams") — 2px `ring-primary` outline, "🔥 Most Popular" badge next to the name, and a
  very faint lavender radial glow (`rgba(120,119,198,0.1)`) bleeding from the top edge.
- **Highlighted** ("Enterprise") — inverted colors (`bg-foreground text-background`, i.e. black card with
  white text in light mode), a faint 45 px grid pattern masked to fade out from the top, and a
  `secondary` (light) button.
- String prices ("Free", "Custom") render as plain `h1` text with no caption.

The demo sits on a page-wide 35 px grid background (masked radial fade from the top, `opacity-30`).

Interaction: clicking the other frequency slides the white pill across with a spring, and numeric prices
roll digit-by-digit to the new value (90 → 75, 120 → 100) via NumberFlow.

## How it works

1. **State** — `PricingSection` keeps `selectedFrequency` (initial `frequencies[0]`). Each tier has
   `price: { monthly, yearly }`; the card reads `tier.price[paymentFrequency]`.
2. **Sliding pill** — each `Tab` renders `<motion.span layoutId="tab">` only when selected
   (`absolute inset-0 z-0 rounded-full bg-background shadow-sm`, `transition: { type: "spring", duration: 0.4 }`).
   Framer's shared-layout animation morphs it from the old tab to the new one. Label is `relative z-10`.
3. **Discount badge** — the tab whose text is `"yearly"` gets `discount` → layout becomes
   `flex items-center gap-2.5` and a `Badge variant="secondary"` "Save 35%" is appended (gets `bg-muted` when selected).
4. **Price animation** — `typeof price === "number"` → `<NumberFlow value format={{ style: "currency",
   currency: "USD", trailingZeroDisplay: "stripIfInteger" }} />`, so `$90` not `$90.00`. The price box is
   fixed `relative h-12` so rows don't shift; the caption is pulled up with `-mt-2`.
5. **Card variants** — `cn("relative flex flex-col gap-8 overflow-hidden p-6", highlighted ? "bg-foreground text-background" : "bg-background text-foreground", popular && "ring-2 ring-primary")`.
   Decorative backgrounds are absolutely positioned first children (grid pattern for highlighted,
   radial glow for popular). Feature list uses `flex-1` so all buttons align to the bottom.

## Reproduction notes / gotchas

- 21st metadata lists **no dependencies**, but the bundle includes `framer-motion`, `@number-flow/react` and
  `lucide-react` — install them. Motion import path was not recoverable from the bundle; `framer-motion`
  is assumed (the `motion` package's `motion/react` works identically).
- `layoutId="tab"` is global: two `PricingSection`s on one page would share the pill. Wrap each in
  `<LayoutGroup id=...>` or make the id unique.
- The decorative background divs are not `pointer-events-none` and sit under content only by DOM order;
  the popular badge adds `z-10` explicitly. If you add interactive content, keep it after the backgrounds.
- The "Per month/user" caption is hard-coded — it doesn't change for yearly.
- The title is an `h1` and each card name an `h2` / string price an `h1` — fix the heading hierarchy for a
  real page.
- The bundle's demo wrapper differs from the published demo: `relative flex justify-center items-center w-full mt-20 scale-90`
  instead of `container relative min-h-screen`. `demo.tsx` keeps the published version.
- Tab buttons have no `aria-pressed`/`role="tab"`; add them. NumberFlow respects `prefers-reduced-motion` by default.

## Adapting

Any 2–4 tier SaaS pricing page. Swap `frequencies` for other periods (quarterly), change the discount
label per frequency, move the "highlighted" treatment to the recommended plan, or tint the popular glow
with the brand color.
