import type { CSSProperties } from "react";
import TeamGrid from "./team-1";

// The component paints its page with `bg-primary`; the author's theme sets these tokens
// (see README). Without them stock shadcn tokens render dark text on a dark background.
const smoothUiTheme = {
  "--primary": "oklch(97.2% 0 0)",
  "--foreground": "oklch(22% 0 0)",
} as CSSProperties;

export default function TeamGridDemo() {
  return (
    <div style={smoothUiTheme}>
      <TeamGrid />
    </div>
  );
}
