import { ButtonHTMLAttributes, ReactNode } from "react";
export default function Button({
  children,
  variant = "primary",
  className = "",
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "danger";
}) {
  const styles = {
    primary: "bg-accent hover:bg-accent-dark text-white",
    secondary: "bg-neutral-800 hover:bg-neutral-700 text-neutral-200",
    danger: "bg-red-600 hover:bg-red-700 text-white",
  };
  return (
    <button
      className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${styles[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
