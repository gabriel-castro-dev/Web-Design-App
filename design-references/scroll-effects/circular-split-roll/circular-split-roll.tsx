// Reconstructed from 21st.dev bundle: hyperiux/circular-split-roll
// Requires: Tailwind CSS v4 (shadcn tokens bg-background / text-foreground), gsap (+ ScrollTrigger)
// Default images: the bundle inlined 10 small JPEGs as base64 data URIs; they were extracted to ./images/*.jpg.
"use client";

import { useEffect, useMemo, useRef, useState, type CSSProperties } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import aperture from "./images/aperture.jpg";
import lumen from "./images/lumen.jpg";
import halcyon from "./images/halcyon.jpg";
import meridian from "./images/meridian.jpg";
import cascade from "./images/cascade.jpg";
import vertex from "./images/vertex.jpg";
import solace from "./images/solace.jpg";
import quill from "./images/quill.jpg";
import ember from "./images/ember.jpg";
import drift from "./images/drift.jpg";

gsap.registerPlugin(ScrollTrigger);

// Radii / card sizes are authored for a 1200px-wide viewport and scaled down linearly between 768–1200px.
const BASE_VIEWPORT_WIDTH = 1200;
const MIN_SCALE_VIEWPORT_WIDTH = 768;
// horizontalDepth (sin of the angle) ranges -1..1 and is remapped to 0..1 "strength".
const DEPTH_MIN = -1;
const DEPTH_MAX = 1;
const BASE_Z_INDEX = 1;

// Next.js/Vite static imports may resolve to a string or to { src }.
const src = (img: string | { src: string }) => (typeof img === "string" ? img : img.src);

export interface CircularSplitRollItem {
  id?: string | number;
  title?: string;
  image?: string;
  alt?: string;
}

const DEFAULT_ITEMS: CircularSplitRollItem[] = [
  { id: 0, title: "Aperture", image: src(aperture), alt: "Aperture" },
  { id: 1, title: "Lumen", image: src(lumen), alt: "Lumen" },
  { id: 2, title: "Halcyon", image: src(halcyon), alt: "Halcyon" },
  { id: 3, title: "Meridian", image: src(meridian), alt: "Meridian" },
  { id: 4, title: "Cascade", image: src(cascade), alt: "Cascade" },
  { id: 5, title: "Vertex", image: src(vertex), alt: "Vertex" },
  { id: 6, title: "Solace", image: src(solace), alt: "Solace" },
  { id: 7, title: "Quill", image: src(quill), alt: "Quill" },
  { id: 8, title: "Ember", image: src(ember), alt: "Ember" },
  { id: 9, title: "Drift", image: src(drift), alt: "Drift" },
];

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return reduced;
}

/** Keep progress in [0, 1) so items loop around the circle. */
function wrapProgress(value: number) {
  let wrapped = value % 1;
  if (wrapped < 0) wrapped += 1;
  return wrapped;
}

/** Point on an ellipse. angle 0 = bottom (sin 0 = 0 → x 0, cos 0 = 1 → y +radiusY). */
function getCircularPosition(progress: number, radiusX: number, radiusY: number, angleOffset = 0) {
  const angle = progress * Math.PI * 2 + angleOffset;
  return {
    angle,
    x: Math.sin(angle) * radiusX,
    y: Math.cos(angle) * radiusY,
    verticalDepth: Math.cos(angle),
    horizontalDepth: Math.sin(angle),
  };
}

function getStrength(depth: number) {
  return gsap.utils.clamp(0, 1, gsap.utils.mapRange(DEPTH_MIN, DEPTH_MAX, 0, 1, depth));
}

/** Ignore everything below `start`, then ease the remainder with a power curve → sharp focus at centre. */
function shapeFocus(strength: number, start = 0.42, power = 2.8) {
  const t = gsap.utils.clamp(0, 1, (strength - start) / (1 - start));
  return Math.pow(t, power);
}

export interface CircularSplitRollCompProps {
  items?: CircularSplitRollItem[];
  className?: string;
  background?: string;
  titleColor?: string;
  /** Scroll length per item, in % of viewport height. */
  sectionHeight?: number;
  leftRadiusX?: number;
  leftRadiusY?: number;
  rightRadiusX?: number;
  rightRadiusY?: number;
  imageCardWidth?: number;
  imageCardHeight?: number;
  titleSize?: string;
  pinSpacing?: boolean;
  scrub?: number | boolean;
  textCenterScale?: number;
  textSideScale?: number;
  textCenterOpacity?: number;
  textSideOpacity?: number;
  imageCenterScale?: number;
  imageSideScale?: number;
  imageCenterOpacity?: number;
  imageSideOpacity?: number;
  textFocusStart?: number;
  textFocusPower?: number;
  imageFocusStart?: number;
  imageFocusPower?: number;
  leftAngleOffset?: number;
  rightAngleOffset?: number;
  focusPhase?: number;
  leftDepthMax?: number;
  rightDepthMax?: number;
  columnSpreadVw?: number;
  columnOffsetPx?: number;
  gridImageClassName?: string;
  gridCardClassName?: string;
  gridTitleClassName?: string;
}

export function CircularSplitRollComp({
  items = DEFAULT_ITEMS,
  className = "",
  background,
  titleColor,
  sectionHeight = 260,
  leftRadiusX = 220,
  leftRadiusY = 220,
  rightRadiusX = 400,
  rightRadiusY = 400,
  imageCardWidth = 190,
  imageCardHeight = 210,
  titleSize = "clamp(28px, 3vw, 56px)",
  pinSpacing = true,
  scrub = 1.2,
  textCenterScale = 1,
  textSideScale = 0.68,
  textCenterOpacity = 1,
  textSideOpacity = 0.18,
  imageCenterScale = 1,
  imageSideScale = 0.58,
  imageCenterOpacity = 1,
  imageSideOpacity = 0.14,
  textFocusStart = 0.42,
  textFocusPower = 2.6,
  imageFocusStart = 0.45,
  imageFocusPower = 3.2,
  leftAngleOffset = Math.PI,
  rightAngleOffset = 0,
  focusPhase = 0.5,
  leftDepthMax = 30,
  rightDepthMax = 40,
  columnSpreadVw = 5,
  columnOffsetPx = 500,
  gridImageClassName = "",
  gridCardClassName = "",
  gridTitleClassName = "",
}: CircularSplitRollCompProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef(0);
  const prefersReducedMotion = usePrefersReducedMotion();

  const normalizedItems = useMemo(
    () =>
      items.map((item, index) => ({
        id: item.id ?? index,
        title: item.title ?? `Item ${index + 1}`,
        image: item.image ?? "",
        alt: item.alt ?? item.title ?? `Item ${index + 1}`,
      })),
    [items],
  );

  useEffect(() => {
    if (!sectionRef.current || !stageRef.current) return;
    const mm = gsap.matchMedia();

    mm.add("(min-width: 769px)", () => {
      const ctx = gsap.context(() => {
        const leftItems = gsap.utils.toArray<HTMLElement>(".circular-scroll-showcase__left-item");
        const rightItems = gsap.utils.toArray<HTMLElement>(".circular-scroll-showcase__right-item");
        const count = normalizedItems.length;
        if (!count) return;

        gsap.set([...leftItems, ...rightItems], { opacity: 1 });

        const render = (progress: number) => {
          progressRef.current = progress;
          const viewportWidth = typeof window !== "undefined" ? window.innerWidth : BASE_VIEWPORT_WIDTH;
          let scale = 1;
          if (viewportWidth < BASE_VIEWPORT_WIDTH && viewportWidth >= MIN_SCALE_VIEWPORT_WIDTH) {
            scale = viewportWidth / BASE_VIEWPORT_WIDTH;
          }
          const lRadiusX = leftRadiusX * scale;
          const lRadiusY = leftRadiusY * scale;
          const rRadiusX = rightRadiusX * scale;
          const rRadiusY = rightRadiusY * scale;

          if (sectionRef.current) {
            sectionRef.current.style.setProperty("--css-card-width", `${imageCardWidth * scale}px`);
            sectionRef.current.style.setProperty("--css-card-height", `${imageCardHeight * scale}px`);
          }

          // Titles: circle rotated by PI → the "front" (focus) point is on the RIGHT side of the
          // left circle (sin > 0), i.e. the edge closest to the image column.
          leftItems.forEach((el, index) => {
            const itemProgress = wrapProgress(index / count - progress + focusPhase / count);
            const pos = getCircularPosition(itemProgress, lRadiusX, lRadiusY, leftAngleOffset);
            const strength = getStrength(pos.horizontalDepth);
            const focus = shapeFocus(strength, textFocusStart, textFocusPower);
            const itemScale = gsap.utils.interpolate(textSideScale, textCenterScale, focus);
            const opacity = gsap.utils.interpolate(textSideOpacity, textCenterOpacity, focus);
            const zIndex = Math.round(gsap.utils.interpolate(BASE_Z_INDEX, leftDepthMax, focus));
            gsap.set(el, { x: pos.x, y: pos.y, scale: itemScale, opacity, zIndex, transformOrigin: "50% 50%" });
          });

          // Cards: same phase, angle offset 0 and depth inverted (-sin) → focus on the LEFT side of
          // the right circle. Both columns bulge toward the middle of the screen.
          rightItems.forEach((el, index) => {
            const itemProgress = wrapProgress(index / count - progress + focusPhase / count);
            const pos = getCircularPosition(itemProgress, rRadiusX, rRadiusY, rightAngleOffset);
            const strength = getStrength(-pos.horizontalDepth);
            const focus = shapeFocus(strength, imageFocusStart, imageFocusPower);
            const itemScale = gsap.utils.interpolate(imageSideScale, imageCenterScale, focus);
            const opacity = gsap.utils.interpolate(imageSideOpacity, imageCenterOpacity, focus);
            const zIndex = Math.round(gsap.utils.interpolate(BASE_Z_INDEX, rightDepthMax, focus));
            gsap.set(el, { x: pos.x, y: pos.y, scale: itemScale, opacity, zIndex, transformOrigin: "50% 50%" });
          });
        };

        render(0);

        const trigger = ScrollTrigger.create({
          trigger: sectionRef.current,
          start: "top top",
          end: `+=${sectionHeight * normalizedItems.length}%`,
          pin: stageRef.current,
          scrub,
          pinSpacing,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            render(self.progress);
          },
        });

        const onResize = () => {
          render(progressRef.current);
          trigger.refresh();
        };
        window.addEventListener("resize", onResize);

        return () => {
          window.removeEventListener("resize", onResize);
          trigger.kill();
        };
      }, sectionRef);

      return () => ctx.revert();
    });

    return () => mm.revert();
  }, [
    normalizedItems,
    scrub,
    pinSpacing,
    sectionHeight,
    leftRadiusX,
    leftRadiusY,
    rightRadiusX,
    rightRadiusY,
    imageCardWidth,
    imageCardHeight,
    textCenterScale,
    textSideScale,
    textCenterOpacity,
    textSideOpacity,
    imageCenterScale,
    imageSideScale,
    imageCenterOpacity,
    imageSideOpacity,
    textFocusStart,
    textFocusPower,
    imageFocusStart,
    imageFocusPower,
    leftAngleOffset,
    rightAngleOffset,
    focusPhase,
    leftDepthMax,
    rightDepthMax,
  ]);

  return (
    <section
      ref={sectionRef}
      className={`relative min-h-screen w-full overflow-clip ${background ? "" : "bg-background"} ${
        titleColor ? "" : "text-foreground"
      } ${className}`}
      style={
        {
          "--css-title-size": titleSize,
          "--css-card-width": `${imageCardWidth}px`,
          "--css-card-height": `${imageCardHeight}px`,
          ...(background ? { background } : null),
          ...(titleColor ? { color: titleColor } : null),
        } as CSSProperties
      }
    >
      {/* Pinned animated stage (desktop only; hidden ≤1025px and for reduced motion) */}
      <div
        ref={stageRef}
        aria-hidden="true"
        className={`relative h-screen w-full overflow-hidden ${prefersReducedMotion ? "hidden" : "max-[1025px]:hidden"}`}
      >
        <div className="relative mx-auto flex h-full w-full">
          {/* Left half: titles. Shifted by (spreadVw - offsetPx) so the circle's right edge (+radius) lands near 25vw + spreadVw. */}
          <div
            className="relative flex h-full w-[50vw] items-center justify-center"
            style={{ transform: `translateX(calc(${columnSpreadVw}vw - ${columnOffsetPx}px))` }}
          >
            <div className="relative h-[78vh]">
              {normalizedItems.map((item) => (
                <div
                  key={item.id}
                  className="circular-scroll-showcase__left-item pointer-events-none absolute left-1/2 top-1/2 w-full origin-center whitespace-nowrap text-center text-(length:--css-title-size,clamp(28px,3vw,56px)) font-medium leading-none tracking-[-0.04em] opacity-0 will-change-[transform,opacity]"
                >
                  {item.title}
                </div>
              ))}
            </div>
          </div>

          {/* Right half: image cards. Mirror shift, so the circle's left edge (-radius) lands near 75vw - spreadVw. */}
          <div
            className="relative flex h-full w-[50vw] items-center justify-center"
            style={{ transform: `translateX(calc(${columnOffsetPx}px - ${columnSpreadVw}vw))` }}
          >
            <div className="relative h-[78vh]">
              {normalizedItems.map((item) => (
                <div
                  key={item.id}
                  className="circular-scroll-showcase__right-item absolute left-1/2 top-1/2 ml-[calc(var(--css-card-width,210px)*-0.5)] mt-[calc(var(--css-card-height,210px)*-0.5)] h-(--css-card-height,210px) w-(--css-card-width,210px) origin-center opacity-0 will-change-[transform,opacity]"
                >
                  <div className="relative h-full w-full overflow-hidden rounded-[18px] bg-[#f5f2eb] shadow-[0_30px_60px_rgba(0,0,0,0.28),0_8px_20px_rgba(0,0,0,0.16)]">
                    <img
                      src={item.image}
                      alt={item.alt}
                      className="pointer-events-none block h-full w-full select-none object-cover absolute inset-0"
                      draggable={false}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Static grid fallback: visible ≤1025px or with reduced motion; sr-only otherwise (keeps content accessible). */}
      <div
        className={`w-full px-5 py-10 max-md:px-4 max-md:py-8 ${
          prefersReducedMotion ? "block" : "sr-only max-[1025px]:not-sr-only max-[1025px]:block"
        }`}
      >
        <div className="mx-auto grid w-full max-w-5xl grid-cols-3 gap-5 max-md:grid-cols-2 max-md:gap-4">
          {normalizedItems.map((item) => (
            <article key={item.id} className={`w-full ${gridCardClassName}`}>
              <div
                className={`relative aspect-square w-full overflow-hidden rounded-[18px] bg-[#f5f2eb] shadow-[0_18px_38px_rgba(0,0,0,0.28)] max-md:rounded-[14px] ${gridImageClassName}`}
              >
                <img
                  src={item.image}
                  alt={item.alt}
                  className="block h-full w-full object-cover absolute inset-0"
                  draggable={false}
                />
              </div>
              <h3
                className={`mt-3 text-center text-[clamp(18px,4vw,30px)] font-medium leading-none tracking-[-0.04em] text-foreground max-md:mt-2 max-md:text-[clamp(16px,5vw,24px)] ${gridTitleClassName}`}
              >
                {item.title}
              </h3>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export interface CircularSplitRollProps extends CircularSplitRollCompProps {
  /** Shorthand for all four radii. */
  radius?: number;
  /** Shorthand for card width + height. */
  cardSize?: number;
}

/** Public wrapper: simplified `radius` / `cardSize` props and a shorter default scroll length (100% per item). */
export default function CircularSplitRoll({
  items = DEFAULT_ITEMS,
  radius = 500,
  cardSize = 205,
  sectionHeight = 100,
  leftRadiusX,
  leftRadiusY,
  rightRadiusX,
  rightRadiusY,
  imageCardWidth,
  imageCardHeight,
  ...rest
}: CircularSplitRollProps) {
  return (
    <CircularSplitRollComp
      items={items}
      sectionHeight={sectionHeight}
      leftRadiusX={leftRadiusX ?? radius}
      leftRadiusY={leftRadiusY ?? radius}
      rightRadiusX={rightRadiusX ?? radius}
      rightRadiusY={rightRadiusY ?? radius}
      imageCardWidth={imageCardWidth ?? cardSize}
      imageCardHeight={imageCardHeight ?? cardSize}
      {...rest}
    />
  );
}
