// Reconstructed from 21st.dev bundle: kavikatiyar/price
// Requires: Tailwind CSS v4 (shadcn tokens), cn() helper (clsx + tailwind-merge), framer-motion,
// class-variance-authority, shadcn/ui Button
"use client";

import * as React from "react";
import { motion, type HTMLMotionProps } from "framer-motion";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

// Solid (filled) check-circle icon (Heroicons "check-circle" 24/solid).
const CheckIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={cn("w-5 h-5", className)}
  >
    <path
      fillRule="evenodd"
      d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
      clipRule="evenodd"
    />
  </svg>
);

const pricingCardVariants = cva(
  "relative flex flex-col p-8 rounded-2xl border shadow-sm transition-all duration-300",
  {
    variants: {
      variant: {
        default: "bg-card border-border",
        // Popular card is lifted 0.5rem and gets a primary border + tinted shadow.
        popular: "bg-card border-primary shadow-lg shadow-primary/10 -translate-y-2",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface PricingCardProps
  extends Omit<HTMLMotionProps<"div">, "children">,
    VariantProps<typeof pricingCardVariants> {
  planName: string;
  description: string;
  price: number | string;
  billingCycle: string;
  features: string[];
  buttonText: string;
  isCurrentPlan?: boolean;
  icon?: React.ReactNode;
}

const PricingCard = React.forwardRef<HTMLDivElement, PricingCardProps>(
  (
    {
      className,
      variant,
      planName,
      description,
      price,
      billingCycle,
      features,
      buttonText,
      isCurrentPlan = false,
      icon,
      ...props
    },
    ref
  ) => (
    <motion.div
      ref={ref}
      className={cn(pricingCardVariants({ variant }), className)}
      {...props}
      whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
    >
      {variant === "popular" && (
        <div className="absolute top-0 right-8 -translate-y-1/2 bg-primary text-primary-foreground text-xs font-semibold px-4 py-1.5 rounded-full">
          POPULAR
        </div>
      )}

      <div className="flex items-center gap-4 mb-4">
        {icon && (
          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 text-primary">
            {icon}
          </div>
        )}
        <div>
          <h3 className="text-xl font-bold text-card-foreground">{planName}</h3>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
      </div>

      <div className="my-6">
        <span className="text-5xl font-bold">${price}</span>
        <span className="text-muted-foreground">{billingCycle}</span>
      </div>

      <Button
        className="w-full"
        size="lg"
        variant={isCurrentPlan ? "secondary" : variant === "popular" ? "default" : "outline"}
        disabled={isCurrentPlan}
      >
        {isCurrentPlan ? "Current plan" : buttonText}
      </Button>

      <ul className="mt-8 space-y-4 text-sm text-muted-foreground flex-1">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start gap-3">
            <CheckIcon className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>
    </motion.div>
  )
);
PricingCard.displayName = "PricingCard";

export { PricingCard, pricingCardVariants };
