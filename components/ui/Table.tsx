import { ReactNode } from "react";
export function Table({ children }: { children: ReactNode }) {
  return (
    <div className="overflow-x-auto border border-neutral-800 rounded-md">
      <table className="w-full text-sm text-left">{children}</table>
    </div>
  );
}
export function Th({ children }: { children: ReactNode }) {
  return (
    <th className="px-4 py-3 bg-neutral-900 text-neutral-400 font-medium border-b border-neutral-800 whitespace-nowrap">
      {children}
    </th>
  );
}
export function Td({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <td
      className={`px-4 py-3 text-neutral-300 border-b border-neutral-800 ${className}`}
    >
      {children}
    </td>
  );
}
