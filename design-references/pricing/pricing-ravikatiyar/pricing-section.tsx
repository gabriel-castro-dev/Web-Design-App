// Reconstructed from 21st.dev bundle: ravikatiyar162/pricing
// Requires: Tailwind CSS v4 (shadcn tokens), cn() helper (clsx + tailwind-merge), framer-motion,
// canvas-confetti (+ @types/canvas-confetti), @number-flow/react, lucide-react,
// shadcn/ui Button (buttonVariants)
// Note: original used next/link for the CTA; replaced with a plain <a>.
"use client";

import * as React from "react";
import { motion, useSpring } from "framer-motion";
import confetti from "canvas-confetti";
import NumberFlow from "@number-flow/react";
import { Check, Star as StarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

// --- TYPES ---
interface PricingPlan {
  name: string;
  price: string;
  yearlyPrice: string;
  period: string;
  features: string[];
  description: string;
  buttonText: string;
  href: string;
  isPopular?: boolean;
}

interface PricingSectionProps {
  plans: PricingPlan[];
  title?: string;
  description?: string;
}

type MousePosition = { x: number | null; y: number | null };

// --- HOOK (inlined from the original "@/hooks/use-media-query") ---
function useMediaQuery(query: string) {
  const [matches, setMatches] = React.useState(false);

  React.useEffect(() => {
    function onChange(event: MediaQueryListEvent) {
      setMatches(event.matches);
    }
    const result = matchMedia(query);
    result.addEventListener("change", onChange);
    setMatches(result.matches);
    return () => result.removeEventListener("change", onChange);
  }, [query]);

  return matches;
}

// --- INTERACTIVE STARFIELD ---
function Star({
  mousePosition,
  containerRef,
}: {
  mousePosition: MousePosition;
  containerRef: React.RefObject<HTMLDivElement | null>;
}) {
  // Random position fixed once per star (lazy useState).
  const [initialPos] = React.useState({
    top: `${Math.random() * 100}%`,
    left: `${Math.random() * 100}%`,
  });

  const springConfig = { stiffness: 100, damping: 15, mass: 0.1 };
  const springX = useSpring(0, springConfig);
  const springY = useSpring(0, springConfig);

  React.useEffect(() => {
    if (!containerRef.current || mousePosition.x === null || mousePosition.y === null) {
      springX.set(0);
      springY.set(0);
      return;
    }

    const containerRect = containerRef.current.getBoundingClientRect();
    const starX = containerRect.left + (parseFloat(initialPos.left) / 100) * containerRect.width;
    const starY = containerRect.top + (parseFloat(initialPos.top) / 100) * containerRect.height;

    const deltaX = mousePosition.x - starX;
    const deltaY = mousePosition.y - starY;
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

    // Stars within 600px are pulled TOWARD the cursor; strength falls off linearly
    // with distance, max displacement = half the distance to the cursor.
    const radius = 600;
    if (distance < radius) {
      const force = 1 - distance / radius;
      const pullX = deltaX * force * 0.5;
      const pullY = deltaY * force * 0.5;
      springX.set(pullX);
      springY.set(pullY);
    } else {
      springX.set(0);
      springY.set(0);
    }
  }, [mousePosition, initialPos, containerRef, springX, springY]);

  return (
    <motion.div
      className="absolute bg-foreground rounded-full"
      style={{
        top: initialPos.top,
        left: initialPos.left,
        // NOTE: re-randomized on every render (original behavior) — see README.
        width: `${1 + Math.random() * 2}px`,
        height: `${1 + Math.random() * 2}px`,
        x: springX,
        y: springY,
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: [0, 1, 0] }}
      transition={{
        duration: 2 + Math.random() * 3,
        repeat: Infinity,
        delay: Math.random() * 5,
      }}
    />
  );
}

function InteractiveStarfield({
  mousePosition,
  containerRef,
}: {
  mousePosition: MousePosition;
  containerRef: React.RefObject<HTMLDivElement | null>;
}) {
  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
      {Array.from({ length: 150 }).map((_, i) => (
        <Star key={`star-${i}`} mousePosition={mousePosition} containerRef={containerRef} />
      ))}
    </div>
  );
}

// --- PRICING CONTEXT ---
const PricingContext = React.createContext<{
  isMonthly: boolean;
  setIsMonthly: (value: boolean) => void;
}>({
  isMonthly: true,
  setIsMonthly: () => {},
});

// --- MAIN SECTION ---
export function PricingSection({
  plans,
  title = "Simple, Transparent Pricing",
  description = "Choose the plan that's right for you. All plans include our core features and support.",
}: PricingSectionProps) {
  const [isMonthly, setIsMonthly] = React.useState(true);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = React.useState<MousePosition>({ x: null, y: null });

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY } = event;
    setMousePosition({ x: clientX, y: clientY });
  };

  return (
    <PricingContext.Provider value={{ isMonthly, setIsMonthly }}>
      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => setMousePosition({ x: null, y: null })}
        className="relative w-full bg-background dark:bg-neutral-950 py-20 sm:py-24"
      >
        <InteractiveStarfield mousePosition={mousePosition} containerRef={containerRef} />

        <div className="relative z-10 container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center space-y-4 mb-12">
            <h2 className="text-4xl font-bold tracking-tighter sm:text-5xl text-neutral-900 dark:text-white">
              {title}
            </h2>
            <p className="text-muted-foreground text-lg whitespace-pre-line">{description}</p>
          </div>

          <PricingToggle />

          <div className="mt-12 grid grid-cols-1 lg:grid-cols-3 items-start gap-8">
            {plans.map((plan, index) => (
              <PricingCard key={index} plan={plan} index={index} />
            ))}
          </div>
        </div>
      </div>
    </PricingContext.Provider>
  );
}

// --- PRICING TOGGLE ---
function PricingToggle() {
  const { isMonthly, setIsMonthly } = React.useContext(PricingContext);
  const confettiRef = React.useRef<HTMLDivElement>(null);
  const monthlyBtnRef = React.useRef<HTMLButtonElement>(null);
  const annualBtnRef = React.useRef<HTMLButtonElement>(null);

  const [pillStyle, setPillStyle] = React.useState<React.CSSProperties>({});

  // Measure the active button and move the pill under it.
  React.useEffect(() => {
    const btnRef = isMonthly ? monthlyBtnRef : annualBtnRef;
    if (btnRef.current) {
      setPillStyle({
        width: btnRef.current.offsetWidth,
        transform: `translateX(${btnRef.current.offsetLeft}px)`,
      });
    }
  }, [isMonthly]);

  const handleToggle = (monthly: boolean) => {
    if (isMonthly === monthly) return;
    setIsMonthly(monthly);

    // Confetti burst from the "Annual" button when switching to annual.
    if (!monthly && confettiRef.current) {
      const rect = annualBtnRef.current?.getBoundingClientRect();
      if (!rect) return;

      const originX = (rect.left + rect.width / 2) / window.innerWidth;
      const originY = (rect.top + rect.height / 2) / window.innerHeight;

      confetti({
        particleCount: 80,
        spread: 80,
        origin: { x: originX, y: originY },
        colors: ["hsl(var(--primary))", "hsl(var(--background))", "hsl(var(--accent))"],
        ticks: 300,
        gravity: 1.2,
        decay: 0.94,
        startVelocity: 30,
      });
    }
  };

  return (
    <div className="flex justify-center">
      <div ref={confettiRef} className="relative flex w-fit items-center rounded-full bg-muted p-1">
        <motion.div
          className="absolute left-0 top-0 h-full rounded-full bg-primary p-1"
          style={pillStyle}
          transition={{ type: "spring", stiffness: 500, damping: 40 }}
        />
        <button
          ref={monthlyBtnRef}
          onClick={() => handleToggle(true)}
          className={cn(
            "relative z-10 rounded-full px-4 sm:px-6 py-2 text-sm font-medium transition-colors",
            isMonthly ? "text-primary-foreground" : "text-muted-foreground hover:text-foreground"
          )}
        >
          Monthly
        </button>
        <button
          ref={annualBtnRef}
          onClick={() => handleToggle(false)}
          className={cn(
            "relative z-10 rounded-full px-4 sm:px-6 py-2 text-sm font-medium transition-colors",
            isMonthly ? "text-muted-foreground hover:text-foreground" : "text-primary-foreground"
          )}
        >
          Annual
          <span className={cn("hidden sm:inline", isMonthly ? "" : "text-primary-foreground/80")}>
            {" "}
            (Save 20%)
          </span>
        </button>
      </div>
    </div>
  );
}

// --- PRICING CARD ---
function PricingCard({ plan, index }: { plan: PricingPlan; index: number }) {
  const { isMonthly } = React.useContext(PricingContext);
  const isDesktop = useMediaQuery("(min-width: 1024px)");

  return (
    <motion.div
      initial={{ y: 50, opacity: 0 }}
      // Popular card rises 20px on desktop so it stands above its neighbours.
      whileInView={{ y: plan.isPopular && isDesktop ? -20 : 0, opacity: 1 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.6,
        type: "spring",
        stiffness: 100,
        damping: 20,
        delay: index * 0.15,
      }}
      className={cn(
        "rounded-2xl p-8 flex flex-col relative bg-background/70 backdrop-blur-sm",
        plan.isPopular ? "border-2 border-primary shadow-xl" : "border border-border"
      )}
    >
      {plan.isPopular && (
        <div className="absolute top-0 -translate-y-1/2 left-1/2 -translate-x-1/2">
          <div className="bg-primary py-1.5 px-4 rounded-full flex items-center gap-1.5">
            <StarIcon className="text-primary-foreground h-4 w-4 fill-current" />
            <span className="text-primary-foreground text-sm font-semibold">Most Popular</span>
          </div>
        </div>
      )}

      <div className="flex-1 flex flex-col text-center">
        <h3 className="text-xl font-semibold text-foreground">{plan.name}</h3>
        <p className="mt-2 text-sm text-muted-foreground">{plan.description}</p>

        <div className="mt-6 flex items-baseline justify-center gap-x-1">
          <span className="text-5xl font-bold tracking-tight text-foreground">
            <NumberFlow
              value={isMonthly ? Number(plan.price) : Number(plan.yearlyPrice)}
              format={{ style: "currency", currency: "USD", minimumFractionDigits: 0 }}
              className="font-variant-numeric: tabular-nums"
            />
          </span>
          <span className="text-sm font-semibold leading-6 tracking-wide text-muted-foreground">
            / {plan.period}
          </span>
        </div>

        <p className="text-xs text-muted-foreground mt-2">
          {isMonthly ? "Billed Monthly" : "Billed Annually"}
        </p>

        <ul role="list" className="mt-8 space-y-3 text-sm leading-6 text-left text-muted-foreground">
          {plan.features.map((feature) => (
            <li key={feature} className="flex gap-x-3">
              <Check className="h-6 w-5 flex-none text-primary" aria-hidden="true" />
              {feature}
            </li>
          ))}
        </ul>

        <div className="mt-auto pt-8">
          <a
            href={plan.href}
            className={cn(
              buttonVariants({ variant: plan.isPopular ? "default" : "outline", size: "lg" }),
              "w-full"
            )}
          >
            {plan.buttonText}
          </a>
        </div>
      </div>
    </motion.div>
  );
}
