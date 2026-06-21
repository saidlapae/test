import { ReactNode } from "react";

type Tone =
  | "success"
  | "error"
  | "warning"
  | "info"
  | "accent"
  | "primary"
  | "neutral";

const tones: Record<Tone, string> = {
  success: "bg-success/10 text-success ring-success/20",
  error: "bg-error/10 text-error ring-error/20",
  warning: "bg-warning/10 text-warning ring-warning/20",
  info: "bg-info/10 text-info ring-info/20",
  accent: "bg-accent/10 text-accent-dark ring-accent/20",
  primary: "bg-primary/10 text-primary-dark ring-primary/20",
  neutral: "bg-subtle text-muted ring-border",
};

export default function Badge({
  children,
  tone = "neutral",
  className = "",
}: {
  children: ReactNode;
  tone?: Tone;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-md px-2.5 py-1 text-xs font-medium ring-1 ring-inset ${tones[tone]} ${className}`}
    >
      {children}
    </span>
  );
}
