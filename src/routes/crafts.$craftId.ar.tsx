import { useEffect, useRef, useState } from "react";
import { createFileRoute, Link, notFound, useNavigate } from "@tanstack/react-router";
import { Camera, ScanEye, X } from "lucide-react";
import { getCraft } from "@/data/crafts";

export const Route = createFileRoute("/crafts/$craftId/ar")({
  loader: ({ params }) => {
    const craft = getCraft(params.craftId);
    if (!craft) throw notFound();
    return { craft };
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: loaderData ? `View ${loaderData.craft.name} in Your Space — LostCraft` : "AR View — LostCraft" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: ArView,
});

function ArView() {
  const { craft } = Route.useLoaderData();
  const navigate = useNavigate();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [cameraOn, setCameraOn] = useState(false);
  const [flash, setFlash] = useState(false);
  const [captured, setCaptured] = useState(false);

  useEffect(() => {
    let stream: MediaStream | null = null;
    let cancelled = false;
    navigator.mediaDevices
      ?.getUserMedia({ video: { facingMode: "environment" } })
      .then((s) => {
        if (cancelled) {
          s.getTracks().forEach((t) => t.stop());
          return;
        }
        stream = s;
        if (videoRef.current) {
          videoRef.current.srcObject = s;
          setCameraOn(true);
        }
      })
      .catch(() => setCameraOn(false));
    return () => {
      cancelled = true;
      stream?.getTracks().forEach((t) => t.stop());
    };
  }, []);

  const capture = () => {
    setFlash(true);
    setCaptured(true);
    setTimeout(() => setFlash(false), 350);
  };

  return (
    <main className="relative flex min-h-screen flex-col overflow-hidden bg-foreground">
      {/* Camera or simulated background */}
      {cameraOn ? (
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          className="absolute inset-0 h-full w-full object-cover"
        />
      ) : (
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(160deg, oklch(0.4 0.06 50), oklch(0.3 0.05 70) 45%, oklch(0.36 0.06 90)), url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='72' height='72' viewBox='0 0 72 72'%3E%3Cg fill='none' stroke='%23FFF8F0' stroke-opacity='0.1' stroke-width='1.2'%3E%3Cpath d='M36 8c8 9 8 15 0 22-8-7-8-13 0-22zM36 64c-8-9-8-15 0-22 8 7 8 13 0 22zM8 36c9-8 15-8 22 0-7 8-13 8-22 0zM64 36c-9 8-15 8-22 0 7-8 13-8 22 0z'/%3E%3C/g%3E%3C/svg%3E\")",
          }}
        />
      )}

      {/* AR grid overlay */}
      <div className="pointer-events-none absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,248,240,0.35) 1px, transparent 1px), linear-gradient(90deg, rgba(255,248,240,0.35) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      {/* Capture flash */}
      {flash && <div className="pointer-events-none absolute inset-0 z-30 bg-cream" />}

      {/* Top instructions */}
      <div className="relative z-10 flex flex-col items-center gap-2 px-5 pt-8">
        <span className="inline-flex items-center gap-2 rounded-full bg-foreground/50 px-4 py-2 text-sm font-bold text-cream backdrop-blur-md">
          <ScanEye className="h-4 w-4 text-mustard" />
          Point your camera at a flat surface
        </span>
        <span className="rounded-full bg-foreground/35 px-3 py-1 text-xs font-semibold text-cream/90 backdrop-blur-md">
          {craft.name} · AR preview
        </span>
      </div>

      {/* Craft overlay */}
      <div className="relative z-10 flex flex-1 items-center justify-center px-8">
        <img
          src={craft.image}
          alt={`${craft.name} placed in your space`}
          className="w-full max-w-sm rounded-3xl opacity-85 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.65)] ring-4 ring-cream/40"
          style={{ animation: "pop-in 0.6s cubic-bezier(0.22,1,0.36,1) both" }}
        />
      </div>

      {/* Bottom controls */}
      <div className="relative z-10 flex items-center justify-center gap-4 px-5 pb-10">
        <button
          type="button"
          onClick={capture}
          className="gradient-warm inline-flex items-center gap-2 rounded-full px-8 py-4 text-lg font-bold text-primary-foreground shadow-[var(--shadow-lift)] transition-transform hover:-translate-y-0.5 active:scale-95"
        >
          <Camera className="h-5 w-5" /> Capture
        </button>
        <button
          type="button"
          onClick={() => navigate({ to: "/crafts/$craftId", params: { craftId: craft.id } })}
          className="inline-flex items-center gap-2 rounded-full bg-card px-8 py-4 text-lg font-bold text-foreground shadow-[var(--shadow-lift)] transition-transform hover:-translate-y-0.5 active:scale-95"
        >
          <X className="h-5 w-5" /> Close
        </button>
      </div>

      {captured && (
        <div className="absolute inset-x-5 bottom-28 z-20 rounded-3xl bg-card p-4 text-center shadow-[var(--shadow-lift)]">
          <p className="font-display text-lg font-semibold">📸 Captured!</p>
          <p className="text-sm text-muted-foreground">
            Imagine {craft.name} right there in your space — beautiful, isn't it?
          </p>
          <button
            type="button"
            onClick={() => setCaptured(false)}
            className="mt-3 rounded-full bg-secondary px-5 py-2 text-sm font-bold text-secondary-foreground active:scale-95"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Fallback link if navigation API blocked */}
      <Link
        to="/crafts/$craftId"
        params={{ craftId: craft.id }}
        className="sr-only"
        aria-hidden
        tabIndex={-1}
      >
        Back to craft
      </Link>
    </main>
  );
}
