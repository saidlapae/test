"use client";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

const COLORS = [
  "#7f56d9",
  "#d97f56",
  "#2b6bb3",
  "#5eb623",
  "#ce9117",
  "#9e77ed",
  "#e59b79",
  "#6ca5fb",
];

function DonutTooltip({
  active,
  payload,
}: {
  active?: boolean;
  payload?: { name: string; value: number }[];
}) {
  if (!active || !payload?.length) return null;
  const { name, value } = payload[0];
  return (
    <div className="rounded-lg border border-border bg-white/95 px-3 py-2 shadow-pop backdrop-blur">
      <p className="text-xs font-medium text-ink">{name}</p>
      <p className="text-sm font-semibold text-primary-dark">{value}</p>
    </div>
  );
}

export default function WeightDonut({
  data,
}: {
  data: { name: string; value: number }[];
}) {
  return (
    <ResponsiveContainer width="100%" height={240}>
      <PieChart>
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          innerRadius={62}
          outerRadius={94}
          paddingAngle={3}
          cornerRadius={6}
          stroke="none"
        >
          {data.map((_, i) => (
            <Cell key={i} fill={COLORS[i % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip content={<DonutTooltip />} />
      </PieChart>
    </ResponsiveContainer>
  );
}

export { COLORS as DONUT_COLORS };
