# Financial Entity Management Dashboard (Otonomos)

- **Section:** web-app
- **Subtype:** dashboard
- **Kind:** image (static reference, no code)
- **Source:** https://dribbble.com/shots/26712555-Financial-web-application-Dashboard-design
- **Files:** `preview.webp`

## Overall style

A light, periwinkle-tinted corporate admin dashboard for managing a company entity (members, compliance actions, add-on services). Everything is built from one violet-indigo (#665EF2) for actions and one deep indigo ink (#2D265D) for headings, on near-white surfaces with a faint blue cast. It feels friendly-fintech rather than banking-serious thanks to a pixel-font logo, pastel status chips and large airy headings.

## Layout

- Two regions at 1440 width: a left info rail (~285px) with a slightly off-white #FAFCFF background, and a main area on white.
- **Left rail:** pixel wordmark, "Back to Main Overview" link, a full-width violet entity switcher button, a round entity logo with "Edit Icon" link, then a stacked key/value list (Company Number, Entity Type, Financial Year-end, dates, EIN, addresses). Labels in indigo medium, values in gray light with wide tracking; ~30px between pairs.
- **Main header:** entity mark + "Waters LLC Entity" title, thin divider, green dot + "Active" status; utility icons (search, theme, bell with red dot) and a round avatar on the right.
- **Tab bar:** a full-width pale lavender track (#F4F6FA / #E1E1ED) with 6 evenly distributed text tabs, the active one a solid violet rounded rectangle.
- **Two-column content:** "Members" table (left, ~530px) with a Participants/Collaborators segmented control, and "Pending Actions" table (right, ~530px). Both sit in #F9FAFE panels with rounded corners and a thin indigo scrollbar.
- **Bottom row:** "Extra Kits Tailored for Waters LLC" heading with 4 equal cards (title, 2 lines of gray copy, full-width violet button).
- A floating circular violet chat/help button bottom-right.

## Color palette

| Role | Hex | Usage |
| --- | --- | --- |
| Main background | #FFFFFF | Content area |
| Rail / panel tint | #F9FAFE to #FAFCFF | Left rail, table panels, kit cards |
| Chip / track fill | #F4F6FA | Status chip background, tab track |
| Divider | #E6E8F0 (est.) | Table row separators |
| Primary violet | #665EF2 | Entity switcher, active tab, segmented active, CTA buttons, floating button, logo, "Edit Icon" link |
| Heading ink | #2D265D | Page title, section headings, rail labels, table cell text |
| Scrollbar / strong ink | #352D76 | Thin vertical scroll indicator |
| Inactive tab text | #2F257F at ~60% (renders #8483A5) | Tabs and table headers |
| Body gray | #676A70 | Rail values, card descriptions |
| Success | #7DCEAE / #87C8B0 | "Active" status and "Completed" chip text + check icon |
| Danger | #E8807A / #F2666C | "Overdue" chip text + card icon |
| Warning | #F8CB91 | "Pending" chip text + clock icon |
| Neutral status | #6B6C70 | "In Progress" chip text |
| Notification dot | #F2554E (est.) | Bell badge |

## Typography

- Soft geometric grotesk, likely General Sans or Satoshi (DM Sans works as fallback). The logo uses a pixel / bitmap display font in violet.
- Sizes at 1440: page title ~24px medium; section headings ("Members", "Pending Actions") ~26px medium with slight negative tracking; kit card titles ~26px medium; rail labels ~17px medium; rail values ~18px light with +0.04em tracking; tabs ~14px medium; table cells ~11 to 12px medium; buttons ~15px medium.
- Headings and labels in indigo, never pure black. Values and descriptions in gray. Title case for headings.

## Components & patterns

- **Primary button:** solid #665EF2, white text, ~6px radius, full width inside kit cards (~40px tall). The entity switcher is a larger version with ~10px radius, a white circular logo chip and a chevron.
- **Tabs:** pale lavender track spanning the content width; active tab is a violet filled rounded rectangle (~6px) with white text; inactive tabs plain indigo-gray text, evenly spaced.
- **Segmented control:** same pattern, small (~26px tall), Participants active in violet.
- **Tables:** header row with small gray labels and tiny chevrons for sorting; rows ~60px with hairline dividers; round avatar photos (32px) next to names; underlined link style for the first action ("Annual Report").
- **Status chips:** rounded rectangles (~6px), #F4F6FA fill, colored text + matching filled icon (green check circle, red card, amber clock). Only the text and icon carry color, never the fill.
- **Cards:** #F9FAFE fill, ~8px radius, no border or shadow, 24px padding.
- **Icons:** thin outline icons in the header (search, sun, bell); tiny filled copy icons beside rail labels.
- **Floating action button:** 50px violet circle with a white glyph.

## Signature details

1. Pixel-font wordmark in violet, a playful counterpoint to the otherwise corporate layout.
2. Indigo ink (#2D265D) for all headings and labels instead of black, which ties the text to the violet brand.
3. Status chips with neutral fill and colored text + icon, keeping the tables calm.
4. Rail key/value list where values are light gray with wide tracking, reading almost like a spec sheet.
5. Full-width lavender tab track with evenly distributed tabs and one violet block.
6. Faint scroll indicators in deep indigo inside table panels.

## Reproduce it

```css
--bg: #ffffff;
--tint: #f9fafe;
--track: #f4f6fa;
--line: #e6e8f0;
--primary: #665ef2;
--ink: #2d265d;
--ink-muted: #8483a5;
--gray: #676a70;
--ok: #7dceae; --danger: #ef6f6c; --warn: #f5c07f;
--radius-sm: 6px;
--radius-md: 8px;
--radius-lg: 10px;
```

- Spacing: 24px panel padding, 30px between rail pairs, 40px between major sections, 16px gutters between the two tables and the kit cards.
- Type: `text-[26px] font-medium tracking-tight text-[--ink]` for section headings; `text-lg font-light tracking-wide text-[--gray]` for rail values; `text-xs font-medium text-[--ink]` for table cells.
- Keep: single violet, indigo text, pale periwinkle surfaces, neutral-fill status chips.
- Adapt: the pixel logo can be any quirky display face; content sections can change but keep the rail + tabs + two-table rhythm.

## Avoid

- Pure black text or gray-only headings; the indigo ink is essential.
- Solid colored status badges (green/red fills); keep fill neutral and color the text.
- Adding shadows to cards and tables; separation is by tint only.
- Gradients on the violet buttons.
- Too many accent hues; the only non-violet colors are status semantics.
