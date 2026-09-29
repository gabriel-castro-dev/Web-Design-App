# Sewo Real Estate Login

- **Section:** auth
- **Subtype:** login
- **Kind:** image (static reference, no code)
- **Source:** https://dribbble.com/shots/27645188-Web-Application-Login-Sewo
- **Files:** `preview.webp`

## Overall style

A crisp real-estate login in royal blue and white, shown on desktop and mobile. The left half is a marketing panel with an architecture photo that has one rounded-off corner and a floating search widget overlapping it; the right half is a plain, well-spaced form. Navy headings, a single saturated blue for actions and very quiet gray elsewhere make it clean and trustworthy.

## Layout

- Desktop frame with ~40px radius and a light-blue bezel (`#a2c1f6`) floating over a flat royal blue backdrop (`#4974e9`); mobile screen overlaps the frame's right edge.
- 50/50 split: left panel `#fafafa`, right panel `#ffffff`, no divider except the tone change.
- Header: logo "SEWO" top-left in the left panel, text "Login" link top-right.
- Left: portrait photo (~330x475) with the bottom-right corner cut into a large quarter-circle (~120px radius); a white floating search card (3 selects + Search button) overlaps the photo's right edge; below, H2 "Find your sweet home", 2-line muted subtitle and a carousel indicator (long active bar + 2 dots).
- Right: form column ~410px wide, vertically centered: H1, subtitle, email, password, remember/forgot row, full-width Login button, "Instan Login" divider, two social buttons side by side, footer "Don't have any account? Register".
- Mobile: same form stacked, social buttons become icon-only squares.

## Color palette

| Role | Hex | Usage |
|---|---|---|
| Backdrop | `#4974e9` | Presentation background |
| Bezel | `#a2c1f6` | Device frame edge |
| Left panel | `#fafafa` | Marketing half |
| Surface | `#ffffff` | Form half, inputs, cards |
| Heading navy | `#16214c` | H1, H2, logo text tone |
| Text body | `#313133` | Input values, labels, select text |
| Text muted | `#949daf` | Subtitles, placeholders, "Forgot Password?", footer |
| Primary blue | `#4974e9` | Login + Search buttons, checkbox, "Register" link, active carousel bar, logo mark |
| Carousel dot idle | `#bdccfe` | Inactive dots |
| Input border (focused) | `#2b2d42` | Active email field |
| Input border (idle) | `#d7dae0` | Password field, selects |
| Divider / social border | `#eff1f3` | "Instan Login" rule, social buttons |

## Typography

- Geometric sans with a friendly touch, likely **Gilroy** or **Outfit**; **Plus Jakarta Sans** is a close free fallback.
- H1 "Welcome Back to Sewo!" ~36px bold navy; H2 "Find your sweet home" ~48px semibold navy; subtitles 14px (form) and 20px (hero) regular muted.
- Labels 14px regular dark; inputs 16px medium; button 18px medium white; small links 13px.
- Sentence case, normal tracking.

## Components & patterns

- **Inputs:** 48px tall, white, 1px border, ~6px radius; focused one has a dark near-black border (no glow); password field has an eye icon right.
- **Checkbox:** 14px, filled blue with white check, rounded 3px.
- **Primary button:** full width, 48px, solid blue, ~6px radius, white medium label, no shadow.
- **Divider with text:** thin gray lines left and right of a muted centered caption.
- **Social buttons:** white, 1px very light border, soft shadow, ~6px radius, brand logo + muted label.
- **Floating search card:** white, ~12px radius, soft shadow `0 20px 40px rgba(22,33,76,.10)`; each row has a 36px outlined icon square + an outlined select with chevron; blue Search button full width.
- **Photo:** straight edges except one large quarter-circle rounded corner (bottom-right).
- **Carousel indicator:** 44x6px blue pill + two 6px pale-blue dots.

## Signature details

1. The photo with a single oversized rounded corner, overlapped by a floating functional widget (real product UI inside the marketing panel).
2. Two-tone split using `#fafafa` vs `#ffffff` only, no borders or color blocks.
3. Focused input shown with a dark ink border instead of a blue glow.
4. Royal blue used both as backdrop and as the only interactive color, tying brand to UI.
5. Navy headings rather than black, softening the contrast against white.

## Reproduce it

```css
--bg-left: #fafafa; --surface: #fff; --heading: #16214c; --text: #313133;
--muted: #949daf; --primary: #4974e9; --primary-soft: #bdccfe;
--border: #d7dae0; --border-focus: #2b2d42; --divider: #eff1f3;
--r-input: 6px; --r-card: 12px; --r-frame: 40px;
--shadow-float: 0 20px 40px rgba(22,33,76,.10);
font-family: "Outfit", "Plus Jakarta Sans", system-ui;
```

- Form width 400 to 420px; vertical rhythm 24px between fields, 36px before the button.
- Keep: split layout, photo + floating widget, one blue, dark focus border.
- Adapt: replace the property search widget with a mini widget from your own product.

## Avoid

- Gradient buttons or glowing focus rings.
- Filling the left panel with the brand blue; it must stay near-white so the photo leads.
- Generic stock illustration instead of real photography.
- Pill-shaped inputs; the system uses small 6px radii.
- More than one accent color.
