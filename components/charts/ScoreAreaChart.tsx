"use client";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

function ChartTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: { value: number }[];
  label?: string;
}) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-lg border border-border bg-white/95 px-3 py-2 shadow-pop backdrop-blur">
      <p className="text-xs font-medium text-muted">{label}</p>
      <p className="text-base font-semibold text-accent-dark">
        {Number(payload[0].value).toFixed(4)}
      </p>
    </div>
  );
}

export default function ScoreAreaChart({
  data,
}: {
  data: { name: string; score: number }[];
}) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <AreaChart data={data} margin={{ top: 10, right: 12, left: -8, bottom: 0 }}>
        <defs>
          <linearGradient id="scoreFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#d97f56" stopOpacity={0.45} />
            <stop offset="100%" stopColor="#d97f56" stopOpacity={0.02} />
          </linearGradient>
          <linearGradient id="scoreStroke" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#7f56d9" />
            <stop offset="100%" stopColor="#d97f56" />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="#eceef6" vertical={false} />
        <XAxis
          dataKey="name"
          stroke="#6b7194"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          dy={6}
        />
        <YAxis
          stroke="#6b7194"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          width={44}
        />
        <Tooltip
          content={<ChartTooltip />}
          cursor={{ stroke: "#d97f56", strokeWidth: 1, strokeDasharray: "4 4" }}
        />
        <Area
          type="monotone"
          dataKey="score"
          stroke="url(#scoreStroke)"
          strokeWidth={3}
          fill="url(#scoreFill)"
          dot={{ fill: "#fff", stroke: "#d97f56", strokeWidth: 2, r: 4 }}
          activeDot={{ r: 6, fill: "#d97f56", stroke: "#fff", strokeWidth: 2 }}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
