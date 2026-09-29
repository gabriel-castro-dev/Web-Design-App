# Glass Card Login on Lavender Night Photo

- **Section:** auth
- **Subtype:** login
- **Kind:** image (static reference, no code)
- **Source:** https://i.pinimg.com/originals/eb/e1/b8/ebe1b853303e655311258157895948df.jpg
- **Files:** `preview.webp`

## Overall style

A calm, meditative login for a wellness/meditation product: a single frosted-glass card floats over a full-bleed twilight photo of lavender fields under a starry sky. The whole palette is pulled from the photo (indigo, violet, lavender), and the only bright surface is a white pill "Log In" button. It feels soft, premium and atmospheric, with the image doing the branding.

## Layout

- Full-bleed background photo, no header or footer.
- One centered card (~530x670 at 1200px, ~44% width), top and bottom margins ~48px, so the card nearly fills the viewport height.
- Card content column ~400px, centered: logo mark, two-tone H1, 2-line subtitle, Email field, Password field, remember/forgot row, primary button, "Or" divider, Google button, footer link.
- Vertical rhythm ~24 to 32px between groups, labels 10px above inputs.

## Color palette

| Role | Hex | Usage |
|---|---|---|
| Photo sky | `#203170` → `#46408f` | Background (starry indigo to violet horizon) |
| Photo field | `#5a4fc0` / `#121943` | Lavender rows and shadows |
| Card glass | `rgba(40,44,82,0.72)` (~`#383e64` rendered) | Frosted card fill with backdrop blur |
| Card border | `rgba(255,255,255,0.14)` | 1px card edge |
| Text primary | `#ffffff` | "Welcome", button labels, links |
| Accent word | `#cfc8ff` | "back!" in the headline |
| Text soft | `#d7dbfb` at ~80% | Subtitle, labels, "Or", footer copy |
| Input fill | `rgba(255,255,255,0.04)` | Transparent pill inputs |
| Input border | `rgba(255,255,255,0.28)` (~`#6e6c91`) | Idle inputs, Google button |
| Focus violet | `#8a74f5` | Focused input border + faint glow, checkbox fill (`#7755ee`) |
| Button white | `#f5f5f5` | Primary pill button |
| Button text | `#1f1f2e` | "Log In" |

## Typography

- Neo-grotesk, likely **Inter** or **Geist** (possibly **Suisse Int'l**).
- H1 ~46px regular, tight tracking (-0.02em), two-tone: "Welcome" white, "back!" pale lavender.
- Subtitle 14px regular, soft lavender-white, centered, 1.5 line height.
- Labels 10px regular; input text/placeholder 14px; button 14px medium; small links 12px.
- No bold anywhere; hierarchy by size and color only.

## Components & patterns

- **Glass card:** ~24px radius, translucent indigo fill, `backdrop-filter: blur(24px) saturate(120%)`, 1px white-alpha border, soft outer shadow.
- **Logo mark:** thin circle with a dashed/segmented outer ring, white line art.
- **Inputs:** 48px tall, full pill (~24px radius), transparent fill, 1px white-alpha border, left padding 16px; password has an eye icon right.
- **Focus state:** border switches to violet with a faint violet outer glow (`0 0 0 3px rgba(138,116,245,.25)`).
- **Checkbox:** 16px, 4px radius, filled violet with white check.
- **Primary button:** full-width white pill, dark label, no shadow.
- **Divider:** hairline white-alpha lines left/right of a small "Or".
- **Google button:** outlined pill (same border as inputs), colored Google "G" + white label.
- **Footer:** muted "Don't have an account?" + white "Sign Up".

## Signature details

1. Two-tone headline with the second word in pale lavender tinted from the photo.
2. Inverted primary: a white pill button on a dark glass card instead of a colored CTA.
3. Transparent pill inputs that let the blurred photo show through.
4. Violet focus ring as the only saturated UI color, echoing the lavender field.
5. Photography chosen to match the brand hue exactly, so the card feels part of the scene.

## Reproduce it

```css
.bg { background: url(night-lavender.jpg) center/cover; }
.card { width: min(530px, 100% - 32px); border-radius: 24px; padding: 40px 64px;
  background: rgba(40,44,82,.72); border: 1px solid rgba(255,255,255,.14);
  backdrop-filter: blur(24px) saturate(120%); box-shadow: 0 30px 80px rgba(8,10,40,.45); }
.input { height: 48px; border-radius: 999px; background: rgba(255,255,255,.04);
  border: 1px solid rgba(255,255,255,.28); color: #fff; }
.input:focus { border-color: #8a74f5; box-shadow: 0 0 0 3px rgba(138,116,245,.25); }
.btn-primary { height: 48px; border-radius: 999px; background: #f5f5f5; color: #1f1f2e; }
h1 { font: 400 46px/1.1 "Inter", sans-serif; letter-spacing: -.02em; }
h1 .accent { color: #cfc8ff; }
```

- Keep: single centered glass card, white pill CTA, two-tone headline, hue-matched photo.
- Adapt: pick a photo whose dominant hue becomes your accent; derive the accent word and focus color from it.

## Avoid

- Random stock photos that do not match the UI hue.
- Heavy blur that turns the background into mush; keep the photo recognizable around the card.
- A colored gradient CTA; the white pill is the key contrast move.
- Bold headlines; regular weight keeps it serene.
- Adding extra panels, testimonials or navigation around the card.
