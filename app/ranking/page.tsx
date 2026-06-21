import { getCalculationData } from "@/services/calculations";
import Card from "@/components/ui/Card";
import { formatNumber } from "@/utils/format";
import { Crown, Medal, Award } from "lucide-react";

export default async function Ranking() {
  const { results } = await getCalculationData();

  const getRankStyle = (rank: number) => {
    if (rank === 1)
      return "border-accent bg-accent/5 shadow-lg shadow-accent/10";
    if (rank === 2) return "border-amber-500/50 bg-amber-500/5";
    if (rank === 3) return "border-orange-700/50 bg-orange-700/5";
    return "border-neutral-800 bg-primary-light";
  };

  const getRankIcon = (rank: number) => {
    if (rank === 1) return <Crown className="w-8 h-8 text-accent" />;
    if (rank === 2) return <Medal className="w-8 h-8 text-amber-400" />;
    if (rank === 3) return <Award className="w-8 h-8 text-orange-700" />;
    return (
      <div className="w-8 h-8 rounded-full bg-neutral-800 flex items-center justify-center text-neutral-400 text-sm">
        {rank}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl text-neutral-100">Ranking Akhir</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {results.map((r) => (
          <div
            key={r.alternative.id}
            className={`border rounded-md p-5 transition-all ${getRankStyle(r.rank)}`}
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-xs text-neutral-400 mb-1">Rank #{r.rank}</p>
                <h3 className="text-lg text-neutral-100">
                  {r.alternative.name}
                </h3>
                <p className="text-sm text-neutral-400">
                  {r.alternative.brand}
                </p>
              </div>
              {getRankIcon(r.rank)}
            </div>
            <div className="pt-4 border-t border-neutral-800/50">
              <p className="text-xs text-neutral-400">Skor Preferensi</p>
              <p
                className={`text-2xl ${r.rank <= 3 ? "text-accent" : "text-neutral-200"}`}
              >
                {formatNumber(r.score, 4)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
