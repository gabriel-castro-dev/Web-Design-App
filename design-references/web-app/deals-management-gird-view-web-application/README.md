# Fixoria CRM: Deals Kanban

- **Section**: web-app
- **Subtype**: crm
- **Kind:** image (static reference, no code)
- **Source:** https://dribbble.com/shots/25301019-Deals-Management-Gird-View-Web-Application
- **Files:** `preview.webp`

## Overall style

A crisp, conventional SaaS CRM pipeline board done with care: white sidebar and top bar, a very light cool-grey canvas, white kanban columns holding white deal cards, and a single bright blue for the primary action and active nav. Color in the content is limited to pale, outlined pill tags. It reads as trustworthy and tidy, and the quality comes from consistent spacing, bold numbers and small typographic contrasts rather than decoration.

## Layout

- Browser window chrome (traffic lights, URL pill "https://fixoriacrm.com/deals").
- Left sidebar (~17% width), white, with a 1px right border: logo + "Fixoria CRM" + collapse icon, then two grouped menus with uppercase tracked labels (MAIN MENU, INSIGHTS MENU), ~55px row spacing.
- Top bar: search input with a `⌘F` keycap at left; bell, help, gear icons, a vertical divider and a user block (avatar, name, role) at right.
- Page header: H1 "Deals Management" + muted subtitle; "Create Deals" (blue) and "... Action" (outlined) buttons at right.
- Tabs row: underline tabs (All Deals active, My Deals, Looked Deals, Closing Deals) at left; Sort, Filter text buttons and a list/grid segmented toggle at right; a full-width 1px rule below.
- Board: 5 equal columns (~260px at 1x) with ~24px gaps; each column is a white rounded container with a two-line bold stage title and a `+` at top right, holding 1 to 3 deal cards. Columns are only as tall as their content.

## Color palette

| Role | Hex | Usage |
|---|---|---|
| Backdrop | `#E0E2E6` | Presentation background |
| Canvas | `#F4F6F8` | Page background behind the board |
| Surface | `#FFFFFF` | Sidebar, top bar, columns, cards |
| Border | `#ECEEF0` | Card and column outlines, dividers |
| URL bar | `#F0F0F0` | Browser address pill |
| Primary blue | `#2878FC` | Create Deals button, active nav text/icon/border |
| Active nav fill | `#F2F6FF` | Selected sidebar row background |
| Text | `#0A0A0A` | Titles, values, names |
| Muted text | `#7A7C7D` | Subtitle, "Closing Date:", roles |
| Section label | `#474747` | MAIN MENU / INSIGHTS MENU |
| Tag green | bg `#EEFBF4`, border `#C9EEDC` | Premium Deal |
| Tag red | bg `#FCECEC`, border `#F3C9C9` | High Value |
| Tag blue | bg `#F0F4FC`, border `#D3E0F7` | Fast-Closing Deal |
| Tag purple | bg `#F8ECFC`, border `#EFCFF3` | Growth Opportunity |

## Typography

- **Inter** (or Inter Display) throughout.
- H1 ~28px/700, tight tracking; subtitle ~18px/400 muted.
- Tabs ~18px/400, active 500 black with a 2px black underline.
- Column titles ~16px/600, wrapping to two lines by design. Card titles ~16px/600. Amounts ~17px/700 (`$50,000.00`). "Closing Date:" 14px/400 muted followed by the date in 600 black.
- Tag text ~14px/500 black (not tinted). Contact name ~14px/600, role ~12px/400 muted.
- Sidebar labels ~12px/500 UPPERCASE with wide tracking (`0.1em`); nav items ~19px/400.

## Components & patterns

- **Primary button**: `#2878FC`, 8px radius, ~44px tall, white `+` and label, faint inner highlight.
- **Outlined button**: white, 1px `#E4E6EA` border, 8px radius, `...` icon + "Action".
- **Search**: 1px border, 8px radius, magnifier, placeholder, and a bordered `⌘F` keycap at the right end.
- **Sidebar active item**: pale blue fill, 1px blue border, 8px radius, blue icon and label. Inactive items: 1.5px outline icons in grey, labels in dark grey.
- **Kanban column**: white, 12px radius, 1px `#ECEEF0` border, 14px padding.
- **Deal card**: white, 10px radius, 1px `#ECEEF0` border, no shadow. Top row: outlined pastel tag (full radius) + vertical kebab. Then title, closing date line, bold amount, a 1px divider, and a contact footer (32px avatar photo, name, "Lead & Ceo at Company").
- **Tags**: full radius, pale fill, 1px slightly darker same-hue border, black text.
- **View toggle**: two icon buttons in a light grey group; the active one in a white chip.
- **Icons**: consistent 1.5px outline set (Lucide/Tabler style).

## Signature details

1. Pastel tags with a hairline border in the same hue and black text, softer and more legible than tinted text.
2. Kanban columns as white containers on a grey canvas, with white cards inside that are separated only by hairline borders.
3. Two-line wrapping stage titles ("Qualification - Value Proposition") give columns a heavier, editorial header.
4. Inline label/value emphasis: "Closing Date:" muted + date bold.
5. The `⌘F` keycap inside the search field and uppercase tracked section labels in the sidebar.

## Reproduce it

- Tokens: `--canvas:#F4F6F8; --surface:#FFF; --border:#ECEEF0; --primary:#2878FC; --primary-soft:#F2F6FF; --text:#0A0A0A; --muted:#7A7C7D`.
- Tags: `{green:[#EEFBF4,#C9EEDC], red:[#FCECEC,#F3C9C9], blue:[#F0F4FC,#D3E0F7], purple:[#F8ECFC,#EFCFF3]}` as `[bg, border]`; `padding:4px 12px; border-radius:999px; font:500 13px Inter; color:#0A0A0A`.
- Radii: buttons/inputs 8px, cards 10px, columns 12px.
- Spacing: 4px base; card padding 14px; card gap 12px; column gap 24px; page padding 48px.
- Shadows: none; borders only.
- Keep the one-blue rule. Adapt the tag set to your pipeline's deal attributes.

## Avoid

- Colored column headers or colored card left borders; color lives only in tags.
- Tinted tag text (green text on green); keep text black.
- Drop shadows on cards, which would make it look like a generic template.
- More than one accent color in buttons or nav.
- Cramped cards; each keeps a clear title/date/amount/contact rhythm.
