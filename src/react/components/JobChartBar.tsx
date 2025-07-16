import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";
import type { TypeInfo } from "../pages/Analytics";

interface BarChartComponentProps {
  data: TypeInfo[];
}

export default function BarChartComponent({ data }: BarChartComponentProps) {
  return (
    <div style={{ marginBottom: "40px" }}>
      <BarChart
        width={600}
        height={200}
        data={data}
        margin={{ top: 5, right: 30, bottom: 5, left: 0 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="value" fill="#1B263B" />
      </BarChart>
    </div>
  );
}
