// Reconstructed from 21st.dev bundle: felipemenezes098/item-19
// Requires: Tailwind CSS v4 (shadcn tokens), lucide-react, shadcn/ui Item (+ Separator, used by ItemSeparator)
import { CircleCheck, GitCommitHorizontal, Rocket, UserPlus } from "lucide-react";

import {
  Item,
  ItemContent,
  ItemDescription,
  ItemFooter,
  ItemGroup,
  ItemMedia,
  ItemSeparator,
  ItemTitle,
} from "@/components/ui/item";

const events = [
  {
    icon: GitCommitHorizontal,
    title: "Marcus pushed 3 commits",
    description: "main · feat: split billing service",
    time: "2m ago",
  },
  {
    icon: UserPlus,
    title: "Priya joined the workspace",
    description: "Invited by Sarah Chen",
    time: "1h ago",
  },
  {
    icon: CircleCheck,
    title: "Release v2.4.0 marked stable",
    description: "All canary metrics green for 24h",
    time: "4h ago",
  },
  {
    icon: Rocket,
    title: "Deploy succeeded",
    description: "production · 1m 42s",
    time: "Yesterday",
  },
];

export default function Item19() {
  return (
    <ItemGroup className="w-full max-w-md">
      {events.map((event, index) => (
        <div key={event.title}>
          <Item>
            <ItemMedia variant="icon">
              <event.icon />
            </ItemMedia>
            <ItemContent>
              <ItemTitle>{event.title}</ItemTitle>
              <ItemDescription>{event.description}</ItemDescription>
            </ItemContent>
            {/* ItemFooter is basis-full by default (wraps to its own line);
                basis-auto keeps the timestamp inline on the right. */}
            <ItemFooter className="basis-auto">
              <span className="text-muted-foreground text-xs">{event.time}</span>
            </ItemFooter>
          </Item>
          {index < events.length - 1 && <ItemSeparator />}
        </div>
      ))}
    </ItemGroup>
  );
}
