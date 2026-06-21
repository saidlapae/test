import {
  LayoutDashboard,
  ListChecks,
  Package,
  Calculator,
  BarChart3,
  Trophy,
} from "lucide-react";

export const navLinks = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/kriteria", label: "Data Kriteria", icon: ListChecks },
  { href: "/alternatif", label: "Data Alternatif", icon: Package },
  { href: "/perhitungan", label: "Detail Perhitungan", icon: Calculator },
  { href: "/hasil", label: "Hasil", icon: BarChart3 },
  { href: "/ranking", label: "Ranking", icon: Trophy },
];
