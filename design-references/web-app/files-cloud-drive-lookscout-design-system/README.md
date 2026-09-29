# Files Cloud Drive (Lookscout Design System)

- **Section:** web-app
- **Subtype:** files
- **Kind:** image (static reference, no code)
- **Source:** https://dribbble.com/shots/26839751-Files-Cloud-Drive-Lookscout-Design-System
- **Files:** `preview.webp`

## Overall style

A neutral charcoal dark-mode file manager from a UI kit, shown as three panels (collapsed rail, expanded sidebar, full app) floating over a deep electric-blue gradient backdrop. The UI itself is almost colorless: graphite surfaces, white semibold titles, gray labels, with color reserved for file-type icons, one bright blue progress/accent and solid status pills. What sets it apart are the file cards that glow faintly in their file type's color (green for ZIP, red for PDF) behind the icon.

## Layout

- Presentation: three separate panels with ~12px radius, left to right: a 56px icon rail, a 250px expanded sidebar, and the full app window, all aligned to the same top edge. The backdrop is a saturated blue wave gradient fading to black at the bottom.
- App window: top bar (~84px) with logo on the left and horizontal text tabs (Dashboard / Files / Profile / Settings), the active tab sitting on a slightly lighter rounded rectangle.
- Left sidebar (~250px) under the top bar: two nav groups separated by a hairline (Dashboard, Inbox, Notifications, Schedule / Statistics, Wallet, Settings) and a "Projects" block pinned at the bottom with avatar-letter circles, task name, percentage and thin blue progress bars.
- Content (~40px padding): "Quick Access" row of 3 square-ish file cards (~330x280), "Pinned Folders" row of wide folder pills (~450x66), and "Recently Edited" table (Name + subtitle, Status pill, Progress bar + %, Deadline).
- Spacing is generous; sections separated by ~50px; cards in a row gap of ~30px.

## Color palette

| Role | Hex | Usage |
| --- | --- | --- |
| Backdrop gradient | #3A6BFF to #0B1270 to #000000 | Presentation background only |
| App surface | #232426 | Main content background |
| Sidebar / top bar | #202226 (slightly blue-tinted where translucent: #1E232F) | Nav regions |
| Card surface | #252525 to #282828 | File cards, folder pills, table body |
| Raised / header | #2B2D2E | Table header row, active tab, icon button bg |
| Active nav row | #2B3643 | Selected sidebar item, plus a 2px #0676FD left edge |
| Divider | #333538 (est.) | Hairlines between rows and groups |
| Text primary | #FFFFFF | Section titles, file names, active tab |
| Text secondary | #A6A8AA to #B2B4B3 | Nav labels, subtitles, table headers, inactive tabs |
| Text tertiary | #717375 | "Projects" caption, percentages under avatars |
| Accent blue | #0676FD | Progress bars, notification count, active indicator, "distributed" pill |
| Status amber | #EDA333 | Warning pill ("magnetic"), K avatar |
| Status green | #28BB73 | Success pill ("innovative"), ZIP icon (#2C9F6D), C avatar |
| Status red | #E03D32 | Danger pill ("24/365"), PDF icon (#F3616F) |
| Progress track | #2C2E2D | Unfilled progress bar |

## Typography

- Neutral grotesk, almost certainly Inter.
- Sizes at 1920 shot scale: section titles ~22px semibold; file names ~18px semibold; top tabs ~18px medium; table primary cell ~18px medium with ~16px regular gray subtitle; sidebar nav ~14px medium; captions ~12px regular.
- White for titles, mid-gray for everything secondary; no uppercase, default tracking.
- Numbers (75%, 50%) in white medium, right-aligned next to the bar.

## Components & patterns

- **File card:** #252525 fill, 1px subtle lighter border (#2E3033), ~10px radius, eye icon in a 44px rounded-square button top-left, "•••" top-right, centered flat file-type icon (colored document with folded corner and white "ZIP/PDF" label), then gray "1 File" and white filename. A soft radial glow of the file color sits behind the icon.
- **Folder pill:** wide row card, ~8px radius, 1px border, outline folder icon, white semibold name, "•••" at far right.
- **Table:** container with ~10px radius and 1px border; header row on #2B2D2E with gray labels and a sort arrow; body rows separated by hairlines; 2-line name cell.
- **Status pills:** fully rounded, solid saturated fill, white text, a small white dot before the label.
- **Progress bars:** 6px tall, fully rounded, #0676FD fill on a #2C2E2D track, value to the right.
- **Sidebar nav:** 20px outline icons, 14px medium labels, active row with lighter blue-gray fill and a 2px blue left border; blue circular count badge (9).
- **Projects list:** 24px colored letter avatars (blue L, green C, amber K), task title, percent caption, short blue bar.
- **Top tabs:** text-only, active tab on a #2B2D2E rounded rectangle (~8px) with white text.

## Signature details

1. File cards with a faint radial glow tinted by the file type color behind a flat colored document icon.
2. Strictly neutral charcoal surfaces (not navy) so the single electric blue (#0676FD) pops on progress bars and indicators.
3. Solid saturated status pills with a white leading dot, placed on a dark table.
4. Sidebar project tracker at the bottom: letter avatars + micro progress bars.
5. Presentation of the same nav in three densities (rail, expanded, in-app), useful as a responsive spec.
6. Deep blue gradient backdrop used only for the shot, making the gray UI feel lit.

## Reproduce it

```css
--bg: #232426;
--sidebar: #202226;
--card: #262728;
--raised: #2b2d2e;
--nav-active: #2b3643;
--line: #34363a;
--text: #ffffff;
--text-2: #a7a9ab;
--text-3: #717375;
--accent: #0676fd;
--ok: #28bb73; --warn: #eda333; --danger: #e03d32;
--radius-card: 10px;
--radius-btn: 8px;
--radius-pill: 9999px;
```

- Card glow: `background: radial-gradient(60% 50% at 50% 35%, rgba(44,159,109,.22), transparent 70%), var(--card);` (swap color per file type).
- Borders: `1px solid rgba(255,255,255,.06)`; no drop shadows inside the app.
- Spacing: 40px content padding, 30px card gap, 16px card padding, 64px table rows.
- Type: `text-[22px] font-semibold` section titles, `text-lg font-semibold` filenames, `text-sm font-medium text-[--text-2]` nav.
- Keep: neutral graphite base, single blue accent, file-color glows, solid status pills.
- Adapt: backdrop gradient is optional; if you use it, keep it outside the app shell.

## Avoid

- Tinting the surfaces navy or purple; the charcoal neutrality is key.
- Multiple accent colors for progress bars; they are all the same blue regardless of status.
- Heavy glassmorphism or blur on the cards; the glow is subtle and localized.
- Outlined or pastel status pills; here they are solid and saturated.
- Large drop shadows; depth comes from 1px borders and slight value steps.
