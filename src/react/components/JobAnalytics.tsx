import React from "react";

const JobAnalytics: React.FC = () => {
  return (
    <div className="job-analytics">
      <div style={{ display: "flex", gap: "20px", justifyContent: "space-around" }}>
        <div className="chart">
          <h3>Job #876 Ordered</h3>
          <div style={{ width: "100px", height: "100px", borderRadius: "50%", border: "8px solid orange", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span>100%</span>
          </div>
        </div>
        <div className="chart">
          <h3>Job #876 Received</h3>
          <div style={{ width: "100px", height: "100px", borderRadius: "50%", border: "8px solid blue", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span>80%</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobAnalytics;
