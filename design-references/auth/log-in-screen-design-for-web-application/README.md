# Log In Screen with 3D Illustration Panel

- **Section:** auth
- **Subtype:** login
- **Kind:** image (static reference, no code)
- **Source:** https://dribbble.com/shots/26411593-Log-In-screen-design-for-web-application
- **Files:** `preview.webp`

## Overall style

A split-screen login: a stark white form column on the left and a large rounded panel on the right filled with a vivid 3D render (a pixel-voxel skyscraper, a giant key, glassy floating icons) in electric periwinkle blue with hot orange accents. The form is extremely minimal and monochrome, relying on tactile details: an iridescent-rimmed "Log In with Apple" pill and a glossy near-black Log In button with depth. The contrast between quiet form and loud illustration is the whole idea.

## Layout

- A white rounded card (~1730x1230 in a 1920 shot, ~36px radius) floats on a flat periwinkle page (#5360FF) with a big soft blue shadow underneath.
- **Left column (~45%):** content centered in a ~410px wide stack, vertically centered. Order: "Welcome back 👋" headline, large gap (~140px), "Please enter your details", Apple login pill, "or" divider, Email input, Password input, remember/forgot row, Log In button, "Don't have an account? Sign Up".
- **Right column (~55%):** an inset image panel with ~40px radius and ~20px margin from the card edges, full height, containing the 3D artwork edge to edge.
- No nav, no logo, no footer. Pure focus.

## Color palette

| Role | Hex | Usage |
| --- | --- | --- |
| Page background | #5360FF | Flat periwinkle behind the card |
| Card | #FFFFFF | Form column background |
| Headline / text | #101010 | "Welcome back", labels, Sign Up link |
| Secondary text | #686868 | "Forgot password?" |
| Muted text | #828282 | "Don't have an account?" |
| Placeholder / icons | #ABABAB / #B2B2B2 | Input placeholders, mail and eye icons, "or" |
| Input border | #EEEEEE | 1px pill outlines, divider lines (#EAEAEA) |
| Primary button | #29282B to #161518 | Log In button (vertical dark gradient) |
| Apple pill fill | #F7F7F9 | Soft off-white with iridescent rim |
| Iridescent rim | #E5F1FC (blue) to #FCF5E8 (peach) | Edge glow on Apple pill |
| Art blue | #476AFF / #93A4FE | Illustration background tones |
| Art navy | #120C33 | Voxel tower shadows |
| Art orange / red | #F87417 / #F23200 | Price tag, red voxel band |
| Art amber | #FCAD58 | Location pin orb |
| Art mint | #B2DBC7 | Arrow pill gradient |

## Typography

- Tight neo-grotesk, likely Inter Tight or Geist (SF Pro Display also fits).
- Sizes at 1920 shot: headline ~58px bold with tight tracking (~-0.03em); intro ~20px medium; button and pill labels ~19px regular/medium; inputs ~17px; small row ~15px; footer line ~19px.
- The wave emoji is part of the headline.
- Colors: pure near-black for primary copy, grays for helpers; "Sign Up" is the same black at medium weight, not a colored link.

## Components & patterns

- **Social pill (Apple):** fully rounded, ~70px tall, off-white fill, 1px iridescent gradient border (blue on the left, pink/peach on the right) and a soft drop shadow; black Apple glyph + label centered.
- **Divider:** two 1px gray lines with a gray "or" in the middle.
- **Inputs:** fully rounded pills, ~70px tall, white fill, 1px #EEEEEE border, gray placeholder at 36px left padding, gray trailing icon (filled mail, eye).
- **Checkbox row:** 16px square checkbox with light border and ~3px radius, label in dark text; "Forgot password?" right-aligned gray.
- **Primary button:** full width, ~60px tall, ~12px radius (less rounded than inputs!), dark vertical gradient, 1px darker border, subtle top highlight and drop shadow so it looks pressed-plastic; white regular label.
- **Illustration panel:** 3D render with glassy frosted icon tiles (hashtag, cursor, globe card, home in a ring), a voxel skyscraper, a giant key and a gradient arrow pill; blue-dominant with orange as contrast.

## Signature details

1. Iridescent pastel rim on the social login pill, a tiny holographic moment in an otherwise gray form.
2. Glossy black Log In button with a 12px radius while inputs are full pills: deliberate shape contrast.
3. The huge vertical gap between the headline and the form, making "Welcome back" feel like a title card.
4. Right panel inset inside the white card with its own large radius, instead of bleeding to the edge.
5. 3D voxel/glass illustration in electric periwinkle with hot orange accents, matching the page background hue.
6. Zero brand color in the form itself; color lives only in the art and the page backdrop.

## Reproduce it

```css
--page: #5360ff;
--card: #ffffff;
--ink: #101010;
--gray: #686868;
--muted: #828282;
--placeholder: #ababab;
--line: #eeeeee;
--btn-top: #2e2d31; --btn-bottom: #161518;
--radius-card: 36px;
--radius-panel: 40px;
--radius-input: 9999px;
--radius-btn: 12px;
--shadow-card: 0 40px 80px rgba(40,50,190,.35);
--shadow-btn: 0 4px 10px rgba(0,0,0,.18), inset 0 1px 0 rgba(255,255,255,.12);
```

- Iridescent border: wrap the pill in a 1px padding element with `background: linear-gradient(90deg,#cfe3ff,#f4e9ff,#ffe6cf)` and `box-shadow: 0 6px 16px rgba(0,0,0,.06)`.
- Headline: `text-6xl font-bold tracking-[-0.03em]`.
- Spacing: 20px between inputs, 28px between groups, form width 410 to 440px.
- Keep: split layout, monochrome form, iridescent social pill, glossy dark button, rich art panel.
- Adapt: the illustration must be your own art (3D or photographic) but should be vivid and saturated; page backdrop takes its dominant hue.

## Avoid

- Coloring the Log In button with the brand blue; its power comes from being black.
- A flat stock illustration or gradient blob in the panel; the art needs depth and detail.
- Adding a logo, nav or marketing copy to the form column.
- Uniform radii everywhere; keep pill inputs vs 12px button.
- Colored "Sign Up" or "Forgot password" links; they stay black and gray.
