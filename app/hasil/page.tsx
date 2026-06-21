import { getCalculationData } from "@/services/calculations";
import Card from "@/components/ui/Card";
import { Table, Th, Td } from "@/components/ui/Table";
import { formatNumber } from "@/utils/format";

export default async function Hasil() {
  const { results } = await getCalculationData();
  return (
    <div className="space-y-6">
      <h2 className="text-xl text-neutral-100">Hasil Perhitungan</h2>
      <Card>
        <Table>
          <thead>
            <tr>
              <Th>Rank</Th>
              <Th>Alternatif</Th>
              <Th>Brand</Th>
              <Th>Skor Akhir</Th>
            </tr>
          </thead>
          <tbody>
            {results.map((r) => (
              <tr key={r.alternative.id}>
                <Td>{r.rank}</Td>
                <Td>{r.alternative.name}</Td>
                <Td>{r.alternative.brand}</Td>
                <Td className="text-accent font-medium">
                  {formatNumber(r.score, 4)}
                </Td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card>
    </div>
  );
}
