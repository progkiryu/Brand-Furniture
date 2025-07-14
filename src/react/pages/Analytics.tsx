import React, { useState } from "react";
import "../styles/Analytics.css";
import "../styles/Global.css";
import Navbar from "../components/Navbar";
import JobVolume from "../components/JobVolume";
import JobCompletion from "../components/JobCompletion";
import OrderTypeDistributionChart from "../components/OrderTypeDistribution";

type DateRange = "lastmonth" | "last6months" | "last12months" | "last2years";

function Analytics() {
  const [dateRange, setDateRange] = useState<DateRange>("lastmonth");

  const handleRangeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setDateRange(event.target.value as DateRange);
  };

  const getLabelPrefix =(range: DateRange) => {
    switch (range) {
      case "lastmonth":
        return "Monthly";
      case "last6months":
        return "Over the Last 6 Months";
      case "last12months":
        return "Over the Last 12 Months";
      case "last2years":
        return "Over the Last 2 Years";
      default:
        return "";
    }
  };

  const needsPrefixAtEnd = ["last6months", "last12months", "last2years"].includes(dateRange);

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
              <option value="lastmonth">Last Month</option>
              <option value="last6months">Last 6 Months</option>
              <option value="last12months">Last 12 Months</option>
              <option value="last2years">Last 2 Years</option>
            </select>
          </div>

          <div className="orderTypeDistribution">
            <h2>
              {needsPrefixAtEnd
              ? `Order Type Distribution ${getLabelPrefix(dateRange)}`
            : `${getLabelPrefix(dateRange)} Order Type Distribution`}
            </h2>
            <OrderTypeDistributionChart 
            dateRange={dateRange} />
          </div>
                
          <div className="jobVolume">
            <JobVolume 
            title={
              needsPrefixAtEnd
              ? `Job Volume ${getLabelPrefix(dateRange)}`
              : `${getLabelPrefix(dateRange)} Job Volume`}
            dateRange={dateRange} />
          </div>

          <div className="jobCompletion">
            <JobCompletion 
            title={
              needsPrefixAtEnd
              ? `Job Completion ${getLabelPrefix(dateRange)}`
              : `${getLabelPrefix(dateRange)} Job Completion`}
            dateRange={dateRange} />
        </div>
      </div>
    </>
  );
}

export default Analytics;