# File Hfilx Cloud Storage

- **Section**: web-app
- **Subtype**: files
- **Kind:** image (static reference, no code)
- **Source:** https://dribbble.com/shots/26395273-Cloud-storage-dashboard
- **Files:** `preview.webp`

## Overall style

A calm, spacious file manager built from white panels floating over a misty sage-grey cloud backdrop. The palette is a deep petrol teal plus a lime-chartreuse, used together in a half-donut storage gauge and a teal promo card, while folder icons come in muted earthy tones (sage, teal, slate blue, mauve, tan). Large, relaxed type and big row heights make it feel more like a consumer app than an admin tool.

## Layout

- Detached panels with gaps between them: a left sidebar panel (~18% width), a main panel (~50%), and a right detail panel (~22%) that shares the top bar with the main panel. The backdrop shows through between sidebar and main.
- Sidebar: logo tile + "File Hfilx" wordmark, 4 nav items (~80px apart), a divider, then at the bottom a teal promo card and a "Logout" row.
- Top bar (spanning main + right): vault tabs ("Your vault" active, "Company vault" muted, "Add new vault +" grey chip), then on the right a storage plan meter ("Basic Storage 5.2GB/15GB" with a thin progress underline), filter and bell icons, and a round avatar.
- Main panel: search row with action buttons (Upload v, Create v, Make order v, `...`, list icon), "Recent files" with 4 equal folder tiles, then "All files" with list/grid toggles and a table (Name, Type, File Size, Last modified, kebab).
- Right panel: "Storage" half-donut gauge with total/used values beneath, then "Detail" with a large preview thumbnail, file name row and label/value metadata rows.

## Color palette

| Role | Hex | Usage |
|---|---|---|
| Backdrop | `#DCE4E4` | Misty cloud/sage background |
| Surface | `#FFFFFF` | All panels |
| Chip / soft fill | `#F0F0F0` | Buttons, icon chips, "Add new vault" |
| Divider | `#EEEEEE` | Row separators, panel borders |
| Primary teal | `#00545C` | Logo tile, promo card, gauge used arc, progress, active nav bar |
| Lime accent | `#C6E464` | Gauge remaining arc |
| Cream | `#FCFCE2` | Promo card icon circle |
| Text | `#141414` | Titles, file names |
| Muted text | `#858585` | Column headers, types, sizes, inactive nav |
| Folder sage | `#74B088` | Folder icon |
| Folder teal | `#60B8BC` | Folder icon |
| Folder slate | `#7490B4` | Folder icon |
| Folder mauve | `#B474A8` | Folder icon |
| Folder tan | `#B49478` | Folder icon |

## Typography

- Geometric sans with round shapes, most likely **Gilroy** or **Plus Jakarta Sans** / **Manrope** as free alternatives.
- Wordmark ~28px with "File" in 700 and "Hfilx" in 400. Nav ~24px/400 muted, active 500 black. Section titles ("Recent files", "All files", "Storage") ~24px/500.
- Table rows ~20px: name 500 black, other columns 400 muted. Column headers ~18px/400 muted with small caret.
- Gauge value "5.2 GB" ~32px/600 with a small "GB" unit and "Used" caption below.
- Small UI (buttons, top-bar meter) ~14px/500. Sentence case, normal tracking.

## Components & patterns

- **Sidebar active item**: black icon + label, with a 4px teal vertical bar at the far left edge of the panel.
- **Folder tile**: white card, 1.5px `#EEEEEE` border, 12px radius, flat colored folder icon (~80px) centered with the name below; image content uses a photo-stack icon instead.
- **Toolbar buttons**: `#F0F0F0` fill, 6px radius, ~32px tall, small icon + label + caret.
- **Table rows**: ~118px tall at 1920 (about 60px at 1x), a 56px rounded (8px) light-grey icon chip holding a small folder, 1px dividers, kebab menu at the end.
- **View toggles**: 36px square chips with list and grid icons, the active one in soft grey.
- **Half-donut gauge**: thick (~56px) semicircle, teal arc for used and lime for remaining, flat ends, value centered in the bowl.
- **Promo card**: teal fill, 20px radius, two diagonal leaf-shaped translucent strokes at top-left, a cream circle with an icon at top-right, white two-line text at the bottom.
- **Plan meter**: lightning icon in a small circle, label, value right-aligned, and a 3px progress underline (teal on light grey).
- **Icons**: thin 1.5px outline set, rounded.

## Signature details

1. Teal + lime half-donut gauge as the hero data viz.
2. Earthy, desaturated folder colors (sage, slate, mauve, tan) instead of saturated file-type colors.
3. Floating white panels over a soft cloud photograph, with visible gaps between sidebar and content.
4. Deep petrol teal promo card with leaf strokes and a cream icon badge.
5. Very tall list rows and large 20 to 24px type that give a relaxed consumer feel.

## Reproduce it

- Tokens: `--backdrop:#DCE4E4; --surface:#FFF; --soft:#F0F0F0; --line:#EEEEEE; --primary:#00545C; --lime:#C6E464; --text:#141414; --muted:#858585`.
- Folder palette: `#74B088 #60B8BC #7490B4 #B474A8 #B49478 #00545C`.
- Radii: panels 0 to 4px (square edges against the backdrop), tiles 12px, promo 20px, chips 6 to 8px.
- Spacing: 8px base; panel padding 36px; table row height 60px at 1x; section gap 48px.
- Gauge: SVG semicircle `stroke-width:28` at 1x, `stroke-linecap:butt`, two arcs.
- Keep: two-color teal/lime pairing, soft backdrop, relaxed scale. Adapt the backdrop to a blurred photo or a flat `#DCE4E4`.

## Avoid

- Saturated Google-Drive-style file colors (bright red PDF, blue doc).
- Dense 36px rows and 13px type; the airy scale is central.
- Adding drop shadows to panels; separation comes from the backdrop.
- Using lime for text or buttons; it only appears in the gauge.
- Gradients on the teal elements.
