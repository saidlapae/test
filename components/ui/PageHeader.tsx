import { ReactNode } from "react";

type IconType = React.ComponentType<{ className?: string }>;

export default function PageHeader({
  title,
  subtitle,
  eyebrow,
  icon: Icon,
  action,
}: {
  title: string;
  subtitle?: string;
  eyebrow?: string;
  icon?: IconType;
  action?: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-4">
        {Icon && (
          <div className="gradient-brand flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg text-white shadow-glow-primary">
            <Icon className="h-6 w-6" />
          </div>
        )}
        <div>
          {eyebrow && (
            <p className="mb-1 text-xs font-medium uppercase text-accent-dark">
              {eyebrow}
            </p>
          )}
          <h2 className="text-2xl font-semibold font-display text-ink sm:text-3xl">
            {title}
          </h2>
          {subtitle && (
            <p className="mt-1 text-sm text-muted">{subtitle}</p>
          )}
        </div>
      </div>
      {action && <div className="flex-shrink-0">{action}</div>}
    </div>
  );
}
