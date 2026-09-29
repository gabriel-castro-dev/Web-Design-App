// Reconstructed from 21st.dev bundle: danielpetho/stacking-cards
// Requires: Tailwind CSS, cn() helper (clsx + tailwind-merge), motion (motion/react)
"use client";

import {
  createContext,
  useContext,
  useRef,
  type HTMLAttributes,
  type PropsWithChildren,
} from "react";
import {
  motion,
  useScroll,
  useTransform,
  type MotionValue,
  type UseScrollOptions,
} from "motion/react";
import { cn } from "@/lib/utils";

interface StackingCardsProps
  extends PropsWithChildren,
    HTMLAttributes<HTMLDivElement> {
  /** Forwarded to useScroll (e.g. `{ container: ref }` when scrolling inside an overflow box). */
  scrollOptions?: UseScrollOptions;
  /** How much each card shrinks per card stacked on top of it. Default 0.03. */
  scaleMultiplier?: number;
  totalCards: number;
}

interface StackingCardItemProps
  extends HTMLAttributes<HTMLDivElement>,
    PropsWithChildren {
  index: number;
  /** CSS `top` of the inner card. Default `${5 + index * 3}%`. */
  topPosition?: string;
}

interface StackingCardsContextValue {
  progress: MotionValue<number>;
  scaleMultiplier?: number;
  totalCards?: number;
}

const StackingCardsContext = createContext<StackingCardsContextValue | null>(
  null,
);

export const useStackingCardsContext = () => {
  const context = useContext(StackingCardsContext);
  if (!context)
    throw new Error("StackingCardItem must be used within StackingCards");
  return context;
};

export default function StackingCards({
  children,
  className,
  scrollOptions,
  scaleMultiplier,
  totalCards,
  ...props
}: StackingCardsProps) {
  const targetRef = useRef<HTMLDivElement>(null);
  // 0 when the wrapper's top hits the viewport top, 1 when its bottom hits the viewport bottom.
  const { scrollYProgress } = useScroll({
    offset: ["start start", "end end"],
    ...scrollOptions,
    target: targetRef,
  });

  return (
    <StackingCardsContext.Provider
      value={{ progress: scrollYProgress, scaleMultiplier, totalCards }}
    >
      <div className={cn(className)} ref={targetRef} {...props}>
        {children}
      </div>
    </StackingCardsContext.Provider>
  );
}

export const StackingCardItem = ({
  index,
  topPosition,
  className,
  children,
  ...props
}: StackingCardItemProps) => {
  const {
    progress,
    scaleMultiplier,
    totalCards = 0,
  } = useStackingCardsContext();

  // Final scale: earlier cards (more cards stacked above them) end smaller.
  // e.g. 5 cards, multiplier 0.03 → card 0 ends at 0.85, card 4 at 0.97.
  const scaleTo = 1 - (totalCards - index) * (scaleMultiplier ?? 0.03);
  // Each card starts shrinking once scroll progress reaches its own slot (index / total) and
  // keeps shrinking until the end of the whole stack.
  const range = [index * (1 / totalCards), 1];
  const scale = useTransform(progress, range, [1, scaleTo]);
  // Staggered top offset so the top edges of stacked cards peek out (5%, 8%, 11%, …).
  const top = topPosition ?? `${5 + index * 3}%`;

  return (
    <div className={cn("h-full sticky top-0", className)} {...props}>
      <motion.div
        className={"origin-top relative h-full"}
        style={{ top, scale }}
      >
        {children}
      </motion.div>
    </div>
  );
};
