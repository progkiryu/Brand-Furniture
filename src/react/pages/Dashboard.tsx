import "../styles/Dashboard.css";
import "../styles/Global.css";
import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";
import DashboardTable from "../components/DashboardTable.tsx";
import DashboardJobChartPie from "../components/DashboardJobChartPie.tsx";
import NotificationsList from "../components/NotificationsList";

import {
  createJob,
  getCurrentJobsUnpinnedNullDue,
  getCurrentJobsUnpinnedWithDue,
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
  const [isAddJobModelOpen, setIsAddJobModelOpen] = useState<boolean>(false);

  const [organisedJobs, setOrganisedJobs] = useState<Job[]>([]);
  const [notifs, setNotifs] = useState<Notif[]>([]);

  let typeCounter: TypeInfoDash[] = [];
  const [JobAnalytics, setJobAnalytics] = useState<TypeInfoDash[]>([]);

  const getFinancialYearRange = () => {
    const todayDate = new Date();
    let startDate = new Date();
    let endDate = new Date();

    // Set start date
    startDate.setDate(1); // First day of July
    startDate.setMonth(6); // Set to July
    // Set end date
    endDate.setDate(30); // Last day of June
    endDate.setMonth(5); // Set to June

    if (todayDate.getMonth() <= 5) {
      // set startDate to prev year
      startDate.setFullYear(startDate.getFullYear() - 1);
    } else if (todayDate.getMonth() >= 6) {
      // set endDate to next year
      endDate.setFullYear(endDate.getFullYear() + 1);
    } else {
      console.error("Error: Invalid month.");
    }

    return {
      startDate,
      endDate,
    };
  };

  const getJobMetrics = async (jobTypes: string[]) => {
    if (jobTypes.length < 1) {
      return;
    }
    // Get date range of FY
    const dateRange = getFinancialYearRange();
    // Get list of jobs within criteria
    for (let i = 0; i < jobTypes.length; i++) {
      try {
        let jobData: Job[] = await getJobsByTypeByDate(
          jobTypes[i],
          dateRange.startDate,
          dateRange.endDate
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

  const organiseJobs = (jobs: Job[], jobsNoDue: Job[], pinnedJobs: Job[]) => {
    const organisedArray: Job[] = [];
    // Push unpinned jobs without due dates
    for (let i = 0; i < jobsNoDue.length; i++) {
      organisedArray.push(jobsNoDue[i]);
    }
    // Push unpinned jobs with due dates
    for (let i = 0; i < jobs.length; i++) {
      organisedArray.push(jobs[i]);
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
      fetchData();
    } else {
      console.error("Failed to create job.");
    }
  };

  // in Dashboard.tsx (or any script that runs once on page load)
  useEffect(() => {
    const root = document.getElementById("dashboard-first-container")!;
    const checkZoom = () =>
      window.devicePixelRatio > 2.05
        ? root.classList.add("zoomed")
        : root.classList.remove("zoomed");
    window.addEventListener("resize", checkZoom);
    checkZoom();
    return () => window.removeEventListener("resize", checkZoom);
  }, []);

  const fetchData = async () => {
    // setIsLoading(true);
    const jobTypes = await getUniqueJobTypes();

    const currentJobsPromise = await getCurrentJobsUnpinnedWithDue();
    const currentJobsUnpinnedPromise = await getCurrentJobsUnpinnedNullDue();
    const pinnedJobsPromise = await getPinnedJobs();
    const notifPromise = await getAllNotifications();
    try {
      const [
        currentJobData,
        currentJobsUnpinnedData,
        pinnedJobData,
        notifData,
      ] = await Promise.all([
        currentJobsPromise,
        currentJobsUnpinnedPromise,
        pinnedJobsPromise,
        notifPromise,
      ]);
      setNotifs(notifData);
      organiseJobs(currentJobData, currentJobsUnpinnedData, pinnedJobData);
    } catch (err) {
      console.error(err);
    }
    getJobMetrics(jobTypes);

    // setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

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
