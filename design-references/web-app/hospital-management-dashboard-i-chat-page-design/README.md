# Hospital Management Dashboard: Chat Page (Pre Clinic)

- **Section:** web-app
- **Subtype:** chat
- **Kind:** image (static reference, no code)
- **Source:** https://dribbble.com/shots/24826525-Hospital-management-dashboard-I-Chat-Page-Design
- **Files:** `preview.webp`

## Overall style

A soft, clinical admin UI in white and very pale gray-blue with a single muted teal-green (#33887C) accent, shown as a tilted perspective mockup over a dark gray blurred background. The chat page uses a classic contact-list + conversation layout, but everything is rounded, borderless and airy, with gray pill containers for incoming messages and solid teal pills for outgoing ones. The mood is calm healthcare, not techy.

## Layout

- Three columns inside a white app shell: sidebar (~270px), contact list (~480px), conversation pane (fills the rest).
- **Sidebar:** logo (teal/yellow cross mark + "Pre Clinic"), round hamburger button, then three grouped menus with small gray captions (Main Menu: Dashboard, Doctors, Patients, Staff / Other Menu: Doctor Schedule, Payroll, Chat, Email / Help & Settings: Invoice, Settings, Reports) separated by hairlines. Active item "Chat" is a full-width solid teal rounded bar.
- **Top bar:** pill search field ("Search here...") on #F4F6F8, round icon buttons (mail, settings, bell with red dot) and admin avatar with name + "Admin" role.
- **Page area** on #F4F6F8 background: breadcrumb "App » Chat" in large type, then a white contact list card: pill search, a tab row (Private Chat / Group Chat with pink count badge / All Contacts) above a dashed divider, then contact rows (~120px tall) with avatar, online dot, name, gray preview, time and teal unread badge. The active contact row is slightly lifted (white on white with faint shadow).
- **Conversation pane:** white header card (avatar, name, "Online") with rounded-square icon buttons (video, call, settings) at top-right; messages below on white with generous spacing.

## Color palette

| Role | Hex | Usage |
| --- | --- | --- |
| Shell / cards | #FFFFFF | Sidebar, contact list, conversation pane |
| Page background | #F4F6F8 | Behind cards, search fields, incoming bubbles |
| Soft surface | #F3F4FA / #F7F6F9 | File rows, icon buttons |
| Accent teal | #33887C | Active nav, outgoing bubbles, unread badges, logo |
| Teal mid | #609D9A / #63A595 | Icons on file rows, small badges |
| Teal tint | #DAEDEA | Download/view icon bubbles |
| Logo yellow | #FEC737 | Second color of the cross mark only |
| Text | #000000 / #1B1B1F | Names, headings, message text |
| Body gray | #3D3C41 / #5D5F60 | Nav labels |
| Muted | #939597 / #999B9D | Previews, times, captions, "Online" |
| Icon gray | #969BA2 / #B1B4BD | Top bar icons |
| Group badge | #F691AD | Pink count on "Group Chat" |
| Alert dot | #D54D4A | Bell notification |
| Online dot | #2E9E7F (teal) / #2F80ED (blue) | Presence dot on avatars |
| Presentation bg | #4B4B4B | Dark gray blurred backdrop, not part of UI |

## Typography

- Grotesk with slightly quirky geometry, likely Satoshi or General Sans (Manrope as fallback).
- Sizes (normalized to a 1440 layout): breadcrumb ~28px medium ("App" black, "Chat" gray); contact name ~20px medium; conversation header name ~22px medium; message text ~15px regular; nav labels ~16px regular; captions and previews ~14px regular gray; times ~13px.
- Weights stay at regular/medium; no heavy bold. Title case names, sentence case elsewhere.

## Components & patterns

- **Active nav item:** solid #33887C, ~8px radius, white label and white icon, extends nearly full sidebar width.
- **Nav icons:** small filled duotone glyphs in gray (grid, user, users, calendar, file, chat, mail, gear, flag).
- **Search fields:** fully rounded pills on #F4F6F8 with a filled gray dot-style search icon and gray placeholder.
- **Icon buttons:** 48px circles (top bar) or 52px rounded squares (chat header) with #F4F6F8 fill and gray or teal glyphs.
- **Contact row:** 50px circular photo avatar with a small colored presence dot, name, one-line gray preview with ellipsis, time top-right and a 20px teal circle unread count below it.
- **Tabs:** plain gray text tabs, pink circular count badge, dashed hairline underneath.
- **Incoming message:** sender name + gray timestamp above, then a #F4F6F8 bubble with ~12px radius and black text; avatar sits to the left.
- **Outgoing message:** "You" + time label right-aligned, avatar to the right, solid teal bubble with white text, ~12px radius, bottom-right corner slightly less rounded.
- **File attachments:** stacked rounded rows on #F3F4FA: colored file-type icon, filename, gray size, and a small teal circle action (download arrow, eye).

## Signature details

1. One muted teal (#33887C) used for both the active nav bar and outgoing message bubbles, tying navigation and conversation together.
2. Borderless composition: every separation is done with #F4F6F8 fills and white cards, no strokes.
3. Oversized breadcrumb heading ("App » Chat") acting as the page title.
4. File messages as a stacked list of light rows with teal circular action icons, not as generic attachment cards.
5. Logo cross mark in teal + warm yellow, the only warm color in the system.
6. Tilted, cropped perspective presentation over a blurred dark copy of the same UI.

## Reproduce it

```css
--bg: #f4f6f8;
--card: #ffffff;
--soft: #f3f4fa;
--accent: #33887c;
--accent-2: #63a595;
--accent-tint: #daedea;
--ink: #111114;
--body: #4a4b50;
--muted: #97999b;
--badge-pink: #f691ad;
--alert: #d54d4a;
--radius-sm: 8px;
--radius-md: 12px;
--radius-lg: 20px;
--radius-pill: 9999px;
--shadow-lift: 0 8px 24px rgba(17,17,20,.04);
```

- Spacing: 24px card padding, 32px between message groups, 12px between stacked bubbles, 56px nav row height.
- Type: `text-[28px] font-medium` breadcrumb, `text-xl font-medium` contact names, `text-sm text-[--muted]` previews.
- Keep: single teal accent, gray incoming vs teal outgoing bubbles, borderless cards on pale gray, round unread badges.
- Adapt: the tilted mockup is just presentation; build the UI flat.

## Avoid

- Blue chat bubbles or a second accent hue; teal is the only brand color.
- Borders around bubbles, cards or list rows.
- Pure white page background with no pale-gray layer; the #F4F6F8 base is what shapes the cards.
- Bold 700 names; this system never goes above medium.
- Neon or saturated green; keep the teal dusty and muted.
