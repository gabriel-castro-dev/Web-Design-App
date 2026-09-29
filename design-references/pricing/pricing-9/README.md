# Pricing 9 (Build-Your-Plan Add-on Calculator)

- **Section:** Pricing
- **Source:** https://21st.dev/@diarmuradi/components/pricing-9
- **Stack:** React + TypeScript, Tailwind CSS v4 (shadcn tokens), `cn()`, `motion` (`motion/react`), `lucide-react`, shadcn/ui `Badge`, `Button`, `Switch` (Radix), custom `FancyButton` built on `@base-ui/react` Button + `class-variance-authority`
- **Files:** `pricing-9.tsx` (component, reconstructed from bundle), `fancy-button.tsx` (custom glossy CTA helper, reconstructed), `demo.tsx` (original demo), `preview.webp`

## What it looks like

Centered section, `max-w-4xl`. Header stack: a small grey pill badge "Build your plan" (shadcn `secondary`
Badge), a big bold tight headline "Only pay for what you need" (`text-4xl` → `sm:text-5xl`), and a muted
`text-lg` paragraph (max-w-2xl).

Below, a two-column grid (stacks on mobile, 2 columns at `lg`), `gap-4`:

- **Left – "Add-on modules"**: a list of 6 rows. Each row = a 36 px round icon chip + label (`text-sm
  font-medium`) with `+$15/mo` under it (`text-xs` muted), and a small shadcn Switch on the right. Enabled
  rows get a solid `bg-primary` (black) chip with white icon; disabled ones get a pale `bg-muted` chip with
  muted icon. The whole label area is a ghost button, so clicking the text toggles too.
- **Right – "Your plan"**: a `bg-muted` (light grey) panel with 2rem (`rounded-4xl`) corners. "Base plan + N
  add-ons selected", then a huge `text-7xl font-semibold` total price (`$64`) with a small muted `/month`
  on the baseline, a breakdown line "Base: $29 + Add-ons: $35", a full-width dark CTA "Start free trial ↗"
  with a subtle top gloss, and an "Always included" list with black round check bullets.

**Motion:** whenever a switch flips, every digit of the total rolls out upward (fade + blur 4px + y -10,
140 ms) while the new digits pop in from below (y 10 → 0, blur 4px → 0, scale .98 → 1) on a spring,
staggered 30 ms per digit left to right. Icon chips crossfade color (`transition-colors`).

## How it works

1. **State** — one `useState` array of add-ons `{ id, label, icon, price, enabled }`. `BASE_PRICE = 29`.
   `total = 29 + sum(enabled prices)`. Default: Analytics (15) + API (20) enabled → $64.
2. **Toggle** — `toggleFeature(id)` maps and flips `enabled`. Wired to both the ghost Button (`onClick`)
   and the Switch (`onCheckedChange`) so either toggles.
3. **Digit animation** — `total.toString().split("")`, each digit a `motion.span` inside
   `<AnimatePresence mode="popLayout">`. Key = `` `${total}-${digit}-${index}` `` so *all* digits remount
   on any change (even unchanged ones re-animate).
   - `initial`: `{ opacity: 0, y: 10, filter: "blur(4px)", scale: 0.98 }`
   - `animate` (function variant, `custom = index`): `{ opacity: 1, y: 0, blur(0px), scale: 1 }`,
     `transition: { delay: index * 0.03, type: "spring", damping: 22, stiffness: 280 }`
   - `exit`: `{ opacity: 0, y: -10, blur(4px), scale: 0.98, transition: { duration: 0.14 } }`
   - `popLayout` pops exiting digits out of flow so the new number lays out immediately.
4. **FancyButton** — cva button on Base UI's `Button` (`render` prop support). Look: `bg-primary`
   + `ring-1 ring-primary` (dark mode: `bg-foreground text-background`). `::before` is a 1 px inner rim
   (`from-white/12` gradient masked with `mask-exclude` + `mask-clip: content-box, border-box` + `p-px`),
   `::after` is a full white→transparent gloss at `opacity .16`, `.24` on hover/focus/active, 200 ms ease-out.
   Children get `**:relative **:z-10` to sit above the overlays. Size `lg` = `h-9 gap-1.5 px-2.5`.

## Reproduction notes / gotchas

- **`shadow-elevated-lg` is not defined** anywhere in the bundle CSS — in the preview the left column has no
  visible card/shadow, it sits flat on the page. Define it (e.g. `@utility shadow-elevated-lg { box-shadow: … }`)
  or replace with `shadow-lg` if you want a card.
- `rounded-4xl` needs `--radius-4xl: 2rem` (present by default in Tailwind v4's theme).
- FancyButton uses Tailwind v4-only syntax: `bg-linear-to-b`, `mask-exclude`, `**:` descendant variant,
  `in-data-[...]`, `has-data-[...]`, `enabled:`. Won't work on Tailwind v3.
- Base UI package: bundle comes from Base UI (`base-ui.com` error URLs). Import path used here is
  `@base-ui/react/button` (older installs: `@base-ui-components/react/button`). If you don't want Base UI,
  a plain `<button>` with the same classes looks identical.
- The Switch and the ghost Button both toggle; the ghost Button's label isn't linked to the Switch via
  `aria-labelledby`, so the switch has no accessible name — add `aria-label={addOn.label}` to the Switch.
- The row's ghost button `hover:bg-transparent` kills shadcn's hover bg; there is no hover affordance at all.
- Digits re-key on every total change → all digits animate even if only the last changed. For a
  "slot machine" feel on changed digits only, key by `index` + `digit` without `total`.
- The motion blur filter on 7xl text is GPU-cheap but not free; honor `useReducedMotion()` by dropping the
  y/blur and using opacity only.
- The `$` sign and `/month` are static; `items-baseline` aligns `/month` to the digit baseline.

## Adapting

Any "configure and see the price" UI: seats slider, usage tiers, add-on marketplace, cart summary. Swap
the add-on list for props, format with `Intl.NumberFormat` (split the formatted string, including commas),
add yearly toggle that multiplies the total — the digit roll animates automatically.
