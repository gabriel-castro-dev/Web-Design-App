# Bazarsip Streetwear Store

- **Section**: web-app
- **Subtype**: ecommerce
- **Kind:** image (static reference, no code)
- **Source:** https://dribbble.com/shots/27330013-Bazarsip-E-Commerce-Web-Application
- **Files:** `preview.webp`

## Overall style

A black-and-white streetwear storefront shown as two tilted, overlapping screens (product detail page and home with hero banner) on a dark slate backdrop. The UI is intentionally neutral: a black top nav, a cool off-white page, white product cards and pill-shaped black "Add to Cart" buttons. The editorial photography supplies all the color. Wide uppercase product names give it a fashion-label feel.

## Layout

- **Top nav**: black bar, italic script-like wordmark "Bazarsip" at left, then small uppercase links (ALL PRODUCTS, CATEGORIES v, MEN, WOMEN, KIDS), a long white pill search field, and on the right wishlist heart, cart with a count badge and a circular avatar.
- **Home**: full-bleed photo hero with a small "NEW COLLECTION" eyebrow, a huge two-line headline mixing weights ("**Bold** Looks. **Unapologetic** Style."), one line of body copy, slide indicators (thin lines) and circular prev/next arrows. Below it, a "More products ->" link and a horizontal product carousel.
- **Product detail**: breadcrumb (Home > All Product > Men > Accessories > Watch), a large rounded product image (~45% width) with a row of 4 square thumbnails beneath, and to the right: uppercase product title, price, a 3-line description, two equal black buttons (Add to Wishlist, Add to Cart), then "Specifications" with a one-line spec list.
- **"You may also like"**: grid of 4 cards per row, each a white card containing a tall rounded photo, a category badge overlay top-left, a heart top-right, name + price row and a full-width black pill button.

## Color palette

| Role | Hex | Usage |
|---|---|---|
| Backdrop | `#242A2E` | Dark slate presentation background |
| Nav / buttons | `#141014` | Top nav bar, primary pill buttons |
| Page background | `#F8F9FD` | Cool off-white body |
| Card | `#FFFFFF` | Product cards, search field |
| Badge overlay | `#C2C3C7` at ~60% alpha | "SHOES" / "MEN'S WEAR" tags on images |
| Text | `#0E0D12` | Titles, prices |
| Muted text | `#5A5A60` | Descriptions, breadcrumb |
| Inverse text | `#FFFFFF` | Nav links, button labels, hero headline |
| Cart badge | `#FFFFFF` on black ring | Item count bubble |

## Typography

- Geometric sans, very likely **Poppins** (perfectly round "o", geometric "g" and "y", wide caps).
- Hero headline ~72px, mixing 700 and 300 weights word by word, tight tracking (`-0.02em`).
- Product title ~22px/500 UPPERCASE with wide tracking (`0.08em`); card product names ~13px/400 uppercase tracked.
- Price "Rp. 845.000" ~20px/500; card prices ~13px/400.
- Nav links ~11px/500 uppercase, tracked `0.06em`. Body ~13px/400 Title Case.
- Wordmark: italic, slightly condensed sans.

## Components & patterns

- **Primary pill button**: black fill, full radius (or ~22px), 44px tall, white outline bag or heart icon + label, full width inside cards.
- **Search**: white pill field (~44px), placeholder "Search Product", magnifier at the right end.
- **Product card**: white, ~16px radius, ~12px inner padding, very soft or no shadow; image with ~12px radius and a greyish studio background; translucent frosted category tag (full radius, uppercase 10px) and a white outline heart at the image corners.
- **Gallery**: main image 16px radius, thumbnails ~100px squares with 12px radius and ~16px gaps.
- **Carousel controls**: 40px circles, one white with a dark arrow and one translucent grey.
- **Slide indicator**: thin 2px horizontal lines, active one longer/darker.
- **Icons**: thin outline set (heart, bag, search) in 1.5px stroke.

## Signature details

1. Uppercase, widely tracked product names that read like garment labels.
2. Hero headline alternating heavy and light weights within one sentence.
3. Black full-width pill "Add to Cart" in every card, giving a strong repeating horizontal rhythm.
4. Frosted translucent category tags laid over product photos.
5. A strictly black/white UI that hands all color to street photography.
6. Presentation: two screens tilted ~15 degrees and overlapped on a dark slate backdrop.

## Reproduce it

- Tokens: `--ink:#141014; --page:#F8F9FD; --card:#FFF; --text:#0E0D12; --muted:#5A5A60; --tag: rgba(200,200,205,.6)`.
- Font: `Poppins`; nav `11px/500 uppercase .06em`; title `22px/500 uppercase .08em`; hero `72px` mixing `700` and `300`.
- Radii: cards 16px, images 12px, buttons and search full.
- Card: `background:#fff; border-radius:16px; padding:12px; box-shadow: 0 2px 12px rgba(20,16,20,.04)`.
- Tag: `backdrop-filter: blur(6px); background: rgba(255,255,255,.35); color:#fff; font: 500 10px/1 Poppins; text-transform: uppercase; padding:4px 10px; border-radius:999px`.
- Keep: monochrome chrome, uppercase tracked names, photography-first. Adapt: currency format and category set.

## Avoid

- Adding a brand accent color to buttons or prices; black is the brand.
- Stock "flat product on white" shots only; the look depends on moody editorial imagery.
- Rounded bubbly type (Nunito) or default Inter; keep the geometric Poppins-like character.
- Discount badges in red, star ratings and dense filters; this design is calm and editorial.
- Heavy drop shadows on cards.
