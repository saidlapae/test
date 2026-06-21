import { ReactNode } from "react";
import AnimatedNumber from "./AnimatedNumber";

type IconType = React.ComponentType<{ className?: string }>;
type Tone = "primary" | "accent" | "info" | "success";

const tones: Record<Tone, { chip: string; glow: string; blob: string }> = {
  primary: {
    chip: "gradient-brand",
    glow: "shadow-glow-primary",
    blob: "bg-primary",
  },
  accent: {
    chip: "gradient-accent",
    glow: "shadow-glow-accent",
    blob: "bg-accent",
  },
  info: { chip: "bg-info", glow: "", blob: "bg-info" },
  success: { chip: "bg-success", glow: "", blob: "bg-success" },
};

export default function StatCard({
  label,
  value,
  icon: Icon,
  decimals = 0,
  tone = "primary",
  hint,
  delay = 0,
}: {
  label: string;
  value: number | string;
  icon: IconType;
  decimals?: number;
  tone?: Tone;
  hint?: ReactNode;
  delay?: number;
}) {
  const t = tones[tone];
  return (
    <div
      className="hover-lift group relative animate-fade-in-up overflow-hidden rounded-xl border border-border bg-surface p-5 shadow-card"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div
        className={`pointer-events-none absolute -right-8 -top-8 h-28 w-28 rounded-full opacity-10 blur-2xl transition-opacity duration-300 group-hover:opacity-20 ${t.blob}`}
      />
      <div className="flex items-start justify-between">
        <div
          className={`flex h-12 w-12 items-center justify-center rounded-lg text-white ${t.chip} ${t.glow}`}
        >
          <Icon className="h-6 w-6" />
        </div>
        {hint}
      </div>
      <p className="mt-4 text-xs font-medium text-muted">
        {label}
      </p>
      <p className="mt-1 truncate text-3xl font-semibold font-display text-ink">
        {typeof value === "number" ? (
          <AnimatedNumber value={value} decimals={decimals} />
        ) : (
          value
        )}
      </p>
    </div>
  );
}
