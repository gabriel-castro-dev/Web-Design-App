// Reconstructed from 21st.dev bundle: hirael/comparison-02
// Requires: lucide-react, shadcn/ui (Badge, Button), cn() helper (clsx + tailwind-merge), Tailwind CSS v4 (shadcn tokens).
// The preview's warm paper / amber look comes from a custom theme (CSS variables), see README.
import { Check, Minus } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface Approach {
  name: string;
  summary: string;
  featured?: boolean;
}

// A cell is either a yes/no boolean (icon) or a short text value.
type CellValueType = boolean | string;

interface ComparisonRow {
  label: string;
  cells: CellValueType[];
}

const approaches: Approach[] = [
  { name: "Build it yourself", summary: "Full control, and every hour of it is yours" },
  { name: "Hirael", summary: "The source lands in your repo and stays there", featured: true },
  { name: "Component library", summary: "Fast to add, harder to bend later" },
];

const rows: ComparisonRow[] = [
  { label: "You own the source", cells: [true, true, false] },
  { label: "Ships without a runtime dependency", cells: [true, true, false] },
  { label: "Time to a working combobox", cells: ["Two days", "One command", "One command"] },
  { label: "Restyle without fighting internals", cells: [true, true, false] },
  { label: "Right-to-left handled out of the box", cells: [false, true, "Sometimes"] },
  { label: "Light and dark both designed, not derived", cells: [false, true, "Sometimes"] },
  { label: "Upgrades arrive on someone else’s schedule", cells: [false, false, true] },
];

function CellValue({ value }: { value: CellValueType }) {
  if (typeof value === "string") {
    return <span className="text-sm text-muted-foreground">{value}</span>;
  }
  return value ? (
    <>
      <Check aria-hidden className="size-4 text-foreground" />
      <span className="sr-only">Yes</span>
    </>
  ) : (
    <>
      <Minus aria-hidden className="size-4 text-muted-foreground/50" />
      <span className="sr-only">No</span>
    </>
  );
}

export default function Comparison02() {
  return (
    <section className="bg-background py-20 sm:py-28" aria-labelledby="comparison-02-heading">
      <div className="container w-full max-w-5xl">
        <div className="mx-auto max-w-2xl text-center">
          <h2 id="comparison-02-heading" className="font-serif text-3xl font-medium tracking-tight sm:text-4xl">
            Three ways to get a date range picker
          </h2>
          <p className="mt-4 text-muted-foreground">
            Only one of them leaves you with code you can read on a Friday afternoon and change on a Monday morning.
          </p>
        </div>

        {/* min-w keeps the table legible; narrow screens scroll horizontally */}
        <div className="mt-12 overflow-x-auto">
          <table className="w-full min-w-[42rem] border-collapse text-start">
            <caption className="sr-only">Comparing three ways to add a component to a project</caption>
            <thead>
              <tr>
                <th scope="col" className="w-1/3 p-4 text-start align-bottom">
                  <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-muted-foreground">
                    Approach
                  </span>
                </th>
                {approaches.map((approach) => (
                  <th
                    key={approach.name}
                    scope="col"
                    className={cn(
                      "p-4 text-start align-bottom",
                      // featured column = one continuous "card": top cap here, sides in body cells, bottom cap in footer
                      approach.featured && "rounded-t-md border border-b-0 border-border bg-card",
                    )}
                  >
                    <span className="flex items-center gap-2">
                      <span className="text-base font-medium">{approach.name}</span>
                      {approach.featured && (
                        <Badge variant="secondary" className="font-mono text-[10px] uppercase tracking-[0.1em]">
                          This one
                        </Badge>
                      )}
                    </span>
                    <span className="mt-1 block text-sm font-normal text-muted-foreground">{approach.summary}</span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.label} className="border-t border-border">
                  <th scope="row" className="p-4 text-start text-sm font-normal">
                    {row.label}
                  </th>
                  {row.cells.map((cell, index) => (
                    <td
                      key={approaches[index].name}
                      className={cn("p-4 align-middle", approaches[index].featured && "border-x border-border bg-card")}
                    >
                      <span className="flex items-center">
                        <CellValue value={cell} />
                      </span>
                    </td>
                  ))}
                </tr>
              ))}
              <tr className="border-t border-border">
                <td />
                {approaches.map((approach) => (
                  <td
                    key={approach.name}
                    className={cn("p-4", approach.featured && "rounded-b-md border-x border-b border-border bg-card")}
                  >
                    {approach.featured && (
                      <Button size="sm" className="w-full">
                        Browse the registry
                      </Button>
                    )}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
