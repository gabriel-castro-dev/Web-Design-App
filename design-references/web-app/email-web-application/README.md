# Email Web Application (Selfmail)

- **Section:** web-app
- **Subtype:** email
- **Kind:** image (static reference, no code)
- **Source:** https://dribbble.com/shots/23444262-Email-Web-Application
- **Files:** `preview.webp`

## Overall style

A quiet, almost monochrome three-pane mail client: white surfaces, hairline dividers, regular-weight black type and a single deep navy (#010929) for the primary actions. Color appears only in tiny doses (peach unread dots, pastel count badges, colored label dots, a yellow star), which makes the interface feel calm and editorial. It is distinctive for how little it does: no filled panels, no shadows, no bold weights beyond the logo and buttons.

## Layout

- Classic three columns inside the app frame (1800px wide in the shot): sidebar ~330px, message list ~520px, reading pane fills the rest (~930px). Columns are separated by 1px light gray (#EDEDED range) vertical rules.
- **Sidebar:** logo + hamburger at top, full-width navy Compose button, a nav list (Inbox with nested All/Read/Unread connected by a thin tree line, then Starred, Sent, Draft, Spam, Trash), a hairline, a "Label" group with a + action, and a user card pinned to the bottom.
- **List pane:** pill-ish search field with a ⌘F hint, then a header row "All Inbox Mails" with select-all checkbox, refresh and kebab, then tall email rows (~170px each) separated by hairlines. The selected row gets a 3px navy bar on its left edge.
- **Reading pane:** icon toolbar grouped with thin separators and a "3 of 120" pager on the right; sender row (avatar, name, email in gray, "To me" dropdown, timestamp, star, reply, forward, kebab); then subject, body copy, a full-width hero image, more paragraphs and a navy CTA button.
- Density is relaxed: 24 to 32px padding everywhere, lots of vertical rhythm, left-aligned text.

## Color palette

| Role | Hex | Usage |
| --- | --- | --- |
| App background | #FFFFFF | All three panes |
| Row / pane tint | #FBFBFB to #FDFDFD | Barely-there tint on list rows and sidebar |
| Active nav fill | #F3F5F5 | "All" selected nav item |
| Presentation canvas | #E5E5E5 | Outside the browser frame only |
| Primary (navy) | #010929 | Compose button, CTA button, logo mark, selected-row bar |
| Text | #000000 to #111111 | Titles, nav labels, subject |
| Body / muted | #6F6F6F to #727272 | Email previews, sender name, timestamps, meta |
| Tertiary | #898989 | Source labels ("Dribbble", "Webflow"), placeholder |
| Divider | #E5E7E6 | Hairlines and pane rules |
| Checkbox stroke | #C7C7C7 | Empty square checkboxes |
| Unread dot | #FFBA94 | Small peach dot after the source name |
| Inbox count badge | #FFB997 bg / #3E1601 text | Peach pastel chip |
| Draft count badge | #C9BEFF bg / #242038 text | Lavender pastel chip |
| Label dots | #FE7BFC, #B343E0, #475BDF, #000000 | Dribbble, Instagram, Webflow, Figma labels |
| Star (active) | #F7C33E | Favorited message and header star |

## Typography

- Neutral grotesk with SF-like proportions, likely Inter or SF Pro Text (Geist also fits).
- Sizes at this 1920 shot: logo ~26px semibold; pane title ~26px regular; email subject in list ~21px regular; reading subject ~27px medium; nav labels ~20px regular; body ~17px regular with ~1.5 line-height; meta and timestamps ~15px regular; badges ~13px medium.
- Weights: almost everything 400. Medium (500) only for the reading-pane subject and buttons; semibold for the wordmark.
- Sentence case throughout, default tracking.

## Components & patterns

- **Compose / CTA button:** solid #010929, white medium label, ~10px radius, 56 to 60px tall, no shadow.
- **Search:** 1px #E5E5E5 border, ~10px radius, outline search icon, "⌘ F" shortcut hint right-aligned in gray.
- **Nav items:** outline 1.5px icons at left, 20px labels; the selected sub-item uses a #F3F5F5 rounded fill (~10px radius). Nested items are indented with a thin vertical guide line.
- **Count badges:** small rounded-rect chips (~6px radius) in pastel fills (peach, lavender) with dark tinted numbers.
- **Email row:** checkbox, gray source name + peach unread dot, time right-aligned, black subject on its own line, two-line gray preview with ellipsis, optional attachment pill (white, 1px hairline border, fully rounded, paperclip icon + "4 Attachments"), outline star bottom-right.
- **Selected row indicator:** 3px navy vertical bar on the list's left edge, no fill change.
- **Toolbar:** 20px outline icons in gray, grouped by thin vertical dividers.
- **Avatars:** circular photos (40 to 50px) for sender and user card.
- **Labels:** 10px filled color dots + label name.

## Signature details

1. Deep navy #010929 instead of blue or black for the only filled buttons, which reads premium and serious.
2. Regular-weight subjects and titles: hierarchy comes from size and gray value, not bold.
3. Pastel count badges (peach, lavender) with dark same-hue text, the only colored fills in the UI.
4. Peach unread dot placed right after the sender name instead of bolding unread mail.
5. Tree-line nested nav under Inbox (All / Read / Unread).
6. Selected message marked by a thin navy edge bar rather than a highlighted row.

## Reproduce it

```css
--bg: #ffffff;
--bg-soft: #fbfbfb;
--active: #f3f5f5;
--primary: #010929;
--text: #0b0b0b;
--muted: #707070;
--subtle: #898989;
--line: #e7e7e7;
--badge-peach: #ffb997; --badge-peach-ink: #3e1601;
--badge-lilac: #c9beff; --badge-lilac-ink: #242038;
--unread: #ffba94;
--star: #f7c33e;
--radius-btn: 10px;
--radius-chip: 9999px;
--radius-badge: 6px;
```

- Grid: `grid-template-columns: 330px 520px 1fr` with `border-right: 1px solid var(--line)`.
- Spacing: 24px pane padding, 20 to 24px list row padding, 12px icon-label gap in nav, 44px nav row height.
- Type: `text-[26px] font-normal` pane titles, `text-xl font-normal` list subjects, `text-[17px] leading-relaxed` body.
- Keep: monochrome base, navy primary, pastel micro-accents, hairline structure.
- Adapt: label colors and badge pastels can follow your brand, but keep them small and desaturated in fill.

## Avoid

- Bolding unread rows or subjects; it breaks the calm regular-weight look.
- Swapping navy for a bright SaaS blue (#3B82F6) on Compose.
- Card shadows or rounded card containers around list items; rows are separated only by hairlines.
- Filling the sidebar with a gray or dark background.
- Using saturated badge fills (solid red counts); keep them pastel with dark text.
