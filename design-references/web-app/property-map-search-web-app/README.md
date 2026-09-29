# Property Map Search

- **Section:** web-app
- **Subtype:** map
- **Kind:** image (static reference, no code)
- **Source:** https://dribbble.com/shots/27437177-Property-Map-Search-Web-App
- **Files:** `preview.webp`

## Overall style

A split list-plus-map real-estate search in a crisp, near-monochrome light UI with one deep teal-green accent. The map is desaturated to pale greys with wide-tracked district labels, so the teal geofence, price pins and CTA pop instantly. Architectural render photos in the cards supply all the visual richness.

## Layout

- Shown on an iMac-style display over a teal-to-navy gradient backdrop (presentation only).
- Header row: logo left (bold geometric "H" mark + wordmark), centred pill tab group (Dashboard, Buy active, Sell, Rent, AI Assistant), right-aligned circular icon buttons (search, settings, bell) and a user chip with name, email and chevron.
- Filter row: a long pill search input (~45% width) with clear "x", followed by 5 pill dropdowns (For Sale, Price, Beds & Baths, Home Type, More).
- Content: left results panel (~40% width, white, rounded) with a heading line and a 2x2 grid of property cards; the map fills the remaining width and bleeds under the panel edge.
- Map controls stacked vertically at the bottom-right: expand, layers, zoom in, zoom out, and a filled teal circular "home" button.

## Color palette

| Role | Hex | Usage |
| --- | --- | --- |
| Screen background | `#F8F8F8` | App canvas, map base |
| Surface | `#FFFFFF` | Results panel, cards, pill inputs, map pins |
| Accent teal | `#04947C` | Active tab, prices, selected pin, geofence stroke, home button |
| Accent deep | `#0F5A4C` | Logo mark (darker bottle green) |
| Geofence fill | `#E4ECEC` | Translucent teal tint inside the drawn area (~10% teal) |
| Map streets | `#FFFFFF` on `#F0F0F0` | Blocks and roads, almost no contrast |
| Map labels | `#9A9A9A` | District names (letter-spaced caps) and street names |
| Text | `#16181A` | Titles, nav labels |
| Muted | `#5C6066` | Location lines, specs |
| Pill border | `#ECECEC` | Tab and filter pill outlines |

## Typography

- Geometric grotesk with round forms, likely **Gilroy / Satoshi / General Sans**.
- Logo wordmark ~36px bold; card title ~20px bold; price ~20px bold teal; nav pills ~17px medium; body/meta ~15px regular.
- Map district names in uppercase with very wide tracking (~0.3em), light grey, e.g. "L O W E R  E A S T  S I D E".
- Prices use the currency glyph with no spacing ("€490000", "€490k").

## Components & patterns

- **Pill tabs:** 48px tall, fully rounded, white with 1px light border; active tab is solid teal with white text.
- **Icon buttons:** 48px circles, white, 1px border, thin outline icons.
- **Search / filters:** fully rounded white pills, no shadow, chevron-down on dropdowns.
- **Property cards:** image on top (~60% of card, 8px radius top corners), then title + teal price on one baseline, muted location line, and a spec row with outline icons (bed, bath, area).
- **Map price pins:** white rounded-rect bubbles (radius ~10px) with bold black price; the selected one is solid teal with white text. Below each, a circular photo thumbnail pin with a white ring and point.
- **Geofence:** freeform rounded polygon, 3px teal stroke, faint teal fill.
- **Map controls:** 40px white circles with outline glyphs; the primary action is a solid teal circle.

## Signature details

1. A hand-drawn-looking teal geofence blob on the map that defines the search area, rather than a bounding box.
2. Two-part pins: a price bubble plus a circular photo thumbnail of the property.
3. Letter-spaced uppercase neighbourhood names on a greyscale map, which gives it a printed-atlas feel.
4. Pill everything (tabs, filters, search) with identical heights, producing a very orderly top band.
5. Prices in teal on the cards, tying list and map together through colour alone.

## Reproduce it

```css
--canvas: #F8F8F8; --surface: #FFFFFF; --accent: #04947C; --accent-deep: #0F5A4C;
--fence-fill: rgba(4,148,124,.10); --text: #16181A; --muted: #5C6066; --line: #ECECEC;
--radius-pill: 9999px; --radius-card: 12px; --radius-img: 8px; --control: 48px;
```

- Map: use a custom Mapbox/MapLibre style with greyscale roads, no POI icons, labels at 40% grey, district labels `letter-spacing: .3em; text-transform: uppercase`.
- Cards: 2-column grid, 16px gap, 12px padding under the image.
- Keep: the single teal accent, greyscale map, photo pins.
- Adapt: the accent hue to your brand, but keep the map colourless.

## Avoid

- Default coloured Google Maps tiles; the design depends on a quiet grey basemap.
- Red location-marker icons; pins must be price bubbles and photo discs.
- Drop shadows on the pills and cards; separation comes from white on light grey.
- Adding more accent colours for status or categories.
