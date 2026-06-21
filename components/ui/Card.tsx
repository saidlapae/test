import { ReactNode } from "react";
export default function Card({
  children,
  className = "",
  hover = false,
}: {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}) {
  return (
    <div
      className={`rounded-xl border border-border bg-surface p-6 shadow-card ${
        hover ? "hover-lift" : ""
      } ${className}`}
    >
      {children}
    </div>
  );
}
