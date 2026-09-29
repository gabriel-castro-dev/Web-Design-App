# Pricing Module (4-Tier Cards + Monthly/Yearly Switch)

- **Section:** Pricing
- **Source:** https://21st.dev/@ruixen.ui/components/pricing-module
- **Stack:** React + TypeScript, Tailwind CSS (shadcn tokens), `cn()`, `lucide-react` (`Check`, `X`; demo uses `Layers`, `Monitor`, `Users`, `Building2`), shadcn/ui `Card` (+ `CardHeader`, `CardTitle`, `CardDescription`, `CardContent`), `Button`, `Switch`. No animation library.
- **Files:** `pricing-module.tsx` (component, reconstructed from bundle), `demo.tsx` (original demo), `preview.webp`

## What it looks like

Full-width section (`py-20`, `px-4 md:px-8`), content `max-w-6xl`, everything center-aligned. Bold
`text-4xl` title "Simple, Transparent Pricing", muted subtitle, then a small switch with the label
"Pay annually and save 20%".

Below: a grid of 4 cards (1 col → `sm:` 2 → `lg:` 4, `gap-6`). Each card (`rounded-xl`, thin `border-muted`,
`bg-card`, subtle `shadow-sm`) is centered: a 32 px outline icon in `text-primary`, plan name (`text-2xl`
semibold), muted description, big `text-3xl` bold price "$99" with "/ month" beneath, a full-width button
("Start Now"), then a left-aligned block: **Overview** heading + "✓ Up to 50 users" (literal ✓ character),
**Highlights** heading + feature list with Lucide check (primary) or X (muted) icons; excluded features are
struck through at 60% muted opacity.

The recommended card (Team) is scaled up `1.03`, gets a `border-primary` + `ring-1 ring-primary/30`
double outline, a solid primary (inverted) button instead of outline, and a centered "Recommended" pill
straddling its top edge. In dark mode (preview) primary is near-white, so the recommended card has a bright
white outline and white button.

Hover on any card: `shadow-md` + border tints to `primary/30` (`transition-all`).

## How it works

1. **Props** — `title`, `subtitle`, `annualBillingLabel`, `buttonLabel` (all with defaults), `plans[]`,
   `defaultAnnual`, `className`. Plan: `{ id, name, description, icon: ReactNode, priceMonthly, priceYearly,
   users, features: {label, included}[], recommended? }`.
2. **Billing state** — `useState(defaultAnnual)`. Price = `isAnnual ? priceYearly : priceMonthly`; unit
   text = `"/ year"` vs `"/ month"`. The price div has `transition-all duration-300` but text content
   changes don't animate — it's an instant swap.
3. **Recommended** — `cn()` adds `border-primary ring-1 ring-primary/30 scale-[1.03]`; badge is
   `absolute -top-3 left-0 right-0 mx-auto w-fit` (horizontally centered without transforms);
   button `variant="default"` vs `"outline"`.
4. **Card internals** — `CardHeader` overridden to `text-center pt-8` (extra top room for the pill).

## Reproduction notes / gotchas

- **Broken toggle in the original:** the bundle's Switch was a react-aria-components (Jolly UI style)
  wrapper: `h-6 w-11` track, `size-5` thumb, `group-data-[selected]:bg-primary`,
  `group-data-[selected]:translate-x-5`. React Aria expects `isSelected`/`onChange`, but the component passes
  `checked`/`onCheckedChange`, which are silently dropped — so on 21st.dev the switch flips visually but
  the prices never change (and the `id` is stripped, so the `<label htmlFor>` doesn't work either). This
  reconstruction uses the shadcn/Radix `Switch`, which accepts those props and fixes it. The shadcn switch
  is smaller (`h-5 w-9`) than the original track (`h-6 w-11`) — pass `className="h-6 w-11"` if you want the
  preview's size.
- The bundle's Button is the Origin UI variant of shadcn's (`rounded-lg`, `shadow-sm shadow-black/5`,
  `focus-visible:outline-ring/70`); stock shadcn Button (`rounded-md`) is visually near-identical.
- Cards are centered text with variable-length descriptions, so prices/buttons don't line up across cards
  (visible in the preview: Enterprise's two-line description pushes everything down). Use
  `min-h` on descriptions or a flex column with `mt-auto` to align.
- `scale-[1.03]` on the recommended card can overlap neighbors on hover shadow; and the pill needs the
  grid to have some top room (`-top-3`).
- Yearly price is stored, not computed — "save 20%" label vs 90/290/990/1990 (≈ 2 months free, ~17%) don't
  actually match; adjust data.
- Excluded feature uses both an X icon and line-through — good redundancy for color-blind users, but add
  `sr-only` "not included" text for screen readers.

## Adapting

Any 3–4 tier SaaS table. Pass `icon` as any ReactNode (logos, emoji, illustrations). Add a "-20%" badge
next to the switch label, animate the price with a number-flow/motion counter, or show per-month-equivalent
when annual ("$82/mo billed yearly").
