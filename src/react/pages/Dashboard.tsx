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
} from "../api/jobAPI.tsx";
import { getAllNotifications } from "../api/notificationAPI.tsx";
import AddJobFormModel from "../components/AddJobFormModel.tsx";

export type TypeInfoDash = {
  name: string;
  value: number;
};

function Dashboard() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isAddJobModelOpen, setIsAddJobModelOpen] = useState<boolean>(false);

  // Job Metrics PieChart
  const [jobs, setJobs] = useState<Job[]>([]);
  const [notifs, setNotifs] = useState<Notif[]>([]);
  let jobTypes: string[] = [];
  let typeCounter: TypeInfoDash[] = [];
  const [JobAnalytics, setJobAnalytics] = useState<TypeInfoDash[]>([]);

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

  const handleAddJob = async (newJobData: Job) => {
    const addedJob = await createJob(newJobData);
    if (addedJob) {
      setJobs((prevJobs) => [...prevJobs, addedJob]);
      setIsAddJobModelOpen(false);
    } else {
      console.error("Failed to create job.");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      const jobsPromise = getAllJobs(); // Get all jobs
      const notifPromise = getAllNotifications(); // Get all notificatons
      try {
        const [jobData, notifData] = await Promise.all([
          jobsPromise,
          notifPromise,
        ]);
        setJobs(jobData);
        setNotifs(notifData);
      } catch (err) {
        console.error(err);
      }
      await getJobMetrics(); // Get data for pie chart

      setIsLoading(false);
    };
    fetchData();
  }, []);

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
                <DashboardTable jobsParams={jobs} />
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
