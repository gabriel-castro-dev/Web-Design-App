# Aviation Flight Log Data Table

- **Section**: web-app
- **Subtype**: data-table
- **Kind:** image (static reference, no code)
- **Source:** https://dribbble.com/shots/22865051-Aviation-SAAS-Web-Application-s-Data-Tables-UX-UI-Design
- **Files:** `preview.webp`

## Overall style

An enterprise operations table for airline ground handling: a deep royal-blue sidebar against a pale grey-white workspace, with a dense but tidy flight-log grid. The table itself is neutral; personality comes from airline logos as row markers, a warm amber active tab, and rows of pastel two-letter status chips (BO, HQ, RT, ST) that behave like a traffic-light matrix. The screen floats as a tilted-free device card on a blue gradient backdrop.

## Layout

- App shell: fixed left sidebar (~13% width) in saturated blue, with a white top bar spanning the content area.
- Top bar: airline logo, a collapse chevron `<<`, then a segmented tab group of dashboards (RMS Dashboard with an orange dot, OTP Dashboard, Map View, `...`) on a pale blue track. On the right: bell, gear, "Reports" chip with a red notification dot, and an "LP" initials avatar.
- Page header on the grey canvas: title "Flight Log management", home icon + breadcrumb link, then right-aligned date picker, time-range picker (white fields with icons), and a solid blue "Manage Flights" dropdown button.
- Main white card: text tabs (Inbound / Outbound / Turnaround), a row of dropdown filter pills (Airline, Aircraft, Origin, Destination, Flight no., Airport) plus search and view-toggle icons at the right, then "Showing results for:" with removable chips.
- Table: 8 columns, logo in the first column, ~37px rows at 1x, zebra-tinted on hover/selection, and a status column with 4 chips per row.
- Footer: "Showing 1-10 of 9999 records" at left, pagination with first/prev/numbers/next/last at right. A page footer below has copyright, About and Help.

## Color palette

| Role | Hex | Usage |
|---|---|---|
| Backdrop gradient | `#6E9ED7` to `#2D5593` | Presentation background |
| Sidebar | `#002884` (to `#033A98` top) | Navigation rail |
| Sidebar active | `#2450A0` | Active item row, with left white bar |
| Workspace | `#ECEEF2` | Canvas behind the card |
| Surface | `#FFFFFF` | Top bar, main card, inputs |
| Tab track / selected row | `#E4ECF8` | Segmented dashboard tabs, highlighted row |
| Primary blue | `#0460C4` | Manage Flights button, date text, pagination |
| Amber accent | `#E0A450` | Active tab text + underline, status dot |
| Text | `#35363D` | Table cells and headings |
| Muted text | `#808185` | Labels, "Showing results for" |
| Chip border | `#E4E4E4` | Filter chips |
| Status green | `#A8E8CC` | BO / ST OK chips |
| Status pink | `#F098AC` | HQ / RT alert chips |
| Status peach | `#FCDCA8` | RT pending chips |
| Avatar mint | `#E8F8F0` (text `#4CAD86`) | Initials avatar |

## Typography

- Humanist/neo-grotesk sans, likely Source Sans Pro, Roboto or Lato. Small sizes with slight positive tracking (`letter-spacing: .02em`) on table data.
- Page title ~17px/500; tabs ~16px/400 (active amber); table header ~13px/600 dark; cells ~13px/400 with tabular figures; chip labels ~11px/600 uppercase; sidebar labels ~13px/400 white at ~70% opacity.
- Breadcrumb uses an uppercase, underlined link style ("FLIGHT LOG MANAGEMENT").

## Components & patterns

- **Sidebar item**: outline/solid white glyph + label, rows separated by thin lighter-blue dividers, active row lighter blue with a 3px white left indicator.
- **Segmented tabs**: pale blue track, active segment white with a small orange status dot before the label.
- **Filter dropdown pills**: no border, light fill on hover, label + chevron.
- **Removable chips**: white, 1px grey border, full radius, label + `x`.
- **Status chips**: 32x22px rounded rectangles (4px radius), pastel fill with slightly darker same-hue text, two uppercase letters. Four per row form a mini status matrix.
- **Sort icons**: stacked up/down carets next to every header. One header is replaced by an inline text input ("Bay") for column filtering.
- **Row logos**: 24px airline marks placed directly without containers.
- **Pagination**: bordered square for the current page, plain numbers, chevrons and double chevrons in blue.
- **Pickers**: white 40px-tall fields, 4px radius, blue text and blue outline icons.

## Signature details

1. The four-chip pastel status matrix per row (green/pink/peach), readable at a glance as a column pattern.
2. Real brand logos as the leading cell, replacing avatars or checkboxes.
3. Amber as the "you are here" color (active tab, dashboard dot) contrasting with the royal-blue chrome.
4. A deep saturated blue sidebar against a nearly colorless table, a classic enterprise pairing done cleanly.
5. Inline column filter input living inside the header row.
6. "Showing results for:" chip row that makes applied filters explicit.

## Reproduce it

- Tokens: `--sidebar:#002884; --sidebar-active:#2450A0; --canvas:#ECEEF2; --surface:#fff; --primary:#0460C4; --highlight:#E4ECF8; --amber:#E0A450; --text:#35363D; --muted:#808185`.
- Status chips: `ok {bg:#A8E8CC; fg:#2F6754}`, `alert {bg:#F098AC; fg:#6A2A3B}`, `pending {bg:#FCDCA8; fg:#6B5020}`; `height:22px; min-width:32px; radius:4px; font:600 11px/1 sans; text-transform:uppercase`.
- Table: `row-height:38px; font-size:13px; font-variant-numeric: tabular-nums; header weight 600`; hover/selected rows `#E4ECF8`.
- Radii small (4 to 6px); main card 4px with no visible shadow.
- Keep the density and the logo column. Adapt the status matrix to your own multi-step checklist.

## Avoid

- Saturated status colors; the chips must stay pastel so a whole column does not scream.
- Big rounded cards, heavy shadows or glassmorphism; this is flat enterprise UI.
- Adding a second bright accent beyond blue + amber.
- Oversized row heights; the value is scanning many records.
- Uniform placeholder data in production mocks (every row identical here); vary it so the chip matrix reads as information.
