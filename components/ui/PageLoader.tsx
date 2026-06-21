import { Coffee } from "lucide-react";

export default function PageLoader({
  label = "Menyiapkan data",
}: {
  label?: string;
}) {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center gap-8">
      <div className="relative flex h-28 w-28 items-center justify-center">
        {/* expanding pulse rings */}
        <span className="absolute h-16 w-16 rounded-full border border-accent/40 animate-[ping-slow_2.2s_ease-out_infinite]" />
        <span className="absolute h-16 w-16 rounded-full border border-primary/40 animate-[ping-slow_2.2s_ease-out_infinite] [animation-delay:0.7s]" />

        {/* rotating gradient ring */}
        <div
          className="absolute inset-0 animate-spin rounded-full [animation-duration:1.5s]"
          style={{
            background:
              "conic-gradient(from 90deg, transparent 0deg, #d97f56 120deg, #7f56d9 300deg, transparent 360deg)",
            WebkitMask:
              "radial-gradient(farthest-side, transparent calc(100% - 4px), #000 calc(100% - 4px))",
            mask: "radial-gradient(farthest-side, transparent calc(100% - 4px), #000 calc(100% - 4px))",
          }}
        />

        {/* logo */}
        <div className="gradient-accent relative flex h-16 w-16 items-center justify-center rounded-xl text-white shadow-glow-accent">
          <Coffee className="h-8 w-8" />
        </div>
      </div>

      <div className="flex flex-col items-center gap-3">
        <p className="text-lg font-semibold font-display text-gradient">
          {label}
        </p>
        <div className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-accent animate-[loader-bounce_1.2s_ease-in-out_infinite]" />
          <span className="h-2 w-2 rounded-full bg-primary animate-[loader-bounce_1.2s_ease-in-out_infinite] [animation-delay:0.15s]" />
          <span className="h-2 w-2 rounded-full bg-accent animate-[loader-bounce_1.2s_ease-in-out_infinite] [animation-delay:0.3s]" />
        </div>
      </div>
    </div>
  );
}
