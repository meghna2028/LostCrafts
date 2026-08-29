import { Link } from "@tanstack/react-router";
import { ChevronRight } from "lucide-react";
import { statusTone, type Craft } from "@/data/crafts";

export function CraftCard({ craft, index = 0 }: { craft: Craft; index?: number }) {
  return (
    <Link
      to="/crafts/$craftId"
      params={{ craftId: craft.id }}
      className="card-soft pop-in block overflow-hidden transition-transform hover:-translate-y-1 hover:shadow-[var(--shadow-lift)]"
      style={{ animationDelay: `${index * 70}ms` }}
    >
      <div className="relative">
        <img
          src={craft.image}
          alt={`${craft.name} from ${craft.origin}`}
          loading="lazy"
          width={1024}
          height={768}
          className="h-44 w-full object-cover sm:h-52"
        />
        <div className="absolute left-4 top-4 flex flex-wrap gap-2">
          <span
            className={`rounded-full px-3 py-1 text-xs font-bold tracking-wide shadow-[var(--shadow-soft)] ${statusTone[craft.status]}`}
          >
            {craft.status}
          </span>
          <span
            className={`rounded-full px-3 py-1 text-xs font-bold tracking-wide shadow-[var(--shadow-soft)] ${
              craft.status === "Endangered" || craft.status === "Critically Rare"
                ? "bg-coral text-coral-foreground"
                : "bg-card text-foreground"
            }`}
          >
            {craft.status === "Endangered" || craft.status === "Critically Rare"
              ? "🚨 Endangered"
              : "🏺 Traditional"}
          </span>
        </div>
      </div>
      <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 p-5">
        <div className="min-w-0">
          <h3 className="font-display text-2xl font-semibold">{craft.name}</h3>
          <p className="text-xs font-semibold uppercase tracking-wider text-primary">
            {craft.origin}
          </p>
          <p className="mt-1.5 text-sm leading-snug text-muted-foreground">{craft.tagline}</p>
        </div>
        <span className="gradient-warm grid h-11 w-11 shrink-0 place-items-center rounded-full shadow-[var(--shadow-soft)]">
          <ChevronRight className="h-5 w-5 text-primary-foreground" />
        </span>
      </div>
    </Link>
  );
}
