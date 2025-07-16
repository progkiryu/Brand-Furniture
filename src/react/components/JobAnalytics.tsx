import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import type { TypeInfoDash } from "../pages/Dashboard";
import { randomColourGen } from "../Utility";

export default function JobAnalyticsDash(Props: { data: TypeInfoDash[] }) {
  const colours = randomColourGen(Props.data.length);

  return (
    <div
      className="job-analytics"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "1rem",
      }}
    >
      <h3
        style={{
          fontSize: "1rem",
          fontWeight: "600",
          color: "#1e293b",
          margin: 0,
        }}
      >
        Annual Job Type Distribution
      </h3>
      <PieChart width={320} height={320}>
        <Pie
          data={Props.data}
          cx="50%"
          cy="50%"
          outerRadius={110}
          fill="#8884d8"
          dataKey="value"
          label
        >
          {Props.data.map((_, index) => (
            <Cell key={`cell-${index}`} fill={colours[index]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend layout="horizontal" verticalAlign="bottom" />
      </PieChart>
    </div>
  );
}
