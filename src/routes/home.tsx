import { createFileRoute, Link } from "@tanstack/react-router";
import { Compass, PlayCircle, TrendingUp, LifeBuoy } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { crafts } from "@/data/crafts";
import { useProgress } from "@/lib/progress";

export const Route = createFileRoute("/home")({
  head: () => ({
    meta: [
      { title: "Learner Home — LostCraft" },
      {
        name: "description",
        content: "Your LostCraft home: explore crafts, continue learning and track your progress.",
      },
      { property: "og:title", content: "Learner Home — LostCraft" },
      {
        property: "og:description",
        content: "Your LostCraft home: explore crafts, continue learning and track your progress.",
      },
    ],
  }),
  component: Home,
});

type Tile = {
  label: string;
  hint: string;
  icon: LucideIcon;
  to: string;
  params?: Record<string, string>;
  bg: string;
  fg: string;
};

function Home() {
  const { progress, hydrated } = useProgress();
  const inProgress = crafts.find(
    (c) => (progress[c.id]?.length ?? 0) > 0 && (progress[c.id]?.length ?? 0) < c.steps.length,
  );
  const featured = crafts[0]!;
  const resume = inProgress ?? featured;

  const tiles: Tile[] = [
    {
      label: "Explore Crafts",
      hint: "4 living traditions",
      icon: Compass,
      to: "/crafts",
      bg: "gradient-warm",
      fg: "text-primary-foreground",
    },
    {
      label: "Continue Learning",
      hint: hydrated ? resume.name : "Pick up where you left",
      icon: PlayCircle,
      to: "/crafts/$craftId/learn",
      params: { craftId: resume.id },
      bg: "gradient-sun",
      fg: "text-mustard-foreground",
    },
    {
      label: "My Progress",
      hint: "Steps completed",
      icon: TrendingUp,
      to: "/progress",
      bg: "gradient-leaf",
      fg: "text-forest-foreground",
    },
    {
      label: "Help",
      hint: "How LostCraft works",
      icon: LifeBuoy,
      to: "/help",
      bg: "bg-secondary",
      fg: "text-secondary-foreground",
    },
  ];

  return (
    <main className="motif-bg min-h-screen">
      <div className="page-enter mx-auto w-full max-w-2xl px-5 pb-24 pt-10">
        <p className="font-display text-4xl font-semibold tracking-tight">Namaste 👋</p>
        <p className="mt-2 text-base text-muted-foreground">
          Ready to keep a craft alive today?
        </p>

        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {tiles.map((t, i) => (
            <Link
              key={t.label}
              to={t.to}
              params={t.params as never}
              className={`pop-in flex min-h-36 flex-col justify-between rounded-3xl p-6 shadow-[var(--shadow-soft)] transition-transform hover:-translate-y-1 hover:shadow-[var(--shadow-lift)] active:scale-[0.97] ${t.bg} ${t.fg}`}
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <t.icon className="h-8 w-8" />
              <span>
                <span className="block font-display text-xl font-semibold">{t.label}</span>
                <span className="block text-sm opacity-85">{t.hint}</span>
              </span>
            </Link>
          ))}
        </div>

        <div className="card-soft mt-8 p-6">
          <p className="font-display text-lg font-semibold">Craft of the day</p>
          <p className="mt-1 text-sm text-muted-foreground">{featured.tagline}</p>
          <Link
            to="/crafts/$craftId"
            params={{ craftId: featured.id }}
            className="mt-4 inline-flex rounded-2xl bg-primary px-5 py-3 text-sm font-bold text-primary-foreground transition-transform active:scale-95"
          >
            Meet {featured.name}
          </Link>
        </div>
      </div>
    </main>
  );
}
