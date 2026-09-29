// Reconstructed from 21st.dev bundle: educalvolpz/team-1
// Requires: Tailwind CSS v4 (shadcn tokens + the --primary/--foreground overrides in README),
// motion (import from "motion/react")
"use client";

import { motion, useInView, useReducedMotion } from "motion/react";
import { useRef } from "react";

export interface TeamPerson {
  name: string;
  role: string;
  avatar: string;
  location?: string;
  bio?: string;
}

const DEFAULT_MEMBER_COUNT = 4;
const AVATAR_SIZE = 400;
const STAGGER_DELAY = 0.1;

// Original used an ImageKit helper: getAvatarUrl(src, size) requests a 2x image
// (`?tr=w-800,h-800,q-85,f-auto`) for absolute URLs. Kept for parity; hosts that don't
// understand `tr` simply ignore the query string.
function getAvatarUrl(src: string, size = 40) {
  const px = size * 2;
  const transform = `w-${px},h-${px},q-85,f-auto`;
  if (!/^https?:\/\//.test(src)) return src;
  const url = new URL(src);
  url.searchParams.delete("updatedAt");
  return `${url.origin}${url.pathname}?tr=${transform}`;
}

// Demo data (first 4 of the bundle's shared "people" fixture; every entry had location "Remote").
const DEFAULT_PEOPLE: TeamPerson[] = [
  {
    name: "Maya Solis",
    role: "Product designer",
    location: "Remote",
    avatar:
      "https://cdn.21st.dev/assets/localized/e9f9723c8e2f41741992475f77ebaf39a942eb3e663325168eb6500872fec462.jpg",
  },
  {
    name: "Hana Park",
    role: "Researcher",
    location: "Remote",
    avatar:
      "https://cdn.21st.dev/assets/localized/78c682f4c542cd369af3b90b2655599f5288b2867c0b033b9b03595886a281a1.jpg",
  },
  {
    name: "Zara Ndiaye",
    role: "Marketing",
    location: "Remote",
    avatar:
      "https://cdn.21st.dev/assets/localized/66016130e3481dd743d9d7f9cbe76c2e9b5fed18445e9f1f235212c66f124d91.jpg",
  },
  {
    name: "Luca Moretti",
    role: "Support lead",
    location: "Remote",
    avatar:
      "https://cdn.21st.dev/assets/localized/e732d3c66f9f107cbeaaaa011741f22136830d5ae4a73d8944783b0c24940dbf.jpg",
  },
];

export interface TeamGridProps {
  title?: string;
  description?: string;
  members?: TeamPerson[];
}

export default function TeamGrid({
  title = "Our team",
  description = "We're a dynamic group of individuals who are passionate about what we do and dedicated to delivering the best results for our clients.",
  members = DEFAULT_PEOPLE.slice(0, DEFAULT_MEMBER_COUNT),
}: TeamGridProps) {
  const shouldReduceMotion = useReducedMotion();
  const listRef = useRef<HTMLUListElement>(null);
  const isInView = useInView(listRef, { once: true });

  const hoverSpring = shouldReduceMotion
    ? { duration: 0 }
    : { damping: 20, stiffness: 300, type: "spring" as const };

  return (
    <section className="bg-primary py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          className="mx-auto max-w-2xl lg:mx-0"
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
          transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.6 }}
          viewport={{ once: true }}
          whileInView={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
        >
          <h2 className="text-pretty font-semibold text-4xl text-foreground tracking-tight sm:text-5xl">
            {title}
          </h2>
          <p className="mt-6 text-foreground/70 text-lg/8">{description}</p>
        </motion.div>

        <motion.ul
          className="mx-auto mt-20 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3 xl:grid-cols-4"
          ref={listRef}
        >
          {members.map((person, index) => (
            <motion.li
              key={person.name}
              // The whole list is observed once; each item then fades up with a 100ms stagger.
              animate={
                shouldReduceMotion
                  ? { opacity: 1 }
                  : isInView
                    ? { opacity: 1, y: 0 }
                    : { opacity: 0, y: 30 }
              }
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 30 }}
              transition={
                shouldReduceMotion ? { duration: 0 } : { delay: index * STAGGER_DELAY, duration: 0.6 }
              }
            >
              <motion.div
                className="group"
                transition={hoverSpring}
                whileHover={shouldReduceMotion ? {} : { scale: 1.02 }}
              >
                {/* Nested scale: card 1.02 x image wrapper 1.05 = image grows ~7% on hover */}
                <motion.div
                  className="relative overflow-hidden rounded-2xl"
                  transition={hoverSpring}
                  whileHover={shouldReduceMotion ? {} : { scale: 1.05 }}
                >
                  <img
                    alt={`Photo of ${person.name}`}
                    className="aspect-14/13 w-full rounded-2xl object-cover outline-1 outline-black/5 -outline-offset-1 transition-all duration-300 group-hover:outline-black/10 dark:outline-white/10 dark:group-hover:outline-white/20"
                    draggable={false}
                    height={AVATAR_SIZE}
                    src={getAvatarUrl(person.avatar, AVATAR_SIZE)}
                    width={AVATAR_SIZE}
                  />
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-black/5 to-transparent opacity-0 group-hover:opacity-100"
                    initial={{ opacity: 0 }}
                    transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.3 }}
                    whileHover={shouldReduceMotion ? {} : { opacity: 1 }}
                  />
                </motion.div>
                <h3 className="mt-6 font-semibold text-foreground text-lg/8 tracking-tight">
                  {person.name}
                </h3>
                <p className="text-base/7 text-foreground/70">{person.role}</p>
                {person.location ? (
                  <p className="text-foreground/70 text-sm/6">{person.location}</p>
                ) : null}
                {person.bio ? <p className="mt-2 text-foreground/70 text-sm">{person.bio}</p> : null}
              </motion.div>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
