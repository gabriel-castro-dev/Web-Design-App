# Parallax Scrolling (Layered Hero, Osmo)

- **Section:** Scroll effects / Hero
- **Source:** https://21st.dev/@osmosupply/components/parallax-scrolling
- **Stack:** React + TypeScript, plain global CSS (BEM classes, no Tailwind), `gsap` + `ScrollTrigger`, `@studio-freight/lenis` (smooth scroll)
- **Files:** `parallax-scrolling.tsx` (component, reconstructed from bundle), `parallax-scrolling.css` (the component's stylesheet, extracted from the bundle's compiled CSS), `demo.tsx` (original demo, incl. the fixed "Resource by Osmo" credit), `preview.webp`, `preview.mp4`

## What it looks like

A full-viewport cinematic hero on a black page. A night landscape is cut into depth layers:
starry sky with a glowing moon (back), a snow-covered mountain (middle), and a hooded figure
standing on a dark ridge (front). Between the mountain and the figure sits a huge white word
"Parallax" in PP Neue Corp Wide Ultrabold (`11vw`, weight 800, `line-height: 1`), so the figure
overlaps the lettering — the classic "text behind subject" look.

When you scroll, everything moves down at different speeds (so it seems to stay behind while the
page leaves): the sky sinks fastest, the mountain a bit less, the title less still, and the
foreground almost keeps pace with the page. The layers separate, revealing depth. The bottom 20%
of the image stack fades smoothly to black and blends into the next section, a black
full-height panel with a centered off-white Osmo asterisk/star logo (`8em` wide). Scrolling is
buttery (Lenis inertia). A fixed footer credit reads "Resource by **Osmo**" in PP Neue Montreal.

## How it works

1. **Markup** — `.parallax` (overflow hidden) → `section.parallax__header` (100svh, `z-index: 2`)
   → `.parallax__visuals` (absolute, **120%** of header height) → `[data-parallax-layers].parallax__layers`
   (absolute fill, overflow hidden) containing 4 children tagged `data-parallax-layer="1..4"`:
   img (sky), img (mountain), div with the `h2` title, img (foreground). Then `.parallax__fade`
   (bottom 20%, z 30) and `.parallax__black-line-overflow` (2px black line at `bottom: -1px`, z 20).
2. **Image sizing** — `.parallax__layer-img`: `height: 117.5%; top: -17.5%; object-fit: cover`, so each
   layer has 17.5% of headroom above the frame and can be translated down without exposing an edge.
3. **Timeline** — one `gsap.timeline` with `scrollTrigger: { trigger: [data-parallax-layers], start: "0% 0%", end: "100% 0%", scrub: 0 }`
   (starts when the layer box's top hits the viewport top, ends when its bottom does). Four
   `.to()` tweens on `[data-parallax-layer="N"]`, all at position `"<"` (parallel), `ease: "none"`:
   layer 1 → `yPercent: 70`, layer 2 → `55`, layer 3 (title) → `40`, layer 4 → `10`.
   `yPercent` is relative to each element's own height.
4. **Smooth scroll** — `new Lenis()` (defaults), `lenis.on("scroll", ScrollTrigger.update)`,
   `gsap.ticker.add(t => lenis.raf(t * 1000))`, `gsap.ticker.lagSmoothing(0)`. `scrub: 0` keeps the
   tweens locked to the (already smoothed) scroll position.
5. **Cleanup** — kills **all** ScrollTriggers, `killTweensOf` the layers box, `lenis.destroy()`.

## Reproduction notes / gotchas

- **Needs the CSS file** — nothing is Tailwind. The original shipped it as a global compiled
  stylesheet; here it's `parallax-scrolling.css`, imported by the component. It also contains
  **global** `body` / `a, button` rules (black bg, `font-size: 1vw`, custom Osmo cursors) — remove
  those if you drop this into an existing site; the `1vw` body font-size will otherwise shrink all
  `em`-based text sitewide.
- Source bug: the original `body { color: #efe EEC }` is invalid CSS (ignored → title falls back to
  the inherited theme color; it rendered white in the dark preview). Fixed to `#efeeec` here.
- Fonts come from Webflow's CDN (`PP Neue Corp Wide Ultrabold`, `PP Neue Montreal Medium`) — these
  are commercial Pangram Pangram fonts; license or substitute (e.g. a wide heavy grotesk).
- Cleanup doesn't remove the `gsap.ticker` callback (leaks on unmount/remount: Lenis `raf` keeps
  being called on a destroyed instance) and `ScrollTrigger.getAll().forEach(kill)` kills triggers
  belonging to other components too. Store the ticker fn and call `gsap.ticker.remove(fn)`; kill
  only `tl.scrollTrigger`.
- Lenis hijacks the window scroll globally; don't mount two instances. `@studio-freight/lenis` is
  deprecated — the maintained package is `lenis` (same API: `import Lenis from "lenis"`).
- The layer images are pre-cut transparent WebPs (sky / mountain / figure). The effect only works
  with separately masked layers; a single photo can't be split at runtime.
- The images use `alt=""` (decorative) and the title is a real `h2` — fine for a11y. For
  `prefers-reduced-motion`, skip the timeline and Lenis.
- `.parallax__visuals` is 120% tall inside a 100svh header, so the image stack overlaps the next
  section by 20% — that's what the fade covers. Keep the next section's background black.

## Adapting

Any hero with a cut-out subject: product in front of a big word, portrait over a name,
architecture layers. Tune depth by the yPercent spread (bigger gap = stronger depth); add a
subtle `scale` on the back layer; put the title between different layers to change which
elements overlap it.
