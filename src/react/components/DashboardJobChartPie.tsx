import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import type { TypeInfoDash } from "../pages/Dashboard";
import { randomColourGen } from "../Utility";

export default function JobAnalyticsDash(Props: { data: TypeInfoDash[] }) {
  const colours = randomColourGen(Props.data.length);

  return (
    <div className="job-analytics">
      <h3>Job-Type Distribution Of Current Financial Year</h3>

      <PieChart width={320} height={350}>
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
