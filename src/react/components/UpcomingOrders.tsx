import React from "react";

const UpcomingOrders: React.FC = () => {
  const orders = [
    { id: "#876", client: "Koskela", job: 1, due: "07/06/2025", label: "Production", color: "bg-red-200" },
    { id: "#875", client: "EcoVanta", job: 2, due: "12/06/2025", label: "Private", color: "bg-green-200" },
    { id: "#874", client: "SyntraIQ", job: 2, due: "14/06/2025", label: "Residential", color: "bg-yellow-200" },
    { id: "#873", client: "LushNest", job: 1, due: "21/06/2025", label: "Commercial", color: "bg-yellow-100" },
  ];

  return (
    <div className="upcoming-orders">
      <table className="orders-table">
        <thead>
          <tr>
            <th>INV. NO</th>
            <th>CLIENT</th>
            <th>JOB NO</th>
            <th>DUE</th>
            <th>LABEL</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id} className={order.color}>
              <td>{order.id}</td>
              <td>{order.client}</td>
              <td>{order.job}</td>
              <td>{order.due}</td>
              <td>{order.label}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UpcomingOrders;
