// Reconstructed from 21st.dev bundle: diarmuradi/pricing-9
// Requires: motion, lucide-react, shadcn/ui (Badge, Button, Switch), ./fancy-button (@base-ui/react + cva),
// Tailwind CSS v4 (shadcn tokens; `rounded-4xl` = --radius-4xl: 2rem; `shadow-elevated-lg` is NOT defined — see README)
import * as React from "react";
import { AnimatePresence, motion, type Variants } from "motion/react";
import { ArrowUpRight, ChartLine, Check, Code, Database, Lock, Repeat, Settings } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { FancyButton } from "./fancy-button";

// Each digit of the total is its own motion.span. `custom` = digit index → 30 ms stagger.
const digitVariants: Variants = {
  initial: { opacity: 0, y: 10, filter: "blur(4px)", scale: 0.98 },
  animate: (index: number) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    scale: 1,
    transition: { delay: index * 0.03, type: "spring", damping: 22, stiffness: 280 },
  }),
  exit: { opacity: 0, y: -10, filter: "blur(4px)", scale: 0.98, transition: { duration: 0.14 } },
};

interface AddOn {
  id: string;
  label: string;
  icon: React.ReactNode;
  price: number;
  enabled: boolean;
}

const initialAddOns: AddOn[] = [
  { id: "analytics", label: "Analytics engine", icon: <ChartLine className="size-4" />, price: 15, enabled: true },
  { id: "api", label: "API gateway", icon: <Code className="size-4" />, price: 20, enabled: true },
  { id: "storage", label: "Cloud storage (100 GB)", icon: <Database className="size-4" />, price: 10, enabled: false },
  { id: "automation", label: "Workflow automation", icon: <Repeat className="size-4" />, price: 25, enabled: false },
  { id: "security", label: "Advanced security", icon: <Lock className="size-4" />, price: 30, enabled: false },
  { id: "custom", label: "Custom integrations", icon: <Settings className="size-4" />, price: 20, enabled: false },
];

const alwaysIncluded = [
  "Unlimited team members",
  "Core dashboard access",
  "Email support",
  "5 GB base storage",
];

const BASE_PRICE = 29;

export default function Pricing() {
  const [addOns, setAddOns] = React.useState<AddOn[]>(initialAddOns);

  const total = BASE_PRICE + addOns.filter((a) => a.enabled).reduce((sum, a) => sum + a.price, 0);
  const digits = total.toString().split("");

  const toggleFeature = (id: string) => {
    setAddOns((prev) => prev.map((a) => (a.id === id ? { ...a, enabled: !a.enabled } : a)));
  };

  return (
    <section aria-label="Pricing" className="mx-auto w-full max-w-4xl">
      <div className="flex flex-col items-center gap-8">
        <div className="flex flex-col items-center gap-4 text-center">
          <Badge variant="secondary" className="w-fit">
            Build your plan
          </Badge>
          <h2 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            Only pay for what you need
          </h2>
          <p className="max-w-2xl text-lg text-muted-foreground">
            Start with a base plan and add modules as your infrastructure grows. Full flexibility, zero waste.
          </p>
        </div>

        <div className="grid w-full grid-cols-1 gap-4 lg:grid-cols-2">
          {/* Left: add-on toggles */}
          <div className="flex flex-col gap-6 rounded-4xl bg-card p-8 shadow-elevated-lg">
            <div className="flex flex-col gap-2">
              <h3 className="text-lg font-medium text-foreground">Add-on modules</h3>
              <p className="text-sm text-muted-foreground">
                Toggle the features you need. Price updates in real-time.
              </p>
            </div>
            <div className="flex flex-col gap-4">
              {addOns.map((addOn) => (
                <div key={addOn.id} className="flex items-center justify-between gap-4 rounded-lg p-2">
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => toggleFeature(addOn.id)}
                    className="h-auto flex-1 justify-start rounded-lg px-0 py-0 hover:bg-transparent"
                  >
                    <div className="flex items-center gap-3 text-left">
                      <div
                        className={`flex size-9 items-center justify-center rounded-full transition-colors ${
                          addOn.enabled ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                        }`}
                      >
                        {addOn.icon}
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm font-medium text-foreground">{addOn.label}</span>
                        <span className="text-start text-xs text-muted-foreground">+${addOn.price}/mo</span>
                      </div>
                    </div>
                  </Button>
                  <Switch checked={addOn.enabled} onCheckedChange={() => toggleFeature(addOn.id)} />
                </div>
              ))}
            </div>
          </div>

          {/* Right: summary with animated total */}
          <div className="flex flex-col gap-6 rounded-4xl bg-muted p-8">
            <div className="flex flex-col gap-2">
              <h3 className="text-xl font-medium text-foreground">Your plan</h3>
              <p className="text-sm text-muted-foreground">
                Base plan + {addOns.filter((a) => a.enabled).length} add-ons selected
              </p>
            </div>
            <div className="flex flex-col gap-1">
              <div className="flex items-baseline gap-1">
                <span className="text-7xl font-semibold tracking-tight text-foreground">$</span>
                <AnimatePresence mode="popLayout">
                  {digits.map((digit, index) => (
                    <motion.span
                      // key includes the total, so EVERY digit re-mounts whenever the total changes
                      key={`${total}-${digit}-${index}`}
                      variants={digitVariants}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                      custom={index}
                      className="inline-block text-7xl font-semibold tracking-tight text-foreground"
                    >
                      {digit}
                    </motion.span>
                  ))}
                </AnimatePresence>
                <span key="period" className="text-xl text-muted-foreground">
                  /month
                </span>
              </div>
              <p className="text-sm text-muted-foreground">
                Base: ${BASE_PRICE} + Add-ons: ${total - BASE_PRICE}
              </p>
            </div>
            <FancyButton size="lg" className="w-full">
              Start free trial
              <ArrowUpRight />
            </FancyButton>
            <div className="flex flex-col gap-3">
              <p className="text-sm font-medium text-foreground">Always included</p>
              <ul className="flex flex-col gap-3">
                {alwaysIncluded.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <div className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-primary">
                      <Check className="size-3 text-primary-foreground" />
                    </div>
                    <span className="text-sm text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
