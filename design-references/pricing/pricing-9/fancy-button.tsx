// Reconstructed from 21st.dev bundle: diarmuradi/pricing-9 (helper used by pricing-9.tsx)
// Requires: @base-ui/react (Button primitive with `render` prop), class-variance-authority,
// cn() helper (clsx + tailwind-merge), Tailwind CSS v4 (uses `bg-linear-to-b`, `mask-exclude`, `**:` variants)
import * as React from "react";
import { Button as BaseButton } from "@base-ui/react/button";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const fancyButtonVariants = cva(
  [
    "group/button relative inline-flex shrink-0 items-center justify-center rounded-lg bg-clip-padding text-sm font-medium whitespace-nowrap transition duration-200 ease-out outline-none select-none focus-visible:outline-none",
    "bg-primary text-primary-foreground ring-1 ring-primary",
    "dark:bg-foreground dark:text-background dark:ring-foreground",
    "disabled:pointer-events-none disabled:bg-muted disabled:text-muted-foreground disabled:ring-0 disabled:before:hidden disabled:after:hidden",
    "enabled:aria-invalid:bg-destructive enabled:aria-invalid:text-white enabled:aria-invalid:ring-destructive",
    "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
    // children are lifted above the ::before / ::after overlays
    "**:relative **:z-10 [&_svg]:relative [&_svg]:z-10",
    // ::before = 1px inner "rim light": gradient masked to the padding ring only (content-box XOR border-box)
    "before:pointer-events-none before:absolute before:inset-0 before:z-10 before:rounded-[inherit] before:bg-linear-to-b before:from-white/12 before:to-transparent before:mask-[linear-gradient(#fff_0_0),linear-gradient(#fff_0_0)] before:mask-exclude before:[mask-clip:content-box,border-box] before:p-px before:content-[''] before:[-webkit-mask-composite:xor]",
    "dark:before:from-muted-foreground/30 dark:before:to-transparent",
    // ::after = white-to-transparent gloss, 16% opacity, 24% on hover/focus/active
    "after:pointer-events-none after:absolute after:inset-0 after:rounded-[inherit] after:bg-linear-to-b after:from-white after:to-transparent after:opacity-[.16] after:transition after:duration-200 after:ease-out after:content-['']",
    "hover:after:opacity-[.24] focus-visible:after:opacity-[.24] active:after:opacity-[.24]",
  ],
  {
    variants: {
      size: {
        default:
          "h-8 gap-1.5 px-2.5 has-data-[icon=inline-end]:pe-2 has-data-[icon=inline-start]:ps-2",
        xs: "h-6 gap-1 rounded-[min(var(--radius-md),10px)] px-2 text-xs in-data-[slot=button-group]:rounded-lg has-data-[icon=inline-end]:pe-1.5 has-data-[icon=inline-start]:ps-1.5 [&_svg:not([class*='size-'])]:size-3",
        sm: "h-7 gap-1 rounded-[min(var(--radius-md),12px)] px-2.5 text-[0.8rem] in-data-[slot=button-group]:rounded-lg has-data-[icon=inline-end]:pe-1.5 has-data-[icon=inline-start]:ps-1.5 [&_svg:not([class*='size-'])]:size-3.5",
        lg: "h-9 gap-1.5 px-2.5 has-data-[icon=inline-end]:pe-2 has-data-[icon=inline-start]:ps-2",
        icon: "size-8",
        "icon-xs":
          "size-6 rounded-[min(var(--radius-md),10px)] in-data-[slot=button-group]:rounded-lg [&_svg:not([class*='size-'])]:size-3",
        "icon-sm":
          "size-7 rounded-[min(var(--radius-md),12px)] in-data-[slot=button-group]:rounded-lg",
        "icon-lg": "size-9",
      },
    },
    defaultVariants: { size: "default" },
  },
);

type FancyButtonProps = React.ComponentPropsWithoutRef<typeof BaseButton> &
  VariantProps<typeof fancyButtonVariants>;

const FancyButton = React.forwardRef<HTMLButtonElement, FancyButtonProps>(
  function FancyButton({ className, size = "default", render, nativeButton, children, ...props }, ref) {
    const hasRender = !!render;
    return (
      <BaseButton
        ref={ref}
        data-slot="fancy-button"
        // when rendering as another element (e.g. <a>), it is no longer a native <button>
        nativeButton={hasRender ? false : nativeButton}
        render={render}
        className={cn(fancyButtonVariants({ size }), className as string)}
        {...props}
      >
        {children}
      </BaseButton>
    );
  },
);
FancyButton.displayName = "FancyButton";

export { FancyButton, fancyButtonVariants };
