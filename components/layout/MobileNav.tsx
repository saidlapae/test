"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Coffee, Sparkles } from "lucide-react";
import { navLinks } from "./navLinks";

export default function MobileNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // Close whenever the route changes.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Lock body scroll + close on Escape while open.
  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        aria-label="Buka menu"
        className="flex h-10 w-10 items-center justify-center rounded-lg text-ink-soft transition-colors hover:bg-subtle md:hidden"
      >
        <Menu className="h-5 w-5" />
      </button>

      {open && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div
            className="absolute inset-0 bg-ink/40 backdrop-blur-sm animate-fade-in"
            onClick={() => setOpen(false)}
          />
          <aside className="absolute left-0 top-0 flex h-full w-72 max-w-[82vw] flex-col border-r border-border bg-surface shadow-premium animate-[slide-in-left_0.3s_cubic-bezier(0.22,1,0.36,1)]">
            <div className="flex h-16 items-center justify-between border-b border-border px-4">
              <div className="flex items-center gap-2.5">
                <div className="gradient-accent flex h-9 w-9 items-center justify-center rounded-lg text-white shadow-glow-accent">
                  <Coffee className="h-5 w-5" />
                </div>
                <span className="text-sm font-semibold font-display text-gradient">
                  SPK Kopi Terbaik
                </span>
              </div>
              <button
                onClick={() => setOpen(false)}
                aria-label="Tutup menu"
                className="flex h-9 w-9 items-center justify-center rounded-lg text-muted transition-colors hover:bg-subtle hover:text-ink"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

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
                      onClick={() => setOpen(false)}
                      className={`group flex items-center gap-3 rounded-lg px-3.5 py-3 text-sm font-medium transition-all ${
                        active
                          ? "gradient-brand text-white shadow-glow-primary"
                          : "text-ink-soft hover:bg-subtle hover:text-ink"
                      }`}
                    >
                      <Icon
                        className={`h-5 w-5 ${
                          active ? "text-white" : "text-muted group-hover:text-accent"
                        }`}
                      />
                      <span>{link.label}</span>
                    </Link>
                  );
                })}
              </div>
            </nav>

            <div className="p-4">
              <div className="gradient-mesh-card border-gradient rounded-xl p-4">
                <div className="flex items-center gap-2 text-accent-dark">
                  <Sparkles className="h-4 w-4" />
                  <span className="text-sm font-semibold font-display">
                    Metode SAW
                  </span>
                </div>
                <p className="mt-1.5 text-xs leading-relaxed text-muted">
                  Simple Additive Weighting untuk merangking kopi terbaik.
                </p>
              </div>
            </div>
          </aside>
        </div>
      )}
    </>
  );
}
