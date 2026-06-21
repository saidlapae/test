import { Coffee } from "lucide-react";
import Badge from "@/components/ui/Badge";
import MobileNav from "@/components/layout/MobileNav";

export default function Header() {
  return (
    <header className="glass-strong relative flex h-16 flex-shrink-0 items-center gap-2 px-4 sm:px-6">
      <div className="gradient-accent absolute inset-x-0 top-0 h-0.5" />
      <MobileNav />
      <div className="flex min-w-0 items-center gap-3">
        <div className="gradient-accent flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg text-white shadow-glow-accent">
          <Coffee className="h-5 w-5" />
        </div>
        <div className="min-w-0 leading-tight">
          <p className="truncate text-[11px] font-medium uppercase text-muted">
            SPK · Decision Support
          </p>
          <h1 className="truncate text-sm font-semibold font-display text-gradient sm:text-base">
            Pemilihan Saset Kopi Terbaik
          </h1>
        </div>
      </div>
      <div className="ml-auto hidden items-center gap-2 sm:flex">
        <Badge tone="primary">Metode SAW</Badge>
      </div>
    </header>
  );
}
