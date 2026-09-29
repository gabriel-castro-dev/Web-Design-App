# Blog7 (3-Card Blog Post Grid)

- **Section:** Blog
- **Source:** https://21st.dev/@shadcnblockscom/components/blog7
- **Stack:** React + TypeScript, Tailwind CSS v3 (shadcn HSL tokens: `bg-card`, `text-muted-foreground`, `bg-secondary`), `lucide-react` (`ArrowRight`), shadcn/ui `Badge`, `Button`, `Card` (+ `CardHeader`, `CardContent`, `CardFooter`)
- **Files:** `blog7.tsx` (component, reconstructed from bundle), `demo.tsx` (written from the bundle's demo data; the raw demo was empty), `preview.webp`

## What it looks like

A tall section (`py-32`) with a centered intro block and a card grid below it, separated by a 4rem gap.

- **Intro:** a small pill badge in the secondary color (light gray in light mode) reading "Latest Updates";
  a semibold heading that scales 30 → 36 → 48 px (`text-3xl` / `md:text-4xl` / `lg:text-5xl`, max width
  `3xl` on desktop, `text-pretty`); a muted gray paragraph (max `2xl`, `lg:text-lg`); then a text-link
  style button "Explore all posts →" (primary color, underline on hover, full width on mobile).
- **Grid:** 1 column on mobile, 2 at `md`, 3 at `lg` (`gap-6`, `lg:gap-8`). Each card is the standard shadcn
  card (rounded-lg, 1px border, `shadow-sm`, card background) containing, top to bottom: a 16:9
  image, the post title (18 → 20 px semibold, underlines on hover), a muted summary paragraph, and
  a "Read more →" link in the foreground color.
- The image dims to 70% opacity on hover (200 ms fade).

## How it works

1. **Card rows**: each `Card` is `grid grid-rows-[auto_auto_1fr_auto]`. The summary row is `1fr`, so the
   "Read more" footer sticks to the bottom and lines up across cards of different text lengths
   (grid items in the same row share the tallest height).
2. **Card padding** comes from shadcn defaults: `CardHeader` `p-6` + `space-y-1.5`, `CardContent` `p-6 pt-0`,
   `CardFooter` `flex items-center p-6 pt-0`. The image wrapper has no padding, so it bleeds to the card edges.
3. **Image**: wrapper `aspect-[16/9] w-full` → `<a>` → `<img class="h-full w-full object-cover object-center">`.
   Hover: `transition-opacity duration-200 hover:opacity-70` on the link.
4. **Container**: `container mx-auto` with `lg:px-16`; the intro block and grid are stacked with
   `flex flex-col items-center gap-16`.
5. **Links** all use `target="_blank"` (title, image, "Read more", header CTA).

## Reproduction notes / gotchas

- The data model has `label`, `author` and `published`, but **the component never renders them**. Show
  them (e.g. badge + "by Author · date" row) if you need metadata.
- The image `<a>` is inline, not block, and the Card has no `overflow-hidden`, so the image's
  top corners are square and stick out over the card's `rounded-lg` border. Add `overflow-hidden` to
  the Card (or `rounded-t-lg` to the image) and `block h-full` to the link for a clean result.
- `fade-in` is in the class list but no CSS for it exists in the bundle (it's a `tailwindcss-animate`
  helper that only works with `animate-in`). It does nothing; drop it or add `animate-in`.
- The `container` class in this bundle has **no horizontal padding** below `lg` (only `lg:px-16`), so on mobile
  the cards touch the screen edges unless your Tailwind config sets `container.padding`.
- Links open in a new tab without `rel="noopener noreferrer"`. Add it.
- The default image path `/images/block/placeholder-dark-1.svg` is a shadcnblocks asset that won't exist
  in your project; the demo uses the 21st CDN mirror.
- No motion beyond hover, so reduced motion is not a concern.

## Adapting

Works as a "Latest posts", "Related articles", case studies or changelog teaser. Show the unused
`label` as a badge over the image and `author` / `published` in the footer; switch to 2 columns
with a larger featured first card; replace the `<a>` elements with your router's `Link`.
