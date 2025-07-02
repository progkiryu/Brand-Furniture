import React from "react";
'use client';
import { PieChart, Pie, Cell, Legend, Tooltip } from "recharts";

interface Props {
  dateRange: string;
}

// dummy data generator based on date range
const generateData = (range: string) => {
  switch (range) {
    case "lastweek":
      return [
        { name: "Private", value: 7 },
        { name: "Brand", value: 4 },
        { name: "Residential", value: 5 },
        { name: "Production", value: 3 },
        { name: "Commercial", value: 6 },
      ];
    case "last6months":
      return [
        { name: "Private", value: 80 },
        { name: "Brand", value: 40 },
        { name: "Residential", value: 60 },
        { name: "Production", value: 35 },
        { name: "Commercial", value: 70 },
      ];
    case "lastmonth":
    default:
      return [
        { name: "Private", value: 27 },
        { name: "Brand", value: 15 },
        { name: "Residential", value: 19 },
        { name: "Production", value: 15 },
        { name: "Commercial", value: 23 },
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
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLOURS[index]} />
          ))}
        </Pie>
        <Tooltip content={<CustomTooltip/>}/>
      </PieChart>
    </div>
  );
};

export default OrderTypeDistributionChart;