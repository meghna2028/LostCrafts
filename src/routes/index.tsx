import { createFileRoute, Link } from "@tanstack/react-router";
import { Sparkles, GraduationCap, Palette } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "LostCraft — Document. Learn. Revive." },
      {
        name: "description",
        content:
          "Explore and learn four disappearing traditional crafts of Rajasthan through simple, step-by-step lessons.",
      },
      { property: "og:title", content: "LostCraft — Document. Learn. Revive." },
      {
        property: "og:description",
        content:
          "Explore and learn four disappearing traditional crafts of Rajasthan through simple, step-by-step lessons.",
      },
    ],
  }),
  component: Splash,
});

function Splash() {
  return (
    <main className="motif-bg flex min-h-screen items-center justify-center px-5 py-12">
      <div className="page-enter w-full max-w-md text-center">
        <span className="inline-flex items-center gap-2 rounded-full bg-card px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-primary shadow-[var(--shadow-soft)]">
          <Sparkles className="h-4 w-4" /> Crafts of Rajasthan
        </span>

        <h1 className="mt-8 font-display text-6xl font-semibold leading-none tracking-tight text-primary sm:text-7xl">
          Lost<span className="text-forest">Craft</span>
        </h1>
        <p className="mt-4 font-display text-xl italic text-foreground/80">
          Document. Learn. Revive.
        </p>
        <p className="mt-2 text-sm font-semibold tracking-wide text-forest">
          Preserving India's disappearing crafts, one step at a time
        </p>
        <p className="mx-auto mt-3 max-w-xs text-sm leading-relaxed text-muted-foreground">
          Four vanishing crafts. Real makers' techniques. Learn one step at a time.
        </p>

        <div className="mt-10 space-y-4">
          <Link
            to="/home"
            className="gradient-warm flex w-full items-center justify-center gap-3 rounded-3xl px-6 py-5 text-lg font-bold text-primary-foreground shadow-[var(--shadow-lift)] transition-transform hover:-translate-y-1 active:scale-[0.97]"
          >
            <GraduationCap className="h-6 w-6" /> I am a Learner
          </Link>
          <Link
            to="/curator"
            className="gradient-leaf flex w-full items-center justify-center gap-3 rounded-3xl px-6 py-5 text-lg font-bold text-forest-foreground shadow-[var(--shadow-lift)] transition-transform hover:-translate-y-1 active:scale-[0.97]"
          >
            <Palette className="h-6 w-6" /> I am a Curator
          </Link>
        </div>

        <p className="mt-8 text-xs text-muted-foreground">
          A community archive prototype · Rajasthan edition
        </p>
      </div>
    </main>
  );
}
