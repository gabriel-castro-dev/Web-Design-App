# Item 19 (Activity Feed List)

- **Section:** Lists / Items
- **Source:** https://21st.dev/@felipemenezes098/components/item-19
- **Stack:** React + TypeScript, Tailwind CSS v4 (shadcn tokens: `bg-muted`, `text-muted-foreground`, `bg-border`), `lucide-react` (`GitCommitHorizontal`, `UserPlus`, `CircleCheck`, `Rocket`), shadcn/ui `Item` family (`ItemGroup`, `Item`, `ItemMedia`, `ItemContent`, `ItemTitle`, `ItemDescription`, `ItemFooter`, `ItemSeparator` → uses shadcn `Separator`)
- **Files:** `item-19.tsx` (component, reconstructed from bundle), `demo.tsx` (original demo source), `preview.webp`

## What it looks like

A narrow (max 448 px, `max-w-md`) activity feed of four rows on a plain background, divided by 1px
hairlines in the border color. No card or outer border.

Each row, left to right:
- a 32 px square icon tile (`size-8`, `rounded-sm`, 1px border, `bg-muted` light gray) holding a 16 px
  lucide icon in the foreground color (commit, user-plus, check-circle, rocket), aligned to the top of the text;
- a text block: title in 14 px `font-medium` (near-black), description below in 14 px muted gray;
- a small 12 px muted timestamp ("2m ago", "1h ago", "4h ago", "Yesterday") pushed to the right edge and
  vertically centered on the row.

Rows have 16 px padding and 16 px gaps. No hover state (the `Item` is a `div`, not a link). No motion.

## How it works

1. **Data**: a static array of `{ icon, title, description, time }` (icons are component references rendered as `<event.icon />`).
2. **Group**: `ItemGroup` (`role="list"`, `flex flex-col`) with `w-full max-w-md`. Each entry is wrapped in a `<div>` holding the `Item`
   plus an `ItemSeparator` (`my-0`, horizontal `Separator`, `h-[1px] w-full bg-border`) for every row except the last.
3. **Item** (default variant/size): `flex flex-wrap items-center gap-4 p-4 rounded-md border border-transparent text-sm`.
4. **Icon tile**: `ItemMedia variant="icon"` = `bg-muted size-8 rounded-sm border`, `[&_svg:not([class*='size-'])]:size-4`.
   Because the row contains an `ItemDescription`, the media gets `self-start translate-y-0.5` (via
   `group-has-[[data-slot=item-description]]/item:`), so it aligns with the title rather than the row center.
5. **Content**: `ItemContent` is `flex-1 flex-col gap-1`; `ItemTitle` `text-sm font-medium leading-snug`;
   `ItemDescription` `text-muted-foreground text-sm leading-normal line-clamp-2 text-balance`.
6. **Timestamp**: `ItemFooter` defaults to `basis-full` (it would wrap onto its own line under the content because
   `Item` is `flex-wrap`). Overriding with `className="basis-auto"` keeps it inline as the last flex child on the right.

## Reproduction notes / gotchas

- The description calls it a "vertical timeline", but **there is no connecting line or dots**. It's a separated list.
  For a real timeline, add an absolutely positioned `w-px bg-border` line behind the icon column.
- The `Item` primitives must be the current shadcn `item` component (added in late 2025: `npx shadcn@latest add item`);
  older shadcn installs don't have it. `ItemSeparator` depends on `@/components/ui/separator`.
- Separators sit outside `Item` in wrapper `div`s, so `ItemGroup`'s `role="list"` children aren't `role="listitem"`. Add
  `role="listitem"` to the wrappers for correct a11y semantics. Use `<time dateTime>` for the timestamps.
- lucide-react naming: the bundle is on lucide v1.x where `CircleCheck` (alias `CheckCircle2`) and
  `GitCommitHorizontal` (alias `GitCommit`) exist; very old versions only have the aliases.
- On very narrow widths the `basis-auto` footer can still wrap below the content (Item is `flex-wrap`), which is acceptable.
- `title` is used as the React key; use a real id for live data.

## Adapting

Use it for audit logs, notifications, deploy history, CRM activity. Make data a prop, render `Item asChild`
with an `<a>` to get the built-in `[a]:hover:bg-accent/50` hover, color-code the icon tile per event type
(e.g. green tile for success), or switch to `variant="outline"` items for card-like rows.
