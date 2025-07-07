import React from "react";

const JobAnalytics: React.FC = () => {
  return (
    <div className="job-analytics">
      <h3 className="analytics-title">Job #876 Analytics</h3>

      <div className="analytics-charts">
        {/* Ordered Chart */}
        <div className="chart">
          <svg className="chart-svg" viewBox="0 0 36 36">
            <circle cx="18" cy="18" r="16" className="chart-segment upholstery" strokeDasharray="33,67" />
            <circle cx="18" cy="18" r="16" className="chart-segment cushions" strokeDasharray="33,67" strokeDashoffset="-33" />
            <circle cx="18" cy="18" r="16" className="chart-segment frames" strokeDasharray="34,66" strokeDashoffset="-66" />
          </svg>
          <span className="chart-percentage">100%</span>
        </div>

        {/* Received Chart */}
        <div className="chart">
          <svg className="chart-svg" viewBox="0 0 36 36">
            <circle cx="18" cy="18" r="16" className="chart-segment upholstery" strokeDasharray="28,72" />
            <circle cx="18" cy="18" r="16" className="chart-segment cushions" strokeDasharray="28,72" strokeDashoffset="-28" />
            <circle cx="18" cy="18" r="16" className="chart-segment frames" strokeDasharray="24,76" strokeDashoffset="-56" />
          </svg>
          <span className="chart-percentage">80%</span>
        </div>
      </div>

      {/* Legend */}
      <div className="analytics-legend">
        <div className="legend-item">
          <span className="legend-color frames"></span>
          <span>Frames</span>
        </div>
        <div className="legend-item">
          <span className="legend-color cushions"></span>
          <span>Cushions</span>
        </div>
        <div className="legend-item">
          <span className="legend-color upholstery"></span>
          <span>Upholstery</span>
        </div>
      </div>
    </div>
  );
};

export default JobAnalytics;
