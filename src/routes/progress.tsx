import { createFileRoute, Link } from "@tanstack/react-router";
import { Sprout } from "lucide-react";
import { crafts } from "@/data/crafts";
import { PageShell } from "@/components/PageShell";
import { useProgress } from "@/lib/progress";

export const Route = createFileRoute("/progress")({
  head: () => ({
    meta: [
      { title: "My Progress — LostCraft" },
      { name: "description", content: "See which Rajasthani crafts you've started and finished." },
      { property: "og:title", content: "My Progress — LostCraft" },
      {
        property: "og:description",
        content: "See which Rajasthani crafts you've started and finished.",
      },
    ],
  }),
  component: ProgressPage,
});

function Ring({ pct }: { pct: number }) {
  return (
    <div
      className="grid h-16 w-16 shrink-0 place-items-center rounded-full transition-all duration-500"
      style={{
        background: `conic-gradient(var(--primary) ${pct * 3.6}deg, var(--muted) 0deg)`,
      }}
    >
      <span className="grid h-12 w-12 place-items-center rounded-full bg-card text-sm font-bold">
        {pct}%
      </span>
    </div>
  );
}

function ProgressPage() {
  const { progress, hydrated } = useProgress();
  const started = crafts.filter((c) => (progress[c.id]?.length ?? 0) > 0);
  const completed = crafts.filter((c) => (progress[c.id]?.length ?? 0) === c.steps.length);

  return (
    <PageShell title="My Progress" subtitle="Every step keeps a craft alive" backTo="/home">
      <div className="gradient-sun rounded-3xl p-6 text-mustard-foreground shadow-[var(--shadow-soft)]">
        <p className="font-display text-2xl font-semibold">
          {completed.length} of {crafts.length} crafts completed
        </p>
        <p className="mt-1 text-sm opacity-85">
          {completed.length === crafts.length
            ? "Incredible — you've learned every craft in this collection!"
            : "Small steps, big revival. Keep going!"}
        </p>
      </div>

      {hydrated && started.length === 0 ? (
        <div className="card-soft mt-6 p-8 text-center">
          <Sprout className="mx-auto h-10 w-10 text-forest" />
          <h2 className="mt-3 font-display text-xl font-semibold">Nothing planted yet</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Pick a craft and finish your first step — it takes two minutes.
          </p>
          <Link
            to="/crafts"
            className="gradient-warm mt-5 inline-flex rounded-2xl px-6 py-4 text-base font-bold text-primary-foreground active:scale-95"
          >
            Explore crafts
          </Link>
        </div>
      ) : null}

      <div className="mt-6 space-y-4">
        {crafts.map((craft, i) => {
          const done = progress[craft.id]?.length ?? 0;
          const pct = hydrated ? Math.round((done / craft.steps.length) * 100) : 0;
          const label = pct === 100 ? "Completed" : pct > 0 ? "In progress" : "Not started";
          return (
            <Link
              key={craft.id}
              to="/crafts/$craftId/learn"
              params={{ craftId: craft.id }}
              className="card-soft pop-in grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-4 p-5"
              style={{ animationDelay: `${i * 70}ms` }}
            >
              <Ring pct={pct} />
              <div className="min-w-0">
                <h3 className="truncate font-display text-lg font-semibold">{craft.name}</h3>
                <p className="text-sm text-muted-foreground">
                  {done}/{craft.steps.length} steps · {label}
                </p>
                <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-muted">
                  <div
                    className={`h-full rounded-full transition-[width] duration-500 ${pct === 100 ? "bg-forest" : "gradient-warm"}`}
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </PageShell>
  );
}
