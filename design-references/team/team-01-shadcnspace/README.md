# Team 01 (Shaped Portraits, shadcnspace)

- **Section:** Team / People
- **Source:** https://21st.dev/@shadcnspace/components/team-01
- **Stack:** React + TypeScript, Tailwind CSS v4, shadcn tokens (`text-foreground`, `text-muted-foreground`, `bg-accent`), `motion` (`motion/react`), `lucide-react` (`Globe`), shadcn/ui `Badge` (import from `@/components/ui/badge`, not reconstructed)
- **Files:** `team-01.tsx` (component + data, reconstructed from bundle), `demo.tsx` (original demo), `preview.webp`, `preview.mp4`

## What it looks like

White, centered section. Small outline pill badge "Team", then a large medium-weight headline
("Meet the creative minds behind our success", `text-3xl` → `md:text-5xl`, max width `xl`, centered).

Below, a 4-column grid (1 → 2 at `sm` → 4 at `lg`, 24 px gap) of member cards, all centered text.
The photos carry the personality: each is a transparent PNG cut-out of a person on a bold flat shape —
an electric-blue "figure 8"/double-lobe blob, an orange arch/tombstone, a yellow oval, a sky-blue triple-lobe
"wavy" shape. The shapes are baked into the images, not CSS. Under each: name (`text-2xl`, medium),
role (`text-sm`, muted), and a row of two 16 px icon links (globe + LinkedIn) with round `p-2` hit areas.

Motion: on scroll into view, the header drops in from 40 px above, and cards rise from 40 px below,
staggered 0.1 s each, 0.8 s with a soft ease-out. Hovering a card turns its photo grayscale (300 ms) —
the colorful shape goes gray too. Icon links get an `accent/80` circular background on hover.

## How it works

1. **Header reveal** — `motion.div` `initial {y: -40, opacity: 0}` → `whileInView {y: 0, opacity: 1}`,
   `viewport {once: true}`, `transition {duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98]}`.
2. **Card reveal** — each card is its own `motion.div` with `whileInView` (`initial {y: 40, opacity: 0}`),
   same ease/duration plus `delay: index * 0.1`. Each card observes itself, so on narrow screens cards reveal as
   they scroll in (the stagger only matters when several enter at once).
3. **Hover** — pure CSS: `group` on the card, `group-hover:grayscale transition-all duration-300` on the `<img>`.
4. **Icons** — lucide `Globe` (size 16) and an inline LinkedIn SVG (16×16 viewBox, `fill="currentColor"`,
   clip-path id `clip-linkedin-team01`).

## Reproduction notes / gotchas

- The shaped look **depends entirely on the transparent PNGs**. With ordinary rectangular photos you get plain
  squares. To recreate with regular photos, use CSS `mask-image` with an SVG blob, or `clip-path: path(...)`,
  or `rounded-t-full` for the arch variant.
- `img` is `w-full h-full` with no aspect ratio or `object-cover`; mixed-size images will produce uneven cards.
  Add `aspect-[4/5] object-contain` if your images vary.
- `alt="team-img"` on every photo — replace with the member's name for accessibility. Icon links have no
  `aria-label` either.
- The LinkedIn SVG uses a fixed clipPath `id`; rendered 4× on the page the id is duplicated (harmless here since
  all are identical, but use `useId()` if you vary them).
- `key={index}` in the map.
- No reduced-motion handling; wrap with `MotionConfig reducedMotion="user"` if needed.
- The bundle ships the classic shadcn Badge (`div`, `rounded-md border px-2.5 py-0.5 text-xs font-semibold`,
  outline = `text-foreground`); the `px-3 py-1 h-auto text-sm` overrides make it the larger pill in the preview.
  `h-auto` only matters with newer shadcn Badges that set a fixed height.

## Adapting

Great for agency / startup "meet the team" with playful brand shapes. Generate the portraits with a consistent
cut-out style and a brand-colored shape per person, or apply a CSS mask per card. Swap the hover grayscale for
`group-hover:scale-105` or reverse it (grayscale at rest, color on hover) for a more corporate feel.
