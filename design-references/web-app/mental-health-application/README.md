# Mental Health Application (Mentalthy)

- **Section:** web-app
- **Subtype:** booking
- **Kind:** image (static reference, no code)
- **Source:** https://dribbble.com/shots/17155604-Mental-health-application
- **Files:** `preview.webp`

## Overall style

A friendly therapist-finder and booking app shown as a tilted, cropped collage of screens. It is almost entirely white and very pale gray with rounded, softly shadowed cards, dark slate-navy bold headings and one saturated royal blue (#3562FF) for the "Book Consultation" pills. Small colored rating badges (green, amber, red) and a calm grayscale meditation photo add warmth without breaking the clean, reassuring mood.

## Layout

- App on a very light cool background (#F8F9FD) with a blue left sidebar edge visible (#3562FF) and a "Log out" link at the bottom-left.
- **Welcome block:** big greeting "Hello, Sarah! Welcome to Mentalthy" then a wide white filter card: intro copy on the left, a row of labeled select fields (Type of counseling, City, Age, Gender) separated by thin vertical dividers, and a large rounded-square pale-blue search button.
- **"Best for you" section:** heading + gray count pill + "See all >" pill link on the right; a 3-column grid of psychologist cards (~300x330).
- **"Psychologists nearby":** heading with count pill; a compact grid of smaller doctor cards (avatar, name, specialty, location + distance, rating badge).
- **Meditation promo:** bold centered two-line headline "Stay calm! Our meditation lessons will help you to relax. Try them now!" with a dark navy "View Meditations >" pill, then a horizontal carousel of large photo cards (stacked stones, white arches) each with a round play button, title and description.
- Generous whitespace; cards separated by ~24px gaps; everything feels spacious.

## Color palette

| Role | Hex | Usage |
| --- | --- | --- |
| App background | #F8F9FD | Behind cards |
| Card | #FFFFFF | All cards and filter bar |
| Section band | #F1F3F6 (est.) | Slightly grayer zone behind the meditation area |
| Primary blue | #3562FF | "Book Consultation" pills, sidebar |
| Blue tint | #E6ECFF | Search button, "See all" pill |
| Dark CTA | #20263A | "View Meditations" pill |
| Heading ink | #313343 / #232838 | Greetings, section titles, doctor names |
| Body text | #3B404E | Location, experience lines |
| Muted | #A1A5AD / #B1B6BC | Specialty, labels, distance, "Online/Offline" |
| Tag fill | #EEF0F3 (est.) | Topic chips (Abuse, Depression) |
| Tag text | #686A70 | Topic chip labels |
| Count pill | #E9EBEE bg / #6B6F78 text | "24", "16", "28" beside headings |
| Rating high | #1D955D | Green badge for 5.0 |
| Rating mid | #FAB972 / #FDB361 | Amber badge for ~4.x |
| Rating low | #FA4C4E / #FE3639 | Red badge for 3.x |
| Notification dot | #FA4C4E | Bell badge |

## Typography

- Rounded geometric sans, likely Gilroy or Sofia Pro (free fallbacks: Plus Jakarta Sans, Outfit, Nunito Sans).
- Sizes (normalized to a 1440 build): greeting ~40px bold; section titles ~32px bold; promo headline ~32px bold centered; doctor name ~20px bold; specialty ~15px regular muted; body/meta ~14px medium; chips ~11px medium; price ~16px bold with a ~12px muted "/Online" line; buttons ~15px semibold white.
- Weights split sharply: bold headings and names vs regular/medium small text. Title case for names, sentence case elsewhere.

## Components & patterns

- **Doctor card:** white, ~16px radius, very soft large shadow (low opacity, wide blur); 56px circular avatar with a white ring, name bold, specialty muted, pin + city, "X yrs of exp." and "N consultations" as two stacked lines, topic chips row with a "+3" outlined circle, footer with price + availability on the left and the blue CTA on the right.
- **Rating badge:** small pill overlapping the bottom of the avatar, solid green/amber/red fill, white star + score.
- **Primary CTA:** fully rounded blue pill, ~48px tall, white semibold label, subtle blue shadow.
- **Dark CTA:** fully rounded navy pill with a ">" chevron.
- **Topic chips:** fully rounded light gray pills with small gray text; overflow shown as a white outlined circle "+3".
- **Filter bar:** one white rounded card containing select fields with tiny gray labels above values and chevrons, thin vertical dividers between fields, and a pale-blue rounded-square search button.
- **Count pill:** small gray pill next to section headings.
- **Media cards:** large photos with ~16px radius, grayscale/soft tones; round white play button with dark triangle.
- **Icons:** thin outline (pin, bell, search) at small sizes.

## Signature details

1. Traffic-light rating badges overlapping the avatar bottom, making quality instantly scannable.
2. One royal blue reserved for "Book Consultation", while secondary CTA uses dark navy.
3. Gray count pills beside every section heading.
4. Soft, wide, low-opacity shadows that make white cards float on an almost-white background.
5. Calm grayscale meditation photography contrasting the bright UI.
6. Filter card built as one continuous rounded bar with inline select fields and dividers.

## Reproduce it

```css
--bg: #f8f9fd;
--card: #ffffff;
--primary: #3562ff;
--primary-tint: #e6ecff;
--navy: #20263a;
--ink: #2b2f3f;
--body: #3b404e;
--muted: #a1a5ad;
--chip: #eef0f3;
--chip-ink: #686a70;
--rate-high: #1d955d; --rate-mid: #fab972; --rate-low: #fa4c4e;
--radius-card: 16px;
--radius-btn: 9999px;
--radius-search: 18px;
--shadow-card: 0 16px 40px rgba(35,40,56,.06);
--shadow-cta: 0 8px 18px rgba(53,98,255,.28);
```

- Spacing: 24px card padding, 24px grid gap, 56px between sections, 8px between chips.
- Type: `text-4xl font-bold text-[--ink]` greeting, `text-xl font-bold` names, `text-sm text-[--muted]` specialty.
- Keep: white-on-near-white floating cards, blue booking pill, colored rating badges, gray chips, calm photography.
- Adapt: rating color thresholds and chip taxonomy to your domain; the tilted collage is presentation only.

## Avoid

- Pastel or gradient backgrounds; the calm comes from white space, not color.
- Multiple button colors in cards; only one blue CTA per card.
- Hard borders on cards; separation comes from soft shadows.
- Saturated or busy stock photos for meditation content; keep them muted and minimal.
- Thin light headings; names and titles need bold weight for the friendly, confident tone.
