import React from "react";

const UpcomingJobComponents: React.FC = () => {
const orders = [
  { id: "#876", client: "Koskela", jobName: "H064 Exterior Bench", job: "Custom banquette", due: "07/06/2025", color: "production" },
  { id: "#875", client: "EcoVanta", jobName: "Project Eco", job: "Outdoor seating", due: "12/06/2025", color: "private" },
  { id: "#874", client: "SyntraIQ", jobName: "SmartPod Booth", job: "Interior install", due: "14/06/2025", color: "residential" },
  { id: "#873", client: "LushNest", jobName: "Veranda Sofa", job: "Upholstery works", due: "21/06/2025", color: "commercial" },
];

  return (
    <div className="upcoming-job-components">
      <table className="orders-table">
        <thead>
          <tr>
            <th>Job ID</th>
            <th>CLIENT</th>
            <th>JOB NAME</th>
            <th>JOB</th>
            <th>DUE</th>
          </tr>
        </thead>
     <tbody>
  {Array.from({ length: 30 }).map((_, idx) => {
    const order = orders[idx % orders.length]; // reuse existing 4 orders repeatedly
    return (
  <tr key={idx} className={`order-row-${order.color}`}>
        <td>{order.id}</td>
        <td>{order.client}</td>
        <td>{order.jobName}</td>
        <td>{order.job}</td>
        <td>{order.due}</td>
      </tr>
    );
  })}
</tbody>
      </table>
    </div>
  );
};

export default UpcomingJobComponents;
