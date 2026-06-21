import { getCriteria } from "@/services/criteria";
import Card from "@/components/ui/Card";
import { Table, Th, Td } from "@/components/ui/Table";

export default async function Kriteria() {
  const criteria = await getCriteria();
  return (
    <div className="space-y-6">
      <h2 className="text-xl text-neutral-100">Data Kriteria</h2>
      <Card>
        <Table>
          <thead>
            <tr>
              <Th>No</Th>
              <Th>Nama Kriteria</Th>
              <Th>Tipe</Th>
              <Th>Bobot</Th>
            </tr>
          </thead>
          <tbody>
            {criteria.map((c, i) => (
              <tr key={c.id}>
                <Td>{i + 1}</Td>
                <Td>{c.name}</Td>
                <Td>
                  <span
                    className={`px-2 py-1 rounded-md text-xs ${c.type === "benefit" ? "bg-green-900/30 text-green-400" : "bg-red-900/30 text-red-400"}`}
                  >
                    {c.type}
                  </span>
                </Td>
                <Td>{c.weight}</Td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card>
    </div>
  );
}
