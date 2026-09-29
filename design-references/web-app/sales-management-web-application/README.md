# ProSale Sales Management Dashboard

- **Section:** web-app
- **Subtype:** dashboard
- **Kind:** image (static reference, no code)
- **Source:** https://dribbble.com/shots/25068157-Sales-Management-Web-Application
- **Files:** `preview.webp`

## Overall style

A light-grey sales overview whose personality comes from its palette: deep petrol navy paired with a fresh lime-to-mint gradient family. The hero card shows a pipeline as a four-stage "funnel" of soft-edged gradient areas (sky, navy, mint, lime) that step down in height, which is far more memorable than a standard funnel chart. Everything else is quiet white cards on `#F4F4F4`.

## Layout

- Floating app frame (radius ~28px) on a pale blue-grey backdrop.
- Left sidebar (~300px) on the same grey as the canvas, no divider: logo, "MENU" and "ORDER" groups, and an "Upgrade plans" card pinned to the bottom.
- Top row: page title "Sales Overview" (~30px) left; search field, calendar and bell icon buttons, a vertical divider, then avatar + name + email + chevron.
- Main grid: left 2/3 column holds 3 small KPI cards (Products, Customers, Orders), the large Sales card with the stage funnel, and a Top Selling Product table. Right 1/3 column stacks Visitor line chart, Weekly Revenue bar chart, and Leads by Industry list.
- Gaps ~24px, card padding ~24px.

## Color palette

| Role | Hex | Usage |
| --- | --- | --- |
| Stage | `#D4D8E0` | Backdrop |
| Canvas | `#F4F4F4` | App and sidebar background |
| Surface | `#FFFFFF` | Cards |
| Primary navy | `#10488C` | Active nav (gradient to `#0B5E96`), Upgrade/See More buttons, visitor line, "Proposal" stage |
| Navy deep | `#063A6E` | Button gradient end, logo |
| Sky | `#BCD8F8` | "Lead" stage area |
| Mint | `#A0ECC4` | "Sales" stage area (fades to `#9EDAE4`) |
| Lime | `#CCF490` | "Contract sent" stage, highlighted weekly bar, visitor secondary line |
| Bar idle | `#F4F4F4` | Unselected weekly bars |
| Positive | `#20BB2E` | KPI up-deltas, "+12%" outlined chip |
| Negative | `#E0201A` | KPI down-delta |
| Warning chip | `#FCF4EC` bg / `#C75C05` text | "Low Stock" |
| Teal chip | `#E8FCFC` bg / `#0C6450` text | "Published", "15 Product" |
| Text | `#0A0A0A` | Figures, titles |
| Muted | `#6F6F6F` | Labels, "Deals", axis ticks |

## Typography

- Clean grotesk, likely **Inter / SF Pro Display** with tight numerals.
- Hero figure "$94,127" ~48px semibold, tracking -0.03em; stage values ~34px medium; KPI values ~28px medium; card titles ~22px regular; body 16-18px; table 14px.
- Group labels "MENU", "ORDER" uppercase 16px muted, regular weight.
- Numbers are the typographic heroes; titles stay regular weight.

## Components & patterns

- **Active nav item:** full-width pill (radius 10px) with a navy gradient and white text + icon; inactive items are plain outline icon + label.
- **KPI cards:** icon + label + chevron link on top; number left, small delta with a tiny icon on the right in green/red.
- **Stage funnel:** four columns separated by 1px vertical lines, each with label, value, "N Deals", and below a gradient area whose top edge is a smooth S-curve stepping down to the next stage's height. Fills: vertical gradients (light to slightly deeper) within each stage.
- **Card toolbars:** grouped icon buttons (expand, edit, more) inside a single bordered pill.
- **Visitor chart:** two polylines (navy, lime) with filled/hollow circular markers, vertical tick lines, a floating white chip "+12%" with a lime icon, and a pill-outlined selected x-label ("17-21").
- **Weekly Revenue bars:** rounded tall bars in pale grey with the active day in a lime gradient and a white tooltip card showing "$20,989" in navy.
- **Leads list:** name, sessions, and an outlined pill percentage on the right, rows separated by hairlines.
- **Table:** sortable headers with carets, product thumbnail + name + SKU, status as tinted text chips.
- **Upgrade card:** white card with a warm pale gradient corner, lightbulb icon, three-line copy, navy gradient button.

## Signature details

1. The pipeline "stair" of four gradient areas with curved transitions: sky, navy, mint, lime.
2. Navy + lime pairing, which feels fresh and financial at once, with lime reserved for "current/highlight".
3. Only one bar coloured in the bar chart; the rest are near-invisible grey placeholders.
4. Small-area colour for status (tinted text chips) so the big gradients dominate.
5. Sidebar and canvas share the same grey, so white cards feel like the only real objects.

## Reproduce it

```css
--canvas: #F4F4F4; --surface: #FFFFFF; --line: #ECECEC;
--navy: #10488C; --navy-deep: #063A6E; --sky: #BCD8F8; --mint: #A0ECC4; --lime: #CCF490;
--pos: #20BB2E; --neg: #E0201A; --text: #0A0A0A; --muted: #6F6F6F;
--radius-frame: 28px; --radius-card: 20px; --radius-btn: 10px;
--nav-active: linear-gradient(90deg, #063A6E, #0B5E96);
.stage-area { clip-path: path(...); background: linear-gradient(180deg, var(--c1), var(--c2)); }
```

- Build the stage areas as SVG paths: each column starts at the previous column's height and eases (cubic) down to its own.
- Keep: only four data colours, lime as the single highlight.
- Adapt: stage labels and counts, but keep the stepped-down silhouette.

## Avoid

- A classic triangular funnel or stacked bar; the soft stepped areas are the identity.
- Colouring all bars in the bar chart.
- Adding shadows to cards; they are flat white on grey.
- Swapping navy for a generic bright blue, which loses the premium tone.
