import "../styles/Dashboard.css";
import "../styles/Global.css";
import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";
import DashboardTable from "../components/DashboardTable.tsx";
import DashboardJobChartPie from "../components/DashboardJobChartPie.tsx";
import NotificationsList from "../components/NotificationsList";

import {
  createJob,
  updateJob, // Import updateJob
  deleteJob, // Import deleteJob
  getCurrentJobs,
  getCurrentJobsUnpinnedNullDue,
  getCurrentJobsUnpinnedWithDue,
  getJobsByTypeByDate,
  getPinnedJobs,
  getUniqueJobTypes,
} from "../api/jobAPI.tsx";
import { 
  getAllNotifications,
  insertNotification,
  removeNotification,
  getNotificationByJobId, // Import getNotificationByJobId
  updateNotification,
} from "../api/notificationAPI.tsx";
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

  const handleDeleteNotification = async (notificationId: string, jobId: string) => {
    const success = await removeNotification(notificationId, jobId);
    if (success) {
      console.log("Notification deleted and job updated.");
      reload(); // Re-fetch notifications and jobs
    } else {
      console.error("Failed to delete notification.");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      // setIsLoading(true);

      const [
        pinnedJobData,
        currentJobData,
        currentJobsUnpinnedData,
        notifData,
        jobTypes,
      ] = await Promise.all([
        getPinnedJobs(),
        getCurrentJobsUnpinnedWithDue(),
        getCurrentJobsUnpinnedNullDue(),
        getAllNotifications(),
        getUniqueJobTypes(),
      ]);
      organiseJobs(currentJobData, currentJobsUnpinnedData, pinnedJobData);

      let combinedJobs: Job[] = [];
      if (pinnedJobData) combinedJobs = combinedJobs.concat(pinnedJobData);
      if (currentJobData) combinedJobs = combinedJobs.concat(currentJobData);
      if (currentJobsUnpinnedData) combinedJobs = combinedJobs.concat(currentJobsUnpinnedData);

      const today = new Date();
      today.setHours(0, 0, 0, 0); // Normalize today's date to start of day

      const activeNotifications: Notif[] = [];
      const existingNotificationsMap = new Map<string, Notif>(); // Map jobId to Notif

      if (notifData) {
        notifData.forEach((notif) => {
          existingNotificationsMap.set(notif.jobId, notif);
        });
      }

      for (const job of combinedJobs) {
        if (job.isArchived) continue; // Skip archived jobs

        const existingNotif = existingNotificationsMap.get(job._id!);

        if (job.due && job._id) {
          const dueDate = new Date(job.due);
          dueDate.setHours(0, 0, 0, 0); // Normalize due date to start of day

          const diffTime = dueDate.getTime() - today.getTime();
          const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

          if (diffDays < 7 && diffDays >= 0 && job.hasNoDeletedNotification) {
            // Condition met: generate/update notification
            const notifTitle = "Upcoming Job Due!";
            const notifDesc = `${job.name} for ${job.client} is due in ${diffDays} days!`;

            if (existingNotif) {
              // Check if existing notification needs update (e.g., due date changed, name changed)
              if (
                existingNotif.notifTitle !== notifTitle ||
                existingNotif.notifDesc !== notifDesc
              ) {
                const updatedNotif: Notif = {
                  ...existingNotif,
                  notifTitle: notifTitle,
                  notifDesc: notifDesc,
                  time: new Date(), // Update time to now
                };
                await updateNotification(updatedNotif);
                activeNotifications.push(updatedNotif);
              } else {
                activeNotifications.push(existingNotif); // No change needed, keep existing
              }
            } else {
              // No existing notification, create a new one
              const newNotif: Notif = {
                jobId: job._id,
                notifTitle: notifTitle,
                notifDesc: notifDesc,
                time: new Date(),
                icon: "cart", // Default icon
              };
              const createdNotif = await insertNotification(newNotif);
              if (createdNotif) {
                activeNotifications.push(createdNotif);
              }
            }
          } else {
            // Condition not met: remove notification if it exists
            if (existingNotif && existingNotif._id) {
              await removeNotification(existingNotif._id, job._id);
              // Note: removeNotification already sets hasNoDeletedNotification to false
            }
          }
        } else {
          // Job has no due date or _id, ensure no notification exists for it
          if (existingNotif && existingNotif._id) {
            await removeNotification(existingNotif._id, job._id);
          }
        }
      }

      // Filter out notifications that are no longer valid (e.g., associated job deleted or conditions no longer met)
      const finalNotifications = activeNotifications.filter(notif =>
        combinedJobs.some(job => job._id === notif.jobId && !job.isArchived)
      );

      setNotifs(finalNotifications);

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
              <NotificationsList notifsParams={notifs} onDeleteNotification={handleDeleteNotification}/>
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
