# Item Action List (Settings Rows with Buttons)

- **Section:** Lists / Items
- **Source:** https://21st.dev/@sean0205/components/item-action-list
- **Stack:** React + TypeScript, Tailwind CSS v4 (shadcn tokens: `border-border`, `bg-muted`, `text-muted-foreground`, `bg-primary`), `lucide-react` (`Mail`, `Bell`), shadcn/ui `Item` family (`Item`, `ItemMedia`, `ItemContent`, `ItemTitle`, `ItemDescription`, `ItemActions`) and `Button`
- **Files:** `item-action-list.tsx` (component, reconstructed from bundle), `demo.tsx` (original demo source), `preview.webp`

## What it looks like

A centered stack (max 448 px, `max-w-md`, 8 px gap) of two bordered rows that look like small settings cards.

Each row: 1px light-gray border, `rounded-md`, 16 px padding, no shadow. From left to right:
- a 32 px square icon tile (`bg-muted` light gray, 1px border, `rounded-sm`) with a 16 px outline icon (mail / bell),
  top-aligned with the title;
- the title in 14 px `font-medium` ("Email Notifications" / "Push Notifications") with a 14 px muted-gray description below;
- a small button pinned right and vertically centered: an **outline** "Configure" button (white, bordered, `shadow-sm`)
  on the first row and a **primary** solid near-black "Enable" button on the second. Both are `size="sm"` (32 px tall, `text-xs`, `px-3`).

Hover states come from the Button only (outline → `bg-accent`, primary → `bg-primary/90`). The row itself has no hover
state. No motion.

## How it works

1. **Wrapper**: `mx-auto flex w-full max-w-md flex-col gap-2`.
2. **Item `variant="outline"`**: base `flex flex-wrap items-center gap-4 p-4 rounded-md border text-sm` +
   `border-border` (instead of the default transparent border).
3. **Icon tile**: `ItemMedia variant="icon"` = `bg-muted size-8 rounded-sm border` with the svg auto-sized to `size-4`.
   Because the row contains an `ItemDescription`, `group-has-[[data-slot=item-description]]/item:self-start translate-y-0.5`
   top-aligns the tile with the title.
4. **Content**: `ItemContent` `flex flex-1 flex-col gap-1` takes the remaining width, which pushes the actions to the right.
5. **Actions**: `ItemActions` = `flex items-center gap-2` holding one `Button`.
6. **Button used in the bundle** (older shadcn "new-york" sizes): `sm` = `h-8 rounded-md px-3 text-xs`; `outline` =
   `border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground`; `default` =
   `bg-primary text-primary-foreground shadow hover:bg-primary/90`.

## Reproduction notes / gotchas

- Requires the current shadcn `item` component (`npx shadcn@latest add item`). Older installs don't have it.
- Your local `Button` may differ: the newest shadcn Button's `sm` size is `h-8 gap-1.5 px-3` with `text-sm`
  and no `shadow`, so the buttons will look slightly larger / flatter than in the preview. Pass `className="text-xs"` to match.
- Buttons have no `onClick`; it's a static layout. Wire them to a dialog (Configure) and a permission request/toggle (Enable).
  For a real preference toggle, a shadcn `Switch` in `ItemActions` is usually better than a button.
- `Item` is `flex-wrap`, so on very narrow widths the button can wrap below the text. Fine for mobile, but keep it in mind.
- No list semantics (plain `div`s). Wrap in `ItemGroup` (`role="list"`) if it's a list of settings.
- Icons get `pointer-events-none` from `ItemMedia`; decorative, so add `aria-hidden` if your lucide version doesn't.

## Adapting

Use for notification preferences, integrations ("Connect" buttons), account security options (2FA, sessions),
or billing add-ons. Make the rows data-driven (`{ icon, title, description, action }`), swap the button for a `Switch`
or `Badge` status, or use `variant="muted"` rows for a softer, borderless look.
