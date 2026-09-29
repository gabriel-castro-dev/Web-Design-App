# Kanban View for Tasks Web Application

- **Section:** web-app
- **Subtype:** tasks
- **Kind:** image (static reference, no code)
- **Source:** https://dribbble.com/shots/3827571-Kanban-View-for-Tasks-Web-Application
- **Files:** `preview.webp`

## Overall style

A crisp, circa-2017 flat kanban board: pale gray canvas, white square-ish cards with hairline borders, a narrow deep-navy icon rail, and bright primary accents (blue, coral-pink, green) used as small signals. The screenshot captures a drag in progress: one card is lifted, recolored solid coral and tilted over a dashed drop placeholder. It is a clean, utilitarian productivity UI with strong status color coding and Source Sans typography.

## Layout

- **Icon rail (~38px of an 800 frame, ~70px at full size):** deep navy #1B214F, hamburger at top, 5 outline icons stacked; the active one sits on a solid blue #5689FB square.
- **Top bar (~45px):** white, workspace logo tile "ABC" (bordered square), workspace name with chevron, then on the right a "Calender" link with calendar icon, a vertical divider and a bell.
- **Breadcrumb strip:** "Group 1 | Task" in small gray on #F4F6F8.
- **Page header:** "Tasks" title left; right side a round blue floating "+" button and a view toggle (board / list) where the active view is solid green.
- **Board:** columns ~180px wide (~340px at full scale) with ~24px gaps; column header = hollow colored ring + bold name + sort arrows. Cards stack vertically with ~12px gaps.
- A context menu (Edit highlighted in blue, Download, Set Priority with colored dot options) pops out over the third column.
- Presentation backdrop: white with a big coral circle bottom-left, a blue circle top-right and a gray dot grid.

## Color palette

| Role | Hex | Usage |
| --- | --- | --- |
| Canvas | #F4F6F8 | Board background, breadcrumb strip |
| Card / top bar | #FFFFFF | Task cards, header, menu |
| Card border | #E3E6EA (est.) | 1px card outline |
| Rail | #1B214F | Left navigation rail |
| Rail icon | #9DB0CF (est.) | Inactive rail icons |
| Primary blue | #5689FB | Active rail tile, "+" FAB, menu active item |
| Coral | #FF4068 | Dragged card fill, "Pending" ring, High priority dot |
| Success green | #40BC3D / #4DCB4D | "Add New Card" border + text, active view toggle, Medium priority |
| Status: New | #3AA6E8 | Hollow ring before "New" |
| Status: Pending | #D6315E | Hollow ring before "Pending" |
| Status: In Progress | #F1BE56 | Hollow ring before "In Progress" |
| Title text | #181A1C / #1E1F23 | Card titles, column names |
| Body text | #686974 | Card descriptions |
| Muted | #B1B1B1 / #9D9FA0 | Dates, breadcrumb, workspace name |
| Bell: urgent | #F83A72 | Pink bell on overdue card |
| Bell: ok | #A8C46A (est.) | Lime-green bell on scheduled card |
| Bell: none | #A8A8A8 | Gray bell |

## Typography

- Humanist sans, almost certainly Source Sans Pro (Source Sans 3 today).
- Sizes at 800px frame: page title ~15px semibold; column names ~13px bold; card titles ~10px bold; body ~10px regular; dates ~9px regular. At a 1440 build: title 22px, column 18px, card title 15px, body 14px, date 12px.
- Weights: 600 to 700 for titles, 400 for body. Sentence/title case, no uppercase.
- Body text in a cool mid-gray, dates lighter.

## Components & patterns

- **Task card:** white, 1px light border, ~2px radius (nearly square), 14px padding; bold title, 2-line gray description, footer with gray date left and a small outline bell icon right (colored by reminder state).
- **Add New Card:** full-width outlined button with 1px green border, ~3px radius, green "+" and green bold label.
- **Dragged card:** solid coral #FF4068 fill, white text, slight rotation (about -2 to 0 deg), a soft shadow, overlapping the neighbor column.
- **Drop placeholder:** dashed 1px gray border rectangle on a slightly darker gray fill.
- **Column header:** 10px hollow ring (2px stroke) in the status color, bold name, tiny up/down sort arrows at the far right.
- **FAB:** 28px (40px at full size) solid blue circle with white "+" and a soft blue shadow.
- **View toggle:** two joined square buttons; active one filled green with white icon.
- **Context menu:** white, subtle shadow, active row "Edit" filled blue with white text and pencil icon; other rows gray with outline icons; a "Set Priority" section with colored dots (coral High, green Medium with ring, gray Normal).
- **Icons:** thin outline style throughout.

## Signature details

1. Hollow colored rings as column status markers (blue, pink, amber) instead of pills or bars.
2. Drag state shown as a solid coral card with white text, floating over a dashed placeholder.
3. Deep navy icon rail with a single bright blue active tile.
4. Reminder bells color-coded per card (pink urgent, lime scheduled, gray none).
5. Outlined green "Add New Card" button at the top of the first column.
6. Nearly square cards (2px radius) with hairline borders, very flat and structured.

## Reproduce it

```css
--canvas: #f4f6f8;
--card: #ffffff;
--line: #e3e6ea;
--rail: #1b214f;
--primary: #5689fb;
--coral: #ff4068;
--green: #40bc3d;
--st-new: #3aa6e8; --st-pending: #d6315e; --st-progress: #f1be56;
--ink: #1b1d20;
--body: #686974;
--muted: #a9abad;
--radius-card: 3px;
--radius-btn: 4px;
--shadow-drag: 0 10px 24px rgba(255,64,104,.28);
--shadow-menu: 0 6px 20px rgba(27,33,79,.12);
```

- Font: `font-family: "Source Sans 3", "Source Sans Pro", sans-serif`.
- Spacing: 16px card padding, 12px between cards, 24px between columns, 340px column width at desktop.
- Drag: `transform: rotate(-2deg); background: var(--coral); color: #fff; box-shadow: var(--shadow-drag)`.
- Keep: status rings, hairline square cards, coral drag state, navy rail.
- Adapt: modernize slightly with 6px radius if needed, but keep borders and flatness.

## Avoid

- Large radii (12px+) and soft pastel cards; this look is crisp and structured.
- Colored card backgrounds for statuses; color lives only in rings, bells and the drag state.
- Gradient or glassy rail; keep it flat navy.
- Replacing Source Sans with a geometric font; the humanist feel is part of it.
- Heavy shadows on resting cards; only the dragged card and menus are elevated.
