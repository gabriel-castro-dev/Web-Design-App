# Tasko II Task Management Dashboard

- **Section:** web-app
- **Subtype:** tasks
- **Kind:** image (static reference, no code)
- **Source:** https://dribbble.com/shots/15815965-Tasko-ll-Task-Management-Web-Application
- **Files:** `preview.webp`

## Overall style

A clean, cheerful project/task dashboard: white cards floating on an ice-blue canvas, with each KPI owning its own color (amber, sky, leaf green) and a mint area chart as the hero. Surfaces are nearly borderless and separated by very soft, wide shadows, so the page feels light and "glassy" rather than boxed. Colorful 3D-ish folder icons and a green donut card breaking out of the frame add a playful, presentation-shot flavor.

## Layout

- App frame (square corners) on a periwinkle-to-ice gradient backdrop (`#eef1fc` top to `#ced6f6` bottom).
- Top bar full width, white: logo + collapse toggle, page title "Dashboard" (~30px semibold), gray filled search, then square blue "+" button, two gray icon squares, avatar + name/role + caret.
- Left sidebar ~265px white, plain icon + label list with ~86px row pitch; active row has a pale blue fill across the full width and a 4px blue bar on the right edge.
- Content on `#f6fafd`: "Project Overview" heading, a row of 3 KPI cards (~310x160) plus a tall "Today's Task" list card on the right (~310px wide) spanning two rows.
- Second row: wide "Performance Overview" area chart card (~1000px).
- Bottom row: "Upcoming Meetings" (two nested meeting cards), "Recent Messages" list, and an "Overall Statistics" donut card that overflows the frame bottom-right.
- Comfortable density; 24px gutters, 20 to 24px card padding.

## Color palette

| Role | Hex | Usage |
|---|---|---|
| Backdrop gradient | `#eef1fc` → `#ced6f6` | Behind the frame |
| Canvas | `#f6fafd` | Content area, search field fill |
| Surface | `#ffffff` | Cards, sidebar, top bar |
| Active nav fill | `#e7f2ff` | Selected sidebar row |
| Primary blue | `#5b76f5` | "+" button, active nav text/bar, "See All", "+8 more", unread badges (`#506de9`) |
| Text primary | `#1c1b2c` | Headings, numbers, names |
| Text muted | `#8e929b` | Sublabels, nav idle, axis labels |
| KPI amber | `#ffcd12` → `#ff9006` | New Task icon + progress |
| KPI sky | `#58c3eb` / `#51c4f0` | Pending Task icon + progress |
| KPI green | `#84be59` → `#a2cf41` | Complete Task icon + progress |
| Chart mint | `#3eddb6` line, `#dffbf4` fill | Area chart |
| Donut green | `#5eac53` / `#b5ebab` | Overall statistics ring |
| Status completed | `#3a63e6` | Text-only status |
| Status in progress | `#f0423f` | Text-only status |
| Status in review | `#25b35a` | Text-only status |
| Tooltip | `#1c192c` | Dark chart tooltip |

## Typography

- Humanist/neo-grotesk, likely **Circular** or **Gilroy**-like; **Inter** or **DM Sans** are close free substitutes.
- Page title 30px semibold; section titles ("Project Overview", "Performance Overview") 24 to 26px semibold; KPI numbers 24px semibold; list titles 18px medium; meta 14px regular muted; status 14px medium colored.
- Sentence/title case, no uppercase labels, normal tracking.

## Components & patterns

- **KPI card:** 56px rounded-square tinted icon tile with a glossy folder illustration, big number + label, "..." kebab top-right, a slider-style progress bar (6px track in pale tint, gradient fill, 18px ring knob at the progress end) and "Task Done: 40/80" caption.
- **Area chart:** smooth spline, 3px mint stroke, vertical mint-to-transparent fill, dashed vertical cursor line with a ringed point, dark rounded tooltip with a left caret; month axis in muted text; dashed faint horizontal gridlines.
- **Dropdown:** outlined "Monthly" select with filled caret, ~6px radius.
- **Today's Task list:** rows divided by hairlines, title + muted category left, colored status text right (no pill backgrounds).
- **Meeting cards:** nested outlined cards with title, muted subtitle, clock/calendar mini icons, "Attendence" label and overlapping 32px avatars + blue "+8 more".
- **Messages:** 56px round photos, name + muted preview, 32px solid blue circle unread count.
- **Donut:** thick 30px ring with two green shades, rounded caps, small white dots at segment ends, "55% Task Done" centered in a soft inner circle.
- **Top bar buttons:** 48px rounded squares (~6px radius); primary solid blue, others light gray with dark glyphs and a red notification dot.

## Signature details

1. Slider-style progress bars with a ring knob, colored per KPI with a warm-to-cool gradient fill.
2. Per-metric color identity (amber / sky / green) carried from icon tile into its progress bar.
3. Status shown as colored text only, right-aligned, no chips.
4. Mint spline area chart with a dashed cursor and near-black tooltip as the single dark element.
5. The donut card deliberately overflowing the app frame edge with a large soft shadow.
6. Almost no borders: cards separate from the `#f6fafd` canvas through tone and a very diffuse shadow.

## Reproduce it

```css
--canvas: #f6fafd; --surface: #fff; --text: #1c1b2c; --muted: #8e929b;
--primary: #5b76f5; --nav-active: #e7f2ff;
--kpi-amber: linear-gradient(90deg,#ff9006,#ffcd12);
--kpi-sky: linear-gradient(90deg,#2aa7e8,#58c3eb);
--kpi-green: linear-gradient(90deg,#49a25a,#a2cf41);
--chart: #3eddb6;
--r-card: 8px; --r-btn: 6px; --r-tile: 12px;
--shadow-card: 0 10px 40px rgba(90,110,180,.08);
font-family: "DM Sans", "Inter", system-ui;
```

- Spacing 8px grid; gutters 24px; KPI card padding 16 to 20px.
- Keep: colored KPI identity, spline area chart with gradient fill, text-only statuses.
- Adapt: swap folder 3D icons for your own illustrated set but keep them glossy and colorful.

## Avoid

- Adding borders around every card; use tone + soft shadow.
- Pill chips for statuses; colored text is the lighter choice here.
- Making all KPIs the same blue; the three-hue identity is the point.
- Hard black tooltips everywhere; only the chart tooltip is dark.
- Dense tables; the layout breathes with big row heights.
