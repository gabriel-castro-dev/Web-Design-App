# Salerush Sales Dashboard

- **Section**: web-app
- **Subtype**: dashboard
- **Kind:** image (static reference, no code)
- **Source:** https://dribbble.com/shots/24773053-e-commerce-Web-Application
- **Files:** `preview.webp`

## Overall style

A soft, pillowy light-grey sales dashboard where every card sits inside a slightly darker, rounded tray, producing a "nested bento" look. Data color is a two-tone pair of bright azure blue and deep navy, with mint and coral only for small +/- deltas. Bars are drawn as oversized rounded slabs with embedded month pills and ghost hatched tops, which is the most distinctive element.

## Layout

- Floating top nav tray (full width, ~64px radius): logo mark in a round chip + "SALERUSH" wordmark, a centered pill tab group (Dashboard active in blue; Analytics, Payment, Report, Transactions, Settings), bell in a round chip, and a user pill (avatar, name, role, chevron).
- Main tray below with ~48px radius containing a 4-column bento grid:
  - Row 1: Cashflow Analytics (big balance + two mini stat tiles), Insightful Overview (thin pill bar chart), Spending Breakdown (half-donut gauge).
  - Rows 1-2, column 4: Spending Breakdown map (world map with flag callouts) + country list with progress bars.
  - Row 2, columns 1-3: Key Market Requirement, a large card holding a toolbar (Sales Statistics chip, date chip, "+ Request New Summary", edit and filter icon chips), a category tab row with icons (Furniture, Electronics, Clothes active, Make Up, Parfume, Food) and a 6-bar monthly chart.
  - Row 2, column 4 bottom: a profile/request card (Hanny Pearce, "Requested", a cut-out portrait, "Sales Manager" description, Accept pill, close, QR code).
- Every card has an arrow-out-of-box icon chip at the top-right.

## Color palette

| Role | Hex | Usage |
|---|---|---|
| Backdrop | `#EEEEEE` | Page background |
| Tray | `#E4E4E4` to `#F8F8F8` | Rounded containers holding cards |
| Card | `#FAFAFA` / `#FFFFFF` | Card surfaces, chips |
| Soft chip | `#F4F4F4` | Icon chips, nav track, stat tiles |
| Hatch | `#F6F6F6` with `#FCFCFC` stripes | Ghost bar tops, empty gauge |
| Azure | `#408CFC` | Active nav, highlight bar, gauge segment, Accept |
| Royal blue | `#0858F4` | Country progress bars |
| Navy | `#1B274C` | Bars, active category chip, gauge segment |
| Mint | `#5CDC9C` | Positive delta pills, Loan segment |
| Coral | `#E45C74` | Negative delta pills |
| Text | `#0A0A0A` | Headings, values |
| Muted text | `#A3A3A3` | Captions, axis labels, customer counts |
| Map land | `#DCE4EA` | World map dots/land |

## Typography

- Light geometric/neo-grotesk, like **Outfit**, **Urbanist** or **General Sans**. The defining trait is the **light weight at large sizes**.
- Hero balance "$82,937" ~60px/400 with tight tracking; sub values "$3,716" ~34px/400; gauge value ~30px/400.
- Card titles ~28px/400 (not bold). Nav ~20px/400. Body and chips ~18px/400; captions ~14px/400 muted.
- Wordmark: bold uppercase condensed "SALERUSH" in navy.
- Sentence case, normal tracking; numbers with lining figures.

## Components & patterns

- **Pill nav**: grey track, 44px tall tabs, full radius; the active tab is solid azure with white text.
- **Icon chips**: 48px circles in `#F4F4F4` with a thin diagonal arrow (open in new) or bell.
- **Stat tile**: soft grey rounded (16px) tile, value + tiny delta pill (coral "-2%" or mint "+1.2%", white 11px text, full radius) + muted caption.
- **Thin bar chart**: 5 tall capsule bars (~50px wide), one filled azure; the others are hatched ghosts with small delta pills floating at their top.
- **Half-donut gauge**: thick (~40px) arc split azure / navy / mint with a pale track; value centered; dot legend below.
- **Big bar chart**: 6 wide slabs with ~32px rounded top corners, navy fill (one azure), each capped by a translucent hatched "ghost" extension above; a white translucent pill inside each bar holds a round delta badge and the month name.
- **Category tabs**: icon + label items; the active one becomes a navy pill with white text and an icon in a white circle.
- **Country list**: 44px round flag, name + muted customer count, a thin 6px progress bar (royal blue on grey), right-aligned percentage.
- **Map callouts**: small white pills with flag and country name pinned on a dotted grey map.
- **Profile request card**: cut-out portrait bleeding off the card edge, frosted bottom panel, azure "Accept" pill, and a QR code.

## Signature details

1. Nested trays: cards sit inside larger, softly darker rounded containers, with big radii (32 to 64px).
2. Hatched ghost tops on bars showing the "potential" or previous value above the solid bar.
3. Month labels living inside the bars as translucent pills with a round delta badge.
4. Large light-weight numerals and titles instead of bold dashboard headings.
5. Azure + navy two-tone data palette, with mint/coral reserved for tiny deltas.
6. A human cut-out portrait card with QR code, breaking the grid of charts.

## Reproduce it

- Tokens: `--bg:#EEEEEE; --tray:#E8E8E8; --card:#FAFAFA; --chip:#F4F4F4; --azure:#408CFC; --blue:#0858F4; --navy:#1B274C; --mint:#5CDC9C; --coral:#E45C74; --text:#0A0A0A; --muted:#A3A3A3`.
- Radii: trays 48 to 64px, cards 28 to 32px, tiles 16px, bars 32px top corners, pills full.
- Hatch: `repeating-linear-gradient(135deg,#F2F2F2 0 10px,#FAFAFA 10px 20px)`.
- Shadows: very soft `0 20px 60px rgba(0,0,0,.06)` on the outer tray only.
- Type: `font-weight:300-400` for all headings and numbers; sizes 60/34/28/18/14.
- Keep the nested trays and the bar treatment. Adapt the category tabs and map to your own dimensions.

## Avoid

- Bold 700 headings and small numbers; the light, large numerals define the look.
- Rainbow chart palettes; stay with azure + navy.
- Hard 1px borders around cards; separation comes from tonal trays.
- Thin default bar charts with gridlines and axes; bars here are chunky slabs without gridlines.
- Using mint and coral beyond small delta badges.
