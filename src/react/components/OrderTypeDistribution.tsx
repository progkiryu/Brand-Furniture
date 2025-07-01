import React from "react";
'use client';
import { PieChart, Pie, Cell, Legend, Tooltip } from "recharts";

const data = [
  { name: "Private", value: 27 },
  { name: "Brand", value: 15 },
  { name: "Residential", value: 19 },
  { name: "Production", value: 15 },
  { name: "Commercial", value: 23 },
];

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

const OrderTypeDistributionChart = () => {
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
  )
};

export default OrderTypeDistributionChart;