# Relay CRM Sales Pipeline

- **Section:** web-app
- **Subtype:** crm
- **Kind:** image (static reference, no code)
- **Source:** https://dribbble.com/shots/27454088-Sales-Pipeline-Enterprise-Deal-Tracking-SaaS-Interface
- **Files:** `preview.webp`

## Overall style

A spacious, calm CRM pipeline in white and deep forest-teal, with a deal detail drawer that overlaps and extends beyond the app frame. The UI is sparse (only three deal cards visible) and lets typography and whitespace do the work; the green is used for money figures, the active nav and primary actions, giving it a trustworthy, finance-like tone.

## Layout

- App frame (radius ~40px) on an aqua-to-periwinkle gradient backdrop with grain.
- Left sidebar (~320px), white, separated by a faint vertical hairline: logo tile + uppercase wordmark, 5 nav items, then Help Center and a user block (avatar, name, role) pinned to the bottom.
- Main: pill search at top, "Pipeline" H1 with a hairline under it, then kanban columns (~380px each) with uppercase stage titles and "N deals · $total" meta.
- Detail drawer: a separate white sheet (radius ~40px) floating on the right, overlapping the main frame and sticking out past its right and bottom edges, with a large soft shadow. Contents: title + close, key-value list, segmented tabs, a note composer, an activity timeline, and two large pill buttons.

## Color palette

| Role | Hex | Usage |
| --- | --- | --- |
| Backdrop top | `#A4E8E0` | Aqua corner of the stage gradient |
| Backdrop bottom | `#6C8CDC` | Periwinkle corner |
| Surface | `#FFFFFF` | App frame, drawer, cards |
| Column fill | `#F7FAFD` | Kanban column background |
| Nav active fill | `#F4F8F8` | Selected sidebar item |
| Primary green | `#147464` | Logo tile, active nav text/icon, primary buttons, active tab, send button |
| Money green | `#0B6A55` | Deal values (bold) |
| Green tint | `#E4F0EC` | "Nebula Systems" company chip, timeline icon circles |
| Red tint | `#FCECE8` bg / `#D0504A` text | "Acme Corp", "Lobal Tech" company chips |
| Selected card border | `#5A928A` | Outline of the open deal card |
| Text | `#101114` | Titles, values |
| Muted | `#717171` | Labels, meta, inactive nav |
| Hairline | `#E6E8EA` | Dividers, timeline connector (dashed) |

## Typography

- Slightly condensed, technical grotesk, likely **Barlow / Rethink Sans / Archivo**; the uppercase stage titles look like Barlow Medium with wide tracking.
- H1 "Pipeline" ~36px regular; drawer title ~30px medium; stage titles ~24px medium uppercase with +0.06em tracking; deal title ~19px regular; deal value ~24px bold green.
- Body 18px regular muted for timeline text; labels 16px muted; buttons 24px regular (large).

## Components & patterns

- **Nav items:** outline icon + label; active item has a very light tinted fill (radius 8px) and green text and icon.
- **Search:** fully rounded, 1px border, magnifier icon, placeholder "Search deals, contacts, or tasks...".
- **Kanban column:** pale tinted panel (radius 12px) with title, meta and kebab; cards inside are white with a soft shadow (`0 2px 8px rgba(0,0,0,.05)`), radius 8px.
- **Deal card:** company chip (tinted pill, 13px), title, bold green value, 36px avatar bottom-right. The active card has a 1px green outline.
- **Key-value list:** muted labels left, dark values right-aligned to a column; company rendered as a tinted chip.
- **Segmented tabs:** bordered container; the active tab is a filled green block (radius 8px), inactive tabs are muted text.
- **Note composer:** underlined input ("Write a note...") with paperclip and a solid green circular send arrow.
- **Activity timeline:** 40px pale-green circle icons (phone, mail, calendar) connected by a dashed vertical line; bold title + muted relative time; body text in muted grey, quoted emails in quotes.
- **Buttons:** big pills (56px tall); primary solid green with white text, secondary white with 1px grey border.

## Signature details

1. The detail drawer breaks out of the app frame, overlapping its edge, which makes the layered UI feel physical.
2. Deep forest-teal as the only brand colour, applied to money values so revenue reads as "green".
3. Uppercase, tracked stage titles in a condensed grotesk: an enterprise, ledger-like accent.
4. Tinted company chips that encode relationship (red tint vs green tint) without extra legend.
5. Dashed timeline connectors with pale circular icon badges.
6. Very low density: three cards fill the board, everything breathes.

## Reproduce it

```css
--surface: #FFFFFF; --column: #F7FAFD; --line: #E6E8EA;
--primary: #147464; --money: #0B6A55; --primary-tint: #E4F0EC;
--warn-tint: #FCECE8; --warn: #D0504A; --text: #101114; --muted: #717171;
--radius-frame: 40px; --radius-column: 12px; --radius-card: 8px; --radius-pill: 9999px;
--shadow-drawer: 0 30px 80px rgba(16,40,60,.18);
--font: "Barlow", "Rethink Sans", system-ui;
.stage-title { text-transform: uppercase; letter-spacing: .06em; font-weight: 500; }
```

- At product scale: stage title 16px, deal value 18px bold, body 14-15px.
- Keep: breakout drawer, green money, uppercase stage titles, generous whitespace.
- Adapt: backdrop gradient is presentation only; inside a real app the drawer overlaps the main board.

## Avoid

- Cramming many cards and badges into columns; the calm density is the look.
- Multiple accent colours for stages; stages are typographic, not colour-coded.
- Thin, small primary buttons; the drawer uses large confident pills.
- A standard right-docked panel with no overlap or shadow.
