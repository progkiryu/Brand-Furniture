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

  // Job Distribution Data
  let jobTypes: string[] = [];
  let typeCounter: TypeInfo[] = [];
  const [jobDistributionData, setJobDistributionData] = useState<TypeInfo[]>(
    []
  );

  // Job Volume Data
  let jobVolumeTimeframes: string[] = [];
  let jobVolumeCounter: TypeInfo[] = [];
  const [jobVolumeData, setJobVolumeData] = useState<TypeInfo[]>([]);

  const MONTHS: string[] = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const needsPrefixAtEnd = [
    "last6months",
    "last12months",
    "last2years",
  ].includes(dateRange);

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

  const getDateRange = () => {
    const endDate = new Date();
    let startDate = new Date();

    if (dateRange === "last6months") {
      startDate.setMonth(startDate.getMonth() - 6);
    } else if (dateRange === "last12months") {
      startDate.setFullYear(startDate.getFullYear() - 1);
    } else if (dateRange === "last2years") {
      startDate.setFullYear(startDate.getFullYear() - 2);
    } else {
      startDate.setMonth(startDate.getMonth() - 1);
    }
    return {
      startDate: startDate,
      endDate: endDate,
    };
  };

  const negativeMonthChecker = (month: number, i: number, a: number) => {
    if (month - i + a < 0) {
      a = a + 12;
    }
    return a;
  };

  const negativeYearChecker = (
    year: number,
    month: number,
    i: number,
    a: number
  ) => {
    if (month - i + a < 0) {
      year--;
    }
    return year;
  };

  const getMonthString = (job: Job) => {
    let monthStr = "";
    for (let i = 0; i < 2; i++) {
      monthStr = monthStr + job.due.toString()[i + 5];
    }
    const monthNo = Number(monthStr);
    const month = MONTHS[monthNo - 1];

    return month;
  };

  const getYearString = (job: Job) => {
    let year = "";
    for (let i = 0; i < 4; i++) {
      year = year + job.due.toString()[i];
    }
    return year;
  };

  const processJobDistribution = async (allJobs: Job[]) => {
    if (allJobs.length < 1) {
      return;
    }

    let existFlag: boolean = false;

    // Get all the unique job types
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
    setJobDistributionData(uniqueTypeCounter);
  };

  const processJobVolume = async (allJobs: Job[]) => {
    if (allJobs.length < 1) {
      return;
    }

    const today = new Date();
    // const todayDayNo: number = today.getDate();
    const todayMonth: number = today.getMonth();
    const todayYear: number = today.getFullYear();

    // trackers to prevent negative months and years
    let jobMonthCheck = 0;
    let jobYearCheck: number = todayYear;

    // Set the jobVolume monthly time frames
    switch (dateRange) {
      case "lastmonth":
        jobVolumeTimeframes.unshift(MONTHS[todayMonth] + jobYearCheck);
        break;
      case "last6months":
        for (let i = 0; i < 6; i++) {
          jobYearCheck = negativeYearChecker(
            jobYearCheck,
            todayMonth,
            i,
            jobMonthCheck
          );
          jobMonthCheck = negativeMonthChecker(todayMonth, i, jobMonthCheck);

          jobVolumeTimeframes.unshift(
            MONTHS[todayMonth - i + jobMonthCheck] + jobYearCheck
          );
        }
        jobMonthCheck = 0;
        jobYearCheck = todayYear;
        break;
      case "last12months":
        for (let i = 0; i < 12; i++) {
          jobYearCheck = negativeYearChecker(
            jobYearCheck,
            todayMonth,
            i,
            jobMonthCheck
          );
          jobMonthCheck = negativeMonthChecker(todayMonth, i, jobMonthCheck);

          jobVolumeTimeframes.unshift(
            MONTHS[todayMonth - i + jobMonthCheck] + jobYearCheck
          );
        }
        jobMonthCheck = 0;
        jobYearCheck = todayYear;
        break;
      case "last2years":
        for (let i = 0; i < 24; i++) {
          jobYearCheck = negativeYearChecker(
            jobYearCheck,
            todayMonth,
            i,
            jobMonthCheck
          );
          jobMonthCheck = negativeMonthChecker(todayMonth, i, jobMonthCheck);

          jobVolumeTimeframes.unshift(
            MONTHS[todayMonth - i + jobMonthCheck] + jobYearCheck
          );
        }
        jobMonthCheck = 0;
        jobYearCheck = todayYear;
        break;
      default:
        jobVolumeTimeframes.unshift(MONTHS[todayMonth - 1]);
        break;
    }

    // add all the months to the obj array
    for (let i = 0; i < jobVolumeTimeframes.length; i++) {
      jobVolumeCounter.push({ name: jobVolumeTimeframes[i], value: 0 });
    }

    // Count job occurances for each month
    for (let i = 0; i < allJobs.length; i++) {
      const jobMonth = getMonthString(allJobs[i]);
      const jobYear = getYearString(allJobs[i]);
      const jobMY = jobMonth + jobYear;
      for (let j = 0; j < jobVolumeCounter.length; j++) {
        if (jobMY.toString() === jobVolumeCounter[j].name.toString()) {
          jobVolumeCounter[j].value++;
        }
      }
    }
    setJobVolumeData(jobVolumeCounter);
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      const range = getDateRange();
      const allJobs = await getFilteredJobsByDate(
        range.startDate,
        range.endDate
      );
      await processJobDistribution(allJobs);
      await processJobVolume(allJobs);

      setIsLoading(false);
    };

    fetchData();
  }, [dateRange]);

  return isLoading ? (
    <>
      <Navbar />
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
            <OrderTypeDistributionChart data={jobDistributionData} />
          </div>

          <div className="right-panel-charts">
            <div className="jobVolume">
              <h2>
                {needsPrefixAtEnd
                  ? `Job Volume ${getLabelPrefix(dateRange)}`
                  : `${getLabelPrefix(dateRange)} Job Volume`}
              </h2>
              <JobVolume data={jobVolumeData} />
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
