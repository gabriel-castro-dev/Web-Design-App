# Growth Plans (3 tiers, inverted featured card)

- **Section:** Pricing
- **Source:** https://21st.dev/@uilayout.contact/components/growth-plans
- **Stack:** React + TypeScript, Tailwind CSS v4 (shadcn tokens: `bg-muted`, `bg-foreground`, `text-background/60`), `cn()`, `@number-flow/react`, `lucide-react` (`Check`), shadcn/ui `Button` + `Switch`
- **Files:** `growth-plans.tsx` (self-contained component `GrowthPlans` with hard-coded plan data), `demo.tsx` (original demo source), `preview.webp`, `preview.mp4`

## What it looks like

A quiet, monochrome SaaS pricing block. Centered semibold `text-4xl` headline "Plans that grow your
SASS." with a muted one-liner. Under it, a small boxed control (`bg-muted`, 1 px border, `rounded-md`,
`p-3`): "Monthly" — switch — "Yearly" + a tiny bold uppercase "SAVE 20%" (10 px). The active label is
foreground/medium weight, the inactive one muted. Default is **Yearly**.

Three cards (`lg:grid-cols-3`, stacked on smaller screens), all left-aligned inside:

- **Side cards** — light grey (`bg-muted`), thin border, `rounded-lg`, `p-8`. Name bold `text-lg`, muted
  description, then price as muted `$` (`text-2xl`) + big bold number (`text-5xl`) + muted "/monthly",
  aligned on the baseline. A tall (56 px) white "Select Plan" button with border that gains a large shadow
  on hover. A top-bordered feature list with small check icons.
- **Featured middle card** — fully inverted (`bg-foreground text-background`: black card, white text),
  scaled to 105% so it overhangs the neighbours, `shadow-2xl`, `z-10`, no visible border. Secondary
  text at 60% opacity, features at 80%, divider at 20%. Its button is translucent white
  (`bg-background/10`, `border-background/20`) that brightens to `/20` on hover.

Interaction: flipping the switch rolls every price digit to the new value (29→23, 59→47, 99→79) with
NumberFlow's default spin animation.

## How it works

1. **State** — `billingCycle: "monthly" | "yearly"` (initial `"yearly"`). Switch `checked={billingCycle === "yearly"}`;
   `onCheckedChange(checked => set(checked ? "yearly" : "monthly"))`. `useId()` gives the switch an id.
2. **Price** — `<NumberFlow value={billingCycle === "monthly" ? plan.monthly : plan.yearly} />` with default
   formatting; the `$` and "/monthly" are separate spans so only the number animates.
3. **Featured card** — `featured: true` swaps the whole palette via conditional classes (`bg-foreground
   text-background scale-105 shadow-2xl z-10 border-transparent` vs `bg-muted border-border`). Each text
   element picks `text-background/60|80` or `text-muted-foreground` accordingly.
4. **Buttons** — shadcn `Button` with `variant` from data (`outline` for sides, `secondary` for featured), then
   overridden with `rounded-lg h-14 w-full mb-10` and the per-card color classes above.
5. **Layout** — `grid gap-4 items-stretch` makes all cards equal height; `transition-all` on cards only
   matters if you change `featured` dynamically.

## Reproduction notes / gotchas

- `font-dmSans` is **not defined** in the bundle CSS — the section renders in the default sans font. Define it
  (Tailwind v4: `@theme { --font-dmSans: "DM Sans", sans-serif; }` + load the font) or remove the class.
- "SAVE 20%" badge has no background/color classes — it's just bold tiny text. Add `bg-primary/10 text-primary`
  if you want a real pill. The actual yearly savings are ~20% (29→23, 59→47, 99→79).
- "/monthly" is shown for both cycles (yearly prices are per-month equivalents); no "billed annually" hint.
- The shadcn Switch/Button used here are the **new-york** sizes (Switch `h-5 w-9`, thumb `h-4 w-4`,
  `translate-x-4`; Button default `h-9`, `[&_svg]:size-4`). Default-style shadcn looks slightly bigger.
- `scale-105` on the featured card in a single-column layout (below `lg`) makes it overflow the side
  padding a bit; consider `lg:scale-105`.
- The labels "Monthly"/"Yearly" aren't `<label htmlFor={id}>` — add that so clicking the text toggles and
  the switch gets an accessible name.
- `motion` appears in 21st deps but is unused.

## Adapting

Great minimal template for B2B/SaaS: replace the `plans` array (or lift it to props), change the featured
index, add a real CTA link per plan. For a brand look, tint the featured card with `bg-primary` instead of
`bg-foreground`.
