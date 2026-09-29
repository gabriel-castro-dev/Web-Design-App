import { AnimatedTeamSection } from "./animated-team-section";

// Sample data for the demo
const teamMembers = [
  {
    name: "Johnathan Doe",
    image: "https://cdn.21st.dev/assets/mirror/9f/9f697a8fcb60a85ac182a832a9dcc35bd8700da190fb8e393cb7129856a4ee5e.jpg",
  },
  {
    name: "Jane Smith",
    image: "https://cdn.21st.dev/assets/mirror/c2/c2f46411df86faeb804a710d6dd310aa5a3dd6e89431867ac2747dc2da6c36ed.jpg",
  },
  {
    name: "Peter Jones",
    image: "https://cdn.21st.dev/assets/mirror/7c/7c5efe89da6dc917b02d7e330fc859218876fe66004d600cd2742b0c5762a206.jpg",
  },
  {
    name: "Sarah Williams",
    image: "https://cdn.21st.dev/assets/mirror/03/039131cd23196f79dda2cce8c0ed9e6a49832a0d73e33bbcae952cd528fe6b0f.jpg",
  },
  {
    name: "Michael Brown",
    image: "https://cdn.21st.dev/assets/mirror/55/55447a7f2e224c7cd7efff86331e283b412b4c759c65510d3d776f807efe80f1.jpg",
  },
  {
    name: "Emily Davis",
    image: "https://cdn.21st.dev/assets/mirror/8e/8e95b239e53df4adb8e5ba8dfad83faca9f933240d306d85c617d0dd6e86e362.jpg",
  },
  {
    name: "David Garcia",
    image: "https://cdn.21st.dev/assets/mirror/89/89e622facf6e9e85c07f983446f44beff50518d206801980f4e6375fb6d5fd9c.jpg",
  },
];

export default function AnimatedTeamSectionDemo() {
  return (
    <div className="w-full bg-background">
      <AnimatedTeamSection
        title="Our commitment to integrity and innovation"
        description="At TopOpti, we believe in forging strong partnerships build on integrity and honesty. Our mission is to drive innovation and ensure our clients success through dedicated service and creative solutions."
        members={teamMembers}
      />
    </div>
  );
}