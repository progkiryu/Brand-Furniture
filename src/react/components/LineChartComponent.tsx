import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";

interface LineChartComponentProps {
  title: string;
  dateRange: string;
}

// dummy data generator
const generateData = (range: string) => {
  const length = range === "lastweek" ? 7 : range === "lastmonth" ? 30 : 180;
  return Array.from({ length }, (_, i) => ({
    name: i + 1,
    value: Math.floor(Math.random() * 100),
  }));
};

export default function LineChartComponent({ title, dateRange }: LineChartComponentProps) {
  const data = generateData(dateRange);
  console.log("Line chart data:", data);

  return (
    <div style={{ marginBottom: "40px" }}>
      <h4>{title}</h4>
      <LineChart
        width={600}
        height={200}
        data={data}
        margin={{ top: 5, right: 30, bottom: 5, left: 0 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="value" stroke="#3366CC" dot={true} />
      </LineChart>
    </div>
  );
}