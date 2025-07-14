import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

const pieData = [
  { name: "Commercial", value: 23 },
  { name: "Resident.", value: 19 },
  { name: "Private", value: 27 },
  { name: "Production", value: 15 },
  { name: "Brand", value: 15 },
];

const COLORS = ["#4B9EFF", "#82ca9d", "#FF7979", "#FFCC66", "#91A6FF"];

export default function JobAnalytics() {
  return (
    <div className="job-analytics" style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "1rem" }}>
      <h3 style={{ fontSize: "1rem", fontWeight: "600", color: "#1e293b", margin: 0 }}>
        Annual Job Type Distribution
      </h3>
      <PieChart width={320} height={320}>
        <Pie
          data={pieData}
          cx="50%"
          cy="50%"
          outerRadius={110}
          fill="#8884d8"
          dataKey="value"
          label
        >
          {pieData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend layout="horizontal" verticalAlign="bottom" />
      </PieChart>
    </div>
  );
}

