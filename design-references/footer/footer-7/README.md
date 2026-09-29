# Footer 7 (Brand + 3 Link Columns + Legal Bar)

- **Section:** Footer
- **Source:** https://21st.dev/@shadcnblockscom/components/footer-7
- **Stack:** React + TypeScript, Tailwind CSS v4 (shadcn tokens: `text-muted-foreground`, `hover:text-primary`, default `border` color), `react-icons` (`FaInstagram`, `FaFacebook`, `FaTwitter`, `FaLinkedin` from `react-icons/fa`). No animation, no shadcn primitives.
- **Files:** `footer-7.tsx` (component, reconstructed from bundle), `demo.tsx` (original demo source), `preview.webp`

## What it looks like

A plain, light, whitespace-heavy footer (`py-32` = 8rem top/bottom) inside a centered container.

- **Top row (desktop):** two halves side by side.
  - **Left:** a 32 px tall logo mark next to the brand name "Shadcnblocks.com" (20 px semibold);
    a small muted gray blurb (`text-sm`, capped at 70% of the column width so it wraps to ~2 lines);
    a row of four 20 px Font Awesome social icons (Instagram, Facebook, Twitter, LinkedIn) in muted
    gray, 24 px apart.
  - **Right:** three link columns ("Product", "Company", "Resources"). Bold heading, then four
    `text-sm font-medium` muted links spaced 12 px apart. Columns are 80 px apart on desktop.
- **Bottom bar:** a 1px top border (`mt-8`, `py-8`), then `text-xs font-medium` muted text: the copyright
  "© 2024 Shadcnblocks.com. All rights reserved." on the left, "Terms and Conditions" and "Privacy Policy" on the right.
- **Hover:** every link and icon turns `text-primary` (near-black in light mode) with no transition.
- **Mobile:** everything stacks in one column: brand block, then link sections one under another
  (3 columns start at `md`), then legal links (stacked vertically) above the copyright.

## How it works

1. **Top row**: `flex w-full flex-col justify-between gap-10 lg:flex-row lg:items-start`. Both children are
   `w-full`, so on `lg` they split the width 50/50.
2. **Brand column**: `flex flex-col justify-between gap-6`. Logo `<img class="h-8">` inside an `<a>`, plus an `h2`
   repeating `logo.title`. Social `ul` uses `space-x-6`; each `li` is `font-medium hover:text-primary`, the icon itself is `size-5`.
3. **Link grid**: `grid w-full gap-6 md:grid-cols-3 lg:gap-20`. Heading `mb-4 font-bold`; list `space-y-3 text-sm text-muted-foreground`.
4. **Bottom bar ordering**: container `flex flex-col md:flex-row md:items-center justify-between gap-4`.
   Copyright `order-2 lg:order-1`, legal list `order-1 md:order-2`. Mobile: legal first, copyright second.
   `md` and up: both are order 2 so DOM order applies (copyright left, legal right). Legal list is `flex-col gap-2` → `md:flex-row`.
5. **Container**: Tailwind v4 `container` in this bundle is customized to `margin-inline:auto; padding-inline:2rem`
   (max widths 40/48/64/80/96rem).
6. All content is prop-driven: `logo`, `sections`, `description`, `socialLinks`, `copyright`, `legalLinks`, each with defaults.

## Reproduction notes / gotchas

- The `2rem` container padding comes from the bundle's CSS config (`@utility container { margin-inline: auto; padding-inline: 2rem }`).
  Stock Tailwind v4 `container` has no padding, so add it or the footer will touch the screen edges on mobile.
- The brand block is a `<section>` with an `<h2>`, not a `<footer>` landmark. Wrap it in `<footer>` for semantics.
- Legal link text is rendered as `{" "}{name}`, which adds a leading space inside each anchor. It's harmless but visible as an underline offset if you add underlines.
- `lg:order-1` / `md:order-2` use mixed breakpoints (see step 4). The result is correct, but if you change it keep both
  elements' orders in sync.
- `FaTwitter` is the old bird logo; use `FaXTwitter` (react-icons/fa6) for the current X mark.
- The default logo is a 21st CDN mirror of the shadcnblocks logo; replace it.
- Hover color change has no `transition-colors`. Add one for a softer feel.

## Adapting

Standard SaaS / marketing footer. Change the number of columns by passing `sections` (grid is `md:grid-cols-3`,
so update it for 2 or 4). Put a newsletter input under the blurb, swap to a dark footer (`bg-foreground text-background`),
or drop the `py-32` for a tighter footer under dense pages.
