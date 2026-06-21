import { ReactNode } from "react";
export default function Card({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`bg-primary-light border border-neutral-800 rounded-md p-5 ${className}`}
    >
      {children}
    </div>
  );
}
