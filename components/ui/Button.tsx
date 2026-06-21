import { ButtonHTMLAttributes } from "react";
export default function Button({
  children,
  variant = "primary",
  className = "",
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "danger";
}) {
  const styles = {
    primary:
      "gradient-accent text-white shadow-glow-accent hover:brightness-105 hover:-translate-y-0.5 active:translate-y-0",
    secondary:
      "bg-white text-ink-soft border border-border hover:bg-subtle hover:border-primary/30 hover:-translate-y-0.5 active:translate-y-0",
    danger:
      "bg-error text-white hover:bg-error/90 hover:-translate-y-0.5 active:translate-y-0",
  };
  return (
    <button
      className={`inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/40 focus-visible:ring-offset-2 focus-visible:ring-offset-white disabled:pointer-events-none disabled:opacity-50 ${styles[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
