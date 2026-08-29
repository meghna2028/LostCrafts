import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ImagePlus, Plus, X } from "lucide-react";
import { crafts, statusTone } from "@/data/crafts";
import { PageShell } from "@/components/PageShell";
import { toast } from "sonner";

export const Route = createFileRoute("/curator")({
  head: () => ({
    meta: [
      { title: "Curator View — LostCraft" },
      {
        name: "description",
        content: "Review the archived Rajasthani crafts and document a new one.",
      },
      { property: "og:title", content: "Curator View — LostCraft" },
      {
        property: "og:description",
        content: "Review the archived Rajasthani crafts and document a new one.",
      },
    ],
  }),
  component: Curator,
});

type Draft = { id: string; name: string; description: string };

function Curator() {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [drafts, setDrafts] = useState<Draft[]>([]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    setDrafts((d) => [{ id: `${Date.now()}`, name: name.trim(), description: description.trim() }, ...d]);
    toast.success(`${name.trim()} added to the archive draft`);
    setName("");
    setDescription("");
    setOpen(false);
  };

  return (
    <PageShell title="Curator View" subtitle="Rajasthan archive · 4 crafts" backTo="/">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="gradient-leaf flex w-full items-center justify-center gap-2 rounded-3xl px-6 py-5 text-lg font-bold text-forest-foreground shadow-[var(--shadow-lift)] transition-transform hover:-translate-y-1 active:scale-[0.97]"
      >
        {open ? <X className="h-5 w-5" /> : <Plus className="h-5 w-5" />}
        {open ? "Close form" : "Add New Craft"}
      </button>

      {open ? (
        <form onSubmit={submit} className="card-soft pop-in mt-5 space-y-5 p-6">
          <div className="grid h-36 place-items-center rounded-2xl border-2 border-dashed border-border bg-muted/60 text-muted-foreground">
            <div className="text-center">
              <ImagePlus className="mx-auto h-7 w-7" />
              <p className="mt-2 text-sm font-semibold">Image placeholder</p>
            </div>
          </div>
          <div>
            <label htmlFor="craft-name" className="text-sm font-bold">
              Craft name
            </label>
            <input
              id="craft-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Thewa Art"
              className="mt-2 w-full rounded-2xl border border-input bg-background px-4 py-4 text-base outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
          <div>
            <label htmlFor="craft-desc" className="text-sm font-bold">
              Short description
            </label>
            <textarea
              id="craft-desc"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              placeholder="One line about what makes this craft special."
              className="mt-2 w-full rounded-2xl border border-input bg-background px-4 py-4 text-base outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
          <button
            type="submit"
            className="gradient-warm w-full rounded-2xl px-6 py-4 text-base font-bold text-primary-foreground active:scale-[0.97]"
          >
            Save craft
          </button>
        </form>
      ) : null}

      <h2 className="mt-8 font-display text-xl font-semibold">Archived crafts</h2>
      <div className="mt-4 space-y-4">
        {drafts.map((d) => (
          <div key={d.id} className="card-soft pop-in grid grid-cols-[auto_minmax(0,1fr)] gap-4 p-5">
            <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-muted text-muted-foreground">
              <ImagePlus className="h-6 w-6" />
            </span>
            <div className="min-w-0">
              <h3 className="truncate font-display text-lg font-semibold">{d.name}</h3>
              <p className="text-sm text-muted-foreground">
                {d.description || "No description yet"}
              </p>
              <span className="mt-2 inline-flex rounded-full bg-mustard px-3 py-1 text-xs font-bold text-mustard-foreground">
                Draft
              </span>
            </div>
          </div>
        ))}

        {crafts.map((craft, i) => (
          <div
            key={craft.id}
            className="card-soft pop-in grid grid-cols-[auto_minmax(0,1fr)] gap-4 p-5"
            style={{ animationDelay: `${i * 60}ms` }}
          >
            <img
              src={craft.image}
              alt={craft.name}
              loading="lazy"
              width={1024}
              height={768}
              className="h-14 w-14 shrink-0 rounded-2xl object-cover"
            />
            <div className="min-w-0">
              <h3 className="truncate font-display text-lg font-semibold">{craft.name}</h3>
              <p className="truncate text-sm text-muted-foreground">{craft.origin}</p>
              <span
                className={`mt-2 inline-flex rounded-full px-3 py-1 text-xs font-bold ${statusTone[craft.status]}`}
              >
                {craft.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </PageShell>
  );
}
