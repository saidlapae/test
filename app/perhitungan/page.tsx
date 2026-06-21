import { getCalculationData } from "@/services/calculations";
import Card from "@/components/ui/Card";
import { Table, Th, Td } from "@/components/ui/Table";
import { formatNumber } from "@/utils/format";

export default async function Perhitungan() {
  const { criteria, alternatives, results } = await getCalculationData();

  // Normalization Matrix
  const normMatrix = alternatives.map((alt) => {
    const row: Record<string, number> = {};
    criteria.forEach((c) => {
      const val = alt.values[c.id] || 0;
      const maxMin = Math[c.type === "benefit" ? "max" : "min"](
        ...alternatives.map((a) => a.values[c.id] || 0),
      );
      row[c.id] = c.type === "benefit" ? val / maxMin : maxMin / val;
    });
    return { alt, row };
  });

  return (
    <div className="space-y-6">
      <h2 className="text-xl text-neutral-100">Detail Perhitungan (SAW)</h2>

      <Card>
        <h3 className="text-base text-neutral-200 mb-4">
          1. Matriks Keputusan (X)
        </h3>
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
                <Td>{a.name}</Td>
                {criteria.map((c) => (
                  <Td key={c.id}>{a.values[c.id]}</Td>
                ))}
              </tr>
            ))}
          </tbody>
        </Table>
      </Card>

      <Card>
        <h3 className="text-base text-neutral-200 mb-4">
          2. Normalisasi Matriks (R)
        </h3>
        <p className="text-xs text-neutral-400 mb-3">
          Benefit: r<sub>ij</sub> = x<sub>ij</sub> / max(x<sub>i</sub>) | Cost:
          r<sub>ij</sub> = min(x<sub>i</sub>) / x<sub>ij</sub>
        </p>
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
                <Td>{alt.name}</Td>
                {criteria.map((c) => (
                  <Td key={c.id}>{formatNumber(row[c.id], 4)}</Td>
                ))}
              </tr>
            ))}
          </tbody>
        </Table>
      </Card>

      <Card>
        <h3 className="text-base text-neutral-200 mb-4">
          3. Perhitungan Preferensi (V)
        </h3>
        <p className="text-xs text-neutral-400 mb-3">
          V<sub>i</sub> = Σ (w<sub>j</sub> × r<sub>ij</sub>)
        </p>
        <Table>
          <thead>
            <tr>
              <Th>Alternatif</Th>
              <Th>Perhitungan</Th>
              <Th>Skor (V)</Th>
            </tr>
          </thead>
          <tbody>
            {results.map((r) => (
              <tr key={r.alternative.id}>
                <Td>{r.alternative.name}</Td>
                <Td className="text-xs">
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
                <Td className="text-accent">{formatNumber(r.score, 4)}</Td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card>
    </div>
  );
}
