# Fillo Sports Car Rental

- **Section:** web-app
- **Subtype:** booking
- **Kind:** image (static reference, no code)
- **Source:** https://dribbble.com/shots/21384305-Sports-Car-Rental-Platform
- **Files:** `preview.webp`

## Overall style

A bold, consumer-grade rental marketplace: a near-black navy header band, a white search console that overlaps it with a large rounded top edge, and big pastel-tinted car cards where cut-out car photos sit over faint oversized brand wordmarks. Chunky geometric type and bright electric-blue CTA make it feel energetic and premium-automotive rather than corporate.

## Layout

- Shown in a tilted Safari window (perspective presentation, rotated ~-5deg).
- Header band `#040820` (~160px): logo left, nav with icons (Home active as a white pill, Cars, Dealers, Message with green "10+" badge, History), right side a green circular "+" button, bell with green dot, avatar pill.
- The white content sheet starts with a large top-left radius overlapping the header. First block: H1 "Drive the Car of your dreams" above a four-field search console (Car brand, Car model, Pickup location, Pick up & return date), with a tall blue "Search" button attached on the right.
- Below, on a very light grey section: "Popular Cars" heading with a fire emoji, "See All Collection" link right, and a horizontal row of large cards (~600px wide each, 3 visible, last one clipped).
- Then "Our Collection" with smaller white cards (title, trim, bookmark icon).

## Color palette

| Role | Hex | Usage |
| --- | --- | --- |
| Header | `#040820` | Top nav band |
| Surface | `#FFFFFF` | Content sheet, search console |
| Section bg | `#F9FBFC` | Behind card rows |
| Card lilac-grey | `#ECF0F8` | Porsche card |
| Card ice blue | `#E8F0FC` | Nissan card |
| Card blush | `#F8DCE8` | Chevrolet card |
| Card footer | `#E4E8F0` | Slightly darker band at the bottom of each card |
| Primary blue | `#405CF0` | Search button, "See All" links |
| Green | `#3C9038` | "+" action, message badge, notification dot |
| Verified | `#20A0E8` | Verified check badges |
| Text | `#0C0E14` | Headings, prices |
| Muted | `#6E7078` | Field labels, trims, "/day" |
| Border | `#E6E8EE` | Console field dividers and outline |

## Typography

- Wide geometric sans with heavy weights, likely **Gilroy / Clash Grotesk / Plus Jakarta Sans ExtraBold**.
- H1 ~36px bold; section headings ~40px bold; car name ~30px semibold; price ~32px bold with a light "/day" suffix at ~20px; nav 20px medium.
- Field labels uppercase ~14px, muted, small tracking; field values ~24px medium.
- Watermark text: huge (~120px) bold uppercase brand names at ~4-6% opacity behind the car images.

## Components & patterns

- **Nav:** icon + label items in light grey on navy; active item is a white pill (radius 24px) with navy icon and text.
- **Search console:** single white container (radius ~24px, 1px border) split into four fields by vertical dividers; each field has an uppercase label and large value with a chevron or calendar icon. The Search button is a separate tall block (radius 24px) in electric blue with a search icon.
- **Popular car cards:** radius ~28px, pastel fill per card; top: brand logo + name + trim, and a white pill tag at the top-right ("2 Unit available", "Arriving Soon"); middle: a cut-out car photo overlapping a giant faint brand wordmark; bottom: a darker footer band with dealer/owner avatar, name, verified badge + role, and the price per day right-aligned.
- **Collection cards:** white, radius 20px, title + trim, outline bookmark icon (filled when saved).
- **Badges:** green pill "10+" floating above the Message nav item.

## Signature details

1. Giant faint brand wordmarks behind cut-out car photos, like automotive poster art.
2. Each featured card has its own pastel tint, keyed loosely to the car's colour.
3. The white content sheet overlapping the navy header with a big rounded corner.
4. A segmented search console with uppercase micro-labels and large values, plus a detached tall CTA.
5. Price typography: heavy number with a thin "/day" suffix.

## Reproduce it

```css
--header: #040820; --surface: #FFFFFF; --section: #F9FBFC; --line: #E6E8EE;
--primary: #405CF0; --green: #3C9038; --verified: #20A0E8;
--text: #0C0E14; --muted: #6E7078;
--tint-1: #ECF0F8; --tint-2: #E8F0FC; --tint-3: #F8DCE8; --card-foot: rgba(0,0,0,.03);
--radius-sheet: 40px; --radius-card: 28px; --radius-console: 24px; --radius-pill: 9999px;
.watermark { font: 800 120px/1 var(--font); text-transform: uppercase; opacity: .05; position:absolute; }
```

- Use transparent PNG cut-outs with a soft ground shadow for vehicles (or any product).
- Keep: pastel per-card tints, watermark text, navy header with overlapping sheet.
- Adapt: the watermark works for any branded product (sneakers, bikes, gadgets).

## Avoid

- Car photos with backgrounds; the cut-outs on flat pastel are essential.
- Saturated card fills; tints must stay under ~10% saturation.
- Small, light type; the style depends on chunky, heavy headings.
- Too many accent colours: blue for primary, green only for "add" and badges.
