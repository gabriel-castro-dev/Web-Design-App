# Pricing Section (Interactive Starfield)

- **Section:** Pricing
- **Source:** https://21st.dev/@ravikatiyar162/components/pricing
- **Stack:** React + TypeScript, Tailwind CSS v4 (shadcn tokens, `dark:` variant), `cn()`, `framer-motion` (`motion`, `useSpring`), `canvas-confetti`, `@number-flow/react`, `lucide-react` (`Check`, `Star`), shadcn/ui `buttonVariants`
- **Files:** `pricing-section.tsx` (`PricingSection`, `PricingToggle`, `PricingCard`, `InteractiveStarfield`, `Star`, inlined `useMediaQuery`), `demo.tsx` (original demo source), `preview.webp`, `preview.mp4`

## What it looks like

Theme-adaptive section (preview is dark: near-black `neutral-950` background). Behind everything, 150 tiny
dots (1–3 px, `bg-foreground`) are scattered at random and twinkle in and out on independent loops. When
the cursor moves over the section, stars within 600 px drift **toward** the cursor on soft springs, like
iron filings to a magnet; on mouse leave they spring back.

Foreground: bold, very tight (`tracking-tighter`) `text-4xl`→`sm:text-5xl` title (white in dark,
`neutral-900` in light), muted `text-lg` subtitle. A rounded-full segmented toggle (`bg-muted`, `p-1`)
with "Monthly" / "Annual (Save 20%)"; the active option sits on a `bg-primary` pill and gets
`text-primary-foreground`. "(Save 20%)" is hidden below `sm`.

Three cards (`lg:grid-cols-3`, `items-start`): `rounded-2xl`, `p-8`, semi-transparent `bg-background/70`
with `backdrop-blur-sm` so stars show faintly through. Centered name (`text-xl` semibold), description, huge
bold price with "/ month", "Billed Monthly/Annually", left-aligned check list, and a large full-width CTA
pinned to the bottom (`mt-auto`). The popular card has a 2 px primary border, `shadow-xl`, sits 20 px higher
on desktop, and a "★ Most Popular" pill badge centered on its top edge.

Motion: cards spring up from 50 px below and fade in when scrolled into view, staggered 0.15 s. Switching to
Annual rolls prices (NumberFlow) and shoots 80 confetti particles from the Annual button.

## How it works

1. **Mouse tracking** — the root `div` stores `{x: clientX, y: clientY}` on `mousemove` and `{null, null}` on
   `mouseleave`; the position is passed to every `Star`.
2. **Star physics** — each star picks `top`/`left` as random `%` once (lazy `useState`). On each mouse update:
   star center = container rect + % × size; `distance = hypot(dx, dy)`; if `distance < 600`:
   `force = 1 - distance / 600`, target offset = `(dx, dy) * force * 0.5`; else 0. Offsets feed two
   `useSpring(0, { stiffness: 100, damping: 15, mass: 0.1 })` bound to `style.x/y`.
3. **Twinkle** — `animate={{ opacity: [0, 1, 0] }}`, `transition { duration: 2 + rand*3, repeat: Infinity, delay: rand*5 }`.
4. **State sharing** — `PricingContext { isMonthly, setIsMonthly }` (default monthly) consumed by the toggle and cards.
5. **Toggle pill** — `useEffect([isMonthly])` measures the active button's `offsetWidth` / `offsetLeft` and sets
   `{ width, transform: translateX(offsetLeft) }` on an absolutely positioned `motion.div` (`bg-primary`, `h-full`).
6. **Confetti** — only on switch to annual: origin = Annual button center / viewport size;
   `particleCount: 80, spread: 80, ticks: 300, gravity: 1.2, decay: 0.94, startVelocity: 30`.
7. **Card entrance** — `initial {y: 50, opacity: 0}` → `whileInView {y: popular && ≥1024px ? -20 : 0, opacity: 1}`,
   `viewport once`, spring `stiffness 100, damping 20, duration 0.6`, `delay: index * 0.15`.
8. **Price** — `NumberFlow` with `format { style: "currency", currency: "USD", minimumFractionDigits: 0 }`
   (no `locales`, so it follows the browser locale — the preview shows "US$50" from a non-en-US locale).

## Reproduction notes / gotchas

- **Pill doesn't actually slide**: the pill is a `motion.div` whose position comes from `style`, and framer
  applies `style` changes instantly — the `transition` prop is ignored without `animate`. It jumps. For the
  intended slide use `animate={pillStyle-as-{x,width}}` or add `transition-all duration-300` to its classes.
- **Star size flickers**: `width/height` and the twinkle `duration/delay` call `Math.random()` during render,
  and every star re-renders on every `mousemove` (parent state), so sizes change constantly while the mouse
  moves. Memoize them in the lazy `useState` together with `top/left`.
- **Performance**: 150 motion components re-render per mousemove. Throttle with rAF, or store the mouse in a
  motion value / ref instead of React state.
- **Confetti colors**: `"hsl(var(--primary))"` strings can't be parsed by canvas-confetti (hex only) and v4
  tokens are `oklch` anyway — pass hex colors.
- `className="font-variant-numeric: tabular-nums"` is not a valid class; use `tabular-nums`.
- `confettiRef` (on the toggle wrapper) is only used as a truthy guard, not as the confetti origin.
- In light mode the `bg-foreground` stars become dark specks on white, which reads as dust; consider a lower
  opacity or a different dot color there.
- Touch devices get no starfield interaction (no mousemove); twinkle still runs. No reduced-motion handling —
  gate the starfield with `useReducedMotion()`.
- `container` in Tailwind v4 has no centering/padding by default; `mx-auto px-4 md:px-6` are already applied.

## Adapting

The starfield is reusable as a background for any hero/CTA section (swap `bg-foreground` dots for brand
colors, invert the force to repel instead of attract, tune the 600 px radius). The context + measured pill
toggle pattern works for any two-option segmented control.
