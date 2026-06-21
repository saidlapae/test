export default function ProgressBar({
  value,
  max = 1,
  gradient = "accent",
  className = "",
}: {
  value: number;
  max?: number;
  gradient?: "accent" | "brand";
  className?: string;
}) {
  const pct = Math.max(0, Math.min(100, (value / (max || 1)) * 100));
  const fill = gradient === "brand" ? "gradient-brand" : "gradient-accent";
  return (
    <div
      className={`h-2 w-full overflow-hidden rounded-full bg-subtle ${className}`}
    >
      <div
        className={`h-full rounded-full ${fill} transition-[width] duration-700 ease-out`}
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}
