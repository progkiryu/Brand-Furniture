import React, { useEffect, useState } from "react";
import "../styles/Analytics.css";
import "../styles/Global.css";
import Navbar from "../components/Navbar";
import LineChartComponent from "../components/LineChartComponent";
import OrderTypeDistributionChart from "../components/OrderTypeDistribution";
import { getFilteredJobsByDate, getFilteredJobsByType } from "../api/jobAPI";

export type TypeInfo = {
  name: string;
  value: number;
};

function Analytics() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [dateRange, setDateRange] = useState<string>("last6months");

  let jobTypes: string[] = [];
  let typeCounter: TypeInfo[] = [];
  const [typeCountState, setTypeCountState] = useState<TypeInfo[]>([]);
  // const [typeCounter, setTypeCounter] = useState<TypeInfo[]>([]);

  const handleRangeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setDateRange(event.target.value);
  };

  const getLabelPrefix = (range: string) => {
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

  const processJobTypes = async () => {
    const endDate = new Date();
    const startDate = new Date();

    let existFlag: boolean = false;

    // Get date range
    switch (dateRange) {
      case "last6months":
        startDate.setMonth(startDate.getMonth() - 6);
        break;
      case "last12months":
        startDate.setMonth(startDate.getMonth() - 12);
        break;
      case "last24months":
        startDate.setMonth(startDate.getMonth() - 24);
        break;
      default:
        startDate.setMonth(startDate.getMonth() - 6);
        break;
    }

    // Get all the unique job types
    const allJobs = await getFilteredJobsByDate(startDate, endDate);
    for (let i = 0; i < allJobs.length; i++) {
      for (let j = 0; j <= jobTypes.length; j++) {
        if (allJobs[i].type === jobTypes[j]) {
          existFlag = true;
        }
      }
      if (existFlag === false) {
        jobTypes.push(allJobs[i].type);
      }
      existFlag = false;
    }

    // Get the counts of each type
    for (let i = 0; i < jobTypes.length; i++) {
      const jobs = await getFilteredJobsByType(jobTypes[i]);
      typeCounter.push({ name: `${jobTypes[i]}`, value: jobs.length });
    }
    // Filter out unique values
    const uniqueTypeCounter = typeCounter.filter(
      (obj, index, self) =>
        index === self.findIndex((type) => type.name === obj.name)
    );

    setTypeCountState(uniqueTypeCounter);
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      await processJobTypes().then(() => setIsLoading(false));
    };

    fetchData();
  }, []);

  return isLoading ? (
    <>
      {/* <Navbar /> */}
      <div>
        <h1>Loading...</h1>
      </div>
    </>
  ) : (
    <>
      <Navbar />
      <div id="first-container">
        <div id="header-container">
          <h1>Analytics</h1>
        </div>

        <div className="date-range-selector">
          <label htmlFor="range">View data for: </label>
          <select id="range" value={dateRange} onChange={handleRangeChange}>
            <option value="last6months">Last 6 Months</option>
            <option value="last12months">Last 12 Month</option>
            <option value="last24months">Last 24 Months</option>
          </select>
        </div>

        <div className="orderTypeDistribution">
          <h2>
            {dateRange === "last6months"
              ? `Order Type Distribution ${getLabelPrefix(dateRange)}`
              : `${getLabelPrefix(dateRange)} Order Type Distribution`}
          </h2>
          <OrderTypeDistributionChart data={typeCountState} />
        </div>

        <div className="jobVolume">
          <LineChartComponent
            title={
              dateRange === "last6months"
                ? `Job Volume ${getLabelPrefix(dateRange)}`
                : `${getLabelPrefix(dateRange)} Job Volume`
            }
            dateRange={dateRange}
          />
        </div>

        <div className="jobCompletion">
          <LineChartComponent
            title={
              dateRange === "last6months"
                ? `Job Completion ${getLabelPrefix(dateRange)}`
                : `${getLabelPrefix(dateRange)} Job Completion`
            }
            dateRange={dateRange}
          />
        </div>
      </div>
    </>
  );
}

export default Analytics;
