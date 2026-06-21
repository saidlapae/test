import Link from "next/link";
import { getCalculationData } from "@/services/calculations";
import Card from "@/components/ui/Card";
import StatCard from "@/components/ui/StatCard";
import AnimatedNumber from "@/components/ui/AnimatedNumber";
import ScoreAreaChart from "@/components/charts/ScoreAreaChart";
import WeightDonut, { DONUT_COLORS } from "@/components/charts/WeightDonut";
import { formatNumber } from "@/utils/format";
import {
  Package,
  ListChecks,
  Trophy,
  TrendingUp,
  Sparkles,
  ArrowRight,
  Crown,
  Medal,
  Award,
} from "lucide-react";

const rankIcon = [Crown, Medal, Award];
const rankColor = ["text-accent", "text-amber-500", "text-orange-500"];

export default async function Dashboard() {
  const { criteria, alternatives, results } = await getCalculationData();
  const top = results[0];
  const chartData = results
    .slice(0, 6)
    .map((r) => ({ name: r.alternative.name.split(" ")[0], score: r.score }));
  const weightData = criteria.map((c) => ({
    name: c.name,
    value: Number(c.weight),
  }));
  const top3 = results.slice(0, 3);
  const maxScore = top?.score || 1;

  return (
    <div className="space-y-6">
      {/* ── Hero ───────────────────────────────────────────── */}
      <section className="gradient-brand relative overflow-hidden rounded-xl p-7 text-white shadow-premium sm:p-9">
        <div className="animate-glow pointer-events-none absolute -right-12 -top-12 h-52 w-52 rounded-full bg-accent/50 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-20 left-1/4 h-52 w-52 rounded-full bg-white/10 blur-3xl" />
        <div className="relative flex flex-col gap-7 md:flex-row md:items-center md:justify-between">
          <div className="max-w-xl">
            <span className="inline-flex items-center gap-2 rounded-md bg-white/15 px-3 py-1 text-xs font-medium backdrop-blur">
              <Sparkles className="h-3.5 w-3.5" /> Rekomendasi Teratas
            </span>
            <h2 className="mt-4 text-3xl font-semibold font-display leading-tight md:text-4xl">
              {top?.alternative.name ?? "Belum ada data"}
            </h2>
            <p className="mt-1.5 text-white/70">
              {top
                ? `${top.alternative.brand} · Pilihan terbaik berdasarkan metode SAW`
                : "Tambahkan kriteria & alternatif untuk memulai perhitungan."}
            </p>
            <Link
              href="/ranking"
              className="mt-6 inline-flex items-center gap-2 rounded-lg bg-white px-4 py-2.5 text-sm font-medium text-primary-dark shadow-pop transition-all hover:-translate-y-0.5 hover:shadow-lg"
            >
              Lihat Ranking Lengkap
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="flex flex-col items-center rounded-xl bg-white/10 px-8 py-6 backdrop-blur-md ring-1 ring-white/20">
            <p className="text-[11px] font-medium uppercase text-white/60">
              Skor Preferensi
            </p>
            <AnimatedNumber
              value={top?.score ?? 0}
              decimals={4}
              className="mt-1 text-5xl font-semibold font-display"
            />
            <div className="mt-3 inline-flex items-center gap-1.5 rounded-md bg-accent/30 px-3 py-1 text-xs font-medium">
              <Crown className="h-3.5 w-3.5" /> Peringkat #1
            </div>
          </div>
        </div>
      </section>

      {/* ── Stat grid ──────────────────────────────────────── */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          label="Total Alternatif"
          value={alternatives.length}
          icon={Package}
          tone="primary"
          delay={0}
        />
        <StatCard
          label="Total Kriteria"
          value={criteria.length}
          icon={ListChecks}
          tone="accent"
          delay={80}
        />
        <StatCard
          label="Kopi Terbaik"
          value={top?.alternative.name ?? "-"}
          icon={Trophy}
          tone="info"
          delay={160}
        />
        <StatCard
          label="Skor Tertinggi"
          value={top?.score ?? 0}
          decimals={4}
          icon={TrendingUp}
          tone="success"
          delay={240}
        />
      </div>

      {/* ── Charts ─────────────────────────────────────────── */}
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <h3 className="text-base font-semibold font-display text-ink">
                Perbandingan Skor
              </h3>
              <p className="text-xs text-muted">
                Top alternatif berdasarkan skor SAW
              </p>
            </div>
            <span className="rounded-md bg-accent/10 px-2.5 py-1 text-xs font-medium text-accent-dark">
              SAW
            </span>
          </div>
          <ScoreAreaChart data={chartData} />
        </Card>

        <Card>
          <h3 className="text-base font-semibold font-display text-ink">
            Bobot Kriteria
          </h3>
          <p className="text-xs text-muted">Distribusi bobot tiap kriteria</p>
          <div className="relative mt-2">
            <WeightDonut data={weightData} />
            <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-2xl font-semibold font-display text-ink">
                {criteria.length}
              </span>
              <span className="text-[11px] text-muted">Kriteria</span>
            </div>
          </div>
          <div className="mt-4 space-y-2">
            {weightData.map((w, i) => (
              <div
                key={w.name}
                className="flex items-center justify-between text-xs"
              >
                <span className="flex items-center gap-2 text-ink-soft">
                  <span
                    className="h-2.5 w-2.5 rounded-full"
                    style={{
                      backgroundColor: DONUT_COLORS[i % DONUT_COLORS.length],
                    }}
                  />
                  {w.name}
                </span>
                <span className="font-medium text-ink">{w.value}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* ── Top 3 preview ──────────────────────────────────── */}
      <Card>
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-base font-semibold font-display text-ink">
            Podium Sementara
          </h3>
          <Link
            href="/hasil"
            className="inline-flex items-center gap-1 text-xs font-medium text-accent-dark transition-colors hover:text-accent"
          >
            Semua hasil <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
        <div className="space-y-2.5">
          {top3.map((r, i) => {
            const Icon = rankIcon[i];
            return (
              <div
                key={r.alternative.id}
                className="flex items-center gap-4 rounded-lg border border-border-soft bg-surface-2/50 p-3 transition-colors hover:bg-subtle"
              >
                <Icon className={`h-6 w-6 flex-shrink-0 ${rankColor[i]}`} />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-ink">
                    {r.alternative.name}
                  </p>
                  <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-subtle">
                    <div
                      className="gradient-accent h-full rounded-full"
                      style={{ width: `${(r.score / maxScore) * 100}%` }}
                    />
                  </div>
                </div>
                <span className="flex-shrink-0 text-sm font-semibold text-accent-dark">
                  {formatNumber(r.score, 4)}
                </span>
              </div>
            );
          })}
          {top3.length === 0 && (
            <p className="py-6 text-center text-sm text-muted">
              Belum ada data untuk ditampilkan.
            </p>
          )}
        </div>
      </Card>
    </div>
  );
}
