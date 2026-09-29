# Openbank Payments

- **Section**: web-app
- **Subtype**: payments
- **Kind:** image (static reference, no code)
- **Source:** https://dribbble.com/shots/16023546-dashboard-payments-web-application
- **Files:** `preview.webp`

## Overall style

A Swiss-editorial banking screen: stark white page, black type, hairline black rules instead of boxes, and almost no radius. Color comes only from a row of pastel service tiles (periwinkle, pale grey, pink) with one inverted black tile, and from payment cards illustrated with glossy black 3D ribbon sculptures. It feels like a print layout with forms built from underlines.

## Layout

- White sheet on a black backdrop, with generous outer margins (~80px at 1x).
- Header: logo + wordmark at left, horizontal text nav (Overview, Payments, Cards, Account, Admin) with a small chevron "^" under the active item, then search, bell and avatar at far right. Each column has its own 1px dark underline, so the header rule is broken into three segments aligned with the columns below.
- Three columns: left nav (~12%), central "Services" + "Templates" (~40%), right "New payment" form (~28%), with wide gutters (~80px).
- Left: icon + label nav list (Accounts, Transfer, SWIFT, Templates, Exchange, Scheduled); a legal footer block ("openbank. 2021 openbank license #19...") pinned bottom with a rule above.
- Center: H2 "Services", an underline search field + underline select + outlined "Search" button, a row of 5 square service tiles, a rule with a centered chevron to expand, then "Templates / 55 School Lane, Odessa edit" with gear and `+` square buttons, followed by a 3-row list.
- Right: H2 "New payment" + "Clear" grey chip, a row of recent recipient avatars, "From the card" (card art + masked number + balance on underlined rows), "Recipient's card", an Amount/Currency inline field row, a Comment row, then a black "Transfer" button and a text "Save as template" action.

## Color palette

| Role | Hex | Usage |
|---|---|---|
| Backdrop | `#000000` | Presentation background |
| Page | `#FFFFFF` | Main sheet |
| Ink | `#000000` | Text, rules, Electricity tile, Transfer button, template icons |
| Rule | `#4C4C4C` | 1px header underlines and field lines |
| Muted text | `#6A6A6A` | Labels, secondary lines |
| Soft chip | `#F4F4F4` | Clear button, square icon buttons, Water tile |
| Tile periwinkle | `#CCD0F4` | Internet tile, card background |
| Tile grey | `#E0E4E8` | Office tile, second card background |
| Tile pink | `#E4C0CC` | Gas tile, avatar backgrounds |

## Typography

- A crisp neo-grotesk with geometric touches, similar to **Aeonik**, **Graphik** or **Suisse Int'l**; free alternatives: Inter Tight or Manrope.
- H2 ("Services", "New payment") ~36px/700, tight tracking (`-0.01em`). Template names ~22px/600; amounts "- ₴ 500" ~22px/700 right-aligned.
- Card numbers set in a **monospace** ("4060", "3453") with spaced dot masks `. . . .`.
- Nav ~18px/400; labels ~17px/400 muted; tile labels ~16px/400 bottom-left.
- The balance "₴ 60,450" ~30px/700. Sentence case everywhere, lowercase wordmark.

## Components & patterns

- **Underline inputs**: no box, a 1px dark bottom rule; inline label, a thin vertical bar separator, then the value ("Amount | 200.00", "Currency | UAH v").
- **Outlined button**: "Search", 1px black border, 4px radius, white fill.
- **Primary button**: solid black, 4px radius, ~60px tall at 1920, white label; paired with a plain-text secondary action.
- **Service tiles**: ~130px squares, 4px radius, no border, a line icon top-left and label bottom-left; one tile inverted to black with white icon/text as the active selection.
- **Square icon buttons**: 48px `#F4F4F4` chips with a gear or `+`.
- **Template list rows**: 44px black rounded-square icon (8px radius) with a white glyph, name bold + subtitle muted, account number column, date + "Last payment" column, right-aligned signed amount.
- **Payment card art**: ~170x115px cards with 4px radius, pastel fill and a glossy black 3D ribbon/tube render, network logo overlay (Mastercard circles, VISA).
- **Avatar row**: 48px circles with pastel backgrounds, plus a grey "oo" overflow chip.
- **Active nav marker**: a tiny chevron "^" under the active header item instead of an underline or pill.

## Signature details

1. Segmented black hairline rules under the header, broken per column, giving a print-grid feel.
2. Forms built entirely from underlines with inline "Label | value" and a vertical bar divider.
3. Pastel square service tiles with one inverted black tile as the selection.
4. Glossy black 3D ribbon renders as card artwork on periwinkle and grey.
5. Monospace masked card numbers next to a geometric grotesk.
6. Nearly zero radius (4px) and zero shadows; black is the only accent.

## Reproduce it

- Tokens: `--ink:#000; --page:#FFF; --rule:#4C4C4C; --muted:#6A6A6A; --soft:#F4F4F4; --periwinkle:#CCD0F4; --mist:#E0E4E8; --blush:#E4C0CC`.
- Radii: 4px for tiles, buttons and cards; 8px for small icon squares; full for avatars.
- Rules: `border-bottom:1px solid var(--rule)`; fields `height:56px` with `gap:16px` between label, `|` and value.
- Spacing: 8px base, column gutter 64 to 80px, section gap 64px.
- Font: Aeonik/Inter Tight for UI, `JetBrains Mono` or `IBM Plex Mono` for card numbers.
- Keep: rules over boxes, one inverted tile, the black button. Adapt the pastel set to your categories (max 3 pastels + black + near-white).

## Avoid

- Rounded cards with drop shadows; this is flat, ruled and editorial.
- A blue or green brand accent; black is the accent.
- Bordered input boxes; keep fields as underlines.
- Flat stock credit-card gradients; the card art should be a sculptural object render or bold graphic.
- Crowding the columns; the wide gutters are what make it feel premium.
