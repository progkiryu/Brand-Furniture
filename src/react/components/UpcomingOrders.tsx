import React from "react";

const UpcomingOrders: React.FC = () => {
  const orders = [
    { id: "#876", client: "Koskela", job: 1, due: "07/06/2025", label: "Production"},
    { id: "#875", client: "EcoVanta", job: 2, due: "12/06/2025", label: "Private"},
    { id: "#874", client: "SyntraIQ", job: 2, due: "14/06/2025", label: "Residential" },
    { id: "#873", client: "LushNest", job: 1, due: "21/06/2025", label: "Commercial" },
  ];

  return (
    <div className="upcoming-orders">
      <table className="orders-table">
        <thead>
          <tr>
            <th>Job ID</th>
            <th>CLIENT</th>
            <th>JOB NO</th>
            <th>DUE</th>
            <th>LABEL</th>
          </tr>
        </thead>
     <tbody>
  {Array.from({ length: 30 }).map((_, idx) => {
    const order = orders[idx % orders.length]; // reuse existing 4 orders repeatedly
    return (
   <tr key={idx} className={`order-row-${order.label.toLowerCase()}`}>
        <td>{order.id}</td>
        <td>{order.client}</td>
        <td>{order.job}</td>
        <td>{order.due}</td>
        <td>{order.label}</td>
      </tr>
    );
  })}
</tbody>
      </table>
    </div>
  );
};

export default UpcomingOrders;
