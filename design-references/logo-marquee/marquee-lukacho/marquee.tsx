// Reconstructed from 21st.dev bundle: lukacho/marquee
// Requires: Tailwind CSS (bundle used v3.4 with shadcn hsl tokens), cn() helper (clsx + tailwind-merge),
// plus a custom `animate-marquee` utility + `marquee` keyframes (NOT shipped with the component —
// see the CSS block at the bottom of this file / README).
import * as React from "react";
import { cn } from "@/lib/utils";

interface MarqueeProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  /** Pause the scroll while the track is hovered. */
  pauseOnHover?: boolean;
  /** "left" (default) or "right". NOTE: "right" adds `animate-marquee-reverse`, which is not defined anywhere. */
  direction?: "left" | "right";
  /** Seconds for one full loop (written to the `--duration` CSS variable). */
  speed?: number;
}

export function Marquee({
  children,
  pauseOnHover = false,
  direction = "left",
  speed = 30,
  className,
  ...props
}: MarqueeProps) {
  return (
    <div className={cn("w-full overflow-hidden sm:mt-24 mt-10 z-10", className)} {...props}>
      <div className="relative flex max-w-[90vw] overflow-hidden py-5">
        {/* Track = children rendered twice; keyframes move it by -50% (exactly one copy),
            so the reset at the end of each loop is invisible. */}
        <div
          className={cn(
            "flex w-max animate-marquee",
            pauseOnHover && "hover:[animation-play-state:paused]",
            direction === "right" && "animate-marquee-reverse",
          )}
          style={{ "--duration": `${speed}s` } as React.CSSProperties}
        >
          {children}
          {children}
        </div>
      </div>
    </div>
  );
}

/*
Required CSS (from the bundle's compiled stylesheet):

  @keyframes marquee { to { transform: translateX(-50%); } }
  .animate-marquee { animation: marquee var(--duration, 30s) linear infinite; }

Tailwind v3 config equivalent:
  theme.extend.keyframes.marquee = { to: { transform: "translateX(-50%)" } }
  theme.extend.animation.marquee = "marquee var(--duration, 30s) linear infinite"

Tailwind v4 equivalent (globals.css):
  @theme {
    --animate-marquee: marquee var(--duration, 30s) linear infinite;
    @keyframes marquee { to { transform: translateX(-50%); } }
  }
*/
