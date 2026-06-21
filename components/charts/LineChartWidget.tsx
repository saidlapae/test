"use client";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
export default function LineChartWidget({ data }: { data: any[] }) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart
        data={data}
        margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="#262626" />
        <XAxis dataKey="name" stroke="#737373" fontSize={12} />
        <YAxis stroke="#737373" fontSize={12} />
        <Tooltip
          contentStyle={{
            backgroundColor: "#171717",
            border: "1px solid #404040",
            borderRadius: "6px",
          }}
        />
        <Line
          type="monotone"
          dataKey="score"
          stroke="#ea580c"
          strokeWidth={2}
          dot={{ fill: "#ea580c", r: 4 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
