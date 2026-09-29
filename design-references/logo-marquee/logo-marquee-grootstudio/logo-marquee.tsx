// Reconstructed from 21st.dev bundle: grootstudio/logo-marquee
// Requires: Tailwind CSS v4 (uses the v4 `mask-[...]` utility and `dark:` variant),
// cn() helper (clsx + tailwind-merge), motion (imported from "motion/react"), react-use-measure
"use client";

import { memo, useEffect, useState, type ReactNode } from "react";
import { animate, motion, useMotionValue } from "motion/react";
import useMeasure from "react-use-measure";
import { cn } from "@/lib/utils";

/* -------------------------------------------------------------------------------------------------
 * InfiniteSlider — same engine as motion-primitives' InfiniteSlider (see ../infinite-slider),
 * wrapped in React.memo.
 * -----------------------------------------------------------------------------------------------*/

type InfiniteSliderProps = {
  children: ReactNode;
  gap?: number;
  /** Seconds per loop. Lower = faster. */
  duration?: number;
  /** Seconds per loop while hovered. */
  durationOnHover?: number;
  direction?: "horizontal" | "vertical";
  reverse?: boolean;
  className?: string;
};

const InfiniteSlider = memo(function InfiniteSlider({
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
  const [key, setKey] = useState(0);

  useEffect(() => {
    // Track = children x2 + one gap between copies → half of (size + gap) is one seamless loop.
    const contentSize = (direction === "horizontal" ? width : height) + gap;
    const from = reverse ? -contentSize / 2 : 0;
    const to = reverse ? 0 : -contentSize / 2;

    let controls: ReturnType<typeof animate> | undefined;
    if (isTransitioning) {
      // Hover in/out: finish the current pass at the new speed, then restart the loop (key bump).
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
        onRepeat: () => translation.set(from),
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
        ref={ref}
        className="flex w-max"
        style={{
          ...(direction === "horizontal" ? { x: translation } : { y: translation }),
          gap: `${gap}px`,
          flexDirection: direction === "horizontal" ? "row" : "column",
        }}
        {...hoverProps}
      >
        {children}
        {children}
      </motion.div>
    </div>
  );
});

/* -------------------------------------------------------------------------------------------------
 * LogoMarquee
 * -----------------------------------------------------------------------------------------------*/

export type Logo = {
  src: string;
  alt: string;
  width?: number | string;
  height?: number | string;
};

type LogoMarqueeProps = {
  logos: Logo[];
  className?: string;
};

const LogoImage = memo(function LogoImage({ logo }: { logo: Logo }) {
  return (
    <img
      alt={logo.alt}
      src={logo.src}
      width={logo.width ?? "auto"}
      height={logo.height ?? "auto"}
      loading="lazy"
      // Fixed 16px (20px ≥ md) height; in dark mode every logo is flattened to pure white
      // (brightness(0) → black, then invert → white).
      className="pointer-events-none h-4 select-none md:h-5 dark:brightness-0 dark:invert"
    />
  );
});

export const LogoMarquee = memo(function LogoMarquee({ logos, className }: LogoMarqueeProps) {
  return (
    <div
      className={cn(
        // Edge fade: transparent → opaque over the first 25%, opaque until 75%, fade out to the right.
        "max-w-7xl mx-auto overflow-hidden py-4 mask-[linear-gradient(to_right,transparent,black_25%,black_75%,transparent)]",
        className,
      )}
    >
      {/* Logos are doubled here AND again inside InfiniteSlider → 4 copies in the track,
          so one "copy" is wide enough to cover the container. durationOnHover (25) < duration (80)
          → hovering SPEEDS the strip up (~3.2x). */}
      <InfiniteSlider gap={42} reverse duration={80} durationOnHover={25}>
        {[...logos, ...logos].map((logo, index) => (
          <LogoImage key={`${logo.alt}-${index}`} logo={logo} />
        ))}
      </InfiniteSlider>
    </div>
  );
});
LogoMarquee.displayName = "LogoMarquee";
