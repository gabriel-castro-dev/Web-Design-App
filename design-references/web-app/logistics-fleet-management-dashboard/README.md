# Logistics Fleet Management Dashboard (Delivera)

- **Section:** web-app
- **Subtype:** dashboard
- **Kind:** image (static reference, no code)
- **Source:** https://dribbble.com/shots/27210450-Logistics-Fleet-Management-Dashboard
- **Files:** `preview.webp`

## Overall style

A light logistics control room split between a live city map with shipment cards on the left and an analytics grid on the right. The palette is strictly black, white, pale gray and one coral-red (#FD593E) expressed as a tint ramp, so the choropleth map, bar chart and status bar all share one hue. What makes it distinctive are the diagonal hatch patterns in the status bar, the black-outlined selected shipment card and the monochrome-plus-coral discipline across very different data visualizations.

## Layout

- App shell on #F1F3F4 with a white-free top bar (~85px at 1600 wide): logo (coral hexagon mark + "Delivera") left, a centered icon-only nav of 6 buttons (active one is a solid black rounded square with white icon), bell button and a user dropdown card (avatar, name, "Admin") right, both outlined.
- Main area: two halves of roughly equal width.
- **Left half:** a full-bleed map (light basemap with green parks and blue water) with a floating search bar + collapse button and a vertical stack of shipment cards (~355px wide) overlaying the map's left edge; zoom +/- and fullscreen controls float on the map; route drawn as a thin coral line with coral truck marker and black package markers.
- **Right half:** bento grid of white cards: "Status Performance Overview" (full width), "State Distribution Map" (2/3) next to stacked "Total Revenue" and "Total Vehicles" cards (1/3), and "Fulfillment Performance" bar chart (full width).
- ~8px gutters between cards, ~24px card padding. Moderate density.

## Color palette

| Role | Hex | Usage |
| --- | --- | --- |
| Shell background | #F1F3F4 | Behind cards and top bar |
| Card | #FFFFFF | All panels, shipment cards |
| Primary ink | #0D0D0D / #121212 | Titles, big numbers, active nav tile, selected card border, delivered segment |
| Secondary text | #555A58 | Inactive shipment IDs |
| Muted text | #7A7C7D / #898989 | Labels, KPI captions, axis |
| Faint text | #A7ABAC | Addresses and ETA on inactive cards |
| Border | #E4E6E7 (est.) | Dropdown and button outlines |
| Coral accent | #FD593E | Loading segment, route, markers, peak dots, logo |
| Coral strong (map) | #F4755A / #F67C69 | Highest density states |
| Coral mid | #F39180 / #FA9C8E | Mid values, 50% legend |
| Coral light | #FEBDB3 / #FBC9C7 | Lower values |
| Coral pale | #FDE5DE / #FFD6CA | Lowest values, 25% legend |
| Chip bg | #FFF0ED | "In Transit" status chip fill |
| Chip text | #F17E67 | "In Transit" label and truck icon |
| Map water | #5FB5E8 (est.) | Basemap rivers |
| Map parks | #9BF3C4 / #A9EBC7 | Basemap green areas |
| Tooltip | #121212 bg, white text | Chart and map tooltips |

## Typography

- Grotesk with a slightly quirky geometric feel, likely Satoshi or General Sans (Inter as fallback).
- Sizes at 1600 shot: card titles ~16px medium; big KPIs ~24px medium ("$2,542,300", "42,300"); shipment IDs ~19px medium; chip and meta ~13px regular; axis labels ~11px; nav user name ~14px medium.
- Weights: medium for titles and numbers, regular for the rest. No bold, no uppercase.
- Tabular-looking numerals for KPIs and ETAs.

## Components & patterns

- **Icon nav:** 40px rounded-square buttons (~8px radius); active is solid black with a white outline icon, inactive are bare outline icons.
- **Shipment card:** white, ~8px radius, no border when idle; ID bold-ish, "In Transit" chip (coral tint fill, coral text, small truck icon, ~4px radius), outline map icon right, meta row with pin + address and clock + ETA in light gray. **Selected** card gets a 2px black border, darker text, a coral map icon and an expanded footer: a mini route line (gray dot, coral arrowhead, black line, black dot) plus "461mile 500kg 7h 24min" stats.
- **Status bar:** one horizontal bar split into segments with labels above and percents below: solid coral (Loading), coral diagonal hatch (In Transit), solid black (Unloading), black diagonal hatch (Delivered). Separators are thin vertical ticks.
- **Choropleth:** US state map filled with the coral tint ramp; a black tooltip "2,561 shipments" with a pointer.
- **KPI tiles:** gray label, big black number; Total Revenue with a jagged coral sparkline + fading coral area and an end dot; Total Vehicles with a truck photo bleeding off the card's right edge.
- **Bar chart:** dense thin light-gray bars with a coral baseline per day, one highlighted bar in black with a black tooltip ("658"); legend with coral tint squares.
- **Dropdowns:** small outlined buttons "Week ⌄", "Month ⌄" with ~6px radius.
- **Map markers:** black circles with white package glyph, coral circles for active vehicle and destination.

## Signature details

1. Diagonal hatch fills (coral and black) inside a segmented status bar to distinguish in-progress states from completed ones.
2. One coral hue expanded into a 5-step tint ramp that drives the choropleth, legend and chips.
3. Black as a second "accent": active nav tile, selected card outline, highlighted bar, tooltips.
4. Selected shipment card expands with a mini route line and trip stats.
5. Product photo (truck) cropped off the edge of a KPI card, breaking the grid.
6. Shipment list floating over a full-bleed map instead of sitting in a separate sidebar.

## Reproduce it

```css
--shell: #f1f3f4;
--card: #ffffff;
--ink: #0d0d0d;
--text-2: #555a58;
--muted: #85888a;
--faint: #a7abac;
--line: #e4e6e7;
--coral: #fd593e;
--coral-600: #f4755a; --coral-400: #f39180; --coral-300: #febdb3; --coral-100: #fde5de; --coral-50: #fff0ed;
--radius-card: 10px;
--radius-sm: 6px;
--radius-chip: 4px;
```

- Hatch: `background: repeating-linear-gradient(-55deg, var(--coral) 0 3px, #fff 3px 6px)` (use `var(--ink)` for the black variant).
- Selected card: `outline: 2px solid var(--ink)` with the expanded route row.
- Spacing: 8px grid gutters, 24px card padding, 10px between shipment cards.
- Keep: black + coral duo, tint ramps for data, hatch patterns, map-with-floating-list.
- Adapt: the coral can become any warm signal color, but keep a single hue with tints and never add a second chart color.

## Avoid

- Multi-color choropleths or rainbow bar charts.
- Green/red/yellow status chips; every status uses the coral tint or black.
- Dark mode basemaps or satellite imagery; keep the basemap light and desaturated except parks and water.
- Heavy shadows on the floating shipment cards; they sit flat on the map.
- Bold 700 weights; the look relies on medium weights and big sizes.
