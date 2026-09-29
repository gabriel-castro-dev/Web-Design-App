# ShareFlow: Subscription Creator Web App

- **Section:** web-app
- **Subtype:** profile
- **Kind:** image (static reference, no code)
- **Source:** https://dribbble.com/shots/25543290-Subscription-based-Web-App
- **Files:** `preview.webp`

## Overall style

A bright, friendly creator-subscription app (Patreon-like) shown as a creator profile inside a feed shell. White surfaces on a very light gray canvas, near-black navy for primary actions and a hot vermilion-to-coral red for "creator" and "premium" moments. Everything is pill-shaped and outlined with hairlines, so the page reads soft and social rather than corporate. The warm red gradient upsell card is the single loud block on an otherwise calm page.

## Layout

- App frame with ~24px outer radius floating on a blue-gray backdrop (`#aeb6c8`), 1680x1195 inside a 1920 shot.
- Three columns: left sidebar ~300px (white, separated by a hairline), main column ~900px, right rail ~370px. Main + rail sit on a `#f6f6f6` canvas with ~28px gutters.
- Top bar spans main + rail: wide pill search (left), red "Become a creator" pill, round bell button, avatar + name/handle (right).
- Main column: profile hero card (cover photo, centered overlapping avatar, name, role, follow/message buttons left, social circles right), then a card with pill tabs + grid/list toggle and a 2-column post grid.
- Right rail: stacked cards: "Recommended" list, "Donate" mini form, red gradient "Unlock Premium" card.
- Sidebar: logo, nav (active item as outlined pill with count badge), "Following" list of avatars, "Log out" pinned to bottom.
- Medium density; generous 20 to 24px card padding, 70px row pitch in the nav.

## Color palette

| Role | Hex | Usage |
|---|---|---|
| Backdrop (presentation) | `#aeb6c8` | Behind the app frame only |
| Canvas | `#f6f6f6` | Main area behind cards |
| Surface | `#ffffff` | Sidebar, cards, inputs |
| Hairline border | `#e8e9ec` | Card outlines, pills, input borders |
| Text primary | `#2a2f3a` | Names, titles, nav labels |
| Text muted | `#8a8f99` | Roles, handles, placeholder |
| Ink / primary dark | `#262f43` | Active tab pill, Donate button, search button |
| Accent vermilion | `#df4928` | "Become a creator", + follow buttons, count badges, Unlock Premium label |
| Premium gradient | `#f52f34` → `#fb9e52` (top-right) → `#cd3262` (bottom-left) | Upsell card fill |
| Neutral chip | `#e6e8ec` | Tab count bubbles, "Premium" tag |

## Typography

- Rounded geometric sans, likely **Outfit** or **Urbanist** (open round bowls, single-storey feel, soft terminals).
- Profile name ~28px medium; card titles ("Recommended", "Donate", "Long-awaited vacation") ~22 to 24px medium; body 17 to 18px regular; meta/muted 14 to 15px.
- Weights stay in 400 to 500; no heavy bolds anywhere, even in the premium headline (~28px medium, white).
- Sentence case throughout, normal tracking.

## Components & patterns

- **Search:** full pill, light gray fill, hairline border, dark navy circular search button inset at the right end.
- **Primary CTA:** pill, solid vermilion, white medium label ("Become a creator"). Dark navy pill for neutral primary ("Donate $5.00").
- **Icon buttons:** 52px circles, white with hairline border, thin 1.5px line icons (bell with a red dot, mail, Facebook, X, LinkedIn).
- **Nav:** line icons + label; active item is a white pill with hairline border, a gray filled circle behind the icon, and a red circular count badge on the right.
- **Profile hero:** cover photo with ~16px radius; avatar ~150px circle with a thick white ring overlapping the cover bottom edge; stats (followers/posts/likes) in a translucent frosted glass pill on the cover, divided by thin vertical rules.
- **Tabs:** pills; active is filled navy with white text and a red count badge; inactive are outlined with a gray count bubble.
- **Post cards:** white, hairline border, ~20px radius, inset photo with ~14px radius, title 24px, 2-line truncated body, then small outlined chips "12 likes" / "2 saved" with line icons.
- **Locked content:** photo blurred heavily, white pill "Unlock" button with lock icon centered; a gray "Premium" tag next to the title.
- **Recommended rows:** light gray rounded rows (~40px radius) with avatar, name + muted role, and a 56px solid red circle "+" button.
- **Donate stepper:** outlined input for name, then an outlined stepper row with minus / centered value / plus.
- **Upsell card:** diagonal red-coral-magenta gradient, white title, checkmark list, full-width white pill button with red text.

## Signature details

1. The frosted-glass stats pill sitting on top of the cover photo, with vertical dividers and white text.
2. Two-accent system: navy for "neutral confirm" actions, vermilion only for growth/monetization actions (creator, follow, premium, badges).
3. Everything that can be a pill is a pill: search, tabs, like/save chips, nav active state, the "+ follow" circles.
4. Blurred locked post with a centered white "Unlock" pill, instead of a padlock overlay graphic.
5. Warm tri-stop gradient upsell card (red to orange top-right, pink-magenta bottom-left) as the only saturated surface.
6. Red circular count badges on nav and tabs, gray bubble counts on inactive tabs.

## Reproduce it

```css
--bg: #f6f6f6; --surface: #fff; --border: #e8e9ec;
--text: #2a2f3a; --muted: #8a8f99; --ink: #262f43; --accent: #df4928;
--premium: linear-gradient(135deg, #cd3262 0%, #f52f34 45%, #fb9e52 100%);
--r-frame: 24px; --r-card: 20px; --r-media: 14px; --r-pill: 999px;
--shadow: none; /* separation is by borders + canvas tone */
font-family: "Outfit", "Urbanist", system-ui;
```

- Spacing scale 4/8/12/16/24/32; card padding 24px; card gap 28px.
- Heights: inputs and buttons 52 to 56px, icon buttons 52px circles, chips 32px.
- Tailwind-ish: `rounded-full border border-zinc-200 bg-white px-5 h-14`, active tab `bg-slate-800 text-white`.
- Keep: pill geometry, the two-accent split, frosted stats on the cover, the single gradient card.
- Adapt: swap vermilion for your brand's warm accent, but keep navy as the neutral-primary.

## Avoid

- Adding drop shadows to every card; this design is flat with hairlines.
- Using the red gradient on more than one card or on buttons; it loses its "premium" meaning.
- Bold 700 headings; the softness comes from medium weights.
- Generic purple/blue SaaS accents; the warmth of vermilion is the personality.
- Square-cornered inputs or tabs next to the pills.
