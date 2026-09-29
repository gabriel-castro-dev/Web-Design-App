# Real-Time Collaborative Notes Editor

- **Section:** web-app
- **Subtype:** editor
- **Kind:** image (static reference, no code)
- **Source:** https://dribbble.com/shots/25880647-Real-Time-Collaborative-Notes-Editor
- **Files:** `preview.webp`

## Overall style

A FigJam-like persona board: a dotted canvas holding four white columns, each filled with square pastel sticky notes, with named multiplayer cursors in saturated colours hovering over them. The interface chrome is minimal and grey so that the stickies and cursor tags supply all the colour and the sense of live collaboration.

## Layout

- Safari window mockup on a very light grey stage.
- Narrow icon rail (~90px) on the left with the logo at top and 4 nav icons; the active one sits in a tinted rounded square with a 3px blue indicator on the rail edge.
- Top bar: expand chevron, grey search field, document title "User Persona", hamburger and share/upload icons, then a blue "Share" button, bell and avatar far right.
- Canvas: dotted grid background (`#E5E5E5` dots every ~20px) with one large rounded board container (title row with overlapping avatar stack, pencil and check icons), holding four equal columns (Her Interests, Goals, Pain Points, Motivations).
- Each column: header with coloured circular icon, title, subtitle, kebab; a free area with 3 stickies in a row and one lilac sticky below; a footer with owner avatar, name/role and a pink trash button.

## Color palette

| Role | Hex | Usage |
| --- | --- | --- |
| Stage / canvas | `#F4F4F4` | Outside the window, dotted canvas base |
| Canvas dots | `#E5E5E5` | Grid dots |
| Board | `#F8F8FC` | Board container fill |
| Surface | `#FFFFFF` | Columns, top bar, rail |
| Border | `#E8E7EC` | Column and board outlines |
| Accent blue | `#2868F8` | Share button, active nav, text toolbar colour dot |
| Sticky yellow | `#FCF080` | "She like designing" |
| Sticky pink | `#FCB8BC` | "playing games" |
| Sticky teal | `#84E4D8` | "like singing" |
| Sticky lilac | `#D8C4FC` | "like travel" |
| Cursor orange | `#FC6030` | "Henry" cursor + tag |
| Cursor purple | `#A86CFC` | "Rocky" |
| Cursor blue | `#4078FC` | "Benzima" |
| Cursor yellow | `#FCCC24` | "Willium" (black text) |
| Toolbar | `#1C1C1C` | Floating formatting toolbar |
| Danger tint | `#FCE8E8` bg / `#D0605B` icon | Trash buttons |
| Text | `#202224` | Titles |
| Muted | `#636363` | Subtitles, roles |

## Typography

- Geometric sans, likely **Nunito Sans / Gilroy / Manrope** (rounded terminals, friendly).
- Board title ~22px regular; column titles ~16px semibold; subtitles 10-11px muted; sticky text 11px, centred, lowercase-ish sentence case.
- Cursor name tags 18px medium, white (or black on yellow), no rounding.
- Top bar title ~18px medium.

## Components & patterns

- **Sticky notes:** ~68px squares, flat pastel fills, sharp (0-2px) corners, a very soft drop shadow at the bottom edge, centred two-line text.
- **Multiplayer cursors:** solid arrow pointer in the user's colour with a rectangular name tag (no radius) directly below-right.
- **Selection:** the selected sticky shows small square corner handles and a thin outline.
- **Floating text toolbar:** black bar with 6px radius: colour dot + caret, size dropdown ("Small"), bold, link, list, align, separated by 1px dark dividers.
- **Context menu:** white, 8px radius, soft shadow, "Edit" and "Delete" with outline icons.
- **Column header icons:** 40px circles in the column's pastel with a white glyph (flag, triangle, play, trophy).
- **Avatar stack:** 32px circles overlapping by ~30% with white rings.
- **Columns:** white, 12px radius, 1px border, header divider line, footer divider line.
- **Trash buttons:** 28px circles in pale red with a red outline icon.

## Signature details

1. Named cursors with square, fully saturated tags floating across the board, which communicates "live" in a still image.
2. Flat square pastel stickies with a four-colour system (yellow, pink, teal, lilac) repeated identically across columns.
3. Dotted canvas behind a structured board, blending whiteboard freedom with kanban-like columns.
4. A black floating formatting toolbar appearing over a selection, contrasting with the pale surroundings.
5. Pastel header icons matching the sticky palette, so each column has a colour identity.

## Reproduce it

```css
--canvas: #F4F4F4; --dot: #E5E5E5; --surface: #FFFFFF; --board: #F8F8FC; --line: #E8E7EC;
--accent: #2868F8; --text: #202224; --muted: #636363;
--sticky-yellow: #FCF080; --sticky-pink: #FCB8BC; --sticky-teal: #84E4D8; --sticky-lilac: #D8C4FC;
--radius-col: 12px; --radius-board: 16px; --sticky-size: 68px;
.canvas { background: radial-gradient(#E5E5E5 1px, transparent 1px) 0 0 / 20px 20px; }
.sticky { box-shadow: 0 2px 3px rgba(0,0,0,.08); border-radius: 2px; }
.cursor-tag { border-radius: 0; padding: 4px 8px; font-weight: 500; }
```

- Keep: saturated cursor colours distinct from the pastel sticky set.
- Adapt: sticky text size up to 12-13px for real use; give each collaborator a stable colour.

## Avoid

- Rounded pill cursor tags or soft cursor colours; they must be loud and rectangular.
- Gradients or textures on stickies; they are flat paper squares.
- Heavy column shadows; only borders separate columns.
- Using the accent blue on stickies; keep chrome colour and content colour separate.
