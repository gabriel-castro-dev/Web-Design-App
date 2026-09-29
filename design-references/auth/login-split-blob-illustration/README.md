# Blob Illustration Split Login

- **Section:** auth
- **Subtype:** login
- **Kind:** image (static reference, no code)
- **Source:** https://i.pinimg.com/1200x/33/b2/a3/33b2a3fe3319c92a6b3b170485197587.jpg
- **Files:** `preview.webp`

## Overall style

A seasonal campus Wi-Fi login with a storybook feel: an organic white blob carves the card into an illustrated left side and a deep forest-green form side. Floating translucent bubbles, a soft mint "snow globe" behind a flat Christmas-tree illustration and dark recessed pill inputs make it gentle and whimsical. The palette is almost monochrome green with one muted teal for the action.

## Layout

- Card (~900x560 in a 1000px shot, ~36px radius) centered on a dark green backdrop with larger blurred organic shapes and bokeh bubbles.
- The card is split by a freeform S-curve: left ~60% is white with the institution logo top-left, the illustration centered and a copyright line bottom-left; right ~40% is dark green with the form.
- Form column ~195px wide, left-aligned inside the green area, vertically centered: H1 "Login", Username label + input, Password label + input, right-aligned "Forgot Password?", full-width button, centered "Don't have an account? Register Now", "Terms and Services" lower down, contact line bottom-right.
- Sparse; lots of empty space around both halves.

## Color palette

| Role | Hex | Usage |
|---|---|---|
| Backdrop green | `#2e4e3e` | Page background |
| Backdrop shapes | `#3d685e` | Large blurred blobs behind the card |
| Form panel | `#2b4b3c` → `#335746` | Right side of card (subtle gradient/lighting) |
| Blob white | `#f8fdff` | Left organic panel |
| Illustration mint | `#cbe0de` / `#e7f2f3` | Glow blob and bubbles behind illustration |
| Illustration green | `#39614b` | Tree, leaf |
| Input fill | `#1f332a` | Recessed dark pill inputs |
| Text on dark | `#ffffff` | Heading, labels, body |
| Placeholder | `#b7c4bd` | Input placeholder |
| Primary teal | `#5d9fa0` | "Login to Wifi" button |
| Link | `#7fb6c2` | Forgot password, Register Now, Terms, email (underlined) |
| Logo blue | `#2a7fc0` | Institution logo on white side |
| Highlights | `#fbe679` / `#f07a6a` | Tree star, ornaments (illustration only) |

## Typography

- Humanist sans, likely **Source Sans Pro** / **Nunito Sans**.
- H1 "Login" ~34px semibold white; labels 15px medium white; inputs and button 14px regular; small links 10px underlined; legal text 8px.
- Sentence case, normal tracking.

## Components & patterns

- **Organic divider:** a single large freeform blob shape (SVG path) defines the white panel; it bulges into the green area near the top and recedes at the bottom.
- **Bubbles:** semi-transparent white/mint circles of varied sizes (8 to 60px) scattered over both the illustration area and the backdrop, some with soft blur.
- **Illustration:** flat vector scene (tree, kids, snowman, gift box) with subtle drop shadows, sitting inside a mint circular glow with soft inner shading.
- **Inputs:** 30px tall (at 1000px), full pill, dark green fill darker than the panel, no border, light placeholder, left padding 16px.
- **Button:** full-width pill, flat teal fill, white label, no shadow.
- **Links:** light teal, underlined, small.
- **Card:** large radius, soft shadow, sits above bokeh background.

## Signature details

1. Freeform blob split instead of a straight 50/50 divider.
2. Dark recessed pill inputs, darker than their panel, with no borders.
3. Floating translucent bubbles tying the card to the bokeh backdrop.
4. Near-monochrome green palette with a single desaturated teal CTA.
5. Illustration set on a soft mint halo, so it reads as a glowing vignette.

## Reproduce it

```css
--bg: #2e4e3e; --panel: #2b4b3c; --blob: #f8fdff; --mint: #cbe0de;
--input: #1f332a; --text: #fff; --placeholder: #b7c4bd;
--cta: #5d9fa0; --link: #7fb6c2;
--r-card: 36px; --r-pill: 999px;
--shadow-card: 0 30px 60px rgba(10,30,20,.35);
font-family: "Source Sans 3", "Nunito Sans", system-ui;
/* Blob: absolutely positioned SVG path clipped to the card; bubbles: circles with rgba(255,255,255,.35) + blur(1px) */
```

- At 1440px: inputs 44px tall, button 48px, form width ~340px, H1 44px.
- Keep: organic split, dark recessed inputs, bubble motif, monochrome palette.
- Adapt: replace the seasonal illustration with brand art; the halo + bubbles can stay year-round.

## Avoid

- A straight vertical split; the blob is the whole idea.
- Light inputs with borders on the dark side.
- A bright saturated CTA (keep the teal muted).
- Too many bubbles or sharp-edged decorations that clutter the form side.
- Tiny unreadable link text in production; the reference is small, scale it up.
