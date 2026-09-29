# Pitchpott Startup Competition Dashboard

- **Section:** web-app
- **Subtype:** dashboard
- **Kind:** image (static reference, no code)
- **Source:** https://dribbble.com/shots/27476996-Startup-Competition-Dashboard-UI
- **Files:** `preview.webp`

## Overall style

A luxury, editorial take on a participant dashboard: a jet-black sidebar with gold accents next to a warm off-white workspace, and a serif headline where the user's name is set in gold italic. Thin gold hairlines, letter-spaced uppercase labels and soft tinted icon discs make it feel like a private-bank or awards-ceremony product rather than a SaaS template.

## Layout

- The whole app sits in a black device-like frame (radius ~40px) on a warm beige backdrop.
- Left sidebar (~370px) on black: centred globe logo with "PITCHPOTT" wordmark and gold tagline; three groups (OVERVIEW, FINANCES, ACCOUNT) each introduced by a gold letter-spaced label with a thin rule running to a small dot; nav rows with icon, a short vertical divider, and label; a "Need help?" card and a Light/Dark toggle at the bottom.
- Main panel: off-white sheet with a large top-left radius (~48px) nested inside the black frame. Header strip: "CYCLE #14 ENDS IN:" label with a gold countdown "05 : 14 : 32" left; bell and user chip (initial avatar, name, ID) right; hairline below.
- Content: serif H1 "Welcome back, *Max*" with subtitle; right-aligned outlined "SWITCH TO PIPO" and gold "SUBMIT IDEA +" buttons. Then a 4-up KPI row, a partner strip with a centred gold label between rules, and a large "active challenge" card with an image at left and a 3x2 grid of labelled facts.

## Color palette

| Role | Hex | Usage |
| --- | --- | --- |
| Stage | `#D0CCBC` | Warm beige backdrop |
| Sidebar / frame | `#0A0C0C` | Sidebar and device frame |
| Active nav | `#242018` | Active item fill with a thin gold border and gold left glow |
| Main canvas | `#FAF7F4` | Warm off-white workspace |
| Surface | `#FFFFFF` | Header, cards |
| Gold | `#C9973F` | Primary button, name italic, countdown, group labels, prize values, icons |
| Gold light | `#F6D48E` | Gold highlights in active nav, logo |
| Gold hairline | `#E5D8C2` | Rules beside section labels, card borders on the challenge card |
| Warm tint | `#FCF4F0` | Challenge card header band |
| Success | `#1C7848` | "Active" dot, green nav badges, positive deltas, deposit value |
| Red spark | `#C42136` | Deposit icon and sparkline |
| Blue | `#1F5293` | Observer icon, "Under Review" text on `#E4ECF8` |
| Text | `#111111` | Headlines, numbers |
| Muted | `#6B6B6B` | Subtitles, labels |
| Sidebar text | `#D8D8D8` | Nav labels on black |

## Typography

- Display serif for the greeting, likely **Canela / GT Super / Playfair Display**, regular weight, ~56px; the name in the same serif italic, gold.
- Italic serif also used for the challenge title ("KI-Lösungen für den Alltag", ~28px).
- UI text in a humanist/geometric sans, likely **Avenir Next / Nunito Sans / Mulish**: KPI values ~32px medium; labels 16px; nav 17px.
- Uppercase letter-spaced labels (+0.18em) at ~13px for group headers, "TRUSTED BY INNOVATORS & PARTNERS", fact labels (IDEA REFERENCE, STATUS), and button text.
- Countdown in light sans, gold-grey, wide spacing around colons.

## Components & patterns

- **Sidebar group labels:** gold uppercase tracked text, followed by a 1px dark-gold rule ending in a tiny dot.
- **Nav rows:** outline icon, a short 1px vertical divider, label; active row is a dark bronze pill (radius 10px) with a thin gold border and a gold glow on the left edge. Counts in solid green circles.
- **Buttons:** rectangular with 6px radius, uppercase tracked labels; primary gold fill with white text and "+" icon; secondary white with 1.5px black border.
- **KPI cards:** white, radius 16px, soft warm shadow; a 56px tinted circle icon (gold/red/green/blue at ~10% tint), label + value, then "↑ +12% vs last cycle" with a small sparkline whose line colour matches the icon and ends in a dot, over a faint gradient fill.
- **Partner strip:** centred gold uppercase label flanked by thin gold rules; four logos in bordered squares with name + descriptor, separated by vertical hairlines.
- **Challenge card:** warm-tinted header with an "ACTIVE" pill (green dot in ring), a vertical gold divider, italic serif title, and an outlined gold "VIEW CHALLENGE →" button. Body: photo (radius 12px) left, 3x2 fact grid with circular outline icons, uppercase micro-labels and values; hairline dividers between cells.
- **Status chip:** "Under Review" pale blue pill.
- **Theme toggle:** outlined pill with sun/moon labels on black.

## Signature details

1. Serif greeting with the user's name in gold italic, setting an editorial, ceremonial tone.
2. Black sidebar with gold section labels whose rules end in a small dot.
3. Gold as the only strong accent, applied to money, time and primary action.
4. Letter-spaced uppercase micro-labels everywhere, like a luxury invitation.
5. Warm off-white canvas and beige stage instead of cool greys.
6. Sparklines tinted per metric with a terminal dot, paired with matching pastel icon discs.

## Reproduce it

```css
--stage: #D0CCBC; --ink-frame: #0A0C0C; --nav-active: #242018; --canvas: #FAF7F4; --surface: #FFFFFF;
--gold: #C9973F; --gold-light: #F6D48E; --gold-line: #E5D8C2; --warm-tint: #FCF4F0;
--success: #1C7848; --danger: #C42136; --info: #1F5293; --text: #111111; --muted: #6B6B6B;
--radius-frame: 40px; --radius-sheet: 48px; --radius-card: 16px; --radius-btn: 6px;
--shadow-card: 0 8px 24px rgba(60,40,10,.06);
--serif: "Canela", "Playfair Display", serif; --sans: "Avenir Next", "Mulish", sans-serif;
.label { text-transform: uppercase; letter-spacing: .18em; font-size: 12px; color: var(--gold); }
```

- Keep: one serif moment per screen (greeting or key title), gold for value and action only.
- Adapt: the countdown and cycle framing to any time-boxed programme (auctions, cohorts, contests).

## Avoid

- Shiny metallic gold gradients or glitter; the gold is flat and muted.
- Using the serif for UI labels, tables or buttons.
- Cool blue-grey backgrounds; the warmth of the canvas is part of the luxury tone.
- Too many coloured icon discs per card; one tinted disc per metric is enough.
