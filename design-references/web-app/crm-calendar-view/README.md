# CRM Calendar Month View

- **Section**: web-app
- **Subtype**: calendar
- **Kind:** image (static reference, no code)
- **Source:** https://dribbble.com/shots/18853183-CRM-Calendar-view
- **Files:** `preview.webp`

## Overall style

A clean, neutral CRM month calendar shown inside a Safari-like browser window. It is almost entirely white with hairline grey grid lines, a single violet accent for the active nav item, the current day and links, and soft pastel event chips (mint, lilac, peach, sky) as the only color. Out-of-month days use a subtle diagonal hatch pattern, and a right rail combines a mini calendar with an activity feed and a donut chart.

## Layout

- Browser chrome: traffic-light dots, sidebar/back/forward icons, a centered grey URL pill, share/new-tab icons.
- Left sidebar (~15% width): blurred logo, 8 nav items with outline icons (~52px row height); the active "Calendar" row is highlighted and has a `+` at the right.
- Top bar: search input (~315px) at left; dropdown menus (Sales, Reporting, Configuration) and chat/bell icons with count badges at right.
- Page header: breadcrumb (home > Dashboard > Calendar, current in violet), H1 "Calendar", and three outlined buttons at right (Event v, Select dates, Favorites).
- Calendar card with a 1px border: toolbar row (Today button, `<-` April, 2022 `->` centered, Day/Week/Month/Year segmented control), then a 7-column month grid (~73% of card width) and a right rail (~27%) separated by a vertical line.
- Right rail: mini month calendar with arrows, a divider, "Activity" feed of comments with avatars and a nested donut chart card, connected by a thin vertical timeline line.

## Color palette

| Role | Hex | Usage |
|---|---|---|
| Backdrop | `#F6F5FA` | Presentation background |
| Surface | `#FFFFFF` | Window, calendar, cells |
| Grid lines | `#F0F0F0` | Cell borders, dividers |
| Hatched cell | `#F9F9F9` + `#F0F0F0` stripes | Days outside the month |
| URL bar | `#F2F2F2` | Browser address pill |
| Active nav | `#F8F4FC` bg, `#64519C` text | Selected sidebar row |
| Accent violet | `#7C54DA` | Today circle, mini-calendar selection, links |
| Badge | `#585CC8` | Notification count bubbles |
| Text | `#101420` | Headings, day numbers |
| Muted text | `#65676B` | Breadcrumb, meta, captions |
| Chip mint | bg `#E0F4EA`, text `#0E8554` | Events |
| Chip lilac | bg `#F0E8FC`, text `#6C5BA5` | Events |
| Chip peach | bg `#FCE8DA`, text `#B56829` | Events |
| Chip sky | bg `#E0F0FA`, text `#2771A1` | Events |
| Chip periwinkle | bg `#E8E8FA`, text `#4C4997` | Events |
| Donut series | `#7C54DA`, `#F08CB0`, `#4F9ECA` | Stretching / Crossfit / Yoga |

## Typography

- Neo-grotesk, likely **Inter** (tabular numbers, straight-sided "t").
- H1 ~28px/600; month title ~24px/500; weekday headers ~16px/500; day numbers ~18px/400 right-aligned in cells.
- Nav, buttons, dropdowns ~16px/400 to 500. Event chips ~14px/500 in the darker tint of their color. Activity names ~16px/600, meta ~12px/400 muted, timestamps ~12px with a leading dot.
- Sentence case, default tracking.

## Components & patterns

- **Sidebar item**: 22px outline icon + label; active row has a pale lavender fill, 6px radius, violet icon and text, and a `+` action.
- **Outlined buttons**: white, 1px `#E4E4E8` border, 6px radius, ~40px tall, leading outline icon, optional chevron.
- **Segmented control**: 4 equal segments in one bordered group, 6px outer radius; active segment has a light grey fill and darker text.
- **Arrow buttons**: 28px square chips with a 1px border and a thin arrow.
- **Month cell**: ~140px square, number top-right, events stacked below as full-width chips (4px radius, pale fill, colored text, no border). Out-of-month cells use a 45 degree hatch.
- **Today marker**: 40px filled violet circle with a white number.
- **Mini calendar**: 13px numbers in a tight grid; neighbouring-month days pale grey; selected day as a 30px violet circle.
- **Activity item**: 36px avatar, bold name, dot + time right-aligned, a muted "Shared file to **Distrubutor Contract**" line with a violet link. A nested card holds a donut ring (thin 4px strokes in three colors) with "69% Total" in the center and a dot legend.
- **Notification badges**: 16px violet-blue circles with white numbers overlapping the icon's top-right.

## Signature details

1. Diagonal hatch fill for days outside the current month, which reads as "disabled" without extra grey blocks.
2. Pastel event chips with same-hue dark text, each event a different soft color.
3. Month grid and right rail (mini calendar + activity) share one bordered card.
4. Violet used only for "you are here": active nav, today, selected date, links.
5. Activity feed with a thin connecting line and an embedded mini chart card.

## Reproduce it

- Tokens: `--bg:#F6F5FA; --surface:#FFF; --line:#F0F0F0; --line-strong:#E4E4E8; --accent:#7C54DA; --accent-soft:#F8F4FC; --text:#101420; --muted:#65676B`.
- Chips: `padding:4px 8px; border-radius:4px; font:500 14px/1.2 Inter;` with the tint pairs from the palette table.
- Hatch: `background: repeating-linear-gradient(135deg,#F9F9F9 0 6px,#F2F2F2 6px 7px)`.
- Radii: buttons 6px, card 8px, chips 4px, today/avatars full.
- Grid: `grid-template-columns: repeat(7, 1fr)`, cell min-height 140px at 1920 (~96px at 1x), numbers right-aligned with 12px padding.
- Keep: neutral chrome + pastel data. Adapt the chip color mapping to event types or owners.

## Avoid

- Saturated solid event bars (Google Calendar blue blocks); chips must stay pale.
- Grey-filled out-of-month days; use the hatch.
- Shadows on the calendar card or cells.
- Multiple accent colors in chrome; violet is the only chrome accent.
- Center-aligned day numbers; they sit top-right.
