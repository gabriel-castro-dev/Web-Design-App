// Reconstructed from 21st.dev bundle: ravikatiyar162/photo-stack
// Requires: Tailwind CSS v4 (shadcn tokens: bg-background, text-foreground) + cn() helper (clsx + tailwind-merge)
import * as React from "react";
import { cn } from "@/lib/utils";

export interface PhotoItem {
  src: string;
  name: string;
}

interface InteractivePhotoStackProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  items: PhotoItem[];
  title?: React.ReactNode;
}

const random = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;

// Scatters up to 5 cards across the viewport without heavy overlap.
// Retries random positions (x: ±45vw, y: ±25vh, rotation: ±25deg) until the
// new card is at least 25vw / 45vh away from every card already placed.
const generateNonOverlappingTransforms = (items: PhotoItem[]) => {
  const placed: { x: number; y: number; r: number }[] = [];
  const minDistX = 25;
  const minDistY = 45;
  const maxAttempts = 100;

  items.slice(0, 5).forEach(() => {
    let candidate: { x: number; y: number; r: number };
    let overlapping: boolean;
    let attempts = 0;
    do {
      overlapping = false;
      candidate = { x: random(-45, 45), y: random(-25, 25), r: random(-25, 25) };
      for (const p of placed) {
        if (Math.abs(candidate.x - p.x) < minDistX && Math.abs(candidate.y - p.y) < minDistY) {
          overlapping = true;
          break;
        }
      }
      attempts++;
    } while (overlapping && attempts < maxAttempts);
    placed.push(candidate);
  });

  return placed.map((t) => `translate(${t.x}vw, ${t.y}vh) rotate(${t.r}deg)`);
};

export const InteractivePhotoStack = React.forwardRef<HTMLDivElement, InteractivePhotoStackProps>(
  ({ items, title, className, ...props }, ref) => {
    const [activeIndex, setActiveIndex] = React.useState(0);
    const [isScattered, setIsScattered] = React.useState(false);
    const [spinningIndex, setSpinningIndex] = React.useState<number | null>(null);
    const [transforms, setTransforms] = React.useState<string[]>([]);

    const visible = items.slice(0, 5);
    const stackRotations = ["rotate-2", "-rotate-2", "rotate-4", "-rotate-4", "rotate-6"];

    const handleMouseEnter = () => {
      setTransforms(generateNonOverlappingTransforms(items));
      setIsScattered(true);
    };

    const handleCardClick = (index: number) => {
      if (isScattered) {
        // Spin the clicked card, then collapse the stack with it on top.
        setSpinningIndex(index);
        setTimeout(() => {
          setIsScattered(false);
          setActiveIndex(index);
          setSpinningIndex(null);
        }, 700);
      } else {
        setActiveIndex(index);
      }
    };

    return (
      <div ref={ref} className={cn("flex flex-col items-center justify-center gap-12", className)} {...props}>
        <div
          className="relative h-96 w-full"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={() => spinningIndex === null && setIsScattered(false)}
        >
          <div className="relative left-1/2 top-1/2 h-80 w-64 -translate-x-1/2 -translate-y-1/2">
            {visible.map((item, index) => {
              const isActive = index === activeIndex;
              const total = visible.length;
              // Depth in the stack relative to the active card (0 = top).
              let depth = index - activeIndex;
              if (depth < 0) depth += total;
              const isSpinning = index === spinningIndex;

              const transform = isScattered
                ? transforms[index]
                : `translateY(${depth * 0.5}rem) scale(${1 - depth * 0.05})`;

              return (
                <div
                  key={item.name}
                  onClick={() => handleCardClick(index)}
                  className={cn(
                    "absolute inset-0 h-80 w-64 cursor-pointer rounded-xl bg-background p-2 shadow-lg transition-all duration-500 ease-in-out",
                    {
                      "rotate-0": isScattered,
                      [stackRotations[depth]]: !isScattered && !isActive,
                      "hover:scale-110": isScattered && !isSpinning,
                      "animate-spin-y": isSpinning,
                    },
                  )}
                  style={{
                    transform,
                    zIndex: isSpinning ? 200 : isScattered ? 100 : isActive ? total : total - depth,
                  }}
                >
                  <div className="flex h-full w-full flex-col items-center justify-start">
                    <div className="h-64 w-full">
                      <img src={item.src} alt={item.name} className="h-full w-full rounded-md object-cover" />
                    </div>
                    <div className="flex h-12 flex-grow items-center justify-center">
                      <p className="font-serif text-xl italic text-foreground">{item.name}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <h3 className="text-center text-2xl font-bold text-foreground">{title}</h3>
      </div>
    );
  },
);
InteractivePhotoStack.displayName = "InteractivePhotoStack";

// Demo data from the original preview
const demoItems: PhotoItem[] = [
  { src: "https://cdn.21st.dev/assets/mirror/e4/e4aa6feebdf90e8f95fd1b23df1134252323f1a8431bacf6cce347a6872a36b1.jpg", name: "Alexandre" },
  { src: "https://cdn.21st.dev/assets/mirror/69/692aaa4baf3ba986e5c0b072133ecaac13933a3b1c6a99c78bea3d8a47f9dee8.jpg", name: "Isabella" },
  { src: "https://cdn.21st.dev/assets/mirror/b2/b226346ec34fe24bbe9082488ff7f2c84d7150de914648cac41eeabe17579811.jpg", name: "Sophia" },
  { src: "https://cdn.21st.dev/assets/mirror/e8/e87dd9c3d7e7c987901cef2bcca30db0157a1b51824e8628ccbfb27637ab9902.jpg", name: "Mia" },
  { src: "https://cdn.21st.dev/assets/mirror/fb/fb1f483387b6207cca218e17983266d323e2c4b77cdfb689a697e465e659ad96.jpg", name: "Charlotte" },
];

export function InteractivePhotoStackDemo() {
  return (
    <div className="flex h-full min-h-[45rem] w-full items-center justify-center bg-background p-8">
      <InteractivePhotoStack items={demoItems} title="Our Creative Team" />
    </div>
  );
}
