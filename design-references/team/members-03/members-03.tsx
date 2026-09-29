// Reconstructed from 21st.dev bundle: shadcnui-blocks/members-03
// Requires: Tailwind CSS v4 (shadcn tokens), lucide-react, shadcn/ui Button
import { DotIcon, SearchIcon, UserPlusIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Member {
  name: string;
  email: string;
  role: string;
  joined: string;
  image: string;
}

const members: Member[] = [
  {
    name: "Sarah Chen",
    email: "sarah.chen@company.com",
    role: "Admin",
    joined: "2021-01-01",
    image:
      "https://cdn.21st.dev/assets/localized/74e6369d16b2e79ab12efc7243340b25dd54d5c10af37b180f4d78cd27591b58.jpg",
  },
  {
    name: "Michael Rodriguez",
    email: "michael.rodriguez@company.com",
    role: "Editor",
    joined: "2021-01-02",
    image:
      "https://cdn.21st.dev/assets/localized/164b85c84cf9fdb663450c4e1b66e82e14478ab9216492b9f05e4a09149ba14b.jpg",
  },
  {
    name: "Emily Johnson",
    email: "emily.johnson@company.com",
    role: "Viewer",
    joined: "2021-01-03",
    image:
      "https://cdn.21st.dev/assets/localized/69bdb9091e696914c39610d2d569fe7403e69c36de9b242ee9b589e37d59fb08.jpg",
  },
  {
    name: "David Kim",
    email: "david.kim@company.com",
    role: "Viewer",
    joined: "2021-01-04",
    image:
      "https://cdn.21st.dev/assets/localized/e5b8cde461e4083313d9d0eb5c83829f5255c654799ca2c63a577d0856110964.jpg",
  },
  {
    name: "Lisa Thompson",
    email: "lisa.thompson@company.com",
    role: "Viewer",
    joined: "2021-01-05",
    image:
      "https://cdn.21st.dev/assets/localized/ed03951504a69b41fed283607cc701be1af57597813d021e9a2ab169a18ad8ad.jpg",
  },
];

export default function Members() {
  return (
    <div className="px-6 py-12">
      <div className="mx-auto max-w-3xl">
        {/* Header bar: stacks vertically below 32rem (512px), row + centered above */}
        <div className="flex justify-between gap-4 rounded-lg bg-muted/90 px-6 py-5 max-[32rem]:flex-col min-[32rem]:items-center">
          <div>
            <h2 className="font-medium text-lg">Members</h2>
            <div className="mt-0.5 flex items-center text-muted-foreground text-sm">
              <span>Team Avengers</span> <DotIcon /> <span>10 Members</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button size="icon" variant="outline">
              <SearchIcon />
            </Button>
            <Button>
              <UserPlusIcon /> Invite Members
            </Button>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-x-4 gap-y-8 lg:grid-cols-3 min-[32rem]:grid-cols-2">
          {members.map((member) => (
            <div key={member.name}>
              <div className="aspect-square rounded-lg bg-muted">
                <img alt={member.name} className="size-full rounded-lg object-cover" src={member.image} />
              </div>
              <h3 className="mt-3 font-medium text-lg">{member.name}</h3>
              <p className="text-muted-foreground text-sm">{member.role}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
