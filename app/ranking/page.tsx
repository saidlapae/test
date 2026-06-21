import { getCalculationData } from "@/services/calculations";
import PageHeader from "@/components/ui/PageHeader";
import ProgressBar from "@/components/ui/ProgressBar";
import { formatNumber } from "@/utils/format";
import { Crown, Medal, Award, Trophy } from "lucide-react";

const podium = [
  {
    grad: "gradient-accent",
    Icon: Crown,
    mdOrder: "md:order-2",
    ped: "h-12 md:h-28",
    card: "border-accent/50 shadow-glow-accent md:-translate-y-3",
    scoreCls: "text-gradient-accent",
    label: "Juara 1",
  },
  {
    grad: "gradient-brand",
    Icon: Medal,
    mdOrder: "md:order-1",
    ped: "h-10 md:h-20",
    card: "border-border shadow-card",
    scoreCls: "text-ink",
    label: "Juara 2",
  },
  {
    grad: "bg-gradient-to-br from-orange-400 to-orange-600",
    Icon: Award,
    mdOrder: "md:order-3",
    ped: "h-8 md:h-12",
    card: "border-border shadow-card",
    scoreCls: "text-ink",
    label: "Juara 3",
  },
];

export default async function Ranking() {
  const { results } = await getCalculationData();
  const top3 = results.slice(0, 3);
  const rest = results.slice(3);
  const maxScore = results[0]?.score || 1;

  return (
    <div className="space-y-8">
      <PageHeader
        icon={Trophy}
        eyebrow="Final"
        title="Ranking Akhir"
        subtitle="Peringkat alternatif kopi berdasarkan skor preferensi SAW"
      />

      {top3.length > 0 && (
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3 md:items-end">
          {top3.map((r, i) => {
            const p = podium[i];
            return (
              <div
                key={r.alternative.id}
                className={`animate-rise flex flex-col ${p.mdOrder}`}
                style={{ animationDelay: `${i * 120}ms` }}
              >
                <div
                  className={`relative rounded-xl border bg-surface p-6 text-center transition-transform ${p.card}`}
                >
                  <div
                    className={`mx-auto flex h-16 w-16 items-center justify-center rounded-lg text-white ${p.grad}`}
                  >
                    <p.Icon className="h-8 w-8" />
                  </div>
                  <p className="mt-2 text-[11px] font-medium uppercase text-muted">
                    {p.label}
                  </p>
                  <h3 className="mt-1 text-lg font-semibold font-display text-ink">
                    {r.alternative.name}
                  </h3>
                  <p className="text-sm text-muted">{r.alternative.brand}</p>
                  <p
                    className={`mt-3 text-3xl font-semibold font-display ${p.scoreCls}`}
                  >
                    {formatNumber(r.score, 4)}
                  </p>
                </div>
                <div
                  className={`mx-4 flex items-start justify-center rounded-b-lg pt-2 font-semibold font-display text-white/90 ${p.ped} ${p.grad}`}
                >
                  #{r.rank}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {rest.length > 0 && (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {rest.map((r) => (
            <div
              key={r.alternative.id}
              className="hover-lift rounded-xl border border-border bg-surface p-5 shadow-card"
            >
              <div className="flex items-center justify-between">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-subtle text-sm font-medium text-muted">
                  {r.rank}
                </span>
                <span className="text-xl font-semibold text-ink tabular-nums">
                  {formatNumber(r.score, 4)}
                </span>
              </div>
              <h3 className="mt-3 font-medium font-display text-ink">
                {r.alternative.name}
              </h3>
              <p className="text-xs text-muted">{r.alternative.brand}</p>
              <ProgressBar
                value={r.score}
                max={maxScore}
                gradient="brand"
                className="mt-3"
              />
            </div>
          ))}
        </div>
      )}

      {results.length === 0 && (
        <div className="rounded-xl border border-border bg-surface p-12 text-center shadow-card">
          <Trophy className="mx-auto mb-3 h-10 w-10 text-border" />
          <p className="text-sm font-medium text-ink">Belum ada ranking</p>
          <p className="text-xs text-muted">
            Tambahkan kriteria dan alternatif terlebih dahulu.
          </p>
        </div>
      )}
    </div>
  );
}
