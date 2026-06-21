"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  ListChecks,
  Package,
  Calculator,
  BarChart3,
  Trophy,
} from "lucide-react";

const links = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/kriteria", label: "Data Kriteria", icon: ListChecks },
  { href: "/alternatif", label: "Data Alternatif", icon: Package },
  { href: "/perhitungan", label: "Detail Perhitungan", icon: Calculator },
  { href: "/hasil", label: "Hasil", icon: BarChart3 },
  { href: "/ranking", label: "Ranking", icon: Trophy },
];

export default function Sidebar() {
  const pathname = usePathname();
  return (
    <aside className="w-64 flex-shrink-0 bg-primary border-r border-neutral-800 p-4 flex flex-col gap-2">
      {links.map((link) => {
        const Icon = link.icon;
        const active = pathname === link.href;
        return (
          <Link
            key={link.href}
            href={link.href}
            className={`flex items-center gap-3 px-4 py-3 rounded-md transition-colors ${active ? "bg-accent/10 text-accent border border-accent/20" : "text-neutral-400 hover:bg-neutral-800 hover:text-neutral-200 border border-transparent"}`}
          >
            <Icon className="w-5 h-5" />
            <span className="text-sm">{link.label}</span>
          </Link>
        );
      })}
    </aside>
  );
}
