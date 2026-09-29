# Team 02 (Hover-Reveal Socials, shadcnspace)

- **Section:** Team / People
- **Source:** https://21st.dev/@shadcnspace/components/team-02
- **Stack:** React + TypeScript, Tailwind CSS v4, shadcn tokens (`bg-background`, `text-foreground`, `text-muted-foreground`), `motion` (`motion/react`), shadcn/ui `Badge` (import from `@/components/ui/badge`, not reconstructed). `lucide-react` is in the 21st deps but unused.
- **Files:** `team-02.tsx` (component + data, reconstructed from bundle), `demo.tsx` (original demo), `preview.webp`, `preview.mp4`

## What it looks like

White, centered header: outline pill badge "Team", bold headline "Meet our team" (`text-3xl` → `md:text-5xl`,
semibold), and a muted one-line-ish paragraph under it (max width `xl`). 64 px gap to the grid.

Grid: 1 → 2 (`sm`) → 4 (`lg`) columns, 24 px gap, full width. Each card is a sharp-cornered (no radius)
portrait photo 320 px tall (`h-80`, `object-cover`) — moody, editorial fashion portraits — with name (`text-xl`,
medium) and role (`text-sm`, muted) left-aligned below.

Hover: a 50% near-black scrim (`gray-950/50`) fades over the photo in 300 ms and reveals a row of three round
white buttons (Instagram, Dribbble, LinkedIn — 16 px icons, `p-3` → 40 px circles, 8 px gap) pinned to the
bottom-right corner with 20 px padding. Each button dims to 80% opacity when hovered.

Entry: header drops from −40 px, cards rise from +40 px with a 0.1 s stagger, 0.8 s, soft ease-out, once.

## How it works

1. **Header reveal** — `motion.div` `initial {y: -40, opacity: 0}` → `whileInView {y: 0, opacity: 1}`,
   `viewport {once: true}`, `transition {duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98]}`.
2. **Card reveal** — each card `initial {y: 40, opacity: 0}` → `whileInView`, same transition + `delay: index * 0.1`.
3. **Overlay** — `absolute inset-0 bg-gray-950/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300
   flex items-end justify-end p-5`; the card root carries `group`. Only opacity animates — buttons don't slide.
4. **Social buttons** — `flex w-fit bg-background p-3 rounded-full hover:opacity-80 transition-opacity duration-300`;
   icons are inline SVGs using `currentColor` (so they take `text-foreground`). Instagram 24-unit viewBox,
   LinkedIn 16, Dribbble 20 (stroked 1.5) — all rendered at 16 px.

## Reproduction notes / gotchas

- The overlay is hover-only: **touch users never see the social links** (a tap triggers `:hover` on some mobile
  browsers, but it's unreliable). Also keyboard users can tab to invisible links. Add
  `group-focus-within:opacity-100` and consider always showing the icons below `sm`.
- Links use `target="_blank"` without `rel="noopener noreferrer"` and have no `aria-label` — add both.
- `alt="team-img"` everywhere; use the member name.
- Icon SVGs use fixed clipPath ids, duplicated per card (harmless while identical; use `useId()` if customized).
- In dark mode the buttons become `bg-background` (dark) with light icons — still readable over the scrim.
- `key={index}` for cards and socials.
- No reduced-motion handling; wrap in `MotionConfig reducedMotion="user"` if needed.

## Adapting

Classic agency team block. Try: add `group-hover:scale-105 transition-transform duration-500` on the `<img>` for a
subtle zoom behind the scrim, stagger the buttons in with `translate-y-2 → 0`, use `aspect-[4/5]` instead of fixed
`h-80` for consistent crops, or swap the scrim for a bottom gradient (`bg-gradient-to-t from-black/60`).
