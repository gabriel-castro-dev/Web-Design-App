// Reconstructed from 21st.dev bundle: ruixen.ui/scroll-portrait-wall
// Requires: Tailwind CSS v4 (shadcn tokens), cn() helper (clsx + tailwind-merge), gsap (ScrollTrigger), @gsap/react
"use client";

import * as React from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { cn } from "@/lib/utils";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

export interface Speaker {
  name: string;
  role: string;
  src: string;
}

export interface ScrollPortraitWallProps {
  title?: React.ReactNode;
  date?: string;
  hint?: string;
  speakers?: Speaker[];
  columns?: number;
  showCaptions?: boolean;
  className?: string;
}

/**
 * Builds a sparse grid: rows of `columns` cells, -1 = empty cell, otherwise a speaker index.
 * Each row gets one portrait at column (row*2 + row%2) % columns, which zig-zags across the grid
 * (4 cols: 0, 3, 0, 3...; 3 cols: 0, 0, 1, 1, 2, 2...; 2 cols: 0, 1, 0, 1...). Every 3rd row (row % 3 === 0) gets a second portrait two
 * columns to the right, so the wall feels scattered instead of a strict zig-zag.
 */
function buildLayout(count: number, columns: number): number[][] {
  const rows: number[][] = [];
  let next = 0;
  let row = 0;
  while (next < count) {
    const cells = new Array<number>(columns).fill(-1);
    const primary = (row * 2 + (row % 2)) % columns;
    cells[primary] = next++;
    if (row % 3 === 0 && next < count) {
      let secondary = (primary + 2) % columns;
      if (secondary === primary) secondary = (primary + 1) % columns;
      cells[secondary] = next++;
    }
    rows.push(cells);
    row++;
  }
  return rows;
}

/** Caps the column count: full `columns` at >=1024px, max 3 at >=640px, max 2 below. */
function useResponsiveColumns(columns: number) {
  const [value, setValue] = React.useState(columns);
  React.useEffect(() => {
    const sm = window.matchMedia("(min-width: 640px)");
    const lg = window.matchMedia("(min-width: 1024px)");
    const update = () => {
      if (lg.matches) setValue(columns);
      else if (sm.matches) setValue(Math.min(columns, 3));
      else setValue(Math.min(columns, 2));
    };
    update();
    sm.addEventListener("change", update);
    lg.addEventListener("change", update);
    return () => {
      sm.removeEventListener("change", update);
      lg.removeEventListener("change", update);
    };
  }, [columns]);
  return value;
}

const AVATAR_BASE = "https://pub-940ccf6255b54fa799a9b01050e6c227.r2.dev/avatar-images";

const DEFAULT_SPEAKERS: Speaker[] = [
  { name: "Alex Johnson", role: "CEO & Founder" },
  { name: "Sarah Chen", role: "CTO" },
  { name: "Marcus Rivera", role: "Lead Designer" },
  { name: "Emily Watson", role: "Product Manager" },
  { name: "David Kim", role: "Senior Developer" },
  { name: "Lisa Thompson", role: "Marketing Director" },
  { name: "James Wilson", role: "UX Researcher" },
  { name: "Rachel Green", role: "Data Scientist" },
  { name: "Michael Brown", role: "DevOps Engineer" },
  { name: "Anna Davis", role: "Content Strategist" },
].map((s, i) => ({
  ...s,
  src: `${AVATAR_BASE}/avatar-${String((i % 5) + 1).padStart(2, "0")}.jpg`,
}));

export function ScrollPortraitWall({
  title = "Speakers",
  date = "Oct 22, 2025",
  hint = "scroll down to see effect",
  speakers = DEFAULT_SPEAKERS,
  columns = 4,
  showCaptions = true,
  className,
}: ScrollPortraitWallProps) {
  const sectionRef = React.useRef<HTMLElement>(null);
  const hintRef = React.useRef<HTMLDivElement>(null);
  const cols = useResponsiveColumns(Math.max(1, columns));
  const layout = React.useMemo(() => buildLayout(speakers.length, cols), [speakers.length, cols]);

  useGSAP(
    () => {
      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      // Selector text is scoped to sectionRef by useGSAP's context.
      const items = gsap.utils.toArray<HTMLElement>(".spw-item");
      if (reduceMotion) {
        gsap.set(items, { scale: 1 });
        return;
      }

      // Hint fades out over the first 40% of a viewport of scrolling.
      gsap.to(hintRef.current, {
        autoAlpha: 0,
        ease: "none",
        scrollTrigger: { trigger: sectionRef.current, start: "top top", end: "+=40%", scrub: true },
      });

      // Each portrait's trigger spans its whole pass (top hits viewport bottom -> bottom leaves viewport top).
      // Two equal 0.5 halves: scale 0 -> 1 (power2.out) until it is centered, then 1 -> 0 (power2.in).
      items.forEach((item) => {
        gsap
          .timeline({
            scrollTrigger: { trigger: item, start: "top bottom", end: "bottom top", scrub: true },
          })
          .fromTo(item, { scale: 0 }, { scale: 1, ease: "power2.out", duration: 0.5 })
          .to(item, { scale: 0, ease: "power2.in", duration: 0.5 });
      });
    },
    { scope: sectionRef, dependencies: [cols], revertOnUpdate: true },
  );

  return (
    <section
      ref={sectionRef}
      aria-label={typeof title === "string" ? title : undefined}
      className={cn("relative w-full bg-background text-foreground", className)}
    >
      {/* Scroll hint with a fading vertical line under it */}
      <div
        ref={hintRef}
        className="pointer-events-none absolute left-1/2 top-[60vh] grid -translate-x-1/2 content-start justify-items-center gap-6 text-center"
      >
        <span className="relative max-w-[12ch] text-xs uppercase leading-tight text-muted-foreground after:absolute after:left-1/2 after:top-full after:h-16 after:w-px after:bg-gradient-to-b after:from-transparent after:to-muted-foreground/40 after:content-['']">
          {hint}
        </span>
      </div>

      {/* Sticky title; white + mix-blend-exclusion inverts it over the portraits */}
      <div className="pointer-events-none sticky top-1/2 z-20 -translate-y-1/2 text-center text-white mix-blend-exclusion">
        <h2 className="text-5xl font-semibold tracking-tighter sm:text-7xl md:text-8xl lg:text-9xl">{title}</h2>
        {date && <p className="mt-1 text-xs uppercase tracking-wide text-white/60 sm:text-sm">{date}</p>}
      </div>

      <div className="relative z-0 mb-[50vh] mt-[50vh]">
        {layout.map((row, rowIndex) => (
          <div key={rowIndex} className="flex w-full">
            {row.map((speakerIndex, colIndex) => {
              if (speakerIndex === -1) return <div key={colIndex} className="aspect-square flex-1" />;
              const speaker = speakers[speakerIndex];
              // Left-half portraits grow from their bottom-right corner, right-half from bottom-left
              // (i.e. toward the center of the wall).
              const origin = colIndex < cols / 2 ? "right bottom" : "left bottom";
              return (
                <div key={colIndex} className="aspect-square flex-1">
                  <div
                    className="spw-item relative h-full w-full"
                    style={{ transformOrigin: origin, transform: "scale(0)" }}
                  >
                    <img
                      src={speaker.src}
                      alt={speaker.name}
                      loading="lazy"
                      decoding="async"
                      draggable={false}
                      className="h-full w-full object-cover grayscale contrast-[1.15] filter transition-transform duration-500 ease-in-out hover:scale-95"
                    />
                    {showCaptions && (
                      <div className="absolute -bottom-2 left-0 flex w-full translate-y-full justify-between gap-2 text-[11px] uppercase leading-tight text-muted-foreground sm:text-sm">
                        <span className="truncate">{speaker.name}</span>
                        <span className="shrink-0">({speaker.role})</span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </section>
  );
}

export default ScrollPortraitWall;
