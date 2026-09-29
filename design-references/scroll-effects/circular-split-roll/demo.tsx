"use client";

import CircularSplitRoll from "./circular-split-roll";

// Component paints the theme background/foreground out of the box.
// Pass `background` / `titleColor` to pin it to a specific palette.
export default function CircularSplitRollDemo() {
  return (
    <CircularSplitRoll
      radius={500}
      cardSize={205}
      textSideScale={0.68}
      textSideOpacity={0.18}
    />
  );
}
