import React, { useEffect, useState } from "react";
import "../styles/Analytics.css";
import "../styles/Global.css";
import Navbar from "../components/Navbar";
import JobVolume from "../components/JobVolume";
import JobCompletion from "../components/JobCompletion";
import OrderTypeDistributionChart from "../components/OrderTypeDistribution";
import { getFilteredJobsByDate, getFilteredJobsByType } from "../api/jobAPI";

export type TypeInfo = {
  name: string;
  value: number;
};

type DateRange = "lastmonth" | "last6months" | "last12months" | "last2years";

function Analytics() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [dateRange, setDateRange] = useState<DateRange>("lastmonth");

  let jobTypes: string[] = [];
  let typeCounter: TypeInfo[] = [];
  const [typeCountState, setTypeCountState] = useState<TypeInfo[]>([]);

  const handleRangeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setDateRange(event.target.value as DateRange);
  };

  const getLabelPrefix = (range: DateRange) => {
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

  const processJobTypes = async () => {
    const endDate = new Date();
    let startDate = new Date();

    let existFlag: boolean = false;

    // Get date range
    if (dateRange === "last6months") {
      startDate.setMonth(startDate.getMonth() - 6);
    } else if (dateRange === "last12months") {
      startDate.setFullYear(startDate.getFullYear() - 1);
    } else if (dateRange === "last2years") {
      startDate.setFullYear(startDate.getFullYear() - 2);
    } else {
      startDate.setMonth(startDate.getMonth() - 1);
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
  }, [dateRange]);

  // const logbutton = () => {
  //   console.log(dateRange);
  // };

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
            <option value="lastmonth">Last Month</option>
            <option value="last6months">Last 6 Months</option>
            <option value="last12months">Last 12 Months</option>
            <option value="last2years">Last 2 Years</option>
          </select>
        </div>

        <div className="analytics-content-container">
          <div className="orderTypeDistribution">
            <h2>
              {needsPrefixAtEnd
                ? `Order Type Distribution ${getLabelPrefix(dateRange)}`
                : `${getLabelPrefix(dateRange)} Order Type Distribution`}
            </h2>
            {/* <button onClick={logbutton}>button</button> */}
            <OrderTypeDistributionChart data={typeCountState} />
          </div>

          <div className="right-panel-charts">
            <div className="jobVolume">
              <h2>
                {needsPrefixAtEnd
                  ? `Job Volume ${getLabelPrefix(dateRange)}`
                  : `${getLabelPrefix(dateRange)} Job Volume`}
                </h2>
              <JobVolume dateRange={dateRange} />
            </div>

            <div className="jobCompletion">
              <h2>
                {needsPrefixAtEnd
                  ? `Job Completion ${getLabelPrefix(dateRange)}`
                  : `${getLabelPrefix(dateRange)} Job Completion`}
                </h2>
              <JobCompletion dateRange={dateRange} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Analytics;
