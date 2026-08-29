import { createFileRoute } from "@tanstack/react-router";
import { BookOpen, CheckCircle2, HeartHandshake } from "lucide-react";
import { PageShell } from "@/components/PageShell";

export const Route = createFileRoute("/help")({
  head: () => ({
    meta: [
      { title: "Help — LostCraft" },
      { name: "description", content: "How to use LostCraft to explore and learn Rajasthani crafts." },
      { property: "og:title", content: "Help — LostCraft" },
      {
        property: "og:description",
        content: "How to use LostCraft to explore and learn Rajasthani crafts.",
      },
    ],
  }),
  component: Help,
});

const items = [
  {
    icon: BookOpen,
    title: "Explore first",
    body: "Open Explore Crafts to read the story, origin and materials behind each tradition.",
  },
  {
    icon: CheckCircle2,
    title: "Learn step by step",
    body: "Each craft has four short steps. Tap Mark as Done — your progress is saved on this device.",
  },
  {
    icon: HeartHandshake,
    title: "Curators add crafts",
    body: "Switch to the Curator view to document a craft you know that isn't archived yet.",
  },
];

function Help() {
  return (
    <PageShell title="Help" subtitle="How LostCraft works" backTo="/home">
      <div className="space-y-4">
        {items.map((item, i) => (
          <div
            key={item.title}
            className="card-soft pop-in grid grid-cols-[auto_minmax(0,1fr)] gap-4 p-5"
            style={{ animationDelay: `${i * 70}ms` }}
          >
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-secondary">
              <item.icon className="h-6 w-6 text-primary" />
            </span>
            <div className="min-w-0">
              <h3 className="font-display text-lg font-semibold">{item.title}</h3>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{item.body}</p>
            </div>
          </div>
        ))}
      </div>
    </PageShell>
  );
}
