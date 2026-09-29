# Palantir Mesa Activity Monitor

- **Section:** web-app
- **Subtype:** files
- **Kind:** image (static reference, no code)
- **Source:** https://dribbble.com/shots/1798202-Palantir-Mesa-activity-monitor-in-context
- **Files:** `preview.webp`

## Overall style

A restrained, engineering-grade data tool from the flat-design era (2014): a near-black top bar, a plain white file list, and a dropdown "activity monitor" popover that packs a dense task table and two small area charts. It feels precise and quiet; colour is spent only on file-type icons and on a red-to-blue gradient in the charts, which encodes load intensity.

## Layout

- Shown inside a Safari window on a blurred mountain-dusk wallpaper (presentation only).
- Top bar ~44px, `#182024`, logo + product name left, right side: a small chart icon (active, blue) that opens the monitor, user name with person icon, "Log out".
- Breadcrumb row ("All files > Ornithology > Charadriiformes") in ~15px text, last segment bold.
- Full-width file table: header row on a pale blue-grey band, rows ~24px tall with 1px hairline separators, a coloured file-type glyph, file name, and a date column far to the right.
- Popover anchored under the chart icon, ~430px wide, right-aligned, with a caret-free flat top edge: tab links ("Running tasks · Completed tasks"), an 8-column table (File, ID, Type, # Cores, Memory, Start time, User, Status), then two side-by-side mini charts with captions.
- Very dense: 12-13px body text, 6-8px cell padding, no cards.

## Color palette

| Role | Hex | Usage |
| --- | --- | --- |
| Top bar | `#182024` | App header, dark text base |
| Background | `#FFFFFF` | File list and popover surface |
| Header band / chart bg | `#F4F8FA` | Table header row, chart plot background |
| Row hover/selected | `#E8F0F4` | Highlighted row in the popover |
| Primary text | `#182024` | Names, headers |
| Muted text | `#6F7173` | Dates, captions |
| Disabled text | `#C0C6CA` | Values for queued tasks (not yet measured) |
| Link / sorted column | `#4D87BA` | "Memory" sort header, active chart icon |
| Chart high | `#E04C5E` | Top of area gradient (peak load) |
| Chart low | `#5B8FC6` | Bottom of area gradient |
| File icon: script | `#F9A860` | Orange `</>` code glyph |
| File icon: table | `#1F9048` | Green grid glyph |
| File icon: recording | `#8C5A78` | Plum document glyph |
| Error | `#CD413C` | Round "x" cancel badge on a row |

## Typography

- Condensed-ish technical grotesk, almost certainly **DIN Next / FF DIN** (alternatives: Barlow, D-DIN, Roboto Condensed at normal width).
- Sizes: breadcrumb 15px, table body 12-13px, popover headers 11-12px semibold, chart captions 11px.
- Weights: regular for data, medium/semibold for headers and the active tab.
- Chart titles in uppercase with a middle-dot suffix ("MEMORY USAGE · Past hour"), light tracking.

## Components & patterns

- **Top bar:** flat, no shadow, white icon + wordmark, right-aligned utilities in light grey.
- **Breadcrumb:** chevron separators, muted parents, bold current folder.
- **File table:** no zebra striping; hairline `#EEF1F3` separators; 16px coloured monochrome file-type icons.
- **Popover:** white, square-ish corners (2-3px), soft grey shadow `0 4px 16px rgba(0,0,0,.15)`, 1px `#E2E6E9` border.
- **Tabs as text links:** active tab bold dark, inactive muted, separated by a middle dot.
- **Sortable column header:** the sorted column turns blue with a small caret.
- **Row states:** hovered row gets a pale blue fill and a red circular cancel button appearing at the right edge; queued tasks show their metric cells in faded grey.
- **Area charts:** stepped (cores) and smooth-ish (memory) area fills with a vertical gradient red top to blue bottom, no gridlines, no axes, only a caption below ("Using 10 MB (10%) of 100MB").

## Signature details

1. Vertical red-to-blue gradient on area charts: the height of the data literally heats up in colour.
2. Faded grey values for tasks that are queued, instead of dashes or "N/A".
3. Middle-dot separators in both tab labels and chart titles, giving a typographic, print-like rhythm.
4. Tiny coloured file-type glyphs as the only colour in the main list.
5. DIN typography, which makes the whole thing feel like instrumentation.
6. The monitor is a popover in context, not a separate page, so the data tool never leaves the file view.

## Reproduce it

```css
--bar: #182024; --bg: #FFFFFF; --band: #F4F8FA; --hover: #E8F0F4;
--text: #182024; --muted: #6F7173; --disabled: #C0C6CA; --link: #4D87BA;
--chart-hi: #E04C5E; --chart-lo: #5B8FC6; --danger: #CD413C;
--radius: 3px; --row-h: 24px; --font: "DIN Next", "Barlow", system-ui;
.area { fill: url(#heat); } /* linearGradient y1=0 #E04C5E -> y2=1 #5B8FC6 */
```

- Keep type at 12-13px and rows at 24px; the density is the point.
- Adapt the chart gradient to your own "hot vs cool" pair, but keep it vertical.
- Use a real popover (anchored, with shadow) for secondary monitoring panels.

## Avoid

- Rounding everything to 12px+ and adding card shells; this style is flat and square.
- Bright multi-colour dashboards; colour must stay reserved for file types, links and chart heat.
- Axis-heavy charts with gridlines and legends; the charts here are sparklines with a caption.
- Swapping DIN for a rounded geometric sans, which loses the technical tone.
