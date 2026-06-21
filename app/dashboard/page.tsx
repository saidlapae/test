import { getCalculationData } from "@/services/calculations";
import Card from "@/components/ui/Card";
import LineChartWidget from "@/components/charts/LineChartWidget";
import { Package, ListChecks, Trophy, TrendingUp } from "lucide-react";

export default async function Dashboard() {
  const { criteria, alternatives, results } = await getCalculationData();
  const topCoffee = results[0];
  const chartData = results
    .slice(0, 5)
    .map((r) => ({ name: r.alternative.name.split(" ")[0], score: r.score }));

  return (
    <div className="space-y-6">
      <h2 className="text-xl text-neutral-100">Dashboard Ringkasan</h2>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          {
            label: "Total Alternatif",
            val: alternatives.length,
            icon: Package,
          },
          { label: "Total Kriteria", val: criteria.length, icon: ListChecks },
          {
            label: "Kopi Terbaik",
            val: topCoffee?.alternative.name || "-",
            icon: Trophy,
          },
          {
            label: "Skor Tertinggi",
            val: topCoffee?.score || 0,
            icon: TrendingUp,
          },
        ].map((s, i) => (
          <Card key={i} className="flex items-center gap-4">
            <div className="p-3 bg-accent/10 rounded-md">
              <s.icon className="w-6 h-6 text-accent" />
            </div>
            <div>
              <p className="text-xs text-neutral-400">{s.label}</p>
              <p className="text-lg text-neutral-100">{s.val}</p>
            </div>
          </Card>
        ))}
      </div>
      <Card>
        <h3 className="text-base text-neutral-200 mb-4">Top 5 Skor Kopi</h3>
        <LineChartWidget data={chartData} />
      </Card>
    </div>
  );
}
