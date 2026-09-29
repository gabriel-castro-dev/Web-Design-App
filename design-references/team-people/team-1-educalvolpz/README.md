# Team Grid (Team 1, SmoothUI)

- **Section:** Team / People
- **Source:** https://21st.dev/@educalvolpz/components/team-1
- **Stack:** React + TypeScript, Tailwind CSS v4, shadcn-style tokens (`bg-primary`, `text-foreground`), `motion` (`motion/react`: `motion`, `useInView`, `useReducedMotion`). No shadcn/ui primitives and no `cn()` needed.
- **Files:** `team-1.tsx` (component + default data, reconstructed from bundle), `demo.tsx` (original demo), `preview.webp`, `preview.mp4`

## What it looks like

A quiet, editorial "Our team" section in the Tailwind UI style. Very light gray page (`oklch(97.2% 0 0)`),
left-aligned header: big semibold headline ("Our team", `text-4xl` → `sm:text-5xl`, tight tracking,
`text-pretty`) and a 70%-opacity paragraph below (`text-lg`, 32 px line height, max width `2xl`).

Below (80 px gap) a responsive grid of people: 1 column → 2 (`sm`) → 3 (`lg`) → 4 (`xl`), 32 px
column gap, 56 px row gap. Each item is a wide-ish photo (aspect 14:13, `rounded-2xl`, `object-cover`)
with a hairline inner outline (`outline-black/5`, `-outline-offset-1`), then name (semibold `text-lg`,
tight tracking, 24 px top margin), role (`text-base`, 70% opacity) and location (`text-sm`, 70% opacity).
Optional bio line (`text-sm`, `mt-2`).

Motion: header fades up 20 px on first view (0.6 s). The list items fade up 30 px one after another
(100 ms stagger, 0.6 s each) when the list enters the viewport. On hover a card springs to 1.02 and
its image wrapper to a further 1.05 (so the photo visibly grows ~7%), the outline darkens to
`black/10` (`white/20` in dark), and a faint top-left dark gradient fades in.

## How it works

1. **Header reveal** — `motion.div` with `initial {opacity 0, y 20}` → `whileInView {opacity 1, y 0}`,
   `viewport {once: true}`, `transition {duration: 0.6}` (default easing).
2. **List reveal** — `useInView(listRef, { once: true })` on the `<ul>`. Each `<li>` animates between
   `{opacity 0, y 30}` and `{opacity 1, y 0}` based on that boolean, `transition {delay: index * 0.1, duration: 0.6}`.
   One observer for the whole list, so all items start together and stagger by delay only.
3. **Hover** — two nested `whileHover` scales, both `type: "spring", stiffness: 300, damping: 20`:
   outer card `scale 1.02` (includes the text), inner image wrapper `scale 1.05` (`overflow-hidden`, `rounded-2xl`).
4. **Hover overlay** — absolute `bg-gradient-to-br from-black/5 to-transparent`; motion `initial {opacity 0}`
   + `whileHover {opacity 1}` in 0.3 s. (The `group-hover:opacity-100` class is overridden by motion's inline
   `opacity: 0`, so in practice the overlay shows only via `whileHover` on itself — same area as the image.)
5. **Outline** — Tailwind v4 `outline-1 outline-black/5 -outline-offset-1` + `transition-all duration-300`
   + `group-hover:outline-black/10`; dark: `outline-white/10` → `white/20`.
6. **Reduced motion** — `useReducedMotion()` switches every animation to `{duration: 0}`, removes y offsets and
   disables hover scales. Nicely done in the original.
7. **Image URL** — `getAvatarUrl(src, 400)` appends an ImageKit transform `?tr=w-800,h-800,q-85,f-auto`
   (2× size) to absolute URLs; `width/height=400` attributes.

## Reproduction notes / gotchas

- **`bg-primary` is the page background.** With stock shadcn tokens `--primary` is near-black and `text-foreground`
  is near-black → unreadable. The bundle (SmoothUI theme) overrides:
  ```css
  :root { --primary: oklch(97.2% 0 0); --foreground: oklch(22% 0 0); }
  .dark { --primary: oklch(23.5% 0 0); --foreground: oklch(96% 0 0); }
  ```
  Either add these overrides or change the section to `bg-muted`/`bg-background`.
- `aspect-14/13`, `text-lg/8`, `outline-1`, `-outline-offset-1` are Tailwind v4 syntax (v3 needs arbitrary values).
- The ImageKit helper's local-path branch (relative `images/...` paths → the author's ImageKit endpoint
  `https://ik.imagekit.io/16u211libb/smoothui/...`) was dropped; relative paths are returned unchanged.
- The default data in the bundle came from a big shared "people" fixture (50 generated portraits); only the first 4
  are shown by default, so only those are included here.
- `key={person.name}` — duplicate names collide.
- The gradient overlay (`black/5`) is nearly invisible; bump to `/20`–`/30` if you want a noticeable hover tint.

## Adapting

A solid default for "About → Team" pages. Pass `members` with `bio` for a richer layout, switch the grid to
`lg:grid-cols-3` for bigger photos, change the aspect to `3/4` for portrait crops, or replace the per-item delay
with `staggerChildren` variants if items are added dynamically.
