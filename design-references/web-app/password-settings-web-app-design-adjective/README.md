# Password Settings

- **Section:** web-app
- **Subtype:** settings
- **Kind:** image (static reference, no code)
- **Source:** https://dribbble.com/shots/27614968-Password-Settings-Web-App-Design-Adjective
- **Files:** `preview.webp`

## Overall style

A clean, Untitled-UI-flavoured settings page: white canvas, slate text, hairline inputs and a near-black primary button. The one expressive move is a pale iridescent mesh gradient (sky blue, lilac, pink) washing across the top-right of the content area behind the "Where you're logged in" panel, which gives an otherwise utilitarian form a soft, premium glow.

## Layout

- Presented in a device-like frame: a dark navy bezel (`#0C1824`) with a large top-left radius on a light grey textured backdrop.
- Header strip (~100px) on `#F9FBFC`: square back-arrow button, page title "Profile settings" (~28px), right-aligned bell button and user chip (avatar with status dot, name, role).
- Body is three columns: a narrow text nav (~180px, starts ~110px from the left edge), the password form (~550px), and a sessions list (~430px). Wide gutters (~70px) between columns.
- Form stack: section title + description, divider, three labelled inputs with 24px spacing, helper text under "New password", divider, right-aligned Cancel / Update password.
- Sessions list: heading, description with an inline bold email, then repeating rows (device icon, device name, location • timestamp) separated by hairlines, overflowing below the fold.

## Color palette

| Role | Hex | Usage |
| --- | --- | --- |
| Stage | `#ECECEC` | Page behind the device frame |
| Bezel | `#0C1824` | Device frame border |
| Header | `#F9FBFC` | Top header strip |
| Surface | `#FFFFFF` | Content area, inputs |
| Gradient sky | `#E0F4FC` | Mesh gradient, top-centre |
| Gradient lilac | `#E8D4F8` | Mesh gradient, top-right |
| Gradient pink | `#FCE8F0` | Mesh gradient, right edge fading down |
| Primary / ink | `#101828` | Titles, primary button fill, "Coming soon" badge |
| Body text | `#344054` | Labels, device names |
| Muted | `#667085` | Descriptions, nav items, metadata |
| Border | `#D0D5DD` | Input and secondary button borders |
| Divider | `#EAECF0` | Section and row separators |
| Nav active bg | `#F9FAFB` | Selected nav item ("Password") |
| Success | `#079455` | "Active now" outline pill text/border and dot |

## Typography

- Neutral grotesk, likely **Inter** (Untitled UI default); alternatives: Geist, SF Pro.
- Page title ~28px semibold; section title "Password" ~32px semibold; panel title ~20px semibold.
- Body 16px regular for descriptions, 14px medium for labels, 14px for nav and helper text.
- Sentence case throughout; the only uppercase is the tiny "COMING SOON" badge (8-9px, bold, tracking +0.04em).

## Components & patterns

- **Back button:** 48px square, white, 1px border, 10px radius, left arrow.
- **Side nav:** plain text list, 14px medium muted; active item gets a very light grey fill (radius 6px) and darker text. Inline dark pill badge "COMING SOON".
- **Inputs:** 48px tall, 1px `#D0D5DD` border, 8px radius, subtle `0 1px 2px rgba(16,24,40,.05)` shadow, masked dots, an eye-off icon at the right on the first field.
- **Helper text:** 14px muted under the field.
- **Buttons:** secondary "Cancel" white with border; primary "Update password" filled `#101828` with white 14px semibold text, radius 8px, tiny inner highlight.
- **Session rows:** 24px outline device icons (monitor / phone), name 16px medium, meta 16px muted with a bullet separator; the current session carries a green outlined pill "● Active now".
- **User chip:** 40px avatar with a small green online dot, two-line name/role.
- **Kebab menu** vertical dots at the panel's top-right.

## Signature details

1. The pastel mesh gradient bleeding from the header line into the right column, behind real content, fading to white before the form.
2. Near-black (`#101828`) as the primary action colour instead of a brand blue.
3. Dark device bezel with a single oversized corner radius, cropping the UI like a physical screen.
4. Outline-style success pill ("Active now") rather than a filled chip, keeping the list calm.
5. Plain text side nav with no icons, which keeps the settings area editorial.

## Reproduce it

```css
--surface: #FFFFFF; --header: #F9FBFC; --ink: #101828; --text: #344054;
--muted: #667085; --border: #D0D5DD; --divider: #EAECF0; --success: #079455;
--radius-input: 8px; --radius-btn: 8px; --input-h: 44-48px;
--shadow-xs: 0 1px 2px rgba(16,24,40,.05);
.glow { background:
  radial-gradient(40% 60% at 55% 0%, #E0F4FC 0%, transparent 70%),
  radial-gradient(35% 55% at 85% 5%, #E8D4F8 0%, transparent 70%),
  radial-gradient(30% 60% at 100% 30%, #FCE8F0 0%, transparent 70%); }
```

- Spacing: 24px between fields, 32px between sections, 20px row padding in lists.
- Keep: the ink primary, hairline inputs, one ambient gradient.
- Adapt: tint the gradient toward your brand hues, but keep it under 15% saturation.

## Avoid

- Making the gradient saturated or placing it behind the form fields; it must stay a faint ambient wash.
- Adding icons to every nav item or card borders around the form; the page relies on whitespace and dividers.
- Coloured primary buttons plus coloured badges plus gradient; pick one accent source.
- Tall, pill-shaped inputs; these are standard 8px-radius fields.
