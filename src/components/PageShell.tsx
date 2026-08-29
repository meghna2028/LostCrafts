import { Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import type { ReactNode } from "react";

export function PageShell({
  title,
  subtitle,
  backTo,
  children,
}: {
  title: string;
  subtitle?: string;
  backTo?: string;
  children: ReactNode;
}) {
  return (
    <div className="motif-bg min-h-screen">
      <div className="page-enter mx-auto w-full max-w-2xl px-5 pb-24 pt-7">
        <header className="mb-7 grid grid-cols-[auto_minmax(0,1fr)] items-center gap-3">
          {backTo ? (
            <Link
              to={backTo}
              aria-label="Go back"
              className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-card shadow-[var(--shadow-soft)] transition-transform hover:-translate-x-0.5 active:scale-95"
            >
              <ArrowLeft className="h-5 w-5 text-primary" />
            </Link>
          ) : (
            <span className="h-11 w-11 shrink-0" />
          )}
          <div className="min-w-0">
            <h1 className="truncate font-display text-2xl font-semibold tracking-tight sm:text-3xl">
              {title}
            </h1>
            {subtitle ? (
              <p className="truncate text-sm text-muted-foreground">{subtitle}</p>
            ) : null}
          </div>
        </header>
        {children}
      </div>
    </div>
  );
}
