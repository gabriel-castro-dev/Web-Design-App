# Hirely Recruitment Web App

- **Section:** web-app
- **Subtype:** dashboard
- **Kind:** image (static reference, no code)
- **Source:** https://dribbble.com/shots/27438275-Hirely-Recruitment-Web-Application-UI-UX-Case-Study
- **Files:** `preview.webp`

## Overall style

A clean, friendly job-board product shown as two screens side by side: a job search page (hero, search bar, filters, results list) and a job detail page. The palette is icy blue-white (#F5F8FE) with one confident royal blue (#4068F9) for primary actions and small green "match" accents. It is distinctive for its soft, low-contrast card layering (white cards on pale blue with barely visible borders) plus a flat vector illustration in the hero and an "AI Match Score" ring on the detail page.

## Layout

- Each screen is a ~740px wide rounded window with a 60px white top nav: logo left, text links (Jobs active with blue underline, Companies, Resources, Pricing), and on the right chat icon, bell with red dot, avatar + name + role, chevron.
- **Search page:** left-aligned hero (two-line headline, gray subline) with an illustration of a woman on a laptop plus floating mini-cards on the right; a wide search bar card (keyword field, location field, blue "Search Jobs" button) with an "Advanced Search >" link; a row of outlined filter dropdown chips; then a three-column body: filter sidebar (~170px: Recommended list with counts, checkbox groups with counts, salary range slider), results list (~345px of stacked job cards + pagination), and a right column (~140px) of promo cards (Create job alert, Stand out to employers).
- **Detail page:** back link; job header (logo tile, title, company + location, meta chips, share icon button, "Apply Now" primary and "Save Job" secondary stacked on the right); underline tabs; two columns: main (~400px card with Job Description, Responsibilities, Requirements bullets, AI Match Score panel) and side (~250px cards: About Figma, Job Details key/value); bottom "Similar Jobs" horizontal row with a circular next arrow.
- Density is medium-high with small type; 16 to 24px gutters.

## Color palette

| Role | Hex | Usage |
| --- | --- | --- |
| Page background | #F5F8FE to #EBF3FE | Behind cards, outer canvas |
| Card surface | #FFFFFF / #FDFEFE | Search bar, job cards, detail cards, nav |
| Tinted panel | #EEF3FD | Active sidebar row, promo card fill, icon bubbles |
| Chip fill | #EFF2FA | Meta chips (Full-time, Mid Level, salary) |
| Border | #E3E8F2 (est.) | 1px card and chip outlines |
| Primary blue | #4068F9 | Apply Now, Search Jobs, active nav underline, pagination active, slider |
| Link blue | #516CBE / #4462A5 | Nav active label, "Advanced Search", "Clear all", "View all", outline button labels |
| Heading text | #061B46 to #0D1134 | Hero headline, job titles, section titles |
| Body text | #474752 / #5A5C6B | Descriptions, company names |
| Muted text | #71717A / #9FA0B4 | Meta labels, counts, timestamps |
| Success green | #2D6E58 text on #E6F6EF | "Great match" chip, salary text (#4D8E78), "Great Match!" label |
| Skill chips | #516FED text on #EEF2FD | AI match skill tags |
| Alert red | #F24E4E (est.) | Notification dot |

## Typography

- Geometric-humanist grotesk, likely Plus Jakarta Sans or Inter.
- Sizes (per ~740px screen): hero headline ~32px semibold, tight leading (~1.15), two lines; job detail title ~18px semibold; card titles ~11px semibold; body ~9 to 10px regular; section headings in detail ~12px semibold. Scale up ~1.6x for a real 1280px layout: hero 48px, titles 20px, body 14px.
- Weights: semibold for titles and headings, medium for buttons and nav, regular for body. Dark navy-black headings, never pure black.
- Sentence case everywhere.

## Components & patterns

- **Primary button:** solid #4068F9, white medium text, ~6px radius, no shadow.
- **Secondary button:** white with 1px light border and blue text ("Save Job", "Create Alert", "Improve Profile", "View Company Profile").
- **Search bar:** a single white card with dividers between fields, outline icons, and the blue button inset on the right.
- **Filter chips:** white, 1px border, ~6px radius, label + small chevron; "All Filters" has a sliders icon in blue.
- **Job card:** white, ~8px radius, 1px border; 36px company logo tile at left, title, company, then meta line with location and job type icons; salary in green top-right, bookmark icon and "2h ago" on the right.
- **Meta chips:** small rounded rectangles on #EFF2FA with an outline icon and dark gray label; the "Great match" chip is green-tinted.
- **Sidebar filters:** checkbox rows with right-aligned counts in parentheses; collapsible groups with chevrons; dual-thumb range slider in blue.
- **Tabs:** text tabs with a 2px blue underline on the active one.
- **AI Match Score:** tinted panel with a circular progress ring (blue arc, "92%" center), green "Great Match!" line with emoji, gray explanation, and a row of blue-tinted skill chips.
- **Pagination:** small number buttons, active one a solid blue circle.
- **Illustration:** flat vector character with blue sweater + floating UI mini-cards (search bubble, chart tile, job pill with green check).

## Signature details

1. Two-level blue tinting: pale blue page, white cards, and #EEF3FD tinted panels for secondary content, all with hairline borders instead of shadows.
2. Green salary text and green "Great match" chips as the only non-blue accent, tying the product to positive outcomes.
3. AI Match Score ring with skill tags embedded inside the job description card.
4. Stacked primary/secondary CTA pair on the job header (Apply Now over Save Job).
5. Hero illustration with floating mini UI cards around the character.
6. Real brand logos in square tiles (Dropbox, Linear, Notion, Airbnb) giving the list instant recognizability.

## Reproduce it

```css
--bg: #f5f8fe;
--card: #ffffff;
--tint: #eef3fd;
--chip: #eff2fa;
--line: #e3e8f2;
--primary: #4068f9;
--link: #4a66c4;
--ink: #0b1640;
--body: #4f5160;
--muted: #8a8c9c;
--success: #2d6e58; --success-bg: #e6f6ef;
--radius-sm: 6px;
--radius-md: 8px;
--radius-lg: 12px;
--shadow-window: 0 10px 40px rgba(64,104,249,.06);
```

- Spacing: 16px card padding, 12px between job cards, 24px column gaps, 44px search bar height.
- Type: `text-5xl font-semibold leading-[1.1] text-[--ink]` hero, `text-sm font-semibold` card titles, `text-xs text-[--muted]` meta.
- Keep: blue + green accent pair, hairline cards on pale blue, match score ring, filter sidebar with counts.
- Adapt: the illustration can be swapped for product imagery; logos come from your data.

## Avoid

- Heavy shadows or elevated floating cards; everything sits flat with 1px borders.
- Using the primary blue for body links and chips at full saturation; secondary blues are desaturated.
- Adding a colored sidebar or dark nav; the shell stays white and pale blue.
- Generic purple gradient hero backgrounds.
- Oversized rounded corners (16px+) on job cards; they stay at 8px.
