# API Keys (Dark Developer Settings Table)

- **Section**: web-app
- **Subtype**: settings
- **Kind:** image (static reference, no code)
- **Source:** https://dribbble.com/shots/25532538-API-Keys
- **Files:** `preview.webp`

## Overall style

A cropped, zoomed-in close-up of a dark developer console page listing API keys. It is almost pure charcoal monochrome, with large, calm type and very tall rows. Color appears only as tiny status dots and a violet "Create API key" button. The crop, the stacked concentric frame edges at top left, and a faint dot-matrix texture on the hovered row give it a premium, tactile "Linear / Vercel" feel.

## Layout

- Single content column. The page header has an H1 "API Keys" with a one-line description below and the primary button right-aligned on the same baseline block.
- Section header "Sandbox API Keys" with a "Filter" ghost button right-aligned.
- Full-width table: a header row inside its own bordered, slightly lighter box with rounded corners, then borderless body rows separated by 1px dividers.
- Columns (approx. proportion): Key Name 18%, API Key 28% (monospace + eye toggle), Last Used 20%, Permissions 20%, Status 14%, then row actions revealed on hover (edit pencil, rotate).
- Rows are very tall (~104px at 1920 width, roughly 64px at 1x), with left padding ~40px matching the header text.
- The frame is drawn as three nested rounded rectangles (radii ~80/64/48px) stepping from `#181818` to `#1E1E1E`, suggesting a device or window edge.

## Color palette

| Role | Hex | Usage |
|---|---|---|
| Page background | `#141414` | Canvas and table body |
| Frame steps | `#181818`, `#1C1C1C`, `#1E1E1E` | Nested outer frame edges |
| Raised surface | `#202020` | Table header box, Filter button |
| Header border | `#333333` | 1px outline of header box |
| Row divider | `#1F1F1F` to `#292929` | 1px lines between rows |
| Hover row | `#1C1C1C` + dot texture | Hovered row |
| Primary text | `#F5F5F5` | Titles, key names, dates |
| Secondary text | `#C6C6C6` | Description, permission labels |
| Muted text | `#9A9A9A` | Column headers, masked keys |
| Primary violet | `#7460F0` (edge `#5E4FC4`) | Create button |
| Success | `#01D891` | Active dot |
| Warning | `#FCB42E` | Expired dot |
| Danger | `#E45051` | Revoked dot |

## Typography

- UI text in a neo-grotesk such as Inter Display, Geist or "SF Pro Display"; the reference looks like Inter/Geist at a light-regular weight.
- Keys in a light **monospace** (Geist Mono, JetBrains Mono, IBM Plex Mono) with extra-light asterisks for masking: `test_key_*********`.
- Scale (at 1x): H1 ~28px/500, section title ~22px/500, description ~16px/400 secondary, table body ~16px/400, header ~15px/400 muted.
- Sentence and title case, normal tracking, no uppercase labels.

## Components & patterns

- **Primary button**: violet fill, 10px radius, `+` icon, white text, with a 1px lighter inner top highlight and a faint speckle/dither texture inside the fill.
- **Ghost button**: "Filter" with a three-line filter icon, `#202020` fill, 1px `#2A2A2A` border, 10px radius.
- **Table header**: a single rounded (12px) box, `#202020` fill, 1px `#333` border, sortable columns shown with small up/down chevron glyphs.
- **Masked key cell**: monospace string plus a 24px square eye button with a `#262626` fill and 6px radius. When revealed, the key turns bright and gets a dotted underline, and the eye becomes eye-off.
- **Permission cell**: a thin outline icon (lock for Restricted, check-circle for Full Access, eye for Read Only) + label.
- **Status pill**: full-radius, transparent/near-black fill, 1px `#262626` border, 6px colored dot + label in off-white. Only the dot carries color.
- **Row hover**: slightly lighter background with a subtle dot-grid texture and inline action icons (pencil, rotate) appearing at the far right.
- **Iconography**: 1.5px stroke outline icons, rounded caps, grey.

## Signature details

1. Status is communicated by a 6px colored dot inside a neutral pill, never a tinted pill background.
2. A monospace key with masking asterisks next to a tiny chip-style eye toggle, plus a dotted underline once revealed.
3. The table header is its own raised, bordered, rounded box floating above borderless rows.
4. Very tall rows and large type give luxurious spacing for a dev tool.
5. Dither/dot-matrix micro-texture on the primary button and hovered row, instead of gradients or glows.
6. Concentric stepped frame corners that frame the crop.

## Reproduce it

- Tokens: `--bg:#141414; --raised:#202020; --line:#262626; --line-strong:#333; --text:#F5F5F5; --text-2:#C6C6C6; --muted:#9A9A9A; --accent:#7460F0; --ok:#01D891; --warn:#FCB42E; --err:#E45051`.
- Radii: pills full, buttons 10px, header box 12px, icon chips 6px.
- Row: `height:64px; border-bottom:1px solid #1F1F1F; padding-inline:24px`.
- Texture: `background-image: radial-gradient(rgba(255,255,255,.06) 1px, transparent 1px); background-size: 6px 6px;` on hover rows and inside the primary button.
- Mono: `font-family: 'Geist Mono', ui-monospace; font-weight:300; letter-spacing:.02em`.
- Keep: monochrome, dot-only status colors, raised header box. Adapt: the column set to your resources (tokens, webhooks, members).

## Avoid

- Colored, tinted status badges (green pill backgrounds); they break the restraint.
- Blue-black (`#0B1020`) or navy darks; this is a neutral charcoal.
- Glowing gradients, neon borders or drop shadows.
- Zebra striping or boxed cells.
- Compressing row height to a dense admin table; the air is the point.
