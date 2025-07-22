import "../styles/Dashboard.css";
import "../styles/Global.css";
import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";
import DashboardTable from "../components/DashboardTable.tsx";
import DashboardJobChartPie from "../components/DashboardJobChartPie.tsx";
import NotificationsList from "../components/NotificationsList";

import {
  createJob,
  getCurrentJobs,
  getFilteredJobsByDate,
  getJobsByTypeByDate,
  getPinnedJobs,
  getUniqueJobTypes,
} from "../api/jobAPI.tsx";
import { getAllNotifications } from "../api/notificationAPI.tsx";
import AddJobFormModel from "../components/AddJobFormModel.tsx";

export type TypeInfoDash = {
  name: string;
  value: number;
};

function Dashboard() {
  const [reloader, setReloader] = useState<boolean>(false);
  const [isAddJobModelOpen, setIsAddJobModelOpen] = useState<boolean>(false);

  const [organisedJobs, setOrganisedJobs] = useState<Job[]>([]);
  const [notifs, setNotifs] = useState<Notif[]>([]);
  let typeCounter: TypeInfoDash[] = [];
  const [JobAnalytics, setJobAnalytics] = useState<TypeInfoDash[]>([]);

  const reload = () => {
    // Reloads since tracked in useEffect
    reloader === true ? setReloader(false) : setReloader(true);
  };

  const getJobMetrics = async (jobTypes: string[]) => {
    if (jobTypes.length < 1) {
      return;
    }
    const endDate = new Date();
    let startDate = new Date();
    startDate.setFullYear(startDate.getFullYear() - 1);
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
    setJobAnalytics(uniqueTypeCounter);
  };

  const organiseJobs = (allJobs: Job[], pinnedJobs: Job[]) => {
    const organisedArray: Job[] = [];
    let match = false;
    // Create a new array without pinned Jobs
    for (let i = 0; i < allJobs.length; i++) {
      for (let j = 0; j < pinnedJobs.length; j++) {
        if (allJobs[i]._id === pinnedJobs[j]._id) {
          match = true;
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
      setIsAddJobModelOpen(false);
      reload();
    } else {
      console.error("Failed to create job.");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      // setIsLoading(true);

      const jobTypes = await getUniqueJobTypes();
      const allJobsPromise = await getCurrentJobs();
      const pinnedJobsPromise = await getPinnedJobs();
      const notifPromise = await getAllNotifications();
      try {
        const [allJobData, pinnedJobData, notifData] = await Promise.all([
          allJobsPromise,
          pinnedJobsPromise,
          notifPromise,
        ]);
        setNotifs(notifData);
        organiseJobs(allJobData, pinnedJobData);
      } catch (err) {
        console.error(err);
      }
      getJobMetrics(jobTypes);

      // setIsLoading(false);
    };
    fetchData();
  }, [reloader]);

  return (
    // isLoading ? (
    //   <>
    //     <Navbar />
    //     <div>
    //       <h1>Loading...</h1>
    //     </div>
    //   </>
    // ) :
    <>
      <Navbar />
      <div id="first-container">
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
