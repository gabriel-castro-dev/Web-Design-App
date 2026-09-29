// author: Khoa Phan <https://www.pldkhoa.dev>

"use client";

import { useRef } from "react";

import { cn } from "@/lib/utils";
import StackingCards, {
  StackingCardItem,
} from "./stacking-cards";

const cards = [
  {
    bgColor: "bg-[#f97316]",
    title: "The Guiding Light",
    description:
      "Lighthouses have stood as beacons of hope for centuries, guiding sailors safely through treacherous waters. Their glowing light and towering presence serve as a reminder of humanity’s connection to the sea.",
    image:
      "https://cdn.21st.dev/assets/mirror/95/95f5a21210036f048d578de0d9fd2c9e7a50b04b8451e2c94d336b6a33d094c9.png",
  },
  {
    bgColor: "bg-[#0015ff]",
    title: "Life Beneath the Waves",
    description:
      "From shimmering schools of fish to solitary hunters, the ocean is home to an incredible variety of marine life. Each species plays a vital role in maintaining the balance of underwater ecosystems.",
    image:
      "https://cdn.21st.dev/assets/mirror/a9/a92f05671c1665afd455869e575c15963bfb8799697c99b7347a0ff18d26ce07.png",
  },
  {
    bgColor: "bg-[#ff5941]",
    title: "Alone on the Open Sea",
    description:
      "Drifting across the endless horizon, traveling alone on the sea is a test of courage and resilience. With nothing but the waves and the sky, solitude becomes both a challenge and a source of deep reflection.",
    image:
      "https://cdn.21st.dev/assets/mirror/93/930d1417a40ff0e454592ef7a0aec477296e6878f544d8d7a8c597cfb2ecad5e.png",
  },
  {
    bgColor: "bg-[#1f464d]",
    title: "The Art of Sailing",
    description:
      "Harnessing the power of the wind, sailing is both a skill and an adventure. Whether racing across the waves or leisurely cruising, it’s a timeless way to explore the vast blue expanse.",
    image:
      "https://cdn.21st.dev/assets/mirror/d4/d4cd55ca340e82fd3e576dacfef401d4afd83c468a9d7cb2dd34a31c5de1792b.png",
  },
  {
    bgColor: "bg-[#0015ff]",
    title: "The Era of Whaling",
    description:
      "Once a thriving industry, whale hunting shaped economies and cultures across the world. Today, efforts to protect these majestic creatures highlight the shift toward conservation and respect for marine life.",
    image:
      "https://cdn.21st.dev/assets/mirror/e2/e2174cb2f0dcbeac067aed4582be5620ecb72cc36c7859c68edc59017fb4e7e4.png",
  },
];

export default function StackingCardsDemo() {
  const container = useRef<HTMLDivElement>(null);

  return (
    <div
      className="h-[620px] bg-white overflow-auto text-white"
      ref={container}
    >
      <StackingCards
        totalCards={cards.length}
        scrollOptions={{ container: container }}
      >
        <div className="relative font-calendas h-[110px] w-full z-10 text-xl md:text-3xl font-bold uppercase flex justify-center items-center text-[#ff5941] whitespace-pre">
          Scroll down ↓
        </div>
        {cards.map(({ bgColor, description, image, title }, index) => {
          return (
            <StackingCardItem key={index} index={index} className="h-[620px]">
              <div
                className={cn(
                  bgColor,
                  "h-[80%] sm:h-[70%] flex-col sm:flex-row aspect-video px-8 py-10 flex w-11/12 rounded-3xl mx-auto relative",
                )}
              >
                <div className="flex-1 flex flex-col justify-center">
                  <h3 className="font-bold text-2xl mb-5">{title}</h3>
                  <p>{description}</p>
                </div>

                <div className="w-full sm:w-1/2 rounded-xl aspect-video relative overflow-hidden">
                  {/* was next/image with `fill` — plain <img> positioned the same way */}
                  <img
                    src={image}
                    alt={title}
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                </div>
              </div>
            </StackingCardItem>
          );
        })}

        <div className="w-full h-80 relative overflow-hidden">
          <h2 className="absolute bottom-0 left-0 translate-y-1/3 sm:text-[192px] text-[80px] text-[#ff5941] font-calendas">
            fancy
          </h2>
        </div>
      </StackingCards>
    </div>
  );
}
