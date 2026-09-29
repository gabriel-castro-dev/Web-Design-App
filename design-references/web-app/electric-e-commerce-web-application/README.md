# Electric E-Commerce Web Application

- **Section:** web-app
- **Subtype:** ecommerce
- **Kind:** image (static reference, no code)
- **Source:** https://dribbble.com/shots/27673911-Electric-E-Commerce-Web-Application
- **Files:** `preview.webp`

## Overall style

A bright, retail-first electronics marketplace home page built on white with a single loud vermilion orange (#F44322) doing all the brand work. It reads like a quick-commerce storefront (same-day delivery, "ready in 20 min") rather than a luxury tech shop: urgent, practical and very legible. What makes it distinctive is the mix of a full-bleed orange trust bar, pill-heavy controls and flat pale-gray (#F6F5F8) panels with no shadows, so product photography carries all the depth.

## Layout

- Full-bleed orange top strip (~88px tall at 1440 width) with 4 centered trust badges (outlined circle icon + label), evenly spaced.
- White header row (~86px) inside a ~1184px centered container: hamburger + wordmark, a Delivery/Pickup segmented pill, a location picker (pin icon + postcode + chevron), a wide pill search field, then a round cart button, underlined "Become a Seller" text link and an orange "Sign up" pill on the right. A 1px hairline separates header from body.
- A centered, underlined orange countdown line ("Order by 7:00 PM for delivery today - 01:00:37 left") sits in its own band with a hairline below.
- Hero row: two columns at roughly 66/34. Left is a large flat gray panel with centered headline, subline, two buttons and a hero product photo bleeding off the bottom edge. Right is an "In Stock 5 Min" list with a "Refresh" link and 4 stacked horizontal product rows.
- A horizontal row of filter pills (first one active in solid orange) spans the container, then a hairline, then "Shop by Category" with a row of 9 circular icon tiles.
- Generous horizontal whitespace, moderate vertical density; everything left-aligns to the container edge except the hero copy, which is centered.

## Color palette

| Role | Hex | Usage |
| --- | --- | --- |
| Page background | #FFFFFF | Header, body, filter row |
| Canvas outside browser | #DADEEA | Dribbble presentation backdrop only, not part of the UI |
| Panel surface | #F6F5F8 | Hero panel, product rows, search field fill |
| Neutral button fill | #EAEAEA | Secondary "Book a Delivery Slot" button |
| Primary accent | #F44322 | Trust bar, primary buttons, active pills, logo, category icons, links |
| Accent text on white | #D1381E to #EA4B2C | Underlined countdown and "Ready in" links |
| Accent tint | #FFD1C4 | Soft fills behind category icons (very light peach) |
| Heading text | #011C1E | Section titles, near-black with a teal-navy cast |
| Body text | #28272A | Product names |
| Muted text | #555A5B | Meta lines (distance, seller tier), filter labels |
| Placeholder / tertiary | #707070 | Search placeholder, ghost button labels |
| Rating star | #FEB032 | Star icon and rating number |
| Borders | #E6E6E8 (est.) | Pill outlines, hairline dividers |

## Typography

- Rounded geometric grotesk, likely Plus Jakarta Sans or Manrope (Inter would be an acceptable fallback). The hero headline uses the product's own brand type (SF Pro style, bold + regular mix) inside the panel.
- Sizes at 1440 width: hero headline ~46px mixed bold/regular uppercase; hero subline ~28px regular; section titles ~22px medium; product name ~16px medium; meta ~14px regular; pills and buttons ~16px regular; trust bar ~16px regular in white.
- Weights stay light: mostly 400 and 500. Only the hero headline goes bold.
- Sentence case for UI, title case for product names and trust badges. No letter-spacing tweaks except the hero headline, which is slightly tight.

## Components & patterns

- **Trust bar badges:** 44px white-outlined circles with a white cart glyph, label to the right in white regular text.
- **Segmented toggle:** pill container with a pale border; active segment is a solid orange pill with white text, inactive is plain text.
- **Search:** full pill, #F6F5F8 fill or 1px light border, orange outline search icon at left, gray placeholder.
- **Buttons:** primary is solid orange with white text, ~6px radius in the hero and fully rounded in the header. Secondary is flat #EAEAEA with gray text. No shadows on any button.
- **Product rows:** #F6F5F8 card, ~8px radius, no border or shadow, 80x96px product image on its own dark or tinted tile at left, name, star + rating + distance + seller tier, then a ghost "See seller" pill (white fill, faint border) and an underlined orange "Ready in - 20 Min" link.
- **Filter pills:** 44px tall, fully rounded, 1px light gray border, label + small chevron. The active one is solid orange with white text and no chevron.
- **Category tiles:** 100px circles with pale gray fill and a chunky filled orange glyph (appliances, laptop, phone, headphones, charger, watch, tablet).
- **Icons:** simple line icons in the header (pin, search, cart), filled flat glyphs for categories. All in orange or dark text color.

## Signature details

1. One saturated vermilion (#F44322) used for everything interactive and for the full-width trust bar, with no second accent color.
2. Urgency copy styled as underlined orange links (countdown, "Ready in - 45 Min") instead of badges or chips.
3. Flat #F6F5F8 panels with zero shadow and zero border; separation comes only from the tint and hairline dividers.
4. Nearly every control is a pill: segmented delivery toggle, search, cart button, sign up, filters.
5. Split hero: a big editorial product panel next to a compact live "In Stock 5 Min" list, mixing brand storytelling with quick-commerce utility.
6. Category row as big pale circles with bold filled orange pictograms.

## Reproduce it

```css
--bg: #ffffff;
--panel: #f6f5f8;
--accent: #f44322;
--accent-ink: #d9391c;
--accent-tint: #ffe3da;
--ink: #011c1e;
--text: #28272a;
--muted: #555a5b;
--line: #e6e6e8;
--star: #feb032;
--radius-panel: 8px;
--radius-btn: 6px;
--radius-pill: 9999px;
--container: 1184px;
```

- Spacing on a 4/8 scale: 16px inner card padding, 12px gaps between product rows, 24px between filter pills, 32 to 48px between sections.
- Text: `text-[22px] font-medium` for section titles, `text-base font-medium` for item names, `text-sm text-[--muted]` for meta.
- Links: `text-[--accent] underline underline-offset-2` for time-sensitive info.
- Keep: the single-accent discipline, pill filters, flat panels, underlined urgency links, the trust bar.
- Adapt: swap the orange for the new brand hue but keep it high-chroma and alone; replace product photos with your own catalog but keep them on their own tinted image tiles.

## Avoid

- Adding drop shadows or gradients to cards; the look relies on flat tints.
- Introducing a second bright color (blue links, green success chips) that competes with the orange.
- Heavy bold typography everywhere; this design keeps UI text at 400/500.
- Replacing the underlined urgency links with generic red badges.
- Shrinking whitespace into a dense grid of identical product cards; the hero split and filter row need air.
