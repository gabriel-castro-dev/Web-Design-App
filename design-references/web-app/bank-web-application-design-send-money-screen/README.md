# Mkb Bank: Send Money Screen

- **Section**: web-app
- **Subtype**: payments
- **Kind:** image (static reference, no code)
- **Source:** https://dribbble.com/shots/15529365-Bank-Web-Application-Design-Send-Money-screen
- **Files:** `preview.webp`

## Overall style

A monochrome banking transfer flow: a near-black sidebar and near-black hero cards set against pure white content, with a warm cream backdrop. There is no brand color at all; hierarchy comes from black vs. white blocks, portrait photography and one tiny green check. The most memorable move is the sidebar's active item, which is "cut out" of the dark rail by a smooth concave bulge of the white content area.

## Layout

- Three zones: dark sidebar (~17% width), main white column (~55%) and a right detail panel (~28%) separated by a 1px `#ECECEC` vertical line.
- Sidebar: wordmark "Mkb" top-left, 6 nav items with ~78px vertical spacing, user avatar + name + city pinned to the bottom.
- Main column, top to bottom: full-width black balance banner (~116px tall), "Choose Receiver" header with prev/next arrows, a horizontal row of 5 circular avatars (first is a dashed "+" Add), "Choose Method" header with an "Add +" pill, then a two-column area: stacked payment-method cards on the left and a black virtual card + amount stepper panel on the right.
- Right panel: search and notification icon buttons top right, centered large receiver avatar with name and account number, "Payment details" with three label/value rows (edit pencil on each), then two full-width buttons stacked at the bottom.
- Content is left-aligned with generous white space; sections separated by ~64px.

## Color palette

| Role | Hex | Usage |
|---|---|---|
| Backdrop | `#F9F0EA` | Warm cream presentation background |
| Ink / dark surface | `#232227` | Sidebar, balance banner, virtual card, primary button |
| Surface | `#FFFFFF` | Main and right panels, selected method card |
| Soft surface | `#F6F6F6` | Unselected method cards, amount panel, secondary button |
| Divider | `#F0F0F0` / `#ECECEC` | Field underlines, panel separator |
| Arc decoration | `#E8E1DB` to transparent | Metallic ring shapes on dark cards |
| Text | `#111111` | Headings, values |
| Muted text | `#818181` | Labels, receiver names, "Balance:" |
| Sidebar muted | `#9E9EA2` | Inactive nav labels and icons |
| Success | `#2FD27A` (light halo `#C1FAD2`) | Selected check, online dot |

## Typography

- Geometric-grotesk sans with round forms, likely **Plus Jakarta Sans** (the double-story "a" and wide "$" suggest it) or Manrope.
- Balance ~36px/700 white; section headers ~22px/600; receiver name in right panel ~24px/500; method name ~17px/600; amount stepper value ~34px/700; body/labels ~15 to 16px/400 muted; small labels ("Subject") ~14px/400 light grey.
- Numbers are prominent everywhere (balances, account numbers) and use lining figures with normal tracking.

## Components & patterns

- **Balance banner**: `#232227` fill, 12px radius, big white amount + muted label, and two large, partially cropped ring arcs in a metallic light-to-transparent gradient on the right half.
- **Receiver avatars**: 104px circles, photo backgrounds in varied pastel colors; the selected one shows its name in bold, the account number beneath, and a small green check badge at top right. "Add" is an empty circle with a 1px grey border and a centered `+`.
- **Payment method card**: `#F6F6F6` fill, 10px radius, 44px white circular logo chip, name bold + "Balance: **$44.504**" with bold amount, and a right-side radio made of a thin grey check-circle. The selected card becomes white with a soft shadow and a filled green check.
- **Virtual card**: black, 12px radius, matching ring arcs, "Balance:" + amount, provider wordmark top right, card number and validity, contactless glyph.
- **Amount stepper**: soft grey panel attached under the card, a small white "USD v" dropdown pill, then `-` [ $152.25 ] `+` with white circular buttons and "Selected Amount" caption.
- **Detail rows**: small grey label above a larger black value, a thin pencil icon on the right, and a 1px underline divider.
- **Buttons**: full-width 68px-tall rows at 1920 width (~44px at 1x), 8px radius; secondary is `#F6F6F6` with black text, primary is `#232227` with white text.
- **Nav**: thin 1.5px outline icons; the active item is white, bold, and sits in the concave cut-out.
- **Icon buttons**: 40px white circles with a very soft shadow.

## Signature details

1. The active sidebar item is revealed by a smooth S-curved bulge of the white content area into the black rail, like a tab pulled out of the sidebar.
2. Oversized, cropped metallic ring arcs as the only decoration on dark cards.
3. Zero accent color: black/white blocks do all the work, and a single green check marks selection.
4. Receiver chooser as a big portrait carousel with pastel photo backdrops.
5. The virtual card and amount stepper fuse into one tall object (card on top, grey stepper tray below).
6. Warm cream backdrop that keeps the monochrome from feeling cold.

## Reproduce it

- Tokens: `--ink:#232227; --surface:#FFF; --soft:#F6F6F6; --line:#EEEEEE; --muted:#818181; --success:#2FD27A; --backdrop:#F9F0EA`.
- Radii: cards and buttons 8 to 12px, avatars full, pills full.
- Spacing: 8px base, section gaps 48 to 64px, card padding 20px.
- Shadow for selected/floating items: `0 8px 24px rgba(20,20,30,.06)`.
- Sidebar cut-out: an SVG mask or an absolutely positioned white shape with `border-radius` on the content edge that bulges ~40px into the rail behind the active item.
- Ring arcs: `border: 28px solid; border-image` or an SVG circle stroke with `linearGradient` from `#EDE6E0` to transparent, clipped by the card.
- Keep the absence of color. Adapt by adding a brand color only for success/selection, never for chrome.

## Avoid

- Adding a blue "fintech" accent or gradient cards; the reference is deliberately monochrome.
- Glassmorphic cards or neon glows on the virtual card.
- Tiny avatars or initials placeholders; the receiver row relies on real portraits.
- Pure `#000000` and cold greys; the ink is a soft `#232227` and the backdrop is warm.
- Boxed form inputs in the details panel; use label/value rows with underlines.
