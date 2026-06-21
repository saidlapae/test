import { getCalculationData } from "@/services/calculations";
import PageHeader from "@/components/ui/PageHeader";
import { Table, Th, Td } from "@/components/ui/Table";
import { formatNumber } from "@/utils/format";
import { Calculator } from "lucide-react";

function StepHeader({
  n,
  title,
  desc,
}: {
  n: number;
  title: string;
  desc: string;
}) {
  return (
    <div className="flex items-center gap-3">
      <div className="gradient-brand flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg font-semibold font-display text-white shadow-glow-primary">
        {n}
      </div>
      <div>
        <h3 className="text-base font-semibold font-display text-ink">{title}</h3>
        <p className="text-xs text-muted">{desc}</p>
      </div>
    </div>
  );
}

export default async function Perhitungan() {
  const { criteria, alternatives, results } = await getCalculationData();

  // Normalization Matrix (guards against divide-by-zero and string values)
  const normMatrix = alternatives.map((alt) => {
    const row: Record<string, number> = {};
    criteria.forEach((c) => {
      const val = Number(alt.values[c.id]) || 0;
      const colVals = alternatives.map((a) => Number(a.values[c.id]) || 0);
      if (c.type === "benefit") {
        const max = Math.max(...colVals);
        row[c.id] = max > 0 ? val / max : 0;
      } else {
        const min = Math.min(...colVals);
        row[c.id] = val > 0 ? min / val : 0;
      }
    });
    return { alt, row };
  });

  return (
    <div className="space-y-7">
      <PageHeader
        icon={Calculator}
        eyebrow="Proses"
        title="Detail Perhitungan SAW"
        subtitle="Langkah demi langkah metode Simple Additive Weighting"
      />

      {/* Step 1 */}
      <section className="space-y-4">
        <StepHeader
          n={1}
          title="Matriks Keputusan (X)"
          desc="Nilai mentah setiap alternatif untuk tiap kriteria"
        />
        <Table>
          <thead>
            <tr>
              <Th>Alternatif</Th>
              {criteria.map((c) => (
                <Th key={c.id}>{c.name}</Th>
              ))}
            </tr>
          </thead>
          <tbody>
            {alternatives.map((a) => (
              <tr key={a.id}>
                <Td className="font-medium text-ink">{a.name}</Td>
                {criteria.map((c) => (
                  <Td key={c.id} className="tabular-nums">
                    {a.values[c.id] ?? "-"}
                  </Td>
                ))}
              </tr>
            ))}
          </tbody>
        </Table>
      </section>

      {/* Step 2 */}
      <section className="space-y-4">
        <StepHeader
          n={2}
          title="Normalisasi Matriks (R)"
          desc="Mengubah nilai mentah menjadi skala 0–1"
        />
        <div className="rounded-lg border border-primary/15 bg-primary/5 px-4 py-3 text-sm text-ink-soft">
          <span className="font-semibold text-primary-dark">Benefit:</span> r
          <sub>ij</sub> = x<sub>ij</sub> / max(x<sub>i</sub>)
          <span className="mx-3 text-border">|</span>
          <span className="font-semibold text-primary-dark">Cost:</span> r
          <sub>ij</sub> = min(x<sub>i</sub>) / x<sub>ij</sub>
        </div>
        <Table>
          <thead>
            <tr>
              <Th>Alternatif</Th>
              {criteria.map((c) => (
                <Th key={c.id}>{c.name}</Th>
              ))}
            </tr>
          </thead>
          <tbody>
            {normMatrix.map(({ alt, row }) => (
              <tr key={alt.id}>
                <Td className="font-medium text-ink">{alt.name}</Td>
                {criteria.map((c) => (
                  <Td key={c.id} className="tabular-nums">
                    {formatNumber(row[c.id], 4)}
                  </Td>
                ))}
              </tr>
            ))}
          </tbody>
        </Table>
      </section>

      {/* Step 3 */}
      <section className="space-y-4">
        <StepHeader
          n={3}
          title="Perhitungan Preferensi (V)"
          desc="Menjumlahkan hasil kali bobot dengan nilai ternormalisasi"
        />
        <div className="rounded-lg border border-accent/20 bg-accent/5 px-4 py-3 text-sm text-ink-soft">
          <span className="font-semibold text-accent-dark">V</span>
          <sub>i</sub> = Σ ( w<sub>j</sub> × r<sub>ij</sub> )
        </div>
        <Table>
          <thead>
            <tr>
              <Th>Alternatif</Th>
              <Th>Perhitungan</Th>
              <Th className="text-right">Skor (V)</Th>
            </tr>
          </thead>
          <tbody>
            {results.map((r) => (
              <tr key={r.alternative.id}>
                <Td className="font-medium text-ink">{r.alternative.name}</Td>
                <Td className="text-xs text-muted">
                  {criteria.map((c, i) => (
                    <span key={c.id}>
                      ({formatNumber(c.weight)} ×{" "}
                      {formatNumber(
                        normMatrix.find((n) => n.alt.id === r.alternative.id)!
                          .row[c.id],
                        4,
                      )}
                      ){i < criteria.length - 1 && " + "}
                    </span>
                  ))}
                </Td>
                <Td className="text-right">
                  <span className="inline-flex rounded-md bg-accent/10 px-2.5 py-1 font-semibold text-accent-dark tabular-nums">
                    {formatNumber(r.score, 4)}
                  </span>
                </Td>
              </tr>
            ))}
          </tbody>
        </Table>
      </section>
    </div>
  );
}
