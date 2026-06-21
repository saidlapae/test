import { ReactNode, ThHTMLAttributes, TdHTMLAttributes } from "react";
export function Table({ children }: { children: ReactNode }) {
  return (
    <div className="overflow-x-auto rounded-xl border border-border bg-surface shadow-card">
      <table className="w-full border-collapse text-left text-sm [&_tbody_tr:last-child_td]:border-0 [&_tbody_tr]:transition-colors [&_tbody_tr:hover]:bg-subtle/60">
        {children}
      </table>
    </div>
  );
}
export function Th({
  children,
  className = "",
  ...props
}: ThHTMLAttributes<HTMLTableCellElement>) {
  return (
    <th
      className={`whitespace-nowrap border-b border-border bg-surface-2/70 px-4 py-3.5 text-xs font-medium text-muted ${className}`}
      {...props}
    >
      {children}
    </th>
  );
}
export function Td({
  children,
  className = "",
  ...props
}: TdHTMLAttributes<HTMLTableCellElement>) {
  return (
    <td
      className={`border-b border-border-soft px-4 py-3.5 text-ink-soft ${className}`}
      {...props}
    >
      {children}
    </td>
  );
}
