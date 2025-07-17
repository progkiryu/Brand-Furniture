import "../styles/Dashboard.css";
import "../styles/Global.css";
import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";
import DashboardTable from "../components/DashboardTable.tsx";
import DashboardJobChartPie from "../components/DashboardJobChartPie.tsx";
import NotificationsList from "../components/NotificationsList";

import {
  createJob,
  getAllJobs,
  getFilteredJobsByDate,
  getPinnedJobs,
} from "../api/jobAPI.tsx";
import { getAllNotifications } from "../api/notificationAPI.tsx";
import AddJobFormModel from "../components/AddJobFormModel.tsx";

export type TypeInfoDash = {
  name: string;
  value: number;
};

function Dashboard() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [reloader, setReloader] = useState<boolean>(false);
  const [isAddJobModelOpen, setIsAddJobModelOpen] = useState<boolean>(false);

  const [organisedJobs, setOrganisedJobs] = useState<Job[]>([]);
  // const [allJobs, setAllJobs] = useState<Job[]>([]);
  const [notifs, setNotifs] = useState<Notif[]>([]);
  let jobTypes: string[] = [];
  let typeCounter: TypeInfoDash[] = [];
  const [JobAnalytics, setJobAnalytics] = useState<TypeInfoDash[]>([]);

  const reload = () => {
    // Reloads since tracked in useEffect
    if (reloader === true) {
      setReloader(false);
    } else {
      setReloader(true);
    }
  };

  const getJobMetrics = async () => {
    const endDate = new Date();
    let startDate = new Date();
    // 1 year range
    startDate.setFullYear(startDate.getFullYear() - 1);

    let existFlag: boolean = false;

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
      let count = 0;
      for (let j = 0; j < allJobs.length; j++) {
        if (jobTypes[i] === allJobs[j].type) {
          count++;
        }
      }
      typeCounter.push({ name: jobTypes[i], value: count });
    }
    // Filter out unique values
    const uniqueTypeCounter = typeCounter.filter(
      (obj, index, self) =>
        index === self.findIndex((type) => type.name === obj.name)
    );

    setJobAnalytics(uniqueTypeCounter);
  };

  const organiseJobs = (allJobs: Job[], pinnedJobs: Job[]) => {
    const organisedArray: Job[] = [];
    let match = false;

    // Create a new array without pinned Jobs
    for (let i = 0; i < allJobs.length; i++) {
      for (let j = 0; j < pinnedJobs.length; j++) {
        if (allJobs[i]._id === pinnedJobs[j]._id) {
          match = true; // Matching ID with pinnedJob
        }
      }
      if (match === false) {
        organisedArray.push(allJobs[i]);
      }
      match = false;
    }

    // Add the pinned jobs to new job array, accounted for due date
    for (let i = pinnedJobs.length - 1; i >= 0; i--) {
      organisedArray.unshift(pinnedJobs[i]);
    }
    setOrganisedJobs(organisedArray);
  };

  const handleAddJob = async (newJobData: Job) => {
    const addedJob = await createJob(newJobData);
    if (addedJob) {
      // setAllJobs((prevJobs) => [...prevJobs, addedJob]);
      setIsAddJobModelOpen(false);
      reload();
    } else {
      console.error("Failed to create job.");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      const allJobsPromise = getAllJobs();
      const pinnedJobsPromise = getPinnedJobs();
      const notifPromise = getAllNotifications();
      try {
        const [allJobData, pinnedJobData, notifData] = await Promise.all([
          allJobsPromise,
          pinnedJobsPromise,
          notifPromise,
        ]);
        // setAllJobs(allJobData);
        setNotifs(notifData);

        organiseJobs(allJobData, pinnedJobData);
      } catch (err) {
        console.error(err);
      }
      getJobMetrics(); // Get data for pie chart

      setIsLoading(false);
    };
    fetchData();
  }, [reloader]);

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
          <h1>Dashboard</h1>
        </div>
        <div id="dashboard-first-container">
          <div id="dashboard-second-container">
            <div id="schedule-container">
              <div className="schedule-header">
                <h1>Upcoming Jobs</h1>
                <button
                  onClick={() => setIsAddJobModelOpen(true)}
                  className="add-job-button"
                >
                  Add Job
                </button>
              </div>
              <div className="upcoming-orders-scroll-container">
                <DashboardTable jobsParams={organisedJobs} />
              </div>
            </div>
          </div>
          <div id="dashboard-third-container">
            <div id="analytics-container">
              <DashboardJobChartPie data={JobAnalytics} />
            </div>
            <div id="notifications-container">
              <h1>Notifications</h1>
              <NotificationsList notifsParams={notifs} />
            </div>
          </div>
        </div>
      </div>
      <AddJobFormModel
        isOpen={isAddJobModelOpen}
        onClose={() => setIsAddJobModelOpen(false)}
        onAddJob={handleAddJob}
      />
    </>
  );
}

export default Dashboard;
