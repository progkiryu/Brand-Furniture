import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import type { TypeInfo } from "../pages/Analytics";

interface BarChartComponentProps {
  data: TypeInfo[];
}

export default function BarChartComponent({ data }: BarChartComponentProps) {
  return (
    <div style={{ width: "100%", height: "300px" }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{ top: 5, right: 30, bottom: 5, left: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Bar dataKey="value" fill="#1B263B" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
