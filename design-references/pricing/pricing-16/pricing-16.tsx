// Reconstructed from 21st.dev bundle: ln-dev7/pricing-16
// Requires: lucide-react, shadcn/ui Button, cn() helper (clsx + tailwind-merge), Tailwind CSS (shadcn tokens)
import { ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface Plan {
  name: string;
  price: number;
  cadence: string;
  description: string;
  cta: string;
  features: string[];
  highlight?: boolean;
}

const plans: Plan[] = [
  {
    name: "Solo",
    price: 0,
    cadence: "free forever",
    description: "Start with the free blocks, no account needed.",
    cta: "Start free",
    features: ["All free blocks", "Copy-paste install", "Community support", "MIT licensed"],
  },
  {
    name: "Pro",
    price: 119,
    cadence: "one-time",
    description: "Every block we've shipped and every block we'll ship next.",
    highlight: true,
    cta: "Get Pro access",
    features: [
      "All free blocks",
      "All Pro blocks",
      "Future blocks, forever",
      "Commercial license",
      "Priority support",
    ],
  },
];

export default function Pricing16() {
  return (
    <section className="bg-background py-20 sm:py-28">
      <div className="mx-auto max-w-4xl px-6">
        <div className="mx-auto mb-12 max-w-lg text-center">
          <h2 className="text-balance font-semibold text-3xl tracking-tight sm:text-4xl">
            Two plans. No subscriptions.
          </h2>
          <p className="mt-3 text-pretty text-sm text-muted-foreground sm:text-base">
            Free gets you in the door. Pro gets you everything — once.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {plans.map((plan) => (
            <article
              key={plan.name}
              className={cn(
                "relative flex flex-col gap-7 rounded-2xl border border-border bg-card p-7",
                plan.highlight && "border-foreground/20 ring-1 ring-foreground/10",
              )}
            >
              {plan.highlight && (
                // pill straddles the top border (-top-3 = half its height)
                <span className="absolute -top-3 left-6 inline-flex items-center rounded-full bg-foreground px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-widest text-background">
                  Recommended
                </span>
              )}

              <div className="flex flex-col gap-1.5">
                <h3 className="font-semibold text-xl tracking-tight">{plan.name}</h3>
                <p className="text-sm text-muted-foreground">{plan.description}</p>
              </div>

              <div className="flex items-baseline gap-2 border-y border-border py-5">
                {plan.price === 0 ? (
                  <span className="font-semibold text-4xl tracking-tight">Free</span>
                ) : (
                  <>
                    <span className="font-semibold text-4xl tracking-tight tabular-nums">${plan.price}</span>
                    <span className="text-sm text-muted-foreground">{plan.cadence}</span>
                  </>
                )}
              </div>

              <ul className="flex flex-col gap-2.5">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2.5 text-sm text-foreground">
                    <Check className="mt-0.5 size-3.5 shrink-0 text-foreground" strokeWidth={2.5} />
                    {feature}
                  </li>
                ))}
              </ul>

              {/* mt-auto pins the CTA to the card bottom so both buttons align */}
              <Button
                size="lg"
                variant={plan.highlight ? "default" : "outline"}
                className="mt-auto w-full rounded-lg"
              >
                {plan.cta}
                <ArrowRight />
              </Button>
            </article>
          ))}
        </div>

        <p className="mt-6 text-center text-xs text-muted-foreground">All sales final. No refunds, no chargebacks.</p>
      </div>
    </section>
  );
}
