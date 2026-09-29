# Quality Portal with AI Assist

- **Section:** web-app
- **Subtype:** dashboard
- **Kind:** image (static reference, no code)
- **Source:** https://dribbble.com/shots/27738772-Web-Application-with-AI-Chat
- **Files:** `preview.webp`

## Overall style

An enterprise manufacturing-quality home portal that splits the screen between a classic dashboard (left) and an AI "Smart Assist" launcher (right). The tone is corporate and dense: deep navy header, a navy hero carousel with a faint data-viz illustration, small Open Sans text, and muted status accents (burnt orange, sage green, steel blue). The AI panel softens it with a pastel blue-to-cream wash, a centered brand mark and suggestion cards grouped by intent.

## Layout

- Full-width navy top bar (~30px tall at this scale): product logos separated by vertical bars, tab links (Home active with underline, QMS and Admin dropdowns), centered-right search, help icon, initials avatar + name/role.
- Body on light gray `#f2f2f2`, split ~50/50:
  - Left: hero banner (~445px) + three vertical tab "spines" (AOP Q3, Profiles, Latest Apps) as narrow navy columns with rotated labels and "+" buttons; row of 3 KPI cards; then two cards side by side: "AI Apps" list and "Announcements" list.
  - Right: large "Smart Assist" panel (outlined in steel blue) with a header, centered logo + tagline, prompt input, and 4 stacked suggestion cards; a narrow collapsed drawer "Report Categories" with a rotated label on the far right.
- Footer strip "Applied Materials Confidential" in gray.
- High density, tight 8 to 12px gaps, small type.

## Color palette

| Role | Hex | Usage |
|---|---|---|
| Header / hero navy | `#0e4a82` | Top bar, hero carousel, vertical spines |
| Hero deep | `#08436e` | Hero gradient bottom |
| Canvas | `#f2f2f2` | Page background |
| Surface | `#ffffff` | Cards, suggestion cards |
| Text primary | `#222222` | Titles, list items |
| Text muted | `#6f6f6f` | Descriptions, dates |
| Steel teal | `#327c9c` | "Ask" button, AI logo, Smart Assist title, panel outline, "View All" |
| Burnt orange | `#c3641e` | Escalation KPI icon/number, bullets, Troubleshooting, "Maintenance" chip text |
| Orange tint | `#fef4e6` | Escalation icon tile, Maintenance chip, AI Apps count |
| Sage green | `#6f9a3e` | "New" chips (fill `#e3eed6`), Summarization label |
| Blue tint | `#dfeaf1` | "Update" chip, KPI icon tiles |
| Violet | `#6a5fb0` | Navigation suggestion label |
| Amber | `#f0c040` | Qx logo accent, underline beneath the prompt input |
| AI wash | `#e6f3fb` → `#fef6df` | Smart Assist panel background gradient |
| Border | `#dcdcdc` | Card outlines, chip outlines |

## Typography

- Humanist sans, **Open Sans** (clear match).
- Hero title ~22px bold white; card titles 12 to 13px semibold; KPI numbers ~15px semibold; body 9 to 10px regular; micro labels 7 to 8px. At real product scale multiply by ~1.4.
- KPI labels mix semibold label + regular parenthetical ("Customer Escalation (Closure / Created)").
- Vertical labels rotated 90deg for spines and the collapsed drawer.

## Components & patterns

- **Hero carousel:** navy with a faint line-art chart illustration, eyebrow label with a small ring icon, bold title, 2-line description, outlined white "View More" button, segmented progress bar indicators and circular prev/next buttons.
- **Vertical spines:** narrow navy cards with rotated text and a circled "+" at the bottom, representing collapsed carousel tabs.
- **KPI cards:** white, ~4px radius, label on top, colored square icon tile + big number ("72/110").
- **AI Apps list:** orange bullet, bold title, muted description, chevron; the first item expands into outlined filter chips (Part, System, Supplier, BU, Customer).
- **Announcements:** colored status chip on the left (New green, Update blue, Maintenance orange), title + description, date right-aligned.
- **Prompt input:** white pill field with soft shadow, placeholder example query, solid teal "Ask ->" pill button; a thin amber line under it.
- **Suggestion cards:** white, ~6px radius, subtle border; colored icon + category label (Troubleshooting orange, Summarization green, Navigation violet, Reporting teal) above a 2-line example question.
- **Collapsed drawer:** rounded outlined tab with rotated "Report Categories" label.

## Signature details

1. Dashboard and AI assistant sharing the home screen 50/50, not a floating chat bubble.
2. Pastel blue-to-cream radial wash behind the AI panel, contrasting the flat gray dashboard.
3. Suggestion prompts grouped by intent, each with its own hue-coded icon and label.
4. Collapsed carousel tabs and side drawer expressed as vertical spines with rotated labels.
5. Muted industrial accents (burnt orange, sage, steel teal) rather than bright SaaS colors.
6. Thin amber underline beneath the prompt input echoing the logo accent.

## Reproduce it

```css
--navy: #0e4a82; --canvas: #f2f2f2; --surface: #fff; --border: #dcdcdc;
--text: #222; --muted: #6f6f6f; --teal: #327c9c; --orange: #c3641e;
--green: #6f9a3e; --violet: #6a5fb0; --amber: #f0c040;
--ai-wash: radial-gradient(120% 90% at 0% 60%, #e6f3fb 0%, transparent 55%),
           radial-gradient(90% 80% at 100% 20%, #fef6df 0%, transparent 60%), #fff;
--r-card: 4px; --r-sugg: 6px; --r-pill: 999px;
--shadow-input: 0 4px 14px rgba(14,74,130,.10);
font-family: "Open Sans", system-ui; /* body 13px, titles 15-16px, hero 30px at 1440 */
```

- Spacing: 8px base, 12px card padding, 8 to 12px gutters.
- Keep: split dashboard + assistant, intent-coded suggestions, muted industrial palette.
- Adapt: bump the tiny type for accessibility; keep the density but use 13 to 14px body.

## Avoid

- Neon/purple "AI" gradients and sparkles; the assistant here stays corporate.
- Rounded bubbly chat UI; suggestions are rectangular cards.
- Giving every KPI the same color; each metric has its own muted hue.
- Oversized whitespace; this is an information-dense enterprise portal.
