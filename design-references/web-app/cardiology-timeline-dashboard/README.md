# Cardiology Treatment Timeline

- **Section**: web-app
- **Subtype**: health
- **Kind:** image (static reference, no code)
- **Source:** https://i.pinimg.com/originals/b2/bd/ea/b2bdea17b099b6ac5263238382b6b154.jpg
- **Files:** `preview.webp`

## Overall style

A medical treatment timeline rendered as a warm-grey, tactile canvas inside a dark rounded device frame, presented on a neon lemon-yellow background. The UI mixes soft pill tabs, off-white rounded cards and a branching node-graph timeline that links medication pills to chart cards. Acid yellow is reused inside the UI for timeline nodes, chart fills and count badges, which makes the whole piece feel like a coherent, fashion-forward product rather than a clinical tool.

## Layout

- Device frame: dark grey (`#585858`) bezel with ~48px outer radius. The header is carved into the frame: the "Cardiology" title sits on a warm-grey tab that curves into the bezel (like a folder tab), with a round close button to its left.
- Top-right tab strip of 6 pill tabs (Treatment Dynamics active in white, others in translucent grey), each with a line icon.
- Patient row: a rounded card with photo, "Female, 24" and a bold name, then a vitals row of label/value pairs (Diagnosis: Hypertension, Heart Rate 89 bpm, Pressure 100/67, Oxygen 98%, Temperature 36.8 C), and below it a filter pill row (Office Visits, Medications, Labs selected in white; Procedures, Hospitalizations, Imaging unselected) with a round filter-sliders button.
- Timeline canvas: a horizontal thin line (red fading to grey) runs across; yellow circular nodes mark months; thin 1px connector lines branch down with rounded elbows to month labels ("Aug / I Week"), medication pills ("Aspirin x2"), and cards (Blood Pressure, Symptoms, ECG). A small vertical up/down scroller sits on each week column. A dark "+" button ends the line on the right.
- Bottom: a floating white pill scrubber of months (Jan 2022 ... Sep) with small circular icon chips (notes, pills, labs) carrying yellow count badges. The current range (Aug to Sep) is a dark inverted segment.

## Color palette

| Role | Hex | Usage |
|---|---|---|
| Backdrop | `#F3FF49` | Neon yellow presentation background |
| Device bezel | `#585858` | Frame and header surround |
| Canvas | `#E0DFD6` | Warm grey app background |
| Card | `#F2F1EC` | Patient card, chart cards, inactive pills |
| Surface white | `#FFFFFF` | Active tabs, selected filters, scrubber, icon chips |
| Inactive pill | `#EAE8E3` | Unselected filter pills and tabs |
| Medication pill | `#8C8C8C` | Grey capsule body with white icon cap |
| Acid accent | `#F2FC4E` | Timeline nodes, chart area fill, count badges |
| Ink | `#1A1C1C` | Text, "+" button, value tooltips |
| Dark segment | `#2F3636` | Active range in scrubber |
| Muted text | `#7F8077` | Labels ("Heart Rate", "I Week") |
| Alert line | `#E0705A` | Thin red timeline line, up-trend marker |

## Typography

- Neo-grotesk with a slightly condensed, modern feel, likely **Inter Tight**, **Satoshi** or **General Sans**.
- Title "Cardiology" ~28px/400 (large and light, not bold). Vital values ~22px/400 with tiny unit suffixes (~11px: "bpm", "/ 67", "%", "C") set on the baseline.
- Card titles ~16px/400; averages "160 / 110" with a small secondary denominator; deltas "+10" / "-20" ~16px with tiny triangle markers.
- Micro labels ~9 to 10px/400 muted ("Diagnosys", "Friday", "I Week"). Pill labels ~11px/400.
- Everything sentence case; weight contrast is minimal, size contrast does the hierarchy.

## Components & patterns

- **Pill tabs**: full radius, ~40px tall, icon + label; active is solid white, inactive is a translucent light grey on the dark header.
- **Filter pills**: full radius, ~34px, white when selected, `#EAE8E3` when not; no borders.
- **Medication pill**: a capsule split in two, a white circular cap with a pill icon on the left and a grey body with the name and "x2" on the right.
- **Chart card**: `#F2F1EC`, ~24px radius, title top-left, a white circular icon button top-right (scale icon), a small area chart with yellow upper band over grey hatched lower band, a vertical marker line with a dark rounded value tooltip ("180 / 120") and a tiny day label, footer with "Average: 160 / 110" and a delta.
- **Timeline nodes**: 40px acid-yellow circles with a dark outline icon; connectors are 1px dark lines with 16px rounded elbows.
- **Scrubber**: white full-radius bar, month labels in tiny grey text, 28px circular icon chips with tiny yellow count bubbles, and an inverted dark segment for the selected range.
- **Close / plus buttons**: 40px circles, white with an "x", or dark with a white "+".
- **Body map**: a faint grey human silhouette with a red highlight blob on the chest inside the Symptoms card.

## Signature details

1. A branching node-graph timeline with rounded elbow connectors instead of a standard list or Gantt.
2. Capsule-shaped medication chips that literally look like two-tone pills.
3. Acid-yellow used both outside (backdrop) and inside (nodes, chart fills, badges) on a warm-grey, almost putty UI.
4. The header tab carved into the dark device bezel, like a folder tab.
5. Large, light-weight numbers with tiny unit suffixes for vitals.
6. Bottom month scrubber with icon chips and count badges, with the active range inverted to dark.

## Reproduce it

- Tokens: `--canvas:#E0DFD6; --card:#F2F1EC; --white:#FFF; --pill:#EAE8E3; --ink:#1A1C1C; --muted:#7F8077; --accent:#F2FC4E; --capsule:#8C8C8C; --alert:#E0705A; --bezel:#585858`.
- Radii: cards 24px, tabs/pills full, device frame 48px, tooltips full.
- Spacing: 8px base; card padding 20px; gaps 16 to 24px.
- No borders on cards; separation is purely tonal (card vs. canvas). Shadows: none, except the scrubber `0 6px 20px rgba(0,0,0,.08)`.
- Chart area: `fill: #F2FC4E` for the upper band, diagonal hatch pattern (`#D8D7CE` lines on `#E6E5DC`) for the lower band.
- Connectors: SVG paths with `stroke:#1A1C1C; stroke-width:1; stroke-linejoin:round` and 16px corner radii.
- Keep the warm grey and single acid accent. Adapt the timeline nodes to other event types (visits, labs) with the same yellow node style.

## Avoid

- Clinical blue/teal palettes and white backgrounds; the warmth of the putty grey is essential.
- Heavy bold headings; the look relies on light weights at large sizes.
- Using yellow for text or large areas inside the UI; keep it to small nodes, fills and badges.
- Straight-angle connectors or dashed lines; they should be thin with rounded elbows.
- Card borders and drop shadows on every element.
