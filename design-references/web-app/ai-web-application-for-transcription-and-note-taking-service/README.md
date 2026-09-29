# Riser: AI Meeting Transcription Home

- **Section**: web-app
- **Subtype**: calendar
- **Kind:** image (static reference, no code)
- **Source:** https://dribbble.com/shots/24369801-AI-web-application-for-transcription-and-note-taking-service
- **Files:** `preview.webp`

## Overall style

A soft, airy light UI for an AI meeting recorder: near-white panels on a faint lilac tint, with one saturated electric violet/magenta used only for the brand, the primary "Record" action, the selected date, the usage bar and the active recording toggle. Everything else is black text and hairline grey borders, so the violet reads like a "recording light". The mock sits inside a thick rounded lilac bezel on a dusty grey-lavender backdrop.

## Layout

- Three columns under a borderless top bar: left sidebar (~300px of a 1680px canvas, about 18%), a central meeting feed (~38%), and a right schedule column (~30%) with a thin, pale vertical scroll track between feed and schedule.
- Top bar: logo far left, notification bell, search field (~340px), then pushed right: a "Past meeting url to record" input, split primary button "Record | v", outlined "Import" button.
- Sidebar, top to bottom: grouped white card with 3 rows (user identity, Work space, Invite Teammates) each ending in a chevron; icon + label nav (Home, AI Chat, My Conversation, Apps); a divider; collapsible sections (Channel, Direct Message, Folder) each with `+` and chevron; divider; plan usage block with progress bar.
- Feed: date heading ("Wednesday, June 2024"), then stacked meeting cards, each with title, meta row (time, duration, owner), overlapping avatar stack with "20+" count at top right, a "Summary" subheading, 3 timestamped bullets and a "Show more" link.
- Right column: month calendar with prev/next month links, then a list of upcoming meeting cards with time, "Join Meeting", title, guest count and a record toggle.
- Generous vertical rhythm: cards have ~24px padding and ~24px gaps; the sidebar nav rows sit ~64px apart.

## Color palette

| Role | Hex | Usage |
|---|---|---|
| Backdrop | `#C3BFC9` | Outer presentation background |
| Device bezel | `#E9E6EE` | Thick rounded frame around the app |
| App background / sidebar | `#F8F5FB` | Lilac-tinted canvas behind cards |
| Surface | `#FFFFFF` | Cards, inputs, calendar, feed column |
| Hairline border | `#F0F0F0` | Card outlines, row dividers |
| Soft lilac fill | `#EEE7F7` | Progress track, toggle-off track, scroll track |
| Primary violet | `#C000FC` (gradient to `#9000FC`) | Record button, logo, selected date, active toggle, Import outline |
| Usage bar | `#D444F6` | Progress fill in the plan block |
| Text | `#1D1C20` | Titles, nav labels |
| Muted text | `#484848` | Meta rows, bullets, timestamps |

## Typography

- Humanist sans with open apertures, in the Open Sans / Noto Sans family. A distinctive detail is the **old-style (lowercase) figures**: "10.00 am", "2024" and "1:35" have descending, smaller digits. Alegreya Sans does this by default, or use Open Sans / Source Sans with `font-variant-numeric: oldstyle-nums`.
- Brand wordmark ~30px/500 in violet; page date heading ~28px/600 in dark grey; card titles ~22px/600; "Summary" ~19px/600; body, bullets and nav ~17 to 19px/400; meta rows ~16px/400 muted.
- Sentence case throughout, normal tracking, no uppercase labels.

## Components & patterns

- **Primary split button**: violet fill, 8px radius, white mic icon + "Record", a 1px darker divider, then a chevron segment. The fill has a subtle left-to-right magenta-to-violet shift.
- **Secondary button**: "Import" as a white fill with a 1.5px violet border, violet text and icon, 8px radius.
- **Inputs**: white, borderless or near-borderless, 8px radius, a leading grey icon, placeholder in dark grey.
- **Sidebar account card**: white card, 16px radius, 3 rows separated by 1px hairlines; each row has a 48px circular icon/avatar with a thin grey ring, a label, and a chevron on the right.
- **Nav items**: solid filled glyph icons (house, robot, chat bubble, grid) in near-black, 18px labels, no active pill; the active state is carried by the bold weight only.
- **Meeting card**: white, 1px `#F0F0F0` border, ~12px radius, no shadow. The avatar stack uses 40px circles overlapping by ~30% with a white ring, followed by a "20+" count in small grey text.
- **Calendar**: plain grid, weekday headers ~18px, day numbers small (~14px). The selected day is a 24px violet rounded square with white digits. Header has month + refresh icon, a "Today" link, and a gear in a round grey chip.
- **Schedule card**: two stacked zones split by a hairline. The top zone has a clock icon, time range and "Join Meeting" with a camera icon. The bottom zone has the title, guest count and a pill toggle on the right with a mic icon in the knob (violet knob on white track with violet outline when on; grey knob on lilac track when off).
- **Usage meter**: 8px tall rounded bar, violet fill ~30% on lilac track, with 2 lines of muted helper text.

## Signature details

1. A single hot violet (`#C000FC`) used sparingly as a "live/recording" signal on an otherwise colorless UI.
2. A record toggle with a microphone glyph inside the knob, so each upcoming meeting can be auto-recorded.
3. Old-style numerals in all times and durations, which give an editorial, notebook-like softness.
4. Meeting cards that read like minutes: a "Summary" heading and bullets ending in inline timestamps ("... great meeting 1:35").
5. The sidebar opens with a grouped white "account card" of three chevron rows instead of a plain profile header.
6. A thick, pale lilac device bezel with ~60px outer radius on a grey-lavender backdrop.

## Reproduce it

- Tokens: `--bg: #F8F5FB; --surface: #FFF; --border: #F0F0F0; --accent: #C000FC; --accent-2: #9000FC; --accent-soft: #EEE7F7; --text: #1D1C20; --muted: #484848`.
- Radii: buttons/inputs 8px, cards 12px, sidebar group 16px, date chip 6px, toggles full.
- Spacing: 8px base; card padding 24px; card gap 24px; column gutter 32px.
- Borders over shadows: `border: 1px solid var(--border)`, no drop shadows on cards.
- Primary button: `background: linear-gradient(90deg,#C800FC,#9A00FC); color:#fff; height:48px; padding:0 20px; font-weight:600`.
- Enable `font-variant-numeric: oldstyle-nums` globally for body text.
- Keep the accent to about five places per screen. Adapt the three-column split to your domain, but keep "feed in the middle, calendar + schedule on the right".

## Avoid

- Spreading violet onto nav icons, headings or card backgrounds; it stops working as a signal.
- Adding drop shadows or gradients to cards; the look relies on flat white with hairlines.
- Swapping in a geometric grotesk with lining figures (Inter, Poppins), which loses the soft editorial feel.
- Tinted status pills or colorful category tags; this design has none.
- Filling the sidebar with active-state pills; keep nav as plain icon + label rows.
