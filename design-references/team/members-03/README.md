# Members 03 (Team Members Panel, shadcnui-blocks)

- **Section:** Team / People
- **Source:** https://21st.dev/@shadcnui-blocks/components/members-03
- **Stack:** React + TypeScript, Tailwind CSS v4 (arbitrary `min-[32rem]` / `max-[32rem]` variants), shadcn tokens (`bg-muted`, `text-muted-foreground`), `lucide-react` (`Dot`, `Search`, `UserPlus`), shadcn/ui `Button` (import from `@/components/ui/button`, not reconstructed). No animation library.
- **Files:** `members-03.tsx` (component + data, reconstructed from bundle), `demo.tsx` (original demo), `preview.webp` (no video — the component is static)

## What it looks like

An app-style "workspace members" page rather than a marketing section. Narrow centered column (`max-w-3xl`,
768 px) with `px-6 py-12` padding.

Top: a soft gray header bar (`bg-muted/90`, `rounded-lg`, `px-6 py-5`). Left side: "Members" (`text-lg`, medium)
and below it a muted `text-sm` meta line "Team Avengers • 10 Members" (lucide `Dot` icon as the separator).
Right side: an outline square icon button (search) and a primary dark button "Invite Members" with a user-plus icon.

Below (24 px gap): a grid of member tiles — 1 column on phones, 2 from 32 rem (512 px), 3 from `lg`; 16 px column
gap, 32 px row gap. Each tile: square photo (`aspect-square`, `rounded-lg`, `object-cover`, `bg-muted` placeholder
while loading), then name (`text-lg`, medium, 12 px top margin) and role (`text-sm`, muted: Admin / Editor / Viewer).

No motion, no hover states apart from the shadcn Button defaults.

## How it works

1. **Header bar responsiveness** — `flex justify-between gap-4` with `max-[32rem]:flex-col` (stack under 512 px)
   and `min-[32rem]:items-center` (vertically center the two groups when in a row).
2. **Meta line** — `flex items-center`; literal spaces around `<DotIcon />` (24 px default lucide size, a 2 px dot
   centered in it), so the separator has generous whitespace.
3. **Buttons** — shadcn `Button size="icon" variant="outline"` (36×36, `[&_svg]:size-4`) and default `Button`
   (`h-9 px-4`, `gap-2` between icon and label).
4. **Grid** — `grid-cols-1 min-[32rem]:grid-cols-2 lg:grid-cols-3`. The photo wrapper keeps the square shape even
   before the image loads (`aspect-square bg-muted`), and the `<img>` is `size-full rounded-lg object-cover`.

## Reproduction notes / gotchas

- "10 Members" is **hard-coded** while the data has 5 people — derive it from `members.length`.
- `email` and `joined` are in the data but never rendered (leftovers from sibling blocks that show a table).
- The search button has no `aria-label`; add `aria-label="Search members"`.
- The bundle ships the older shadcn Button (`h-9`, `shadow`, `rounded-md`, `focus-visible:ring-1`); newer shadcn
  versions look almost the same.
- The class order `lg:grid-cols-3 min-[32rem]:grid-cols-2` is fine in Tailwind v4 (variants are sorted by
  breakpoint value, not class order).
- The outer wrapper is a plain `<div>`, not a `<section>`; the heading is an `h2`.

## Adapting

Use for dashboard/workspace "people" pages, org directories, project collaborators. Add a role `Badge`, a
dropdown menu per tile (change role / remove), wire the search button to a filter input, or switch the tiles to
round avatars in a denser 4–6 column grid for larger teams.
