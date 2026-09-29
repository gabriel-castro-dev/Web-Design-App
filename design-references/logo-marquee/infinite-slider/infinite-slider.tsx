// Reconstructed from 21st.dev bundle: ibelick/infinite-slider (motion-primitives)
// Requires: Tailwind CSS, cn() helper (clsx + tailwind-merge), framer-motion, react-use-measure
"use client";

import { useEffect, useState, type ReactNode } from "react";
import { animate, motion, useMotionValue } from "framer-motion";
import useMeasure from "react-use-measure";
import { cn } from "@/lib/utils";

type InfiniteSliderProps = {
  children: ReactNode;
  /** Space between items (px). Also used between the two copies. */
  gap?: number;
  /** Seconds for one full loop (one copy width). Lower = faster. */
  duration?: number;
  /** Seconds per loop while hovered. Omit to disable the hover behavior. */
  durationOnHover?: number;
  direction?: "horizontal" | "vertical";
  /** Scroll right (horizontal) / down (vertical) instead of left / up. */
  reverse?: boolean;
  className?: string;
};

export function InfiniteSlider({
  children,
  gap = 16,
  duration = 25,
  durationOnHover,
  direction = "horizontal",
  reverse = false,
  className,
}: InfiniteSliderProps) {
  const [currentDuration, setCurrentDuration] = useState(duration);
  const [ref, { width, height }] = useMeasure();
  const translation = useMotionValue(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  // Bumping this key re-runs the effect to restart the infinite loop after a speed transition.
  const [key, setKey] = useState(0);

  useEffect(() => {
    let controls: ReturnType<typeof animate> | undefined;
    // The track holds children twice + one gap between the copies:
    // (trackSize + gap) / 2 === one copy + one gap === the distance to loop seamlessly.
    const size = direction === "horizontal" ? width : height;
    const contentSize = size + gap;
    const from = reverse ? -contentSize / 2 : 0;
    const to = reverse ? 0 : -contentSize / 2;

    if (isTransitioning) {
      // Speed change (hover in/out): finish the CURRENT pass at the new speed.
      // Duration is scaled by the remaining fraction so the px/s rate matches `currentDuration`.
      controls = animate(translation, [translation.get(), to], {
        ease: "linear",
        duration: currentDuration * Math.abs((translation.get() - to) / contentSize),
        onComplete: () => {
          setIsTransitioning(false);
          setKey((prevKey) => prevKey + 1);
        },
      });
    } else {
      controls = animate(translation, [from, to], {
        ease: "linear",
        duration: currentDuration,
        repeat: Infinity,
        repeatType: "loop",
        repeatDelay: 0,
        onRepeat: () => {
          translation.set(from);
        },
      });
    }

    return controls?.stop;
  }, [key, translation, currentDuration, width, height, gap, isTransitioning, direction, reverse]);

  const hoverProps = durationOnHover
    ? {
        onHoverStart: () => {
          setIsTransitioning(true);
          setCurrentDuration(durationOnHover);
        },
        onHoverEnd: () => {
          setIsTransitioning(true);
          setCurrentDuration(duration);
        },
      }
    : {};

  return (
    <div className={cn("overflow-hidden", className)}>
      <motion.div
        className="flex w-max"
        style={{
          ...(direction === "horizontal" ? { x: translation } : { y: translation }),
          gap: `${gap}px`,
          flexDirection: direction === "horizontal" ? "row" : "column",
        }}
        ref={ref}
        {...hoverProps}
      >
        {children}
        {children}
      </motion.div>
    </div>
  );
}
