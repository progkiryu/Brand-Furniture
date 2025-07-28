import React, { useEffect, useState } from "react";
import "../styles/Analytics.css";
import "../styles/Global.css";
import Navbar from "../components/Navbar";
import JobChartBar from "../components/JobChartBar";
import JobChartPie from "../components/JobChartPie";
import {
  getFilteredJobsByDate,
  getJobsByTypeByDate,
  getUniqueJobTypes,
} from "../api/jobAPI";

export type TypeInfo = {
  name: string;
  value: number;
};

type DateRange = "currentmonth" | "last6months" | "last12months" | "last2years";

function Analytics() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [dateRange, setDateRange] = useState<DateRange>("currentmonth");

  // Job Distribution Data
  const typeCounter: TypeInfo[] = [];
  const [jobDistributionData, setJobDistributionData] = useState<TypeInfo[]>(
    []
  );
  // Job volume time frames
  let jobVolumeTimeframes: string[] = [];
  // Job Volume Data
  let jobVolumeCounter: TypeInfo[] = [];
  const [jobVolumeData, setJobVolumeData] = useState<TypeInfo[]>([]);
  // Job Completion Data
  let jobVolumeCompleteCounter: TypeInfo[] = [];
  const [jobVolumeCompleteData, setJobVolumeCompleteData] = useState<
    TypeInfo[]
  >([]);

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
    "currentmonth",
    "last6months",
    "last12months",
    "last2years",
  ].includes(dateRange);

  const resetArrays = () => {
    setJobDistributionData([]);
    setJobVolumeData([]);
    setJobVolumeCompleteData([]);
  };

  const handleRangeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setDateRange(event.target.value as DateRange);
  };

  const getLabelPrefix = (range: DateRange) => {
    switch (range) {
      case "currentmonth":
        return "Over the current month";
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

    if (dateRange === "currentmonth") {
      startDate.setDate(1);
      endDate.setMonth(endDate.getMonth() + 1);
      endDate.setDate(1);
      endDate.setDate(endDate.getDate() - 1);
    } else if (dateRange === "last6months") {
      startDate.setDate(1);
      startDate.setMonth(startDate.getMonth() - 6);
      endDate.setMonth(endDate.getMonth() + 1);
      endDate.setDate(1);
      endDate.setDate(endDate.getDate() - 1);
    } else if (dateRange === "last12months") {
      startDate.setDate(1);
      startDate.setFullYear(startDate.getFullYear() - 1);
      endDate.setMonth(endDate.getMonth() + 1);
      endDate.setDate(1);
      endDate.setDate(endDate.getDate() - 1);
    } else if (dateRange === "last2years") {
      startDate.setDate(1);
      startDate.setFullYear(startDate.getFullYear() - 2);
      endDate.setMonth(endDate.getMonth() + 1);
      endDate.setDate(1);
      endDate.setDate(endDate.getDate() - 1);
    } else {
      startDate.setDate(0);
      endDate.setMonth(endDate.getMonth() + 1);
      endDate.setDate(0);
      endDate.setDate(endDate.getDate() - 1);
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

  const getTimeFrames = () => {
    const today = new Date();
    // const todayDayNo: number = today.getDate();
    const todayMonth: number = today.getMonth();
    const todayYear: number = today.getFullYear();

    // trackers to prevent negative months and years
    let jobMonthCheck = 0;
    let jobYearCheck: number = todayYear;

    // Set the jobVolume monthly time frames
    switch (dateRange) {
      case "currentmonth":
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
        jobVolumeTimeframes.unshift(MONTHS[todayMonth] + jobYearCheck);
        break;
    }
  };

  const processJobDistribution = async (
    jobTypes: string[],
    startDate: Date,
    endDate: Date
  ) => {
    if (jobTypes.length < 1) {
      return;
    }
    // Get list of jobs within criteria
    for (let i = 0; i < jobTypes.length; i++) {
      try {
        let jobData: Job[] = await getJobsByTypeByDate(
          jobTypes[i],
          startDate,
          endDate
        );
        if (!jobData) {
          jobData = [];
        }
        typeCounter.push({ name: jobTypes[i], value: jobData.length });
      } catch (err) {
        console.error(err);
      }
    }
    // Filter out unique values
    const uniqueTypeCounter = typeCounter.filter(
      (obj, index, self) =>
        index === self.findIndex((type) => type.name === obj.name)
    );
    setJobDistributionData(uniqueTypeCounter);
  };

  const processJobVolume = async (jobs: Job[]) => {
    if (jobs.length < 1) {
      return;
    }

    // add all the months to the obj array
    for (let i = 0; i < jobVolumeTimeframes.length; i++) {
      jobVolumeCounter.push({ name: jobVolumeTimeframes[i], value: 0 });
    }

    // Count job occurances for each month
    for (let i = 0; i < jobs.length; i++) {
      const jobMonth = getMonthString(jobs[i]);
      const jobYear = getYearString(jobs[i]);
      const jobMY = jobMonth + jobYear;
      for (let j = 0; j < jobVolumeCounter.length; j++) {
        if (jobMY.toString() === jobVolumeCounter[j].name.toString()) {
          jobVolumeCounter[j].value++;
        }
      }
    }

    // Filter out unique values
    const uniqueJobVolumeCounter = jobVolumeCounter.filter(
      (obj, index, self) => index === self.findIndex((a) => a.name === obj.name)
    );
    setJobVolumeData(uniqueJobVolumeCounter);
  };

  const processJobCompletedVolume = async (jobs: Job[]) => {
    if (jobs.length < 1) {
      return;
    }

    let archivedJobs: Job[] = [];
    for (let i = 0; i < jobs.length; i++) {
      if (jobs[i].isArchived === true) {
        archivedJobs.push(jobs[i]);
      }
    }

    // add all the months to the obj array
    for (let i = 0; i < jobVolumeTimeframes.length; i++) {
      jobVolumeCompleteCounter.push({ name: jobVolumeTimeframes[i], value: 0 });
    }

    // Count job occurances for each month
    for (let i = 0; i < archivedJobs.length; i++) {
      const jobMonth = getMonthString(archivedJobs[i]);
      const jobYear = getYearString(archivedJobs[i]);
      const jobMY = jobMonth + jobYear;
      for (let j = 0; j < jobVolumeCompleteCounter.length; j++) {
        if (jobMY.toString() === jobVolumeCompleteCounter[j].name.toString()) {
          jobVolumeCompleteCounter[j].value++;
        }
      }
    }
    // Filter out unique values
    const uniqueJobVolumeCompleteCounter = jobVolumeCompleteCounter.filter(
      (obj, index, self) => index === self.findIndex((a) => a.name === obj.name)
    );
    setJobVolumeCompleteData(uniqueJobVolumeCompleteCounter);
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      resetArrays();
      getTimeFrames();

      const jobTypes: string[] = await getUniqueJobTypes();
      const range = getDateRange();
      const jobs = await getFilteredJobsByDate(range.startDate, range.endDate);

      await processJobDistribution(jobTypes, range.startDate, range.endDate);
      await processJobVolume(jobs);
      await processJobCompletedVolume(jobs);

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
        <div className="date-range-selector">
          <label htmlFor="range">View data for: </label>
          <select id="range" value={dateRange} onChange={handleRangeChange}>
            <option value="currentmonth">Current Month</option>
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
            <JobChartPie data={jobDistributionData} />
          </div>

          <div className="right-panel-charts">
            <div className="jobVolume">
              <h2>
                {needsPrefixAtEnd
                  ? `Job Volume ${getLabelPrefix(dateRange)}`
                  : `${getLabelPrefix(dateRange)} Job Volume`}
              </h2>
              <JobChartBar data={jobVolumeData} />
            </div>

            <div className="jobCompletion">
              <h2>
                {needsPrefixAtEnd
                  ? `Job Completion ${getLabelPrefix(dateRange)}`
                  : `${getLabelPrefix(dateRange)} Job Completion`}
              </h2>
              <JobChartBar data={jobVolumeCompleteData} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Analytics;
