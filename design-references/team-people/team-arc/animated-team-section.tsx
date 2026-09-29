// Reconstructed from 21st.dev bundle: ravikatiyar162/team-section
// Requires: Tailwind CSS v4 (shadcn tokens), cn() helper (clsx + tailwind-merge),
// framer-motion, react-intersection-observer
import * as React from "react";
import { motion, useAnimation, type Variants } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { cn } from "@/lib/utils";

interface TeamMember {
  name: string;
  image: string;
}

interface AnimatedTeamSectionProps extends Omit<React.HTMLAttributes<HTMLElement>, "title"> {
  title: string;
  description: string;
  members: TeamMember[];
}

// Position of each card along a shallow arc, centered on the middle card.
// offset = distance from center index. x: 90px per step, y: 30px lift per step (edges rise),
// rotate: 12deg per step (fan out).
const getCardState = (index: number, total: number) => {
  const center = (total - 1) / 2;
  const offset = index - center;
  return {
    x: offset * 90,
    y: Math.abs(offset) * -30,
    rotate: offset * 12,
  };
};

export const AnimatedTeamSection = React.forwardRef<HTMLElement, AnimatedTeamSectionProps>(
  ({ title, description, members, className, ...props }, ref) => {
    const controls = useAnimation();
    const [inViewRef, inView] = useInView({ triggerOnce: true, threshold: 0.2 });

    React.useEffect(() => {
      if (inView) controls.start("visible");
    }, [controls, inView]);

    const containerVariants: Variants = {
      hidden: {},
      visible: { transition: { staggerChildren: 0.1 } },
    };

    const cardVariants: Variants = {
      // All cards start stacked in the center, tiny and invisible...
      hidden: { opacity: 0, scale: 0.5, x: 0, y: 0, rotate: 0 },
      // ...then spring out one by one into the fanned arc.
      visible: (i: number) => ({
        opacity: 1,
        scale: 1,
        ...getCardState(i, members.length),
        transition: { type: "spring", stiffness: 120, damping: 12 },
      }),
    };

    return (
      <section ref={ref} className={cn("w-full py-20 lg:py-28 overflow-hidden", className)} {...props}>
        <div className="container mx-auto flex flex-col items-center text-center px-4">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground mb-3">{title}</h2>
          <p className="max-w-3xl text-muted-foreground md:text-xl">{description}</p>

          <motion.div
            ref={inViewRef}
            className="relative mt-20 flex items-center justify-center"
            style={{ minHeight: "250px" }}
            variants={containerVariants}
            initial="hidden"
            animate={controls}
          >
            {members.map((member, index) => (
              <motion.div
                key={index}
                className="absolute w-28 h-28 md:w-36 md:h-36 lg:w-44 lg:h-44 rounded-xl overflow-hidden shadow-lg border-2 border-background"
                custom={index}
                variants={cardVariants}
                // Center card on top, edges underneath.
                style={{ zIndex: members.length - Math.abs(index - (members.length - 1) / 2) }}
                whileHover={{ scale: 1.1, zIndex: 99, transition: { type: "spring", stiffness: 300, damping: 20 } }}
              >
                <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    );
  },
);
AnimatedTeamSection.displayName = "AnimatedTeamSection";
