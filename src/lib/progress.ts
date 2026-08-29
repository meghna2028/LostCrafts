import { useCallback, useEffect, useState } from "react";

export type ProgressMap = Record<string, number[]>;

const KEY = "lostcraft.progress.v1";

function read(): ProgressMap {
  if (typeof window === "undefined") return {};
  try {
    const raw = window.localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as ProgressMap) : {};
  } catch {
    return {};
  }
}

const listeners = new Set<(p: ProgressMap) => void>();

function write(next: ProgressMap) {
  try {
    window.localStorage.setItem(KEY, JSON.stringify(next));
  } catch {
    /* ignore */
  }
  listeners.forEach((l) => l(next));
}

export function useProgress() {
  const [progress, setProgress] = useState<ProgressMap>({});
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setProgress(read());
    setHydrated(true);
    const listener = (p: ProgressMap) => setProgress(p);
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  }, []);

  const toggleStep = useCallback((craftId: string, step: number) => {
    const current = read();
    const done = new Set(current[craftId] ?? []);
    if (done.has(step)) done.delete(step);
    else done.add(step);
    write({ ...current, [craftId]: [...done].sort((a, b) => a - b) });
  }, []);

  const resetCraft = useCallback((craftId: string) => {
    const current = read();
    write({ ...current, [craftId]: [] });
  }, []);

  return { progress, hydrated, toggleStep, resetCraft };
}
