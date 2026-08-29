import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Check, PartyPopper, RotateCcw } from "lucide-react";
import { getCraft } from "@/data/crafts";
import { PageShell } from "@/components/PageShell";
import { Confetti } from "@/components/Confetti";
import { useProgress } from "@/lib/progress";

export const Route = createFileRoute("/crafts/$craftId/learn")({
  loader: ({ params }) => {
    const craft = getCraft(params.craftId);
    if (!craft) throw notFound();
    return { craft };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Lesson not found — LostCraft" }, { name: "robots", content: "noindex" }] };
    }
    const { craft } = loaderData;
    return {
      meta: [
        { title: `Learn ${craft.name} — LostCraft` },
        { name: "description", content: `Four simple steps to understand how ${craft.name} is made.` },
        { property: "og:title", content: `Learn ${craft.name} — LostCraft` },
        {
          property: "og:description",
          content: `Four simple steps to understand how ${craft.name} is made.`,
        },
      ],
    };
  },
  component: LearnCraft,
});

const stepColors = [
  "gradient-warm text-primary-foreground",
  "gradient-sun text-mustard-foreground",
  "gradient-leaf text-forest-foreground",
  "bg-indigo-craft text-primary-foreground",
];

function LearnCraft() {
  const { craft } = Route.useLoaderData();
  const { progress, hydrated, toggleStep, resetCraft } = useProgress();

  const done = progress[craft.id] ?? [];
  const total = craft.steps.length;
  const pct = Math.round((done.length / total) * 100);
  const complete = done.length === total;

  return (
    <PageShell
      title={`Learn ${craft.name}`}
      subtitle={`${done.length} of ${total} steps done`}
      backTo="/crafts"
    >
      <div className="sticky top-3 z-10 rounded-full bg-card/95 p-2 shadow-[var(--shadow-soft)] backdrop-blur">
        <div className="h-3 w-full overflow-hidden rounded-full bg-muted">
          <div
            className="gradient-warm h-full rounded-full transition-[width] duration-500 ease-out"
            style={{ width: `${hydrated ? pct : 0}%` }}
          />
        </div>
      </div>

      <div className="mt-6 space-y-4">
        {craft.steps.map((step, i) => {
          const isDone = done.includes(i);
          return (
            <article
              key={step.title}
              className={`card-soft pop-in p-5 ${isDone ? "ring-2 ring-forest/50" : ""}`}
              style={{ animationDelay: `${i * 70}ms` }}
            >
              <div className="grid grid-cols-[auto_minmax(0,1fr)] items-start gap-4">
                <span
                  className={`grid h-12 w-12 shrink-0 place-items-center rounded-2xl font-display text-xl font-bold ${stepColors[i % 4]}`}
                >
                  {isDone ? <Check className="h-6 w-6" /> : i + 1}
                </span>
                <div className="min-w-0">
                  <h3 className="font-display text-lg font-semibold">{step.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                    {step.description}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => toggleStep(craft.id, i)}
                className={`mt-4 w-full rounded-2xl px-5 py-4 text-base font-bold transition-transform active:scale-[0.97] ${
                  isDone
                    ? "bg-forest text-forest-foreground"
                    : "bg-secondary text-secondary-foreground hover:bg-accent"
                }`}
              >
                {isDone ? "Done ✓ — tap to undo" : "Mark as Done"}
              </button>
            </article>
          );
        })}
      </div>

      {complete ? (
        <div className="card-soft relative mt-6 overflow-hidden p-8 text-center">
          <Confetti />
          <PartyPopper className="mx-auto h-10 w-10 text-primary" />
          <h2 className="mt-3 font-display text-2xl font-semibold">Shabaash! 🎉</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            You've walked through every step of {craft.name}. One more craft carried forward.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Link
              to="/crafts"
              className="gradient-warm rounded-2xl px-6 py-4 text-base font-bold text-primary-foreground active:scale-95"
            >
              Learn another craft
            </Link>
            <button
              type="button"
              onClick={() => resetCraft(craft.id)}
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-secondary px-6 py-4 text-base font-bold text-secondary-foreground active:scale-95"
            >
              <RotateCcw className="h-4 w-4" /> Start over
            </button>
          </div>
        </div>
      ) : null}
    </PageShell>
  );
}
