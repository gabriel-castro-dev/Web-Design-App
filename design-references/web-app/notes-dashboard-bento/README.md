# Notes Dashboard Bento

- **Section:** web-app
- **Subtype:** dashboard
- **Kind:** image (static reference, no code)
- **Source:** https://i.pinimg.com/1200x/d9/30/bc/d930bcb8736ed8b9c44cf49073e250c9.jpg
- **Files:** `preview.webp`

## Overall style

A soft, friendly productivity dashboard built as a bento grid of rounded white tiles on an almost-white canvas, with a single periwinkle violet accent. What sets it apart is the playful depth: a violet sidebar that swells out of the frame edge in an organic curve, a notification card physically "pulled out" of its stack to reveal swipe actions, and line-art illustrations with violet spot fills. It reads as a calm consumer app, not an enterprise tool.

## Layout

- App frame: a large rounded rectangle (radius ~32px) floating on a lavender-grey backdrop, with thin decorative white arcs behind it.
- Left: a narrow icon-only sidebar (~80px) that is not a straight rail but a violet blob whose top edge curves outward from the frame, starting below the hero. Active icon sits in a white rounded square.
- Top bar: text nav with small icons (Dashboard active, underlined), a centered pill search ("Search or type command"), a Light/Dark segmented toggle, bell, gear, "Export data" ghost button with a violet `.xls` chip, and a dark navy "Add new board" primary button.
- Hero row: left ~40% is a big two-line greeting headline plus a one-line description; right is a dashed "+" add tile followed by three square illustrated feature tiles (Stay organized / Sync your notes / Collaborate and share).
- Grid below: 3 columns of roughly equal width. Row 1: Notifications, Assignments, Calendar (the calendar spans two rows). Row 2: Today tasks (wide), a tall violet "Go premium" card, two small ring-progress stat tiles, and a Board meeting card.
- Density is airy: ~24px gaps, ~24px internal padding, generous whitespace inside every tile.

## Color palette

| Role | Hex | Usage |
| --- | --- | --- |
| Backdrop | `#D0D0E4` | Lavender-grey page behind the app frame |
| App canvas | `#F8F8FC` | Frame fill, very faint cool white |
| Surface | `#FCFCFC` | Tiles and cards |
| Tinted surface | `#F0F0FC` | Illustration tile background, dashed add tiles, message input |
| Accent violet | `#706CF0` | Sidebar, primary buttons (Accept invite), premium card, selected date, progress fills, "+" squares |
| Accent tint | `#E0E4F4` | Secondary button fill (Reschedule), active toggle background |
| Ink navy | `#14103C` | Headline text, dark primary button ("Add new board", "Find out more") |
| Muted text | `#A4A4A6` | Metadata, timestamps, subtitles |
| Mint | `#74B8A8` | Category tag fill ("Package design"), online dots, "Data research" ring |
| Rose | `#F8DCE0` bg / `#C0506A` text | "High" priority badge, red ring for low progress |

## Typography

- Geometric sans with round bowls, likely **Gilroy / Satoshi / Manrope** (Gilroy is the closest match: single-storey feel, wide O).
- Hero headline ~40px, semibold (600), tight leading (~1.15), navy.
- Tile titles ~16-18px semibold; body ~13px regular; metadata ~10-11px muted.
- Sentence case everywhere, except tiny uppercase eyebrow labels on the stat tiles ("DATA RESEARCH", "UX/UI DESIGN") in the accent colour.
- Stat numbers inside rings are small (12px, bold) rather than huge.

## Components & patterns

- **Tiles:** radius ~24px, white, no border, extremely soft shadow (barely visible) so they read as flat paper on the canvas.
- **Illustrated feature tiles:** square, white, outline-style line illustrations in navy with violet and pale-violet fills; title + one-line muted subtitle anchored bottom-left.
- **Dashed add tiles:** 1.5px dashed violet-grey border, tinted fill, centred small violet rounded-square "+" button.
- **Swipe-revealed notification:** top card is lifted (stronger shadow `0 12px 24px rgba(20,16,60,.12)`), shifted left, revealing a tinted strip with trash and edit icons behind it. Cards below are slightly inset.
- **Assignment card:** tag row ("Motion design", "Logo"), bold two-line title, rose "High" pill, mint filled tag, assignee name with tiny avatar.
- **Calendar:** month header with round chevron buttons, week strip with the selected day as a filled violet circle, then a timeline of time ranges separated by dotted lines with event rows (icon in tinted rounded square, title, muted meta, kebab).
- **Task rows:** name + date, duration column, percentage with a thin 2px progress line, attachment/comment counts. The first row is lifted with a shadow like the notification.
- **Premium card:** solid violet, rounded 24px, white line-art gift illustration, centred white headline, and a navy pill button.
- **Ring stats:** thin (4px) circular progress rings (mint and rose) with the percentage in the centre, small violet "Check" button.
- **Buttons:** pill or 8px-radius; primary violet, dark navy for header CTA, tinted lavender secondary.
- **Icons:** thin 1.5px outline icons (Lucide/Iconsax-like), white on the violet sidebar.

## Signature details

1. The sidebar is a violet shape that bulges out of the frame's left edge with an S-curve, instead of a boxed rail.
2. "Pulled out" cards: one item in a list is lifted with a real shadow and offset, exposing action icons behind it, which suggests drag/swipe physics in a static layout.
3. Line-art illustrations in navy strokes with violet fills on the hero tiles give warmth without stock imagery.
4. Violet used as a full-bleed surface exactly twice (sidebar and premium card), so the rest of the UI can stay nearly monochrome.
5. Dashed "add" placeholders sit in the grid as first-class tiles, making empty states part of the composition.
6. Floating app frame with faint white curved lines behind it, like a Dribbble presentation stage.

## Reproduce it

```css
--bg-stage: #D0D0E4; --canvas: #F8F8FC; --surface: #FFFFFF; --tint: #F0F0FC;
--accent: #706CF0; --accent-soft: #E4E4FA; --ink: #14103C; --muted: #A4A4A6;
--mint: #74B8A8; --rose-bg: #F8DCE0; --rose: #C0506A;
--radius-frame: 32px; --radius-tile: 24px; --radius-inner: 14px; --radius-btn: 10px;
--shadow-tile: 0 1px 2px rgba(20,16,60,.03);
--shadow-lift: 0 14px 28px rgba(20,16,60,.12);
```

- Tailwind-ish: `rounded-3xl bg-white p-6 gap-6`, text `text-[40px] font-semibold leading-tight text-[#14103C]`.
- Spacing scale 4/8/12/16/24/32. Tile padding 24px, grid gap 24px.
- Keep: one accent hue, lifted-card affordance, illustrated tiles, curved sidebar silhouette.
- Adapt: the sidebar curve can be an SVG mask on a fixed rail; swap illustrations for your own line-art set in the same 2-colour treatment.

## Avoid

- Adding more accent colours or gradients; the look depends on a single violet on white.
- Heavy drop shadows on every tile; only the "pulled" items get real elevation.
- Replacing line illustrations with 3D blobs or stock photos.
- A rectangular sidebar, which instantly makes it a generic admin template.
- Oversized KPI numbers; this design keeps stats small and friendly.
