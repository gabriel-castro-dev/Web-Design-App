# Spendly Business Payments Dashboard

- **Section:** web-app
- **Subtype:** payments
- **Kind:** image (static reference, no code)
- **Source:** https://dribbble.com/shots/25270785-SaaS-Dashboard-for-Business-Payments-Web-Application
- **Files:** `preview.webp`

## Overall style

A crisp, cobalt-blue finance dashboard shown at a large zoom so its craft is visible: white bordered cards, big tabular money figures, pill delta badges and a cobalt/teal line chart. It is conventional in structure but distinctive in two details: a radial "tick" gauge made of many short blue bars, and a blue gradient banner that fades out to the right.

## Layout

- Browser mockup, cropped on the right and bottom (the design is presented oversized).
- Left sidebar (~500px at this zoom, roughly 260px at 1x) on `#F8F8F8`: logo tile + wordmark + collapse icon, a grey search field with a ⌘F hint, then grouped nav (MENU / ACCOUNT / SUPPORT headings in uppercase with kebabs). Active item is a pale blue pill with a 4px cobalt bar on the left edge; counts right-aligned.
- Main area on white, separated from the sidebar by a rounded inner container: breadcrumb, H1 "Welcome back, Christina", right-aligned month picker, Share button and user chip.
- Full-width info banner, then a 4-up KPI row, then a 2/3 + 1/3 row (Cash Flow line chart, Financial Balance gauge), then a 1/2 + 1/2 row (Recent Transactions table, Tax Liabilities stacked bar).

## Color palette

| Role | Hex | Usage |
| --- | --- | --- |
| Stage | `#E4E8F0` | Backdrop |
| Sidebar | `#F8F8F8` | Sidebar background |
| Surface | `#FFFFFF` | Main area, cards |
| Border | `#ECECEC` | Card and button outlines |
| Input fill | `#F0F0F4` | Search fields, table header |
| Primary cobalt | `#2048DC` | Logo, active nav text/bar, expense line, gauge ticks, VAT bar, info icon |
| Active nav fill | `#E8ECF8` | Selected sidebar item |
| Banner gradient | `#F0F4FC` to `#C8D4FC` | Info banner, left to right |
| Secondary blue | `#A0B4FC` | Second stacked-bar segment, "Profit today" legend |
| Tertiary blue | `#ECF0FC` | Third stacked segment |
| Teal | `#3BA583` | Income line |
| Success | `#4DB444` on `#F0F8F0` | Positive delta pill, "Paid" status |
| Danger | `#B93330` on `#F8E8E8` | Negative delta pill |
| Text | `#111111` | Values, headings |
| Muted | `#6B6B6B` | "vs last month", axis labels |

## Typography

- Neutral grotesk with slightly condensed numerals, likely **Inter Display / SF Pro / Geist**.
- H1 ~36px medium; KPI values ~48px semibold with tight tracking (-0.02em); card titles ~20px medium; body 18px; axis labels 16px muted (all at this 2x-ish zoom; halve for 1x).
- Numbers use European formatting ("$16.745,00", "+1,3%").
- Sidebar group labels uppercase 16px regular, no bold, small tracking.

## Components & patterns

- **Cards:** white, 1px `#ECECEC` border, 16px radius, no shadow; title row with an outline "i" info icon and a square bordered kebab button on the right.
- **KPI cards:** label + info icon, big figure, then a delta pill (rounded 8px, tinted bg, coloured text) and "vs last month".
- **Line chart:** two stepped-angular lines (teal income, cobalt expense), 2px strokes, faint horizontal gridlines, a vertical dashed hover line with a soft blue column highlight, dot markers and a white tooltip card (8px radius, border) listing coloured square legend + values.
- **Radial tick gauge:** a semicircle built from ~40 short thick radial bars in cobalt fading to light grey, centred "48%" figure, subtitle, outlined "Detail" button.
- **Stacked horizontal bar:** tall (60px) segmented bar in three blue tints with legends below.
- **Table:** search + Filter button above, grey header row with uppercase column labels, checkboxes, green outlined "Paid" chip, horizontal "..." action.
- **Buttons:** white with 1px border and 10px radius; dropdowns with chevrons.
- **Icons:** outline, 1.5px, rounded (Iconsax / Phosphor style).

## Signature details

1. Radial gauge made of discrete tick bars instead of a smooth arc.
2. Info banner with a white-to-periwinkle horizontal gradient and a blue info dot.
3. Square bordered kebab buttons in every card header, echoing the rigid grid.
4. Active nav: pale blue pill plus a cobalt bar hanging off the left edge of the sidebar.
5. Monochromatic blue data palette (three blue tints) for stacked comparisons, with teal only as the "income" counterpoint.

## Reproduce it

```css
--bg: #FFFFFF; --sidebar: #F8F8F8; --line: #ECECEC; --field: #F0F0F4;
--primary: #2048DC; --primary-50: #E8ECF8; --primary-300: #A0B4FC; --primary-100: #ECF0FC;
--teal: #3BA583; --success: #4DB444; --success-bg: #F0F8F0; --danger: #B93330; --danger-bg: #F8E8E8;
--text: #111111; --muted: #6B6B6B;
--radius-card: 16px; --radius-btn: 10px; --radius-pill: 8px;
--kpi: 600 32px/1.1 "Inter Display"; letter-spacing: -0.02em;
```

- At 1x: sidebar 260px, KPI value 28-32px, card padding 20px, grid gap 16px.
- Gauge: render as SVG with `n` rotated rects; colour by index `< value ? primary : #E0E0E0`.
- Keep: borders instead of shadows, blue-tint data palette.

## Avoid

- Rainbow chart colours; stay in the blue family plus one teal.
- Smooth bezier curves; the lines here are angular with flat plateaus.
- Drop shadows on cards; separation is only a hairline border.
- Filling the sidebar with a brand colour; it stays pale grey.
