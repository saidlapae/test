import { getCriteria } from "@/services/criteria";
import StatCard from "@/components/ui/StatCard";
import Badge from "@/components/ui/Badge";
import ProgressBar from "@/components/ui/ProgressBar";
import PageHeader from "@/components/ui/PageHeader";
import { Table, Th, Td } from "@/components/ui/Table";
import { formatNumber } from "@/utils/format";
import { ListChecks, Scale, TrendingUp, TrendingDown } from "lucide-react";

export default async function Kriteria() {
  const criteria = await getCriteria();
  const totalWeight = criteria.reduce(
    (s, c) => s + (Number(c.weight) || 0),
    0,
  );
  const maxWeight = Math.max(1, ...criteria.map((c) => Number(c.weight) || 0));

  return (
    <div className="space-y-7">
      <PageHeader
        icon={ListChecks}
        eyebrow="Konfigurasi"
        title="Data Kriteria"
        subtitle="Parameter penilaian beserta tipe dan bobotnya"
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:max-w-md">
        <StatCard
          label="Total Kriteria"
          value={criteria.length}
          icon={ListChecks}
          tone="primary"
        />
        <StatCard
          label="Total Bobot"
          value={totalWeight}
          decimals={2}
          icon={Scale}
          tone="accent"
          delay={80}
        />
      </div>

      <Table>
          <thead>
            <tr>
              <Th>No</Th>
              <Th>Nama Kriteria</Th>
              <Th>Tipe</Th>
              <Th className="w-[42%]">Bobot</Th>
            </tr>
          </thead>
          <tbody>
            {criteria.map((c, i) => (
              <tr key={c.id}>
                <Td className="font-medium text-muted">{i + 1}</Td>
                <Td className="font-medium text-ink">{c.name}</Td>
                <Td>
                  <Badge tone={c.type === "benefit" ? "success" : "error"}>
                    {c.type === "benefit" ? (
                      <TrendingUp className="h-3 w-3" />
                    ) : (
                      <TrendingDown className="h-3 w-3" />
                    )}
                    {c.type}
                  </Badge>
                </Td>
                <Td>
                  <div className="flex items-center gap-3">
                    <ProgressBar
                      value={Number(c.weight) || 0}
                      max={maxWeight}
                      className="flex-1"
                    />
                    <span className="w-12 text-right font-medium text-ink">
                      {formatNumber(Number(c.weight) || 0, 2)}
                    </span>
                  </div>
                </Td>
              </tr>
            ))}
            {criteria.length === 0 && (
              <tr>
                <Td className="py-10 text-center text-muted" colSpan={4}>
                  Belum ada kriteria.
                </Td>
              </tr>
            )}
          </tbody>
        </Table>
    </div>
  );
}
