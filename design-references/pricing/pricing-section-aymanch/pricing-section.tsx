// Reconstructed from 21st.dev bundle: aymanch-03/pricing-section
// Requires: Tailwind CSS (shadcn tokens), cn() helper (clsx + tailwind-merge), framer-motion,
// @number-flow/react, lucide-react, shadcn/ui Badge + Button + Card
// (21st metadata lists no deps, but the bundle ships framer-motion, NumberFlow and lucide icons.)
"use client";

import * as React from "react";
import { motion } from "framer-motion";
import NumberFlow from "@number-flow/react";
import { ArrowRight, BadgeCheck } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export interface PricingTier {
  id?: string;
  name: string;
  /** keyed by frequency, e.g. { monthly: 90, yearly: 75 } — strings ("Free", "Custom") render as plain text */
  price: Record<string, number | string>;
  description: string;
  features: string[];
  cta: string;
  /** inverted (dark) card with a grid pattern */
  highlighted?: boolean;
  /** ring + "Most Popular" badge + soft radial glow */
  popular?: boolean;
}

/* ------------------------------------------------------------------ */
/* Tab (segmented control item with shared-layout pill)                */
/* ------------------------------------------------------------------ */

interface TabProps {
  text: string;
  selected: boolean;
  setSelected: (text: string) => void;
  discount?: boolean;
}

export function Tab({ text, selected, setSelected, discount = false }: TabProps) {
  return (
    <button
      onClick={() => setSelected(text)}
      className={cn(
        "relative w-fit px-4 py-2 text-sm font-semibold capitalize",
        "text-foreground transition-colors",
        discount && "flex items-center justify-center gap-2.5"
      )}
    >
      <span className="relative z-10">{text}</span>
      {selected && (
        // Shared layoutId: the white pill slides between tabs.
        <motion.span
          layoutId="tab"
          transition={{ type: "spring", duration: 0.4 }}
          className="absolute inset-0 z-0 rounded-full bg-background shadow-sm"
        />
      )}
      {discount && (
        <Badge
          variant="secondary"
          className={cn("relative z-10 whitespace-nowrap shadow-none", selected && "bg-muted")}
        >
          Save 35%
        </Badge>
      )}
    </button>
  );
}

/* ------------------------------------------------------------------ */
/* Pricing card                                                        */
/* ------------------------------------------------------------------ */

interface PricingCardProps {
  tier: PricingTier;
  paymentFrequency: string;
}

const HighlightedBackground = () => (
  <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:45px_45px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]" />
);

const PopularBackground = () => (
  <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.1),rgba(255,255,255,0))]" />
);

export function PricingCard({ tier, paymentFrequency }: PricingCardProps) {
  const price = tier.price[paymentFrequency];
  const isHighlighted = tier.highlighted;
  const isPopular = tier.popular;

  return (
    <Card
      className={cn(
        "relative flex flex-col gap-8 overflow-hidden p-6",
        isHighlighted ? "bg-foreground text-background" : "bg-background text-foreground",
        isPopular && "ring-2 ring-primary"
      )}
    >
      {isHighlighted && <HighlightedBackground />}
      {isPopular && <PopularBackground />}

      <h2 className="flex items-center gap-3 text-xl font-medium capitalize">
        {tier.name}
        {isPopular && (
          <Badge variant="secondary" className="mt-1 z-10">
            🔥 Most Popular
          </Badge>
        )}
      </h2>

      <div className="relative h-12">
        {typeof price === "number" ? (
          <>
            <NumberFlow
              format={{
                style: "currency",
                currency: "USD",
                trailingZeroDisplay: "stripIfInteger",
              }}
              value={price}
              className="text-4xl font-medium"
            />
            <p className="-mt-2 text-xs text-muted-foreground">Per month/user</p>
          </>
        ) : (
          <h1 className="text-4xl font-medium">{price}</h1>
        )}
      </div>

      <div className="flex-1 space-y-2">
        <h3 className="text-sm font-medium">{tier.description}</h3>
        <ul className="space-y-2">
          {tier.features.map((feature, index) => (
            <li
              key={index}
              className={cn(
                "flex items-center gap-2 text-sm font-medium",
                isHighlighted ? "text-background" : "text-muted-foreground"
              )}
            >
              <BadgeCheck className="h-4 w-4" />
              {feature}
            </li>
          ))}
        </ul>
      </div>

      <Button variant={isHighlighted ? "secondary" : "default"} className="w-full">
        {tier.cta}
        <ArrowRight className="ml-2 h-4 w-4" />
      </Button>
    </Card>
  );
}

/* ------------------------------------------------------------------ */
/* Section                                                             */
/* ------------------------------------------------------------------ */

interface PricingSectionProps {
  title: string;
  subtitle: string;
  tiers: PricingTier[];
  frequencies: string[];
}

export function PricingSection({ title, subtitle, tiers, frequencies }: PricingSectionProps) {
  const [selectedFrequency, setSelectedFrequency] = React.useState(frequencies[0]);

  return (
    <section className="flex flex-col items-center gap-10 py-10">
      <div className="space-y-7 text-center">
        <div className="space-y-4">
          <h1 className="text-4xl font-medium md:text-5xl">{title}</h1>
          <p className="text-muted-foreground">{subtitle}</p>
        </div>
        <div className="mx-auto flex w-fit rounded-full bg-muted p-1">
          {frequencies.map((freq) => (
            <Tab
              key={freq}
              text={freq}
              selected={selectedFrequency === freq}
              setSelected={setSelectedFrequency}
              discount={freq === "yearly"}
            />
          ))}
        </div>
      </div>

      <div className="grid w-full max-w-6xl gap-6 sm:grid-cols-2 xl:grid-cols-4">
        {tiers.map((tier) => (
          <PricingCard key={tier.name} tier={tier} paymentFrequency={selectedFrequency} />
        ))}
      </div>
    </section>
  );
}
