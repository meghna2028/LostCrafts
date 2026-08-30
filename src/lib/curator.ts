import { useCallback, useEffect, useState } from "react";
import { crafts } from "@/data/crafts";

export type ContentStatus = "Draft" | "Under Review" | "Published";
export type ConsentStatus = "Given" | "Pending" | "Not Required";

export type VersionEntry = { at: string; note: string };

export type CraftAdmin = {
  status: ContentStatus;
  consent: ConsentStatus;
  views: number;
  starts: number;
  completions: number;
  lastUpdated: string;
  versions: VersionEntry[];
};

export type CuratorCraft = {
  id: string;
  name: string;
  description: string;
};

export type CuratorState = {
  admin: Record<string, CraftAdmin>;
  custom: CuratorCraft[];
};

const KEY = "lostcraft.curator.v1";

export const contentStatuses: ContentStatus[] = ["Draft", "Under Review", "Published"];
export const consentStatuses: ConsentStatus[] = ["Given", "Pending", "Not Required"];

export const statusChip: Record<ContentStatus, string> = {
  Draft: "bg-muted text-muted-foreground",
  "Under Review": "bg-mustard text-mustard-foreground",
  Published: "bg-forest text-forest-foreground",
};

export const consentChip: Record<ConsentStatus, string> = {
  Given: "bg-forest text-forest-foreground",
  Pending: "bg-coral text-coral-foreground",
  "Not Required": "bg-secondary text-secondary-foreground",
};

const seedNumbers = [
  { views: 1240, starts: 486, completions: 231 },
  { views: 890, starts: 302, completions: 118 },
  { views: 1075, starts: 415, completions: 190 },
  { views: 1580, starts: 610, completions: 344 },
];

function defaults(): CuratorState {
  const admin: Record<string, CraftAdmin> = {};
  crafts.forEach((c, i) => {
    const n = seedNumbers[i % seedNumbers.length]!;
    admin[c.id] = {
      status: i === 0 ? "Published" : i === 1 ? "Under Review" : i === 2 ? "Published" : "Draft",
      consent: i === 3 ? "Pending" : i === 2 ? "Not Required" : "Given",
      views: n.views,
      starts: n.starts,
      completions: n.completions,
      lastUpdated: "2026-08-30",
      versions: [
        { at: "2026-08-30", note: "Materials section updated" },
        { at: "2026-08-12", note: "History rewritten with artisan interview" },
        { at: "2026-07-28", note: "Craft record created" },
      ],
    };
  });
  return { admin, custom: [] };
}

function read(): CuratorState {
  const base = defaults();
  if (typeof window === "undefined") return base;
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return base;
    const parsed = JSON.parse(raw) as Partial<CuratorState>;
    return {
      admin: { ...base.admin, ...(parsed.admin ?? {}) },
      custom: parsed.custom ?? [],
    };
  } catch {
    return base;
  }
}

const listeners = new Set<(s: CuratorState) => void>();

function write(next: CuratorState) {
  try {
    window.localStorage.setItem(KEY, JSON.stringify(next));
  } catch {
    /* ignore */
  }
  listeners.forEach((l) => l(next));
}

export const today = () => new Date().toISOString().slice(0, 10);

export const formatDate = (iso: string) =>
  new Date(`${iso}T00:00:00`).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

function blankAdmin(): CraftAdmin {
  return {
    status: "Draft",
    consent: "Pending",
    views: 0,
    starts: 0,
    completions: 0,
    lastUpdated: today(),
    versions: [{ at: today(), note: "Craft record created" }],
  };
}

export function useCurator() {
  const [state, setState] = useState<CuratorState>(() => defaults());
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setState(read());
    setHydrated(true);
    const l = (s: CuratorState) => setState(s);
    listeners.add(l);
    return () => {
      listeners.delete(l);
    };
  }, []);

  const patch = useCallback((id: string, changes: Partial<CraftAdmin>, note: string) => {
    const current = read();
    const prev = current.admin[id] ?? blankAdmin();
    const next: CraftAdmin = {
      ...prev,
      ...changes,
      lastUpdated: today(),
      versions: [{ at: today(), note }, ...prev.versions].slice(0, 12),
    };
    write({ ...current, admin: { ...current.admin, [id]: next } });
  }, []);

  const setStatus = useCallback(
    (id: string, status: ContentStatus) => patch(id, { status }, `Status changed to ${status}`),
    [patch],
  );

  const setConsent = useCallback(
    (id: string, consent: ConsentStatus) =>
      patch(id, { consent }, `Artisan consent marked ${consent}`),
    [patch],
  );

  const addCrafts = useCallback(
    (rows: { name: string; description: string; status: ContentStatus }[]) => {
      const current = read();
      const admin = { ...current.admin };
      const custom = [...current.custom];
      rows.forEach((row, i) => {
        const id = `custom-${Date.now()}-${i}`;
        custom.unshift({ id, name: row.name, description: row.description });
        admin[id] = { ...blankAdmin(), status: row.status };
      });
      write({ admin, custom });
    },
    [],
  );

  const getAdmin = useCallback(
    (id: string) => state.admin[id] ?? blankAdmin(),
    [state],
  );

  return { state, hydrated, getAdmin, setStatus, setConsent, addCrafts };
}
