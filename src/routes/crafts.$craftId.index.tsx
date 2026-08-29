import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { HeartHandshake, MapPin, Sparkles } from "lucide-react";
import { getCraft, statusTone } from "@/data/crafts";
import { PageShell } from "@/components/PageShell";

export const Route = createFileRoute("/crafts/$craftId/")({
  loader: ({ params }) => {
    const craft = getCraft(params.craftId);
    if (!craft) throw notFound();
    return { craft };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Craft not found — LostCraft" }, { name: "robots", content: "noindex" }] };
    }
    const { craft } = loaderData;
    return {
      meta: [
        { title: `${craft.name} — LostCraft` },
        { name: "description", content: craft.tagline },
        { property: "og:title", content: `${craft.name} — LostCraft` },
        { property: "og:description", content: craft.tagline },
      ],
    };
  },
  component: CraftDetail,
});

function CraftDetail() {
  const { craft } = Route.useLoaderData();

  return (
    <PageShell title={craft.name} subtitle={craft.origin} backTo="/crafts">
      <div className="card-soft overflow-hidden">
        <img
          src={craft.image}
          alt={`${craft.name} artwork`}
          width={1024}
          height={768}
          className="h-56 w-full object-cover sm:h-72"
        />
        <div className="p-6">
          <div className="flex flex-wrap items-center gap-3">
            <span
              className={`rounded-full px-3 py-1 text-xs font-bold ${statusTone[craft.status]}`}
            >
              {craft.status}
            </span>
            <span className="inline-flex items-center gap-1 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4" /> {craft.origin}
            </span>
          </div>
          <h2 className="mt-4 font-display text-2xl font-semibold">The story</h2>
          <p className="mt-2 text-[15px] leading-relaxed text-foreground/85">{craft.history}</p>
        </div>
      </div>

      <section className="gradient-leaf mt-5 rounded-3xl p-6 text-forest-foreground shadow-[var(--shadow-soft)]">
        <h2 className="flex items-center gap-2 font-display text-xl font-semibold">
          <HeartHandshake className="h-5 w-5" /> Why this craft matters
        </h2>
        <p className="mt-2 text-[15px] leading-relaxed opacity-95">{craft.whyMatters}</p>
      </section>

      <section className="card-soft mt-5 p-6">
        <h2 className="font-display text-xl font-semibold">Materials & tools</h2>
        <div className="mt-4 flex flex-wrap gap-2">
          {craft.materials.map((m, i) => (
            <span
              key={m}
              className={`rounded-full px-4 py-2 text-sm font-semibold ${
                ["bg-mustard text-mustard-foreground", "bg-coral text-coral-foreground", "bg-forest text-forest-foreground", "bg-secondary text-secondary-foreground"][i % 4]
              }`}
            >
              {m}
            </span>
          ))}
        </div>
      </section>

      <Link
        to="/crafts/$craftId/learn"
        params={{ craftId: craft.id }}
        className="gradient-warm mt-8 flex w-full items-center justify-center gap-3 rounded-3xl px-6 py-6 text-xl font-bold text-primary-foreground shadow-[var(--shadow-lift)] ring-4 ring-primary/25 transition-all hover:-translate-y-1 hover:ring-primary/40 active:scale-[0.97]"
      >
        <Sparkles className="h-6 w-6" /> Start Learning this Craft
      </Link>
      <p className="mt-3 text-center text-xs font-semibold text-muted-foreground">
        4 simple steps · keeps this craft alive 🌱
      </p>
    </PageShell>
  );
}
