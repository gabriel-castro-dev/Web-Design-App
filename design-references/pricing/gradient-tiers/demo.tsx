import GradientTiers from "./gradient-tiers";

const plans = [
  {
    id: "starter",
    name: "Starter",
    tagline: "For individuals getting started with the basics.",
    cta: "Get started",
    features: [
      "Up to 3 projects",
      "1 GB storage",
      "Community support",
      "Basic analytics",
    ],
  },
  {
    id: "growth",
    name: "Growth",
    tagline: "For growing teams that need more power.",
    cta: "Start free trial",
    badge: "Popular",
    inherits: "Starter",
    features: [
      "Unlimited projects",
      "50 GB storage",
      "Priority email support",
      "Advanced analytics",
      "Team roles & permissions",
    ],
  },
  {
    id: "enterprise",
    name: "Enterprise",
    tagline: "For organizations with custom needs.",
    cta: "Contact sales",
    inherits: "Growth",
    features: [
      "Unlimited everything",
      "Dedicated infrastructure",
      "SSO & SAML",
      "24/7 phone support",
      "Custom contracts",
    ],
  },
];

const notes = [
  { price: "$0", priceNote: "forever" },
  { price: "$29", priceNote: "per user / month" },
  {
    priceNote: "talk to sales",
    footnote: "Volume discounts available for annual billing.",
  },
];

export default function GradientTiersDemo() {
  return (
    <div className="w-full bg-white dark:bg-[#0f0f11] p-6">
      <GradientTiers
        eyebrow="Pricing"
        heading="Plans that grow with you"
        subheading="Start free, upgrade when you need more."
        plans={plans}
        notes={notes}
      />
    </div>
  );
}
