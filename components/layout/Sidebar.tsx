"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Sparkles } from "lucide-react";
import { navLinks } from "./navLinks";

export default function Sidebar() {
  const pathname = usePathname();
  return (
    <aside className="glass hidden w-72 flex-shrink-0 flex-col border-r border-border md:flex">
      <nav className="flex-1 overflow-y-auto p-4">
        <p className="mb-2 px-3 text-[11px] font-medium uppercase text-muted">
          Menu
        </p>
        <div className="flex flex-col gap-1">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`group relative flex items-center gap-3 rounded-lg px-3.5 py-3 text-sm font-medium transition-all duration-200 ${
                  active
                    ? "gradient-brand text-white shadow-glow-primary"
                    : "text-ink-soft hover:bg-white/70 hover:text-ink"
                }`}
              >
                <Icon
                  className={`h-5 w-5 transition-transform duration-200 ${
                    active
                      ? "text-white"
                      : "text-muted group-hover:scale-110 group-hover:text-accent"
                  }`}
                />
                <span>{link.label}</span>
                {active && (
                  <span className="ml-auto h-1.5 w-1.5 rounded-full bg-white/90" />
                )}
              </Link>
            );
          })}
        </div>
      </nav>

      <div className="p-4">
        <div className="gradient-mesh-card border-gradient rounded-xl p-4">
          <div className="flex items-center gap-2 text-accent-dark">
            <Sparkles className="h-4 w-4" />
            <span className="text-sm font-semibold font-display">Metode SAW</span>
          </div>
          <p className="mt-1.5 text-xs leading-relaxed text-muted">
            Simple Additive Weighting — normalisasi matriks &amp; pembobotan
            kriteria untuk merangking kopi terbaik.
          </p>
        </div>
      </div>
    </aside>
  );
}
