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
  getCurrentJobsUnpinnedNullDue,
  getCurrentJobsUnpinnedWithDue,
  getJobsByTypeByDate,
  getPinnedJobs,
  getUniqueJobTypes,
  updateJobNotificationStatus,
} from "../api/jobAPI.tsx";
import { getAllNotifications, insertNotification, removeNotification } from "../api/notificationAPI.tsx";
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
      reload();
    } else {
      console.error("Failed to create job.");
    }
  };

  const generateOrderDueNotifications = async (jobs: Job[]) => {
    const today = new Date();
    const sevenDaysFromNow = new Date();
    sevenDaysFromNow.setDate(today.getDate() + 7);

    const existingNotifications = await getAllNotifications();
    const existingNotificationJobIds = new Set(existingNotifications.map((notif: Notif) => notif.jobId));

    for (const job of jobs) {
      if (job.due && !job.isArchived) { // Check if job has a due date and is not archived
        const dueDate = new Date(job.due);
        // Calculate difference in days
        const diffTime = dueDate.getTime() - today.getTime();
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        // If due date is within 7 days and no notification has been deleted for this job
        if (diffDays < 7 && diffDays >= 0 && !job.hasNotificationBeenDeleted && !existingNotificationJobIds.has(job._id)) {
          const newNotification: Notif = {
            notifTitle: `Job Due Soon: ${job.name}`,
            notifDesc: `The job for client ${job.client} is due in ${diffDays} days.`,
            time: new Date(),
            jobId: job._id!, // Assign the job's _id as FK
            icon: "pin" // Or "cart" based on your preference
          };
          await insertNotification(newNotification);
          // After generating notification, set hasNotificationBeenDeleted to true for this job
          // This is a slight change from the original request: if a notification is generated,
          // we assume it's "active" and the flag remains false. It only turns true when deleted.
          // The prompt says "It is true by default, meaning the job's notification has not been deleted."
          // So if a notification is generated, hasNotificationBeenDeleted should remain false.
          // It only becomes true when the user explicitly deletes the notification.
        }
      }
    }
    // Re-fetch notifications to update the list on the dashboard
    const updatedNotifs = await getAllNotifications();
    setNotifs(updatedNotifs);
  };

  const handleDeleteNotification = async (notifId: string, jobId: string) => {
    await removeNotification(notifId, jobId);
    // After deletion, reload notifications and jobs to reflect changes
    reload();
  };

  useEffect(() => {
    const fetchData = async () => {
      // setIsLoading(true);
      const jobTypes = await getUniqueJobTypes();

      const currentJobsPromise = await getCurrentJobsUnpinnedWithDue();
      const currentJobsUnpinnedPromise = await getCurrentJobsUnpinnedNullDue();
      const pinnedJobsPromise = await getPinnedJobs();
      const allJobsPromise = await getCurrentJobs();
      try {
        const [
          currentJobData,
          currentJobsUnpinnedData,
          pinnedJobData,
          allJobsData,
        ] = await Promise.all([
          currentJobsPromise,
          currentJobsUnpinnedPromise,
          pinnedJobsPromise,
          allJobsPromise,
        ]);
        
        await generateOrderDueNotifications(allJobsData);
        const notifData = await getAllNotifications(); // Fetch notifications again after generation
        setNotifs(notifData);
        organiseJobs(currentJobData, currentJobsUnpinnedData, pinnedJobData);
      } catch (err) {
        console.error(err);
      }
      getJobMetrics(jobTypes);

      // setIsLoading(false);
    };
    fetchData();

    const dailyRefreshInterval = setInterval(() => {
      fetchData(); 
    }, 1000 * 60 * 60 * 24); // Every 24 hours

    // Clear interval on component unmount
    return () => clearInterval(dailyRefreshInterval);

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
              <NotificationsList notifsParams={notifs} onDeleteNofification={handleDeleteNotification}/>
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
