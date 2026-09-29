# Medica Social Media Post Composer

- **Section:** web-app
- **Subtype:** editor
- **Kind:** image (static reference, no code)
- **Source:** https://dribbble.com/shots/27652129-Social-Media-Management-Platform-Dashboard-UI-UX-Design
- **Files:** `preview.webp`

## Overall style

A plain, neutral-grey social media manager with a jade-green accent: a "Create Post" composer with a row of account avatars on top and a schedule table below. It is intentionally utilitarian, relying on grey fills rather than borders for structure, alternating grey row bands in the table, and small tinted status chips. Good reference for a no-frills, content-first scheduling tool.

## Layout

- App frame on a light grey stage; the frame itself is `#F4F4F4`.
- Left sidebar: a separate white rounded panel (~300px) inset from the frame edges: logo (chevron mark + wordmark), 7 nav items with icons in pale square tiles, a 4px green indicator hanging on the frame edge for the active item, then Get support / Give Feedback and a Light/Dark segmented toggle at the bottom.
- Top bar (on the grey canvas, no background): wide pill search on the left, then Support (outlined), Plans (solid green), a circular bell and an avatar.
- Main: two white cards stacked. Card 1: back arrow + "Create Post" title, right-aligned small outlined chips (Media Library, Drafts, Calendar), a row of 17 circular account avatars with a green "+" first, a large grey compose box with tools row and a green "Voice" pill, and a button row (Save Draft left; Post Now, Schedule right). Card 2: a full-width table with a grey header bar and rows as separate rounded bands.

## Color palette

| Role | Hex | Usage |
| --- | --- | --- |
| Stage | `#E8E8E8` | Backdrop |
| Canvas | `#F4F4F4` | App background, behind cards |
| Surface | `#FFFFFF` | Sidebar panel, cards, white table rows |
| Fill grey | `#ECECEC` | Compose box, table header, alternate rows, theme toggle track |
| Accent green | `#34A884` | Plans, Schedule, Voice, add buttons, active indicator, online dots, logo |
| Nav tile | `#F0F4F4` | Icon background squares in the sidebar |
| Chip green | `#D0F0E0` bg / `#1FB87E` text | "In Stock" status |
| Chip amber | `#F0E4C0` bg / `#C5A542` text | Alternate status |
| Danger | `#EC2050` | Trash icon |
| Category swatches | `#34A880`, `#00C8D8`, `#C83CFC`, `#7AC943`, `#333333` | Square colour markers before row names |
| Text | `#111111` | Labels, table values |
| Muted | `#7A7C7B` | Placeholders |
| Border | `#DADADA` | Outlined buttons |

## Typography

- Neutral grotesk, likely **Inter / Geist**.
- Logo 32px semibold; nav 20px regular (active semibold); card title 18px semibold; table header 20px medium; table body 20px regular; small chips 12px; compose placeholder 15px muted (all at this ~1.5x presentation scale).
- Sentence case everywhere; no uppercase labels.

## Components & patterns

- **Sidebar nav:** each icon in a 36px pale rounded-square tile, label to the right; active item bolder with a green 4px bar on the outer edge.
- **Top buttons:** 52px tall, radius 8px; outlined (1px border, white) and solid green variants; circular 52px bell button with a green dot.
- **Avatar rail:** 40px circles with a small green online dot at the bottom-right, spaced ~14px; a solid green "+" circle leads.
- **Compose box:** grey filled area (radius 10px) with placeholder at top and a tools row at bottom: green circular "+", bordered "Tools" chip with sliders icon, "English" language dropdown; a green pill "Voice" button with a waveform icon and a soft shadow at the bottom-right.
- **Action buttons:** Save Draft and Post Now outlined white, Schedule solid green, all 52px, radius 8px.
- **Table:** grey header bar (radius 8px). Rows are individual rounded bands (radius 8px) with 20px gaps, alternating white with a faint border and grey fill. Cells: pencil + red trash actions, colour square + name, tiny tinted status chip with a dot, centred numbers, outlined "x" checkbox icon, and an "Analytics" link with a chart icon.
- **Theme toggle:** grey track with a white active segment ("Light" + sun icon).

## Signature details

1. Table rows as separate rounded bands with gaps, alternating white/grey, instead of a ruled grid.
2. The long horizontal avatar rail of connected social accounts as the post's audience selector.
3. Sidebar as an inset white panel inside a grey frame, with the active indicator attached to the outer frame edge.
4. Filled grey compose area with a floating green "Voice" pill, hinting at voice-to-post input.
5. One jade green for every positive action, no secondary accent.

## Reproduce it

```css
--canvas: #F4F4F4; --surface: #FFFFFF; --fill: #ECECEC; --border: #DADADA;
--accent: #34A884; --accent-tint: #D0F0E0; --amber-tint: #F0E4C0; --amber: #C5A542;
--danger: #EC2050; --text: #111111; --muted: #7A7C7B;
--radius-panel: 12px; --radius-btn: 8px; --radius-row: 8px; --control-h: 40px (1x);
.row { border-radius: 8px; margin-block: 12px; } .row:nth-child(even) { background: var(--fill); }
```

- At 1x: nav 14-15px, table 14px, buttons 40px tall, avatar 32px.
- Keep: grey-fill structure, banded rows, the avatar rail.
- Adapt: status chips to real states (Scheduled, Posted, Failed) using the same tint recipe.

## Avoid

- Adding heavy shadows or gradients; the look is flat grey and white.
- Over-styling the table with borders on every cell.
- Multiple brand colours on buttons; keep outlined vs solid green only.
- Tiny avatars in the account rail; they need to read as faces.
