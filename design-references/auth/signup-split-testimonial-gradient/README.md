# Orange Gradient Signup with Testimonial Panel

- **Section:** auth
- **Subtype:** signup
- **Kind:** image (static reference, no code)
- **Source:** https://i.pinimg.com/736x/f9/27/14/f92714cb5c0a87b03698ef00d9c45649.jpg
- **Files:** `preview.webp`

## Overall style

A warm, modern SaaS sign-up for a design-resources product: an off-white card on a glowing tangerine gradient, a compact form on the left and a blurred abstract warm-gradient image on the right carrying a frosted testimonial. The orange runs from background into the CTA and the image, so the page feels unified and energetic without extra decoration. The notched corner that cradles the carousel arrows is the memorable detail.

## Layout

- Portrait shot (736x1307): card (~680x560) sits in the middle third and bleeds off the right edge, on a full-bleed orange radial gradient.
- Card: ~28px radius, off-white `#fffcf9`, ~44px padding.
- Two columns: form ~258px wide on the left; image panel ~330px on the right, inset ~38px from the card top with its own ~20px radius.
- Form stack: brand bolt icon, H1 "Create an account", 2-line muted subtitle, Name, Email, Password (labels above inputs), gradient "Create account" button, "OR" divider, a row of 3 equal social icon buttons, "Already have an account? Log in".
- Image panel: two outlined tag chips over the image, a frosted quote card, author name/role, and a notch cut from the bottom-right corner that holds two square arrow buttons.

## Color palette

| Role | Hex | Usage |
|---|---|---|
| Backdrop glow | `#ff8d58` | Top-center radial highlight |
| Backdrop base | `#f15a30` | Edges and bottom of gradient |
| Card surface | `#fffcf9` | Warm off-white card |
| Input fill | `#ffffff` | Inputs, social buttons |
| Input border | `#ebe7e2` | 1px borders |
| Text primary | `#1d1d1d` | H1, labels |
| Text muted | `#7a7773` | Subtitle, placeholders |
| CTA gradient | `#f27b47` → `#ee5d2e` | Create account button (top to bottom) |
| Brand / link | `#ff5a2c` | Bolt logo, "Log in" underlined link |
| Image warm tones | `#fcbd93`, `#be5232`, `#983424`, `#ceada1` | Blurred abstract photo |
| Frosted quote | `rgba(255,255,255,0.18)` over image | Testimonial card |
| Chip border | `rgba(255,255,255,0.35)` | Tag chips |
| On-image text | `#fffaf5` | Quote, chips, author |

## Typography

- Contemporary grotesk with slightly quirky forms, likely **Instrument Sans**, **Satoshi** or **General Sans**.
- H1 ~24px (at 736px; ~36px at desktop) semibold, tight tracking.
- Quote ~19px (~30px desktop) regular, line height 1.2, off-white.
- Labels 10px medium; inputs/placeholders 10px; button 11px medium; chips 9px; author name 10px medium, role 8px muted.
- "OR" small uppercase with slight tracking.

## Components & patterns

- **Inputs:** ~34px tall (≈48px desktop), white fill, 1px warm-gray border, ~8px radius, subtle inner light; password field has a small eye/chevron glyph.
- **Primary button:** full width, vertical orange gradient, ~8px radius, soft orange drop shadow and a faint top highlight, white label.
- **Social buttons:** three equal outlined boxes (~8px radius) with brand glyphs only (Gmail, Facebook, Apple).
- **Divider:** hairline with centered "OR".
- **Image panel:** heavily blurred warm abstract photo, ~20px radius.
- **Tag chips:** pill-ish rounded rectangles (~10px radius), transparent with white-alpha border and white text.
- **Testimonial card:** frosted glass (backdrop blur, white-alpha fill), ~14px radius, large quote text, author below.
- **Notched corner:** the image panel's bottom-right has an inverted rounded cutout filled with the card color; two 48px white square arrow buttons (~10px radius, hairline border) sit inside it.

## Signature details

1. Inverted-radius notch in the image panel housing the carousel arrows.
2. Orange carried from backdrop to CTA gradient to the blurred image, one continuous hue family.
3. Frosted testimonial card plus outlined tag chips layered on a blurred abstract photo.
4. Warm off-white card (`#fffcf9`) instead of pure white.
5. Icon-only social button row in three equal boxes.

## Reproduce it

```css
body { background: radial-gradient(90% 60% at 50% 15%, #ff8d58 0%, #f36a3a 55%, #ea5a2f 100%); }
.card { background: #fffcf9; border-radius: 28px; padding: 44px; box-shadow: 0 40px 80px rgba(140,40,10,.25); }
.input { height: 48px; border: 1px solid #ebe7e2; border-radius: 8px; background: #fff; }
.btn { height: 48px; border-radius: 8px; color: #fff;
  background: linear-gradient(180deg, #f27b47, #ee5d2e);
  box-shadow: 0 8px 18px rgba(238,93,46,.35), inset 0 1px 0 rgba(255,255,255,.25); }
.quote { background: rgba(255,255,255,.18); backdrop-filter: blur(16px); border-radius: 14px; }
/* notch: mask the image panel corner with a card-colored element + two radial-gradient "inverted radius" pieces */
font-family: "Instrument Sans", "General Sans", system-ui;
```

- Keep: single warm hue family, notched corner, frosted testimonial, off-white card.
- Adapt: swap orange for your brand hue, but generate the blurred image in the same hue so the panel matches.

## Avoid

- Sharp-cornered or square notch; the inverted radius must match the panel radius.
- A real, sharp photo in the panel; it must be soft and abstract so the quote stays legible.
- Flat pure white card on the orange; it gets harsh.
- Colored social buttons; keep them neutral outlined.
- Mixing a second accent color (blue links, green success) into the form.
