# TeddX CRM Dashboard

- **Section:** web-app
- **Subtype:** crm
- **Kind:** image (static reference, no code)
- **Source:** https://dribbble.com/shots/25934267-TeddX-CRM-Web-Application-UI
- **Files:** `preview.webp`

## Overall style

A soft, pastel CRM overview where white rounded cards sit on a misty vertical gradient (warm gray at the top, blush in the middle, periwinkle at the bottom). The data palette is only two candy colors, lavender and mint green, used in a donut, a spline area chart and chunky bar "pills". Top navigation instead of a sidebar and a large friendly "Welcome back" greeting make it feel like a lightweight consumer app more than enterprise software.

## Layout

- App frame with ~40px radius on a flat lavender backdrop (`#9a99db`).
- No sidebar. Top bar: logo left, centered segmented nav (active item is a white rounded rectangle), bell + square avatar right.
- Big greeting headline "Welcome back Sulai..." with waving-hand emoji, ~56px, left aligned.
- Row 1: five equal KPI cards (~290x145), 28px gap.
- Row 2: three cards ~ 25% / 38% / 27% width: donut breakdown, area chart, 4-bar engagement chart.
- Row 3: "Recent Activity" feed (~33%) and "Client Records" table (~60%).
- 60px frame padding, 28px gutters, cards ~34px padding. Medium density.

## Color palette

| Role | Hex | Usage |
|---|---|---|
| Backdrop | `#9a99db` | Behind the frame |
| Frame gradient top | `#e6e4e4` | Warm light gray |
| Frame gradient mid | `#eedada` | Blush band behind row 2 |
| Frame gradient bottom | `#b9c7ea` | Periwinkle bottom edge |
| Surface | `#ffffff` | Cards, active nav tab |
| Text primary | `#1b1b1b` | Numbers, headings, table cells |
| Text secondary | `#5f5f5f` | Card labels ("Total Leads Collected"), column headers |
| Lavender | `#b3a1ff` | Converted leads, area chart, bars |
| Lavender fill | `#f0eefd` | Area chart fade |
| Mint | `#98de9b` | Qualified leads, bars |
| Mint dot / positive | `#5fc35f` / `#2eab3a` | Legend dot, "+2.45%" |
| Negative | `#f06a3c` | "-5%" delta |
| Track / idle | `#f0f4f7` / `#e1ebf1` | Bar background tracks, lost-leads segment |
| Border | `#e4e4e8` | Dropdown outlines |

## Typography

- Neo-grotesk, likely **Inter Display** or **Geist**; **Inter** is a safe match.
- Greeting ~56px regular (not bold), tight tracking (-0.02em).
- KPI numbers 36 to 40px regular with slightly tight tracking; chart headline percentages 36px regular.
- Card titles 20 to 22px regular; labels 17px regular in dark gray; table body 16px; activity descriptions 13px.
- Deltas ("+2.45%", "-5%") small 15px medium, colored, set right after the number.
- Everything is regular weight; hierarchy comes from size, not boldness. Only the active nav label is semibold.

## Components & patterns

- **KPI card:** white, ~28px radius, no border, no visible shadow; label on top, large number below, optional colored delta inline.
- **Top nav:** plain text links; active is a white rounded rect (~10px radius) with semibold label.
- **Donut:** thick ring (~45px) with 3 segments (mint, lavender, pale blue-gray), small gaps between segments, center "92% SOH"; legend on the right with 10px dots.
- **Area chart:** smooth spline in lavender with a lavender-to-white vertical gradient fill, a hover point with a small white tooltip card ("Average Hours 220hrs +3.4%"), axis captions only at the two ends ("Total Hours" / "Active Hours").
- **Bar chart:** 4 fat rounded bars (~18px radius) each on a full-height pale track, alternating lavender/mint, labels below.
- **Dropdown:** outlined "Month" button, ~10px radius, chevron.
- **Activity feed:** 60px rounded-square photos (~14px radius), name + small gray description truncated with ellipsis.
- **Table:** borderless, header in gray regular, 36px round avatars next to names, ~60px row height, no zebra, no dividers.

## Signature details

1. Vertical tri-tone gradient background (warm gray to blush to periwinkle) behind pure white cards.
2. Strict two-color data palette, lavender `#b3a1ff` + mint `#98de9b`, used across all charts.
3. Large numbers and headings in regular weight, giving a calm, editorial feel.
4. Bar charts as chunky pills sitting inside equally rounded pale tracks.
5. Top-centered segmented nav with a white active tab, no sidebar.
6. Chart captions only at extremes instead of full axes.

## Reproduce it

```css
--frame: linear-gradient(180deg,#e6e4e4 0%,#eedada 55%,#b9c7ea 100%);
--surface: #fff; --text: #1b1b1b; --text-2: #5f5f5f;
--lavender: #b3a1ff; --mint: #98de9b; --track: #f0f4f7;
--pos: #2eab3a; --neg: #f06a3c;
--r-frame: 40px; --r-card: 28px; --r-bar: 18px; --r-ctl: 10px;
--shadow: none;
font-family: "Inter", "Geist", system-ui; font-weight: 400;
```

- Spacing: 28px gutters, 32 to 36px card padding, 8px scale.
- Keep: the gradient backdrop, two-color charts, regular-weight numerals, borderless tables.
- Adapt: rotate the gradient hues to your brand, but keep them desaturated so white cards pop.

## Avoid

- Bold KPI numbers or bold headings; it becomes a generic admin template.
- Adding a third or fourth chart color.
- Borders and drop shadows on the cards.
- Table gridlines or zebra striping.
- A dark sidebar; the top nav is part of the airy feel.
