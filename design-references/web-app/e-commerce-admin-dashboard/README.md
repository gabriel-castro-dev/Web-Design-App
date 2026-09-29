# ProfitPulse Orders Admin

- **Section**: web-app
- **Subtype**: ecommerce
- **Kind:** image (static reference, no code)
- **Source:** https://dribbble.com/shots/25525216-E-Commerce-Admin-Dashboard
- **Files:** `preview.webp`

## Overall style

A warm, tactile e-commerce admin for orders: a near-black ink sidebar, a cream/paper main area, and a white order-detail drawer on the right, all presented on a khaki backdrop. Status pills in butter yellow, apricot and mint carry the color, and the same butter yellow reappears as the "Refund" button. It feels friendlier and more editorial than the typical cold-grey admin because of the warm neutrals and large, relaxed type.

## Layout

- App frame with ~24px outer radius. Dark sidebar (~17% width) on the left; the cream content panel inset with its own ~20px radius; a white detail drawer (~22% width) floating inside the content panel on the right with ~20px radius.
- Sidebar: logo tile + "ProfitPulse", 6 primary items, a divider, 3 secondary items (Notification, Help, Settings), and "Log out" pinned at the bottom.
- Content header: H1 "Orders", then two square outlined icon buttons (mail, search) and the user block (avatar, name, email).
- Filter row: outlined dropdowns ("Any status", "$100-$1500") at left and "Sort by Date" at right.
- Table: checkbox, Order, Customer (avatar + name), Status, Total, Date, and a `...` action; ~70px rows at 1920 (~46px at 1x) with no row dividers except under the header. The selected row lifts into a white full-width rounded bar with a soft shadow.
- Drawer: "Order #390561" + close button, Paid pill + timestamp, divider, centered customer avatar (large) and name, three circular contact buttons (mail, phone, WhatsApp), divider, "Order items" list with product thumbnails, divider, Total row, then Track (dark) and Refund (yellow) buttons side by side.

## Color palette

| Role | Hex | Usage |
|---|---|---|
| Backdrop | `#C2B49B` | Khaki presentation background |
| Ink sidebar | `#11191F` | Sidebar, checkboxes, Track button |
| Paper | `#F4F2EC` | Main content background |
| Surface | `#FFFFFF` | Drawer, active nav pill, selected row |
| Divider | `#E4E2DC` | Header rule, drawer dividers |
| Soft chip | `#F0F0EC` | Contact buttons, thumbnail tiles |
| Text | `#0A0E10` | Headings, cells |
| Muted text | `#6E7479` | Email, header labels |
| Sidebar text | `#C4CDD1` | Inactive nav labels and icons |
| Status Paid / Refund | `#FCEC90` | Butter yellow pill and Refund button |
| Status Delivered | `#FCC498` | Apricot pill |
| Status Completed | `#A4F0B4` | Mint pill |

## Typography

- Clean neo-grotesk with slightly narrow proportions, similar to **Geist**, **Onest** or **Inter Display**.
- H1 "Orders" ~40px/400 (large and regular, not bold). Drawer title ~26px/500.
- Table cells ~19px/400 at 1920 (~13 to 14px at 1x); header ~16px/500. Amounts use regular weight with tabular figures.
- Status pill labels ~19px/400 black on the pastel fill.
- Drawer product names ~16px/400, prices ~20px/500; Total value ~28px/500.
- Sentence case, normal tracking.

## Components & patterns

- **Sidebar nav**: 1.5px outline icons + labels in light grey; the active item is a solid white pill (12px radius) with black icon and text, spanning the sidebar width.
- **Icon buttons**: 56px squares at 1920, 12px radius, 1px `#DAD8D0` border, transparent on paper.
- **Dropdowns**: transparent with 1px border, 10px radius, label + chevron.
- **Checkboxes**: 26px, 6px radius, 1.5px grey border when empty; filled ink with a white check when selected; the header uses a filled "indeterminate" minus.
- **Status pills**: 6px radius (rounded rectangle, not full pill), pastel fill, black text, no border.
- **Selected row**: white bar with 12px radius and `0 8px 24px rgba(0,0,0,.06)` shadow, extending beyond the table edges.
- **Contact buttons**: 52px soft grey circles with black solid glyphs.
- **Order item**: 72px soft grey rounded (10px) thumbnail with a product cut-out, name + price.
- **Action buttons**: 56px tall, 10px radius; Track in ink with a target icon, Refund in butter yellow with an undo icon.

## Signature details

1. Warm paper `#F4F2EC` content against ink `#11191F`, with a khaki backdrop, instead of cold greys.
2. The selected row lifts out of the table as a white rounded bar with a shadow.
3. Butter yellow does double duty as a status color and a primary action color (Refund), tying the drawer to the table.
4. Status pills with black text on soft pastel fills and small (6px) radius.
5. Oversized regular-weight H1 ("Orders") rather than a bold small heading.
6. Contextual drawer with centered customer identity and one-tap contact buttons.

## Reproduce it

- Tokens: `--ink:#11191F; --paper:#F4F2EC; --surface:#FFF; --line:#E4E2DC; --chip:#F0F0EC; --text:#0A0E10; --muted:#6E7479; --yellow:#FCEC90; --apricot:#FCC498; --mint:#A4F0B4`.
- Radii: frame 24px, panels 20px, nav pill and selected row 12px, buttons 10px, status pills 6px, checkboxes 6px.
- Spacing: 8px base; table row 46px at 1x; drawer padding 20px; panel padding 32px.
- Pills: `padding:4px 10px; border-radius:6px; color:#0A0E10; font-weight:400`.
- Keep the warm neutrals and the lifted-row selection. Adapt the drawer to any master/detail record.

## Avoid

- Cold greys (`#F3F4F6`) or blue-grey sidebars; the warmth is the identity.
- Colored text inside status pills; keep text black.
- Row dividers and zebra striping; spacing and the lifted row do the work.
- A saturated brand blue for primary actions.
- Bold, small page titles; keep the big regular-weight H1.
