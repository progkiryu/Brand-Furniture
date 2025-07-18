import React from "react";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import type { TypeInfo } from "../pages/Analytics";
import { randomColourGen } from "../Utility";

type Props = {
  data: TypeInfo[];
};

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip" style={{
        backgroundColor: '#fff',
        padding: '0.5rem',
        border: '1px solid #ccc',
        borderRadius: '8px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        fontSize: '0.9rem'
      }}>
        <p className="label" style ={{ margin: 0, color: '#0D1B2A'}}>
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
    <div style={{ width: '100%', height: 'calc(100% - 70px)', minHeight: '250px' }}>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie data={data} dataKey="value" label>
            {data.map((_, index) => (
              <Cell key={`cell-${index}`} fill={colours[index % colours.length]} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <Legend layout="horizontal" verticalAlign="bottom" align="center" />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default OrderTypeDistributionChart;
