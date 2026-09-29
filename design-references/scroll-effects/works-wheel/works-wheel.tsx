// Reconstructed from 21st.dev bundle: crafterui/works-wheel
// Requires: Tailwind CSS v4 (shadcn tokens: bg-background, text-foreground, bg-muted, text-muted-foreground),
// cn() helper (clsx + tailwind-merge). No animation library — hand-rolled rAF + CSS 3D transforms.
"use client";

import {
  Fragment,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type HTMLAttributes,
} from "react";
import { cn } from "@/lib/utils";

export interface WorksWheelItem {
  title: string;
  image: string;
  href?: string;
}

export interface WorksWheelProps extends HTMLAttributes<HTMLElement> {
  items: WorksWheelItem[];
  /** Centre title of the ring (also used as aria-label). */
  label?: string;
  /** Hover pill text on linked cards. Falsy = no pill. */
  action?: string;
}

// ── Geometry (all relative to container size) ─────────────────────────────
const CARD_HEIGHT_FRACTION = 0.38; // card height ≈ 38% of container height…
const CARD_WIDTH_MAX_FRACTION = 0.34; // …but card width never exceeds 34% of container width
const CARD_ASPECT = 1.45; // width / height
const DRUM_STEP_DEG = 40; // rotateX between neighbouring cards on the drum
const DRUM_RADIUS_FACTOR = 2.22; // drum radius = cardH * 2.22
const PERSPECTIVE_FACTOR = 2.7; // perspective = cardH * 2.7
const RING_RADIUS_FACTOR = 1.14; // ring radius = cardH * 1.14
const BOW_FACTOR = 1.82; // sideways curve of the drum = cardH * 1.82
const TITLE_FONT_FACTOR = 0.124; // big titles font-size = cardH * 0.124
const INDEX_FONT_FACTOR = 0.04; // index list font-size = cardH * 0.04
const VISIBLE_RANGE = 1.6; // on the drum, hide cards more than 1.6 steps away
// ── Input ────────────────────────────────────────────────────────────────
const WHEEL_PX_PER_STEP = 900;
const DRAG_PX_PER_STEP = 420;
const SNAP_DELAY_MS = 140;
const EASE = 0.12; // per-frame lerp toward target

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const rad = (deg: number) => (deg * Math.PI) / 180;
/** Horizontal offset that bends the drum: 0 at the front, growing (leftward) as the card tilts away. */
const bowAt = (tiltDeg: number, bow: number) => -bow * (1 - Math.cos(rad(tiltDeg)));

/**
 * Interpolates one card between two layouts with `t` (0 = ring, 1 = drum):
 * - ring: rotateZ(angle) translateY(-ringR) → cards around a circle, each rotated to face outward
 * - drum: rotateX(tilt) translateZ(drumR) → cards on a vertical cylinder, plus the bow shift
 * Both sets of transforms are always present; `t` zeroes out the unused half.
 */
function place(ringAngle: number, tilt: number, ringR: number, drumR: number, bow: number, t: number) {
  return `translateX(${t * bowAt(tilt, bow)}px) rotateZ(${(1 - t) * ringAngle}deg) translateY(${
    -(1 - t) * ringR
  }px) rotateX(${t * tilt}deg) translateZ(${t * drumR}px)`;
}

export function WorksWheel({ items, label = "Works '26", action = "View", className, ...props }: WorksWheelProps) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLElement | null)[]>([]);
  const labelRef = useRef<HTMLDivElement>(null);
  const currentTitleRef = useRef<HTMLDivElement>(null);
  // Scroll position model: 0 = closed ring, 1 = drum open on item 0, 1 + n = drum on item n.
  const currentRef = useRef(0);
  const targetRef = useRef(0);
  const [active, setActive] = useState(0);
  const [size, setSize] = useState({ w: 0, h: 0 });
  const count = items.length;
  const lastIndex = Math.max(count - 1, 0);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const read = () => setReducedMotion(mq.matches);
    read();
    mq.addEventListener("change", read);
    return () => mq.removeEventListener("change", read);
  }, []);

  useEffect(() => {
    const el = viewportRef.current;
    if (!el) return;
    const read = () => setSize({ w: el.clientWidth, h: el.clientHeight });
    read();
    const ro = new ResizeObserver(read);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const geo = useMemo(() => {
    const { w, h } = size;
    const cardW = Math.min(h * CARD_HEIGHT_FRACTION * CARD_ASPECT, w * CARD_WIDTH_MAX_FRACTION);
    const cardH = cardW / CARD_ASPECT;
    const drumR = cardH * DRUM_RADIUS_FACTOR;
    const ringR = cardH * RING_RADIUS_FACTOR;
    // Shrink cards on the ring so they fit its circumference: arc length per item * 0.82 / card width.
    const ringScale = count ? clamp((((2 * Math.PI * ringR) / count) * 0.82) / (cardW || 1), 0.16, 1) : 1;
    return {
      cardW,
      cardH,
      ringR,
      ringScale,
      drumR,
      bow: cardH * BOW_FACTOR,
      depth: cardH * PERSPECTIVE_FACTOR,
      title: cardH * TITLE_FONT_FACTOR,
      index: cardH * INDEX_FONT_FACTOR,
    };
  }, [size, count]);

  // Render loop: ease current → target and write transforms directly to the DOM (no React renders per frame).
  useEffect(() => {
    if (!size.h) return;
    let raf = 0;
    const { ringR, ringScale, drumR, bow } = geo;

    const draw = () => {
      raf = requestAnimationFrame(draw);
      const diff = targetRef.current - currentRef.current;
      if (Math.abs(diff) < 5e-4) currentRef.current = targetRef.current;
      else currentRef.current += diff * (reducedMotion ? 1 : EASE);

      const value = currentRef.current;
      const open = clamp(value, 0, 1); // ring → drum morph amount
      const drumPos = Math.max(0, value - 1); // which item faces the viewer on the drum (fractional)

      // Push the stage back by the drum radius so the front card sits at z = 0.
      if (stageRef.current) stageRef.current.style.transform = `translateZ(${-open * drumR}px)`;

      for (let i = 0; i < count; i++) {
        const offset = i - drumPos;
        const tilt = offset * DRUM_STEP_DEG;
        const card = cardRefs.current[i];
        if (card) {
          card.style.transform = place(offset * (360 / count), tilt, ringR, drumR, bow, open);
          card.style.opacity = open > 0.5 && Math.abs(offset) > VISIBLE_RANGE ? "0" : "1";
          card.style.zIndex = String(Math.round(100 - Math.abs(offset) * 2));
        }
        const inner = card?.firstElementChild as HTMLElement | null | undefined;
        if (inner) inner.style.transform = `scale(${lerp(ringScale, 1, open)})`;
      }

      // Cross-fade: centre label (ring) ↔ current item title (drum).
      if (labelRef.current) labelRef.current.style.opacity = String(1 - open);
      if (currentTitleRef.current) currentTitleRef.current.style.opacity = String(open);

      const next = clamp(Math.round(drumPos), 0, lastIndex);
      setActive((prev) => (prev === next ? prev : next));
    };

    raf = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(raf);
  }, [geo, size.h, count, lastIndex, reducedMotion]);

  const setTarget = useCallback(
    (value: number) => {
      targetRef.current = clamp(value, 0, lastIndex + 1);
    },
    [lastIndex],
  );

  const dragYRef = useRef<number | null>(null);
  const snapTimerRef = useRef(0);

  useEffect(() => {
    const el = viewportRef.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => {
      const next = targetRef.current + e.deltaY / WHEEL_PX_PER_STEP;
      // Only trap the page scroll while inside the range; at either end, let the page scroll on.
      if (next > 0 && next < lastIndex + 1) e.preventDefault();
      setTarget(next);
      window.clearTimeout(snapTimerRef.current);
      snapTimerRef.current = window.setTimeout(() => setTarget(Math.round(targetRef.current)), SNAP_DELAY_MS);
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => {
      el.removeEventListener("wheel", onWheel);
      window.clearTimeout(snapTimerRef.current);
    };
  }, [setTarget, lastIndex]);

  return (
    <section
      aria-label={label}
      className={cn(
        "bg-background text-foreground relative h-full min-h-[24rem] w-full overflow-hidden select-none",
        className,
      )}
      {...props}
    >
      <div
        ref={viewportRef}
        tabIndex={0}
        role="listbox"
        aria-label={label}
        aria-activedescendant={`works-wheel-${active}`}
        className="focus-visible:outline-foreground absolute inset-0 cursor-grab touch-pan-x outline-none focus-visible:outline-2 focus-visible:-outline-offset-4 active:cursor-grabbing"
        style={{ perspective: `${geo.depth}px` }}
        onPointerDown={(e) => {
          dragYRef.current = e.clientY;
          e.currentTarget.setPointerCapture(e.pointerId);
        }}
        onPointerMove={(e) => {
          if (dragYRef.current === null) return;
          // Drag up = advance.
          setTarget(targetRef.current + (dragYRef.current - e.clientY) / DRAG_PX_PER_STEP);
          dragYRef.current = e.clientY;
        }}
        onPointerUp={() => {
          dragYRef.current = null;
          // Snap only once the drum is open (below 1 the ring↔drum morph can rest anywhere).
          if (targetRef.current > 1) setTarget(Math.round(targetRef.current));
        }}
        onKeyDown={(e) => {
          if (e.key === "ArrowDown") setTarget(Math.round(targetRef.current) + 1);
          else if (e.key === "ArrowUp") setTarget(Math.round(targetRef.current) - 1);
          else return;
          e.preventDefault();
        }}
      >
        <div ref={stageRef} className="absolute top-1/2 left-1/2 [transform-style:preserve-3d]">
          {items.map((item, index) => {
            const Tag = item.href ? "a" : "div";
            return (
              <Fragment key={item.title}>
                <Tag
                  id={`works-wheel-${index}`}
                  role="option"
                  aria-selected={index === active}
                  href={item.href}
                  ref={(el: HTMLElement | null) => {
                    cardRefs.current[index] = el;
                  }}
                  className="group absolute [backface-visibility:hidden]"
                  style={{
                    width: geo.cardW,
                    height: geo.cardH,
                    marginLeft: -geo.cardW / 2,
                    marginTop: -geo.cardH / 2,
                  }}
                >
                  <span className="bg-muted shadow-foreground/12 relative block size-full overflow-hidden rounded-lg shadow-[0_18px_40px_-18px_var(--tw-shadow-color)]">
                    <img src={item.image} alt={item.title} draggable={false} className="size-full object-cover" />
                    {action && item.href ? (
                      <span className="bg-background/80 text-foreground pointer-events-none absolute right-3 bottom-3 flex translate-y-1 items-center gap-1 rounded-full px-2.5 py-1 text-[0.7rem] opacity-0 backdrop-blur-sm transition group-hover:translate-y-0 group-hover:opacity-100">
                        <svg viewBox="0 0 12 12" className="size-2.5" aria-hidden="true">
                          <path
                            d="M3 9 9 3M4 3h5v5"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.4"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        {action}
                      </span>
                    ) : null}
                  </span>
                </Tag>
              </Fragment>
            );
          })}
        </div>
      </div>

      {/* Centre label of the closed ring — fades out as the drum opens. */}
      <div
        ref={labelRef}
        className="pointer-events-none absolute inset-0 grid place-items-center tracking-tight"
        style={{ fontSize: geo.title }}
      >
        {label}
      </div>

      {/* Current item title, left side — fades in with the drum. */}
      <div
        ref={currentTitleRef}
        className="pointer-events-none absolute top-1/2 left-[8%] -translate-y-1/2 tracking-tight opacity-0"
        style={{ fontSize: geo.title }}
      >
        {items[active]?.title}
      </div>

      {/* Index (top-right): click jumps the drum to that item. */}
      <ol
        className="text-muted-foreground absolute top-[7.5%] right-[2.5%] text-right leading-[1.75]"
        style={{ fontSize: geo.index }}
      >
        {items.map((item, index) => (
          <li key={item.title}>
            <button
              type="button"
              onClick={() => setTarget(index + 1)}
              className={cn(
                "focus-visible:outline-foreground cursor-pointer transition-colors outline-none focus-visible:outline-1",
                index === active && "text-foreground font-medium",
              )}
            >
              {item.title}
            </button>
          </li>
        ))}
      </ol>
    </section>
  );
}
