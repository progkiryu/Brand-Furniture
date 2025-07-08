import React, { useState } from "react";
import "../styles/Analytics.css";
import "../styles/Global.css";
import Navbar from "../components/Navbar";
import LineChartComponent from "../components/LineChartComponent";
import OrderTypeDistributionChart from "../components/OrderTypeDistribution";

function Analytics() {
  const [dateRange, setDateRange] = useState("lastmonth");

  const handleRangeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setDateRange(event.target.value);
  };

  const getLabelPrefix =(range: string) => {
    switch (range) {
      case "lastweek":
        return "Weekly";
      case "lastmonth":
        return "Monthly";
      case "last6months":
        return "Over the Last 6 Months";
      default:
        return "";
    }
  };

    return (
        <>
            <Navbar />
            <div id="first-container">
              <div id="header-container">
                <h1>Analytics</h1>
              </div>

              <div className="date-range-selector">
            <label htmlFor="range">View data for: </label>
            <select id="range" value={dateRange} onChange={handleRangeChange}>
              <option value="lastweek">Last Week</option>
              <option value="lastmonth">Last Month</option>
              <option value="last6months">Last 6 Months</option>
            </select>
          </div>

          <div className="orderTypeDistribution">
            <h2>
              {dateRange === "last6months"
              ? `Order Type Distribution ${getLabelPrefix(dateRange)}`
            : `${getLabelPrefix(dateRange)} Order Type Distribution`}
            </h2>
            <OrderTypeDistributionChart 
            dateRange={dateRange} />
          </div>
                
          <div className="jobVolume">
            <LineChartComponent 
            title={
              dateRange === "last6months"
              ? `Job Volume ${getLabelPrefix(dateRange)}`
              : `${getLabelPrefix(dateRange)} Job Volume`}
            dateRange={dateRange} />
          </div>

          <div className="jobCompletion">
            <LineChartComponent 
            title={
              dateRange === "last6months"
              ? `Job Completion ${getLabelPrefix(dateRange)}`
              : `${getLabelPrefix(dateRange)} Job Completion`}
            dateRange={dateRange} />
        </div>
      </div>
    </>
  );
}

export default Analytics;