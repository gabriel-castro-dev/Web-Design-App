# Kodecolor User Profile

- **Section:** web-app
- **Subtype:** profile
- **Kind:** image (static reference, no code)
- **Source:** https://cdn-images-1.medium.com/v2/resize:fit:800/1*Sdfm4E98ugZGQ-u5Xoa83g.png
- **Files:** `preview.webp`

## Overall style

A minimal, document-like profile page: a single white sheet on a saturated Material blue backdrop, with one accent blue doing all the interactive work. Almost everything is small type, hairline rules and whitespace; the only rich element is a square portrait photo. It feels like a well-set business card or LinkedIn "about" page, calm and trustworthy.

## Layout

- White app card (~656x534 in an 800px shot, ~4px radius) centered on `#2196f3`.
- Header bar (~70px): round blue logo mark + wordmark, outlined search input, text nav links with a count badge, round avatar with a green online dot; separated from the body by a faint shadow/rule.
- Body in two columns: left ~160px (square photo, then "WORK" and "SKILLS" sections), right ~375px (name block, rating, action row, tabs, label/value grid). Column gap ~45px.
- Right-column label/value grid: labels ~60px wide, values aligned on a second column; groups introduced by tiny uppercase section labels with a rule.
- Very low density; big side margins (~40px) and vertical rhythm of ~22px between rows.

## Color palette

| Role | Hex | Usage |
|---|---|---|
| Backdrop | `#2196f3` | Page behind the sheet |
| Surface | `#ffffff` | Sheet |
| Divider | `#eceef1` | Section rules, tab baseline, header edge |
| Text primary | `#3a4150` | Name, company names, values |
| Text secondary | `#8a8f98` | Addresses, section labels, idle tabs |
| Accent | `#2196f3` | Role title, links (phone, email, site), stars, active tab underline, logo |
| Accent tint | `#e3f2fd` | "Primary"/"Secondary" badges, "Contacts" button, Messages count |
| Star empty | `#e3eef8` | Unfilled rating star |
| Online | `#7ed957` | Presence dot |

## Typography

- Humanist sans, likely **Open Sans** (or Source Sans / Nunito Sans).
- Name 15px (scaled: ~22px at 1200) semibold; company names 11 to 12px semibold; body and values 9 to 10px regular; section labels 6 to 7px uppercase, letter-spacing ~0.15em, muted.
- Rating number "8,6" larger (~14px) semibold next to the stars.
- Weights 400/600 only.

## Components & patterns

- **Search:** outlined input, 1px light border, small radius (~2px), tiny magnifier and placeholder.
- **Nav links:** dark text, "Messages" followed by a tiny light-blue square badge with blue number.
- **Portrait:** square photo, no radius, no border.
- **Badges:** tiny rectangles, `#e3f2fd` fill, accent-blue semibold text ("Primary", "Secondary"), ~2px radius.
- **Rating:** solid 5-point stars in accent blue with the remainder in a very pale blue.
- **Action row:** three text-style actions: "Send message" (dark with chat icon, no fill), "Contacts" (tinted blue button with check), "Report user" (muted text only).
- **Tabs:** icon + label; active "About" in dark text with a 2px blue underline over a full-width hairline.
- **Bookmark:** muted icon + label pinned top-right of the content.
- **Section headers:** uppercase micro label followed by a horizontal hairline filling the remaining width.

## Signature details

1. Saturated single-hue blue backdrop that matches the accent exactly, so the white sheet reads as the only surface.
2. Micro uppercase section labels ("WORK", "SKILLS", "CONTACT INFORMATION") with trailing hairlines.
3. Pale-tinted badges and buttons (`#e3f2fd` fill + blue text) instead of solid fills.
4. Three-tier action row: plain, tinted, muted, signalling importance without heavy buttons.
5. Label/value definition-list grid with links styled only by color.
6. Square, unrounded portrait against an otherwise rounded-free UI.

## Reproduce it

```css
--backdrop: #2196f3; --surface: #fff; --rule: #eceef1;
--text: #3a4150; --muted: #8a8f98; --accent: #2196f3; --accent-tint: #e3f2fd;
--r: 3px; --shadow-header: 0 1px 0 #eceef1;
font-family: "Open Sans", "Nunito Sans", system-ui;
/* scale for real product (1440px): */
--fs-name: 24px; --fs-h: 16px; --fs-body: 14px; --fs-label: 11px; /* label: uppercase, tracking .15em */
```

- Spacing: 8px scale, 24 to 32px between groups, 12px between label/value rows.
- Keep: one accent, tinted secondary buttons, definition-list layout, tiny caps labels.
- Adapt: the shot is tiny (800px); scale type up ~1.5x for a real screen, keep ratios.

## Avoid

- Solid blue primary buttons everywhere; the tinted style is the key.
- Rounded card-in-card sections; separation is by rules and whitespace only.
- Icons on every label; icons are used only on actions and tabs.
- A second accent color (the only other color is the green presence dot).
- Heavy shadows on the sheet.
