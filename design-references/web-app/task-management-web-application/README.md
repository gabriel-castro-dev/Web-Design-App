# Task Management Calendar

- **Section:** web-app
- **Subtype:** calendar
- **Kind:** image (static reference, no code)
- **Source:** https://dribbble.com/shots/10813628-Task-Management-Web-Application
- **Files:** `preview.webp`

## Overall style

An airy 2020-era task manager centered on a month calendar whose day cells are tinted by workload status (pastel blue, yellow, mint, blush). The chrome is almost invisible: white panels with 1px lavender-gray outlines, a thin icon rail and an indigo accent used sparingly. The one elevated element is an event popover with a large soft shadow, which gives the flat page a clear focal point.

## Layout

- App frame with ~40px top-left radius on a pale gray-blue backdrop (`#cdd3d8`) with faint large circles.
- Three zones: ~150px icon rail (logo tile at top, 4 nav icons, globe/settings/avatar at bottom, a vertical divider with a 3px indigo marker beside the active icon), a main column (~970px) and a right "Projects" panel (~280px, `#f5f7fb`) that bleeds off the right edge.
- Main column stacks two outlined cards: the month calendar (7 columns, ~120x90px cells with 10px gaps) and "Team Members" (underline tabs, search field, 2-column member cards).
- Right panel: day header ("WEDNESDAY" small caps label) then a list of rows separated by full-width hairlines, each with a 56px tinted icon tile + title + muted date.
- Low density, big whitespace, 36px card padding.

## Color palette

| Role | Hex | Usage |
|---|---|---|
| Backdrop | `#cdd3d8` | Outside the app frame |
| Surface | `#ffffff` | Main area, cards |
| Side panel | `#f5f7fb` | Projects list panel |
| Border | `#e9e9f3` | Card outlines, dividers, header rule |
| Empty day cell | `#f9fbfc` | Default calendar cell |
| Text primary | `#2c2d4a` | Month title, names, list titles |
| Text muted | `#a7a4bf` | Weekday labels, dates, counts, idle day numbers |
| Accent indigo | `#5a5ff5` | Share button, active tab underline, rail marker, links |
| Blue tint / text | `#e3f0f8` / `#5b8ff0` | "3 tasks" day, calendar icon tiles |
| Yellow tint / text | `#fdf9e6` / `#f2c418` | "12 tasks" day, clipboard tiles |
| Mint tint / text | `#e4f5ed` / `#2fbf86` | "1 Task" day, chart tiles |
| Blush tint | `#fdf0ed` | Weekend / overdue days, red clipboard tiles (`#f69a95`) |
| Status dot | `#f0333a` / `#39c96b` | Notification dot, online dot on avatar |

## Typography

- Neutral grotesk, likely **Roboto** or **Inter** at regular/medium weights.
- Month title ~20px medium; card section titles ~20px regular in muted lavender ("Team Members", "Projects"); list titles 17px medium; day numbers 20px regular; meta 14px.
- Weekday headers and the "WEDNESDAY" label: 13px uppercase, letter-spacing ~0.12em, muted.
- Popover day number is a thin 44px numeral (light weight) above a tiny "WED" label.

## Components & patterns

- **Calendar cells:** 6px radius, no border, filled with a pastel tint that encodes load; day number top-left, task count bottom-left in the saturated version of the same hue.
- **Event popover:** white, ~6px radius, shadow ~`0 20px 60px rgba(40,45,90,.12)`, left date block split by a vertical rule, title 20px medium, muted meta line, overlapping 32px avatars with white rings, and a segmented RSVP control (Going / Maybe / Can't Go) with outlined segments and line icons, plus a solid indigo "Share" button with an up/down chevron.
- **Tabs:** text tabs with counts in parentheses, active one dark with a 3px indigo underline on a full-width hairline.
- **Search:** light gray filled field, 6px radius, magnifier icon.
- **Member cards:** outlined, 6px radius, 72px round photo, name + muted "3 Tasks", horizontal "..." menu.
- **Icon tiles (right panel):** 56px rounded squares (~12px radius), pastel fill with a white glyph inside a solid colored rounded badge.
- **Rail icons:** 22px solid glyphs in pale lavender, active in indigo; logo in a white tile with a soft shadow.

## Signature details

1. Workload encoded as whole-cell pastel tint, with the count text in the saturated sibling color.
2. Only one shadowed element on the page (the popover), everything else is outline-only.
3. Segmented RSVP button group with line glyphs (check / question / x) paired with a split "Share" button.
4. Thin, large day numeral in the popover date block, separated by a vertical rule.
5. Right panel list with full-bleed hairline separators and pastel icon tiles in four hues matching the calendar.
6. 3px indigo active-marker drawn on the rail's divider line rather than on the icon.

## Reproduce it

```css
--bg: #ffffff; --panel: #f5f7fb; --border: #e9e9f3; --cell: #f9fbfc;
--text: #2c2d4a; --muted: #a7a4bf; --accent: #5a5ff5;
--tint-blue: #e3f0f8; --tint-yellow: #fdf9e6; --tint-mint: #e4f5ed; --tint-blush: #fdf0ed;
--r-cell: 6px; --r-card: 8px; --r-tile: 12px;
--shadow-pop: 0 20px 60px rgba(40,45,90,.12);
font-family: "Inter", "Roboto", system-ui;
```

- Spacing: 8px base; cell gap 10px; card padding 32 to 36px; list rows 104px tall.
- Buttons 44px tall, 4 to 6px radius (not pills).
- Keep: tint-encoded cells, outline-only cards, one floating popover.
- Adapt: drive tint by real status (on track / busy / overdue) and keep weekend blush optional.

## Avoid

- Saturated fills on calendar cells; the tints must stay around 5 to 8% chroma.
- Shadows on cards or cells, which kills the popover's emphasis.
- Pill-shaped buttons; this system is small-radius.
- Using more than one accent hue for interactive elements (indigo only; pastels are status, not actions).
- Heavy bold headings; titles are regular/medium.
