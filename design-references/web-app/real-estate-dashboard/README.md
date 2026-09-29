# Real Estate Dashboard

- **Section:** web-app
- **Subtype:** ecommerce
- **Kind:** image (static reference, no code)
- **Source:** https://dribbble.com/shots/27637173-Real-Estate-Dashboard
- **Files:** `preview.webp`

## Overall style

A bright, photo-led property marketplace with a three-pane layout: filters, a card grid, and a detail panel. The chrome is pale grey and white with a single saturated royal blue for selection and actions. The distinctive touch is the property card: a full-bleed photo with a white info panel floating inside the bottom of the image, like a caption card overlaid on the picture.

## Layout

- Browser mockup (tab + URL bar) on a flat grey backdrop.
- App header: logo + wordmark left, a centred segmented control (Sell / Buy / Rent) in a grey track, right cluster of 48px circular icon buttons (chat, bell with count badge), avatar and chevron.
- Secondary bar: category pills with icons (House, Hotel, Villa active, Apartment) on the left; on the right a location pill, a solid blue circular chat button and a "Filter" pill.
- Three columns below: left filter sidebar (~400px, white), centre 2-column card grid (~720px, on light grey `#F5F7F9`), right detail panel (~500px, white, rounded) with a gallery, title, tabs, description, room-size chips and a mini map.
- Comfortable density: 24px grid gaps, 16-24px paddings.

## Color palette

| Role | Hex | Usage |
| --- | --- | --- |
| Stage | `#D8D8D8` | Behind the browser |
| App background | `#F5F7F9` | Header band, card grid area |
| Surface | `#FFFFFF` | Filter sidebar, detail panel, card info panels |
| Pill fill | `#F0F0F4` | Segmented control track, filter section headers |
| Border | `#E6E8EC` | Pill and chip outlines, dividers |
| Accent blue | `#2448F0` | Checkboxes, range slider, chat button, selected card border, tab underline, location pins, notification badge |
| Text | `#101014` | Titles, prices |
| Muted | `#8A8C92` | Addresses, "/month" suffixes, unselected tabs |
| Rating | `#FECB1A` | Star icon |
| Tag pill | `#FFFFFF` at 90% | "Home" label on photos |

## Typography

- Neutral grotesk, likely **Inter / SF Pro Display**.
- Logo 24px bold; section headings ("Customer Filter", "Room Size") ~24px semibold; card title ~19px semibold; detail title ~28px semibold.
- Body 16-18px regular in the filter list; addresses 10-11px muted (very small); price 15px medium with a 10px muted "/month".
- All sentence case, no uppercase labels except map place names.

## Components & patterns

- **Segmented control:** grey track (radius 16px), active segment is a white pill with soft shadow and an icon + label.
- **Category pills:** 48px tall, fully rounded, 1px border, outline icon + label; active pill gets grey fill.
- **Filter groups:** a pill-shaped header row (icon, label, "x" clear) followed by checkbox options; checked boxes are solid blue with white tick, 4px radius. A range slider with a blue fill, white thumbs with blue rings, and a tiny value tooltip ("$10k").
- **Stepper-like inputs:** two pill fields side by side ("2 Badroom", "1 Bathroom").
- **Property card:** 16px radius, photo fills the card; a white rounded (12px) info panel is inset 12px from the edges at the bottom with title, share icon in a circle, address with blue pin, a hairline, and price + star rating. Small white "Home" pill tag at top-left of the photo.
- **Selected card:** 2px blue border around the whole card.
- **Detail panel:** gallery with one large image (16px radius) and two stacked thumbnails, tab row with a blue 2px underline on the active tab, room-size chips (outlined pills with icons), and an embedded colourful street map.

## Signature details

1. Floating white info panels inset inside the bottom of each photo card, not below it.
2. Blue is used as a pure selection signal: checkbox, slider, border, tab underline, never for large fills.
3. Three-pane filter / grid / detail composition that keeps context without navigating away.
4. Grey segmented track with a lifted white active segment for the Buy/Sell/Rent mode switch.
5. Round icon buttons and pills everywhere with consistent 48px height.

## Reproduce it

```css
--bg: #F5F7F9; --surface: #FFFFFF; --track: #F0F0F4; --line: #E6E8EC;
--accent: #2448F0; --text: #101014; --muted: #8A8C92; --star: #FECB1A;
--radius-card: 16px; --radius-inner: 12px; --radius-pill: 9999px; --control-h: 48px;
--shadow-seg: 0 1px 3px rgba(16,16,20,.08);
.card-info { position:absolute; inset:auto 12px 12px 12px; background:#fff; border-radius:12px; padding:12px 16px; }
```

- Keep: overlayed info panels, one blue, 48px pill controls.
- Adapt: raise the address text to at least 12px for legibility.
- Use real high-quality architectural photos; the photography carries the colour.

## Avoid

- Putting card text below the image on white; the overlay is the recognisable move.
- Blue filled headers or sidebars; blue must stay a small-area accent.
- Mixing radius values (keep 16 outer / 12 inner / pill).
- Low-quality or inconsistent photos; the neutral UI exposes them.
