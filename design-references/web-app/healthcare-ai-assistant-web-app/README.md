# Healthcare AI Assistant Web App (Healthology)

- **Section:** web-app
- **Subtype:** health
- **Kind:** image (static reference, no code)
- **Source:** https://dribbble.com/shots/27392838-Healthcare-AI-Assistant-Web-App
- **Files:** `preview.webp`

## Overall style

A consumer health app's AI assistant home: a full-bleed aurora mesh gradient (lavender and violet on the left, cyan and mint on the right) with crisp white UI floating on top and a deep navy (#000E50) for the one active nav item and the Send button. The center is a chat-first prompt screen: iridescent 3D orb, greeting, huge white headline, four suggestion cards and a large composer. It feels soft, optimistic and "AI" without going dark or neon.

## Layout

- App viewport (~1665x935 inside the monitor mockup). No hard panels; the gradient is the canvas.
- **Top bar (~100px):** serif wordmark with a navy X-shaped logo on the left; five horizontal pill tabs centered (Overview, Doctor, Lab Test, Medicine, AI Assistant) with the active one in solid navy; round white icon buttons (search, settings, bell) and a photo avatar on the right.
- **Left rail:** a floating white vertical bar (~75px wide, full height, ~16px radius) with 4 outline icons at top (new chat, notes, heart, search) and a panel toggle at the bottom.
- **Center column (~1065px):** a 150px iridescent orb, then "Good to see you!, Smith" in light white text, then the headline centered, then a row of 4 equal white suggestion cards (~255x115), then a wide composer card (~210px tall).
- A small round info button floats top-right of the content area.
- Everything is centered; lots of empty gradient around the column.

## Color palette

| Role | Hex | Usage |
| --- | --- | --- |
| Gradient: lavender | #C3B7FF | Upper-left wash |
| Gradient: violet | #B290FD | Center-left saturation behind headline |
| Gradient: sky | #A7D0FB | Top center |
| Gradient: cyan | #84DEFB | Right side |
| Gradient: mint | #ADF1F3 to #CFFAF5 | Lower right |
| Gradient: pink-lilac | #F2E2FE to #FAEEFF | Lower left corner |
| Gradient: near-white | #EEF0FD / #EAFAFE | Top edge behind nav |
| Surface | #FFFFFF | Cards, pills, rail, composer, icon buttons |
| Primary navy | #000E50 | Active tab, Send button |
| Logo navy | #03218E | Logo mark and wordmark (#020A57) |
| Text on white | #08090D | Tab labels |
| Body gray | #4D5154 | Suggestion card copy, placeholder (#52555B) |
| Muted | #64656B | "Thinking" chip label |
| Headline on gradient | #FFFFFF | Greeting and headline |
| Composer top edge | #6D37DB to #B676CA | Gradient strip across the top of the composer |
| Icon ink | #01012C | Card and rail icons |

## Typography

- Wordmark: bold transitional serif (similar to Source Serif / Newsreader semibold) in navy.
- UI: neutral grotesk, likely Inter or SF Pro. Headline in a tight display cut (Inter Display / SF Pro Display bold) with negative tracking (~-0.03em).
- Sizes at 1665 viewport: headline ~48px bold white; greeting ~24px light white; tabs ~17px regular; suggestion copy ~15px regular gray; placeholder ~15px; chips and Send ~13px medium.
- Sentence case, no uppercase.

## Components & patterns

- **Nav pills:** white, fully rounded, ~58px tall, varying widths, no border, soft shadow barely visible; active pill solid navy with white text and a sparkle icon.
- **Icon buttons:** 48px white circles with 1.5px outline icons in navy.
- **Rail:** white column, ~16px radius, icons stacked with ~58px spacing.
- **Orb:** a 3D glassy sphere with iridescent violet/cyan/pink swirl on dark blue. It is the AI avatar; use an image or WebGL shader.
- **Suggestion cards:** white, ~6px radius (small!), 16px padding, two-line gray copy on top and a navy outline icon (stethoscope, flask, pills, sparkle) bottom-left. No shadow.
- **Composer:** white card ~8px radius with a 12px-tall violet-to-pink gradient bar peeking above it (a layered card behind). Placeholder "Ask anything...", bottom row with a round + button, a "Thinking" pill chip with a bulb icon, and a navy fully-rounded "Send" button at right.
- **Icons:** thin 1.5px outline set (Lucide/Phosphor-like).

## Signature details

1. Full-bleed aurora mesh gradient (lavender left, cyan/mint right) as the app background, with pure white UI on top.
2. Deep navy #000E50 as the only dark element: active tab and Send, giving strong focus points.
3. Iridescent 3D orb as the assistant's identity, centered above the greeting.
4. Composer with a violet-to-pink gradient lip peeking from behind the top edge.
5. Serif wordmark next to an otherwise all-sans interface, adding a clinical-editorial touch.
6. Small-radius white suggestion cards contrasting with fully rounded pills in the nav.

## Reproduce it

```css
--navy: #000e50;
--brand: #03218e;
--surface: #ffffff;
--text: #08090d;
--body: #4d5154;
--muted: #64656b;
--bg-aurora:
  radial-gradient(60% 60% at 25% 55%, #b290fd 0%, transparent 70%),
  radial-gradient(55% 60% at 85% 50%, #84defb 0%, transparent 70%),
  radial-gradient(50% 40% at 90% 95%, #cffaf5 0%, transparent 70%),
  radial-gradient(45% 40% at 5% 100%, #faeeff 0%, transparent 70%),
  linear-gradient(180deg, #eef0fd 0%, #d6e4fd 100%);
--radius-card: 6px;
--radius-composer: 8px;
--radius-rail: 16px;
--radius-pill: 9999px;
```

- Composer lip: a pseudo-element behind the card, `linear-gradient(90deg,#6d37db,#b676ca)`, offset 12px upward, same width, top radius only.
- Headline: `text-5xl font-bold tracking-[-0.03em] text-white text-center`.
- Spacing: 20px gap between suggestion cards, 36px between card row and composer, 60px between headline and cards.
- Keep: aurora background, white floating UI, navy focus color, orb, centered prompt layout.
- Adapt: gradient hues can shift to the brand but keep them pastel and bright; the orb can be replaced by any iridescent avatar.

## Avoid

- Dark mode or neon glows; this is bright and airy.
- Purple buttons; the gradient provides color, actions stay navy.
- Heavy shadows on cards; they rely on white against gradient.
- Glassmorphism blur on every card; surfaces are opaque white.
- Crowding the center with more widgets; the emptiness makes it feel like an assistant, not a dashboard.
