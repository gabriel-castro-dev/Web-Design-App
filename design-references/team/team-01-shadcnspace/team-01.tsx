// Reconstructed from 21st.dev bundle: shadcnspace/team-01
// Requires: Tailwind CSS v4 (shadcn tokens), motion (import from "motion/react"), lucide-react,
// shadcn/ui Badge
"use client";

import { Globe } from "lucide-react";
import { motion } from "motion/react";
import { Badge } from "@/components/ui/badge";

// Brand icon inlined as SVG (lucide no longer ships brand logos).
const LinkedinIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g clipPath="url(#clip-linkedin-team01)">
      <path
        d="M13.633 13.633h-2.37V9.92c0-.885-.017-2.025-1.234-2.025-1.235 0-1.424.965-1.424 1.96v3.778h-2.37V5.998H8.51v1.043h.031a2.5 2.5 0 0 1 2.246-1.233c2.403 0 2.846 1.58 2.846 3.637zM3.56 4.954a1.376 1.376 0 1 1 0-2.751 1.376 1.376 0 0 1 0 2.751m1.185 8.679H2.372V5.998h2.373zM14.815.001H1.18A1.17 1.17 0 0 0 0 1.154v13.691A1.17 1.17 0 0 0 1.18 16h13.635A1.17 1.17 0 0 0 16 14.845V1.153A1.17 1.17 0 0 0 14.815 0"
        fill="currentColor"
      />
    </g>
    <defs>
      <clipPath id="clip-linkedin-team01">
        <rect width="16" height="16" fill="white" />
      </clipPath>
    </defs>
  </svg>
);

interface TeamMember {
  name: string;
  role: string;
  image: string;
  socials: { website: string; linkedin: string };
}

// Images are transparent PNGs with the colored blob/arch shape baked in.
const teamMembers: TeamMember[] = [
  {
    name: "Logan Dang",
    role: "WordPress Developer",
    image:
      "https://cdn.21st.dev/assets/localized/a15173e6535b3403cf75d3a251b152b66cb158540ae6fe0cef584477d25c296d.png",
    socials: { website: "#", linkedin: "#" },
  },
  {
    name: "Ana Belić",
    role: "Social Media Specialist",
    image:
      "https://cdn.21st.dev/assets/localized/642c6a86e5fbd3b161614c1493159ed72ba9f28fd64bbd3dac1aaf902841acbb.png",
    socials: { website: "#", linkedin: "#" },
  },
  {
    name: "Brian Hanley",
    role: "Product Designer",
    image:
      "https://cdn.21st.dev/assets/localized/16f617e9aa4511f685dd437418d90bcb53817ed5031cd822d60db98848ad536f.png",
    socials: { website: "#", linkedin: "#" },
  },
  {
    name: "Darko Stanković",
    role: "UI Designer",
    image:
      "https://cdn.21st.dev/assets/localized/90f8eb479a4a56a4da83ebf6be45a9ff73515b0af2cff481f665ea40189a8137.png",
    socials: { website: "#", linkedin: "#" },
  },
];

// Custom cubic-bezier (fast start, long soft settle) used for every reveal.
const EASE = [0.21, 0.47, 0.32, 0.98] as const;

const Team = () => {
  return (
    <section>
      <div className="lg:py-20 sm:py-16 py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-16 flex flex-col items-center justify-center gap-8 md:gap-16">
          <motion.div
            initial={{ y: -40, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: EASE }}
            className="max-w-xl mx-auto flex flex-col items-center justify-center text-center gap-4"
          >
            <Badge variant="outline" className="px-3 py-1 h-auto text-sm">
              Team
            </Badge>
            <h2 className="text-3xl md:text-5xl font-medium text-foreground">
              Meet the creative minds behind our success
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {teamMembers?.map((member, index) => (
              <motion.div
                key={index}
                initial={{ y: 40, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.1, ease: EASE }}
                className="group flex flex-col items-center justify-center gap-6"
              >
                <img
                  className="w-full h-full group-hover:grayscale transition-all duration-300"
                  src={member.image}
                  alt="team-img"
                />
                <div className="w-full flex flex-col gap-4 items-center justify-center">
                  <div className="flex flex-col items-center justify-center gap-2">
                    <h3 className="text-2xl font-medium text-foreground">{member.name}</h3>
                    <p className="text-sm font-normal text-muted-foreground">{member.role}</p>
                  </div>
                  <div className="flex gap-2">
                    <a
                      href={member.socials.website}
                      className="p-2 hover:bg-accent/80 rounded-full"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Globe size={16} />
                    </a>
                    <a
                      href={member.socials.linkedin}
                      className="p-2 hover:bg-accent/80 rounded-full"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <LinkedinIcon size={16} />
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Team;
