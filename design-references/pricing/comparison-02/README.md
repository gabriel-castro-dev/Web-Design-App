# Comparison 02 (Three-Way Table with Highlighted Column)

- **Section:** Pricing / Comparison
- **Source:** https://21st.dev/@hirael/components/comparison-02
- **Stack:** React + TypeScript, Tailwind CSS v4 (shadcn tokens: `bg-background`, `bg-card`, `border-border`, `text-muted-foreground`, `font-serif`, `font-mono`), `cn()`, `lucide-react` (`Check`, `Minus`), shadcn/ui `Badge`, `Button`. No animation.
- **Files:** `comparison-02.tsx` (component, reconstructed from bundle), `demo.tsx` (original demo), `preview.webp`

## What it looks like

Calm, editorial "us vs. them" table. Centered header (`max-w-2xl`): a **serif** medium-weight headline
"Three ways to get a date range picker" (`text-3xl` → `sm:text-4xl`, tight tracking) and a muted paragraph.

Below, a real `<table>` inside `max-w-5xl`: the first column (1/3 width) holds row labels; its header is a
tiny mono uppercase "APPROACH" label (10 px, `0.12em` tracking) aligned to the bottom. Three option
columns follow, each headed by a name (`text-base font-medium`) and a two-line muted summary.

The middle column ("Hirael") is the hero: it reads as a single tall card running from header to footer —
lighter `bg-card` fill, 1 px border on both sides, rounded top in the header and rounded bottom in the
footer row — with a small mono uppercase "THIS ONE" secondary badge next to its name, and the only CTA
("Browse the registry", small, full-width, primary) in the footer row.

Rows are separated by full-width 1 px `border-t` lines, `p-4` padding. Cells show either a dark check icon
(yes), a faint minus at 50% muted opacity (no), or short muted text ("Two days", "Sometimes").

In the preview the theme is a warm paper palette: background `oklch(96.1% .008 91.5)` (off-white beige),
card `oklch(98.5% .005 95.1)`, border `oklch(90.1% .014 88.7)`, foreground navy-charcoal
`oklch(22% .016 256.8)`, muted text `oklch(49.5% .029 263.2)`, and an **amber primary** `oklch(78% .14 78)`
with dark brown text `oklch(24% .045 70)` for the button.

## How it works

1. **Data** — `approaches[]` `{ name, summary, featured? }` define the columns; `rows[]` `{ label, cells[] }`
   where each cell is `boolean | string`, index-aligned to `approaches`.
2. **CellValue** — `string` → muted `text-sm`; `true` → `Check` (`size-4 text-foreground`) + `sr-only` "Yes";
   `false` → `Minus` (`text-muted-foreground/50`) + `sr-only` "No".
3. **Featured column as one card** — built from three pieces with `border-collapse`:
   - header `<th>`: `rounded-t-md border border-b-0 border-border bg-card`
   - body `<td>`s: `border-x border-border bg-card`
   - footer `<td>`: `rounded-b-md border-x border-b border-border bg-card` (holds the Button)
4. **Responsive** — table has `min-w-[42rem]` inside `overflow-x-auto`, so on phones it scrolls sideways
   rather than squashing.
5. **A11y** — `aria-labelledby` on the section, `sr-only` `<caption>`, `scope="col"` / `scope="row"` headers.

## Reproduction notes / gotchas

- **Theme is not in the component.** Without the warm CSS variables you get a plain white/black shadcn
  look and a black button. To match the preview, set in `:root`:
  `--background: oklch(96.1% .008 91.5); --foreground: oklch(22% .016 256.8); --card: oklch(98.5% .005 95.1);
  --primary: oklch(78% .14 78); --primary-foreground: oklch(24% .045 70); --secondary/--muted/--accent:
  oklch(93.4% .011 89.7); --muted-foreground: oklch(49.5% .029 263.2); --border/--input: oklch(90.1% .014 88.7);
  --ring: oklch(70% .13 75)`. Dark: `--background: oklch(17.6% .014 258.4); --foreground: oklch(92% .009 84.6);
  --card: oklch(23.9% .021 264.1); --primary: oklch(82% .135 78); --primary-foreground: oklch(20% .04 70);
  --secondary/--accent: oklch(32.4% .023 264.2); --muted: oklch(27.7% .023 267.2);
  --muted-foreground: oklch(70.4% .021 263); --border: oklch(92% .01 90/.09); --input: oklch(92% .01 90/.14);
  --ring: oklch(74% .12 78); --radius: .65rem`.
- `font-serif` is Tailwind's default stack (`ui-serif, Georgia, …`) — the preview renders Georgia. Swap for a
  real display serif if you want more character.
- `container` in Tailwind v4 has no auto margins/padding — the table is only centered because the demo parent
  is a flex centerer. Add `mx-auto px-4` to the container div when dropping it into a normal page.
- `border-radius` on table cells only shows because `border-collapse` is used with the cells' own borders;
  in some browsers rounded corners on collapsed borders render square. If that matters, use
  `border-separate border-spacing-0` and per-cell borders.
- Row `border-t` lines run through the featured column (visible in preview as hairlines inside the card) —
  intentional.
- Labels are hard-coded; lift `approaches`/`rows` into props to reuse. The typographic apostrophe in
  "someone else’s" is U+2019.

## Adapting

Any "us vs. alternatives" or plan comparison matrix: swap the featured index to highlight a plan, add more
columns (raise `min-w`), put prices in the header cells, or add a CTA per column in the footer row.
