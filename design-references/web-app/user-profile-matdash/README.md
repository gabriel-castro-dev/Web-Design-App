# MatDash User Profile

- **Section:** web-app
- **Subtype:** profile
- **Kind:** image (static reference, no code)
- **Source:** https://i.pinimg.com/1200x/94/07/40/94074007e6b2d2b0e32edd09564ad277.jpg
- **Files:** `preview.webp`

## Overall style

An admin-template social profile with a soft lavender personality: violet primary `#635bff`, a pale periwinkle canvas and a monochrome 3D-illustrated cover banner. It is tidy and component-driven (icon rail, labeled sidebar, breadcrumb card, stats, tabs, composer) with light rounded cards and no heavy shadows. The 3D cartoon avatar and the lavender tab strip give it a friendly, polished template look.

## Layout

- Rounded app frame (~24px) on a mint-to-lilac gradient backdrop (`#b9f0f0` → `#cfc3ee`).
- Far-left icon rail ~56px (`#f4f7fd`), active item a 34px violet rounded square with white icon; rail groups divided by short rules.
- Labeled sidebar ~165px, white: logo "MatDash", group captions ("Applications", "Pages"), items with outline icons and chevrons for groups; active item is a filled violet rounded pill with a violet glow.
- Top bar: search + apps icons left; dark-mode, bell, flag, avatar with caret right.
- Content on `#f4f7fe` inside a panel with large radius: breadcrumb card ("User Profile" left, home icon / tinted "User Profile" chip right).
- Profile hero card full width: cover (~235px tall) with 3D lavender leaf shapes, 72px round avatar overlapping the cover bottom, stats trio left, name/role center, social circles + "Add to Story" button right, then a lavender tab strip at the card's bottom with right-aligned tabs.
- Below: two columns ~32% / 68%: Introduction card (bio + icon list) and a post composer card followed by a post card.

## Color palette

| Role | Hex | Usage |
|---|---|---|
| Backdrop gradient | `#b9f0f0` → `#cfc3ee` | Presentation background |
| Rail / canvas | `#f4f7fd` | Icon rail, content background |
| Surface | `#ffffff` | Sidebar, cards, top bar |
| Primary violet | `#635bff` | Active nav, buttons, active tab text/underline, logo |
| Primary tint | `#dddbff` | Breadcrumb chip, tab strip (`#dcdafc`) |
| Cover lavender | `#a2a2dc` → `#c3c1dd` | 3D banner |
| Text primary | `#2a3547` | Titles, names, list items |
| Text muted | `#9fa2ba` | Captions, labels, placeholder, bio |
| Border | `#e5e8f0` | Input and card outlines |
| Facebook | `#357add` | Social circle |
| Twitter | `#469ce7` | Social circle |
| Dribbble | `#d4608a` | Social circle |
| YouTube | `#ba3c2d` | Social circle |
| Teal accent | `#1dc1ba` | "Article" icon badge |

## Typography

- Geometric-humanist sans, very likely **Plus Jakarta Sans** (MatDash template default).
- Page/card titles 16 to 18px semibold ("Introduction", "User Profile"); stat numbers 16px semibold with 11px muted labels; nav 12px regular; body 11px regular muted; group captions 10px muted.
- Sentence case; no uppercase labels; tight, compact sizes typical of admin templates.

## Components & patterns

- **Active nav:** filled violet pill (~8px radius) with white text/icon and a soft colored shadow `0 6px 14px rgba(99,91,255,.35)`.
- **Breadcrumb card:** white strip, ~10px radius, title left, home icon + slash + tinted chip right.
- **Cover:** 3D-rendered abstract monochrome lavender forms, top corners rounded with the card.
- **Avatar:** 3D cartoon character in a white-ringed circle overlapping the cover.
- **Stats:** outline icon above number above muted label, three columns.
- **Social buttons:** 26px solid brand-colored circles with white glyphs.
- **Button:** "Add to Story" / "Post" solid violet, ~6px radius, 12px medium white label.
- **Tab strip:** lavender band, tabs with outline icons; active tab in violet with a 2px underline.
- **Composer:** outlined textarea with resize handle, attachment actions as 22px colored circle icons + labels, violet "Post" button right.
- **Info list:** outline icons (briefcase, mail, monitor, pin) + dark text, 28px row pitch.
- **Post:** avatar, name, muted timestamp, kebab, paragraph, rounded image.

## Signature details

1. Double navigation: slim icon rail plus a labeled sidebar whose active item glows violet.
2. Monochrome 3D abstract cover in the brand's lavender, not a photo.
3. Lavender tab strip attached to the bottom of the profile card with right-aligned tabs.
4. Breadcrumb as its own white card with a tinted current-page chip.
5. Brand-colored social circles as the only multicolor element.
6. 3D cartoon avatar used as the user image.

## Reproduce it

```css
--canvas: #f4f7fe; --surface: #fff; --border: #e5e8f0;
--text: #2a3547; --muted: #9fa2ba;
--primary: #635bff; --primary-tint: #dddbff;
--r-card: 12px; --r-btn: 6px; --r-nav: 8px; --r-frame: 24px;
--shadow-card: 0 1px 4px rgba(42,53,71,.04);
--shadow-active: 0 6px 14px rgba(99,91,255,.35);
font-family: "Plus Jakarta Sans", system-ui;
```

- Spacing: 4/8/12/16/20/24; cards 20px padding; 20px gutters.
- Font sizes (at 1440 scale): 14px body, 13px nav, 18px card title, 20px stat number.
- Keep: violet single primary with tint companion, 3D cover, tab strip on the card.
- Adapt: generate your own on-brand 3D cover render; swap the cartoon avatar for real photos in production if tone requires.

## Avoid

- Mixing multiple accent colors beyond the social icons.
- Photographic covers that clash with the lavender system.
- Heavy card shadows; keep them near-flat, only the active nav glows.
- Overfilling the sidebar with bold labels; keep regular weight and outline icons.
- Generic gray tab bars; the tinted lavender strip is part of the identity.
