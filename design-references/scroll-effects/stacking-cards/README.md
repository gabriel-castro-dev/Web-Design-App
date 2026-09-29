# Stacking Cards (Sticky Scale Stack)

- **Section:** Scroll effects
- **Source:** https://21st.dev/@danielpetho/components/stacking-cards
- **Stack:** React + TypeScript, Tailwind CSS, `cn()`, `motion` (`motion/react`: `useScroll`, `useTransform`, `motion.div`)
- **Files:** `stacking-cards.tsx` (component, reconstructed from bundle), `demo.tsx` (original demo source, `next/image` swapped for `<img>`), `preview.webp`, `preview.mp4`

## What it looks like

A vertical scroll area (the demo is a 620px-tall white box with its own scrollbar). At the top, a
centered orange-red (`#ff5941`) uppercase "SCROLL DOWN ↓" label. Below it, a deck of large,
landscape, very rounded (`rounded-3xl`) color cards: 91.6% wide (`w-11/12`), 70–80% of the slot
height, saturated solid backgrounds (`#f97316` orange, `#0015ff` electric blue, `#ff5941` coral,
`#1f464d` deep teal). Each card has white bold title + paragraph on the left and a rounded-xl
16:9 illustration on the right (stacks vertically below `sm`).

As you scroll, each card slides up and **sticks** at the top of the viewport; the next card slides
up over it and sticks slightly lower (3% further down), so the top edges of the previous cards
peek out like a pile of index cards. Meanwhile every stuck card **shrinks** smoothly, anchored at
its top edge — the deeper in the pile, the smaller it ends (≈0.85 for the first of five, 0.97 for
the last). After the stack, a huge coral "fancy" word bleeds off the bottom-left edge.

No hover states, no clicks — purely scroll-linked.

## How it works

1. **One scroll progress for the whole stack** — `StackingCards` wraps everything in a div and
   calls `useScroll({ offset: ["start start", "end end"], ...scrollOptions, target })`.
   `scrollYProgress` goes 0 → 1 while the wrapper travels through the scroll container, and is
   shared through context with `scaleMultiplier` and `totalCards`.
2. **Sticky slots** — each `StackingCardItem` is an outer `div.h-full.sticky.top-0` (the demo sets
   the slot to `h-[620px]` = container height). Because every slot is sticky at `top: 0`, later
   slots scroll over earlier ones.
3. **Stagger offset** — the inner `motion.div` (`origin-top relative h-full`) gets
   ``top = topPosition ?? `${5 + index * 3}%` ``, so card 0 sits 5% down, card 1 8%, card 2 11%…
   (relative positioning inside the sticky slot).
4. **Scale-down** — `scale = useTransform(progress, [index / totalCards, 1], [1, 1 - (totalCards - index) * (scaleMultiplier ?? 0.03)])`.
   Linear, no spring. The card starts shrinking when the overall progress reaches its slot and
   finishes at the very end of the stack. `origin-top` keeps the top edge in place so the peeking
   offsets stay aligned.
5. **Scroll container** — the demo scrolls inside its own `overflow-auto` div, so it passes
   `scrollOptions={{ container: containerRef }}`. On a normal page omit it (window scroll).

## Reproduction notes / gotchas

- `totalCards` must match the number of `StackingCardItem`s or the ranges/scale are off. If
  `totalCards` is 0 the range becomes `[NaN, 1]` — always pass it.
- Non-card children (the "Scroll down" header and "fancy" footer) live inside the same tracked
  wrapper, so they shift the progress range: card N's shrink doesn't start exactly when it sticks.
  Fine visually, but note it when tuning.
- Sticky only works if no ancestor between the slot and the scroll container has
  `overflow: hidden`. The slot height must be ≥ the card height or cards overlap before sticking.
- The last card also shrinks (to `1 - 1 * 0.03 = 0.97`) — there is nothing on top of it.
- `font-calendas` is referenced by the demo but is **not defined** anywhere in the bundle CSS
  (the preview falls back to the default sans). Define a `calendas` font family in your Tailwind
  theme or drop the class.
- The original used `next/image` with `fill`; the demo here uses `<img class="absolute inset-0 h-full w-full object-cover">`
  inside the `relative overflow-hidden aspect-video` wrapper, which is what `fill` produced.
- Reduced motion: scale is scroll-linked (user-controlled), so it's acceptable, but you can pass
  `scaleMultiplier={0}` under `prefers-reduced-motion` to keep only the sticky stacking.

## Adapting

Great for feature lists, case studies, process steps, pricing tiers. Try: bigger
`scaleMultiplier` (0.05) for a deeper pile; add a `useTransform` on `filter: brightness()` so
buried cards darken; set `topPosition` in px for a fixed header offset; use full-viewport slots
(`h-screen`) on a normal page.
