import { getCalculationData } from "@/services/calculations";
import PageHeader from "@/components/ui/PageHeader";
import Badge from "@/components/ui/Badge";
import { Table, Th, Td } from "@/components/ui/Table";
import { formatNumber } from "@/utils/format";
import { BarChart3, Crown, Medal, Award } from "lucide-react";

const medals = [
  { Icon: Crown, color: "text-accent" },
  { Icon: Medal, color: "text-amber-500" },
  { Icon: Award, color: "text-orange-500" },
];

export default async function Hasil() {
  const { results } = await getCalculationData();
  const maxScore = results[0]?.score || 1;

  return (
    <div className="space-y-7">
      <PageHeader
        icon={BarChart3}
        eyebrow="Output"
        title="Hasil Perhitungan"
        subtitle="Skor akhir dan peringkat seluruh alternatif"
      />

      <Table>
        <thead>
          <tr>
            <Th>Rank</Th>
            <Th>Alternatif</Th>
            <Th>Brand</Th>
            <Th className="w-[34%]">Skor Akhir</Th>
          </tr>
        </thead>
        <tbody>
          {results.map((r) => {
            const m = medals[r.rank - 1];
            return (
              <tr
                key={r.alternative.id}
                className={r.rank === 1 ? "bg-accent/[0.04]" : ""}
              >
                <Td>
                  {m ? (
                    <m.Icon className={`h-6 w-6 ${m.color}`} />
                  ) : (
                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-subtle text-xs font-medium text-muted">
                      {r.rank}
                    </span>
                  )}
                </Td>
                <Td className="font-medium text-ink">{r.alternative.name}</Td>
                <Td>
                  <Badge tone="neutral">{r.alternative.brand}</Badge>
                </Td>
                <Td>
                  <div className="flex items-center gap-3">
                    <div className="h-2 flex-1 overflow-hidden rounded-full bg-subtle">
                      <div
                        className={`h-full rounded-full ${
                          r.rank === 1 ? "gradient-accent" : "bg-primary/60"
                        }`}
                        style={{ width: `${(r.score / maxScore) * 100}%` }}
                      />
                    </div>
                    <span className="w-16 text-right font-semibold text-accent-dark tabular-nums">
                      {formatNumber(r.score, 4)}
                    </span>
                  </div>
                </Td>
              </tr>
            );
          })}
          {results.length === 0 && (
            <tr>
              <Td colSpan={4} className="py-12 text-center text-muted">
                Belum ada hasil untuk ditampilkan.
              </Td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  );
}
