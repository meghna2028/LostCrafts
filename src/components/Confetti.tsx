const colors = [
  "var(--primary)",
  "var(--mustard)",
  "var(--coral)",
  "var(--forest)",
  "var(--indigo-craft)",
];

export function Confetti() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {Array.from({ length: 24 }).map((_, i) => (
        <span
          key={i}
          className="confetti-piece"
          style={{
            left: `${(i * 4.1 + 3) % 100}%`,
            background: colors[i % colors.length],
            animationDelay: `${(i % 8) * 0.32}s`,
            animationDuration: `${2.2 + (i % 5) * 0.35}s`,
          }}
        />
      ))}
    </div>
  );
}
