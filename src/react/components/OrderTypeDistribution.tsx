import React from "react";
'use client';
import { PieChart, Pie, Cell, Tooltip } from "recharts";

interface Props {
  dateRange: string;
}

// dummy data generator based on date range
const generateData = (range: string) => {
  switch (range) {
    case "last6months":
      return [
        { name: "Production", value: 80 },
        { name: "Recovers", value: 40 },
        { name: "Residential", value: 60 },
        { name: "Brand", value: 35 },
        { name: "Commercial", value: 70 },
      ];
    case "last12months":
      return [
        { name: "Production", value: 160 },
        { name: "Recovers", value: 90 },
        { name: "Residential", value: 110 },
        { name: "Brand", value: 60 },
        { name: "Commercial", value: 130 },
      ];
    case "last2years":
      return [
        { name: "Production", value: 320 },
        { name: "Recovers", value: 180 },
        { name: "Residential", value: 220 },
        { name: "Brand", value: 120 },
        { name: "Commercial", value: 260 },
      ];
    case "lastmonth":
    default:
      return [
        { name: "Production", value: 7 },
        { name: "Recovers", value: 4 },
        { name: "Residential", value: 5 },
        { name: "Brand", value: 3 },
        { name: "Commercial", value: 6 },
      ];
  }
};

const COLOURS = ["#FF7F7F", "#FFCC66", "#99CC66", "#66CCFF", "#CCCCCC"];

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip">
        <p className="label">
          {payload[0].name}: {payload[0].value} orders
        </p>
      </div>
    );
  }
  return null;
}

const OrderTypeDistributionChart: React.FC<Props> = ({ dateRange }) => {
    const data = generateData(dateRange);

    return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <PieChart width={600} height={300}>
        <Pie data={data} dataKey='value' label>
          {data.map((_, index) => (
            <Cell key={`cell-${index}`} fill={COLOURS[index]} />
          ))}
        </Pie>
        <Tooltip content={<CustomTooltip/>}/>
      </PieChart>
    </div>
  );
};

export default OrderTypeDistributionChart;