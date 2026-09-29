# HR Dashboard (TalentaSync)

- **Section:** web-app
- **Subtype:** dashboard
- **Kind:** image (static reference, no code)
- **Source:** https://i.pinimg.com/originals/de/e0/fd/dee0fd83ee6c224468ee15ffb8086c0a.jpg
- **Files:** `preview.webp`

## Overall style

An HR overview dashboard with a deep forest-green (#074E49) header band that flows behind the first row of KPI cards, then gives way to a warm cream (#FEF9ED) body. White rounded cards sit on top of both zones, so the KPI row straddles the color boundary. The palette is a monochrome green ramp with one mustard-yellow for negative deltas, and data is shown with a segmented bar and a dot-matrix attendance heatmap, giving it an organic, calm-corporate feel.

## Layout

- **Header band (~230px of a 1024 frame):** top nav on green with logo (layered green parallelogram mark + "TalentaSync" in white), a pill nav (Dashboard active as a lighter green pill with icon; Employees, Jobs, Candidates, Leaves as icon + text), round settings and bell buttons, avatar + name + role. Below it a greeting ("Good Morning," small, "Kennedy Jones" large, white) on the left, and a year selector pill (outlined, calendar icon, chevron) + white "Export Data" pill on the right.
- **KPI row:** 5 equal cards (~158x105) overlapping the band edge: 4 metric cards and an "Add new widget" card.
- **Middle row:** 3 cards: Active Jobs list (~215px), Upcoming Interviews list (~305px), Employment Status (~285px).
- **Bottom row (cropped):** Average Team KPI (wide) and Attendance Overview heatmap.
- ~10px gutters between cards; cards have ~14px padding; the whole thing is compact but not cramped.

## Color palette

| Role | Hex | Usage |
| --- | --- | --- |
| Header band | #074E49 | Top nav and greeting zone |
| Nav active pill | #2D625E | Dashboard pill on the green band |
| Nav inactive text | #81ADAC / #93C3C3 | Nav items and icons on green |
| Greeting small | #AFEBE7 | "Good Morning," |
| Body background | #FEF9ED | Warm cream under the cards |
| Card | #FFFFFF | All cards |
| Icon tile | #E8F0EF (est.) | Pale green-gray squares behind KPI icons |
| Primary ink | #0F1415 / #000000 | KPI numbers, card titles |
| Body text | #373737 / #535353 | Labels, subtitles |
| Muted | #9FA8A7 | Secondary lines ("On-Site", roles) |
| Positive chip | #346B61 bg, white text | "+3.72%" delta |
| Negative chip | #E6C671 bg, #3A2F10 text | "-1.72%" delta |
| Green ramp 1 | #064D4C | Status bar segment, heatmap strongest |
| Green ramp 2 | #2D6C67 | Second segment |
| Green ramp 3 | #599189 | Third segment |
| Green ramp 4 | #8EB4B5 | Fourth segment |
| Green ramp 5 | #C6D8D6 | Lightest segment, heatmap weak cells |
| Heatmap empty | #F4F6F6 (est.) | Empty dots |
| Date chip | #E8F0EE (est.) | Interview date pill background |
| Outer canvas | #E1F6E1 | Mint presentation background only |

## Typography

- Geometric grotesk, likely Plus Jakarta Sans (Manrope fallback).
- Sizes at 1024 frame: name ~24px medium white; KPI numbers ~22px medium; card titles ~15px medium; big counts ("24 Jobs") ~20px number + 15px unit; list titles ~11px medium; list sub ~10px regular gray; chips ~8 to 9px semibold. For a 1440 build multiply by ~1.4.
- Weights: medium (500) for numbers and titles, regular for everything else. Title case labels.
- Numbers use plain lining figures, comma thousands separator, European "89,06%" decimal comma.

## Components & patterns

- **KPI card:** white, ~12px radius, 36px rounded-square icon tile top-left with a small filled green glyph, a 30px circular outlined arrow button (↗) top-right, big number with a delta chip beside it, gray label below.
- **Delta chips:** tiny fully rounded pills, dark green for positive, mustard for negative, with +/- prefix.
- **Add widget card:** centered 36px dark green circle icon with a "+" style glyph and "Add new widget" label.
- **Pill nav:** items are icon + label; active item gets a lighter green pill fill. Utility buttons are 34px circles in a lighter green.
- **Export button:** white fully rounded pill with dark text; year picker is an outlined pill on the green.
- **List rows:** 32px logo tile or avatar, title + gray subtitle, hairline dividers; arrow buttons (← →) as outlined circles for pagination.
- **Interview date pill:** pale green-gray fully rounded chip with small dark text.
- **Segmented bar:** 5 rounded rectangles with 3px gaps, widths proportional to value, in the green ramp, above a legend list (colored dot, label, right-aligned value, hairline separators).
- **Dot-matrix heatmap:** grid of ~8px rounded squares in the green ramp, most cells near-empty.
- **Card menus:** "•••" in the top-right of each card title row.

## Signature details

1. The two-tone page: dark green header band with the KPI row overlapping into a warm cream body.
2. A single-hue green ramp (5 steps) used for every chart, instead of a rainbow palette.
3. Mustard-yellow negative delta chip as the only warm accent against the greens.
4. Segmented horizontal bar for employment status with rounded gapped segments.
5. Dot-matrix attendance heatmap with rounded-square cells.
6. Circular outlined arrow buttons on every KPI card, hinting at drill-down.

## Reproduce it

```css
--band: #074e49;
--band-pill: #2d625e;
--band-text: #93c3c3;
--cream: #fef9ed;
--card: #ffffff;
--ink: #0f1415;
--body: #444444;
--muted: #9fa8a7;
--line: #eef0ef;
--g1: #064d4c; --g2: #2d6c67; --g3: #599189; --g4: #8eb4b5; --g5: #c6d8d6;
--pos: #346b61;
--neg: #e6c671;
--radius-card: 14px;
--radius-tile: 8px;
--radius-pill: 9999px;
```

- Band: `background: linear-gradient(var(--band) 0 330px, var(--cream) 330px)` so the KPI row sits half on each.
- Spacing: 14px gutters, 20px card padding at 1440, 12px between list rows.
- Type: `text-3xl font-medium` KPI numbers, `text-lg font-medium` card titles, `text-sm text-[--muted]` secondary.
- Keep: band + cream split, green ramp charts, mustard negative chips, arrow buttons.
- Adapt: the brand green can shift (teal, pine) but keep one hue with 5 tints; cream can be a warm off-white.

## Avoid

- Multi-color chart palettes; every data viz stays in the green ramp.
- Red/green delta chips; negative uses mustard, not red.
- Card shadows heavier than a faint 1px blur; cards read against cream and green by value.
- Pure white page body; the cream warmth is essential.
- Making the header band a gradient or adding patterns to it.
