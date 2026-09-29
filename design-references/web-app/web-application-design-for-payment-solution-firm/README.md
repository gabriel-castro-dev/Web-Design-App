# XPay Payment Gateway Transactions

- **Section:** web-app
- **Subtype:** payments
- **Kind:** image (static reference, no code)
- **Source:** https://dribbble.com/shots/23850103-Web-Application-Design-for-Payment-Solution-Firm
- **Files:** `preview.webp`

## Overall style

A no-nonsense merchant back-office screen: a pure black icon rail, a neutral white/near-white work area and one medium violet accent. The table is the product; its personality comes from a rich set of outlined, tinted status badges, each in its own hue. It feels like a Stripe-style developer console, clean and legible, with minimal decoration.

## Layout

- Screen shown inside a dark device bezel on a periwinkle-to-indigo gradient backdrop (`#a7bfff` → `#402d98`).
- Left rail ~80px, pure black, logo tile on top, 7 line icons stacked with ~55px pitch; active icon sits on a violet rounded square. A small circular "expand" arrow button straddles the rail/content border.
- Top bar (white, bottom hairline): workspace switcher ("Payment Gateway Solution" with grid icon and up/down chevron in a light gray block) left; store switcher (outlined, storefront icon) + round avatar right.
- Page header (white): breadcrumb "XPay > Transactions" (current in violet), H1 "Transactions" with a violet refresh icon; "Export Excel" / "Export CSV" tinted buttons right.
- Body on `#f6f6f6`: toolbar row (Filter, wide search, "Search By" select, violet Search button) then a full-width white table card with 7 columns, ~67px rows.
- High data density, generous row height, left-aligned text columns and centered Status and Action columns.

## Color palette

| Role | Hex | Usage |
|---|---|---|
| Rail | `#000000` | Left icon rail |
| Canvas | `#f6f6f6` | Body behind toolbar and table |
| Surface | `#ffffff` | Top bar, header, table rows, inputs |
| Table header | `#fafafa` | Header row fill |
| Row divider | `#ececec` | Horizontal hairlines |
| Text primary | `#1f1f1f` | H1, cells, headers (semibold) |
| Text muted | `#9f9f9f` | Breadcrumb root, placeholders |
| Accent violet | `#7c62d2` | Active rail tile, Search button, breadcrumb current, refresh icon, "View" buttons |
| Accent tint | `#efeafc` | Export buttons fill |
| Refunded (blue) | text `#3b6fe0`, fill `#f1f5fe`, border `#b9cdf7` | Status badge |
| Not supported (pink) | text `#e0368a`, fill `#feeff7` | Status badge |
| Timeout (purple) | text `#9b3fe0`, fill `#faf1ff` | Status badge |
| Pending (amber/orange) | text `#f08c1a`, fill `#fff9e7` | "Authentication Pending" |
| Failed (red) | text `#e5343a`, fill `#fff2f0` | Failed / Authentication Failed |
| Partial refund (teal) | text `#12c2c2`, fill `#e2feff` | Status badge |
| Risk declined (orange-red) | text `#ea5a2a`, fill `#fcf5e9` | Status badge |
| Pending (yellow) | text `#e8b400`, fill `#fffce7` | Status badge |

## Typography

- Neo-grotesk, likely **Inter**.
- H1 ~36px regular (not bold); workspace name ~26px semibold; table headers 18px semibold; cells 18px regular; badges 15px regular; buttons 18 to 20px regular.
- Tabular-looking numerals; IDs truncated in the middle ("xpay_pi_55...fdb3577e80").
- Sentence/title case, no uppercase headers.

## Components & patterns

- **Status badge:** ~6px radius, 1px border in a mid-tint of the hue, very light tinted fill, colored regular text, ~28px tall, content-width, centered in the column.
- **"View" action:** small outlined button, 1px violet border, violet text, ~6px radius, white fill.
- **Primary button:** solid violet, white label, ~8px radius, 48px tall.
- **Secondary buttons (Export):** violet-tinted fill, violet text + download icon, soft shadow.
- **Inputs:** white, 1px `#e6e6e6` border, ~6px radius, subtle shadow, 48px tall; Filter as a white button with funnel icon in violet.
- **Switchers:** workspace switcher as gray-filled block with grid icon; store switcher outlined with storefront icon; both use up/down chevrons (combobox affordance).
- **Rail icons:** 24px white outline icons; active on a 48px violet rounded square (~10px radius).
- **Table:** card with ~12px radius, sticky-looking header in `#fafafa`, hairline row dividers, no vertical lines, no zebra.

## Signature details

1. Pure black rail against an otherwise very light UI; strong structural contrast with little color.
2. Rich outlined + tinted status badge system with 8+ distinct hues, all same shape.
3. Violet as the only action color, used in solid (Search), tint (Export) and outline (View) variants.
4. Middle-truncated technical IDs and full timestamps for a developer-console feel.
5. Up/down chevron switchers for workspace and store at the top, signalling multi-tenant context.
6. Circular expand toggle straddling the rail edge.

## Reproduce it

```css
--rail: #000; --canvas: #f6f6f6; --surface: #fff; --thead: #fafafa;
--divider: #ececec; --input-border: #e6e6e6;
--text: #1f1f1f; --muted: #9f9f9f;
--accent: #7c62d2; --accent-tint: #efeafc;
--r-badge: 6px; --r-btn: 8px; --r-card: 12px; --r-rail-tile: 10px;
--shadow-input: 0 1px 3px rgba(0,0,0,.06);
font-family: "Inter", system-ui;
/* badge recipe */
.badge { padding: 2px 10px; border: 1px solid color-mix(in srgb, var(--hue) 35%, white);
  background: color-mix(in srgb, var(--hue) 7%, white); color: var(--hue); border-radius: 6px; }
```

- Row height 64 to 68px; cell padding 20px horizontal; toolbar controls 48px tall.
- Keep: black rail, one violet action color, outlined tinted badges, borderless-column table.
- Adapt: map badge hues to your own status taxonomy, but keep each hue distinct and consistent.

## Avoid

- Solid filled status pills; they would overpower the table.
- Coloring rows by status; only the badge carries status.
- Bold H1; it is regular weight.
- Adding vertical gridlines or zebra stripes.
- Using the violet for anything non-interactive besides the active nav.
