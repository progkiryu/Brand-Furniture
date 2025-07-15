import React from "react";
import { PieChart, Pie, Cell, Tooltip } from "recharts";
import type { TypeInfo } from "../pages/Analytics";
import { randomColourGen } from "../Utility";

type Props = {
  data: TypeInfo[];
};

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
};

const OrderTypeDistributionChart: React.FC<Props> = ({ data }) => {
  const colours = randomColourGen(data.length);

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <PieChart width={600} height={300}>
        <Pie data={data} dataKey="value" label>
          {data.map((_, index) => (
            <Cell key={`cell-${index}`} fill={colours[index]} />
          ))}
        </Pie>
        <Tooltip content={<CustomTooltip />} />
      </PieChart>
    </div>
  );
};

export default OrderTypeDistributionChart;
