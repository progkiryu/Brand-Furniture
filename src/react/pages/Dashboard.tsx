import "../styles/Dashboard.css";
import "../styles/Global.css";
import Navbar from "../components/Navbar";
import { useEffect, useState, useCallback } from "react";
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
import {
  getAllNotifications,
  insertNotification,
  removeNotification,
  updateNotification,
} from "../api/notificationAPI.tsx";
import AddJobFormModel from "../components/AddJobFormModel.tsx";

export type TypeInfoDash = {
  name: string;
  value: number;
};

function Dashboard() {
  const [isAddJobModelOpen, setIsAddJobModelOpen] = useState<boolean>(false);
  const [reloader, setReloader] = useState<boolean>(false);
  const [organisedJobs, setOrganisedJobs] = useState<Job[]>([]);
  const [notifs, setNotifs] = useState<Notif[]>([]);

  let typeCounter: TypeInfoDash[] = [];
  const [JobAnalytics, setJobAnalytics] = useState<TypeInfoDash[]>([]);

  // const reload = () => {
  //   // Reloads since tracked in useEffect
  //   reloader === true ? setReloader(false) : setReloader(true);
  // }

  const reload = () => {
    // Reloads since tracked in useEffect
    reloader === true ? setReloader(false) : setReloader(true);
  }

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
      reload();
    } else {
      console.error("Failed to create job.");
    }
  };

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

  useEffect(() => {
    const fetchData = async () => {
      const [
        pinnedJobData,
        currentJobData,
        currentJobsUnpinnedData,
        initialNotifData, // Renamed for clarity: this is the state *before* this run modifies anything
        jobTypes,
      ] = await Promise.all([
        getPinnedJobs(),
        getCurrentJobsUnpinnedWithDue(),
        getCurrentJobsUnpinnedNullDue(),
        getAllNotifications(), // Get all existing notifications
        getUniqueJobTypes(),
      ]);
      organiseJobs(currentJobData, currentJobsUnpinnedData, pinnedJobData);

      let combinedJobs: Job[] = [];
      if (pinnedJobData) combinedJobs = combinedJobs.concat(pinnedJobData);
      if (currentJobData) combinedJobs = combinedJobs.concat(currentJobData);
      if (currentJobsUnpinnedData) combinedJobs = combinedJobs.concat(currentJobsUnpinnedData);

      const today = new Date();
      today.setHours(0, 0, 0, 0);

      // Use a Set for job IDs that currently have notifications.
      // This is a snapshot at the start of this useEffect run.
      const existingJobNotificationIds = new Set(initialNotifData.map(notif => notif.jobId));

      // Use a temporary list to build up notifications for this render
      const notificationsToDisplay: Notif[] = [];

      for (const job of combinedJobs) {
        if (job.isArchived) continue;

        const hasExistingNotifInDB = existingJobNotificationIds.has(job._id!);
        let currentNotificationForJob: Notif | undefined;

        // If a notification for this job existed at the start of this useEffect run,
        // find it to potentially update it.
        if (hasExistingNotifInDB) {
          currentNotificationForJob = initialNotifData.find(notif => notif.jobId === job._id);
        }

        if (job.due && job._id) {
          const dueDate = new Date(job.due);
          dueDate.setHours(0, 0, 0, 0);

          const diffTime = dueDate.getTime() - today.getTime();
          const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

          // Condition for notification generation
          const shouldGenerateNotification = diffDays < 7 && diffDays >= 0;

          if (shouldGenerateNotification && job.hasNoDeletedNotification) {
            const notifTitle = "Upcoming Job Due!";
            const notifDesc = `${job.name} is due in ${diffDays} days!`;

            if (currentNotificationForJob) {
              // Notification exists, check if update is neededs
              if (
                currentNotificationForJob.notifTitle !== notifTitle ||
                currentNotificationForJob.notifDesc !== notifDesc
              ) {
                const updatedNotif: Notif = {
                  ...currentNotificationForJob,
                  notifTitle: notifTitle,
                  notifDesc: notifDesc,
                  time: new Date(),
                };
                await updateNotification(updatedNotif);
                notificationsToDisplay.push(updatedNotif);
              } else {
                // No change needed, keep existing for display
                notificationsToDisplay.push(currentNotificationForJob);
              }
            } else {
              // No existing notification found for this job by getAllNotifications at the start of this run.
              // Attempt to insert.
              const newNotif: Notif = {
                jobId: job._id,
                notifTitle: notifTitle,
                notifDesc: notifDesc,
                time: new Date(),
                icon: "cart",
              };
              // THIS IS THE CRITICAL CHANGE: Make insertNotification idempotent if possible,
              // or handle the successful creation by marking it locally right away.
              const createdNotif = await insertNotification(newNotif); // Call your API
              if (createdNotif) {
                notificationsToDisplay.push(createdNotif);
                // Also immediately mark this job ID as having a notification *for this current loop*
                // This doesn't help with double useEffect runs, but helps with single run consistency
                // existingJobNotificationIds.add(createdNotif.jobId); // Keep this in mind, but the main fix is server-side for true idempotency
              }
            }
          } else {
            // Condition not met OR hasNoDeletedNotification is false: remove notification if it exists
            if (currentNotificationForJob && currentNotificationForJob._id) {
              await removeNotification(currentNotificationForJob._id, job._id);
            }
          }
        } else {
          // Job has no due date or _id, ensure no notification exists for it
          if (currentNotificationForJob && currentNotificationForJob._id) {
            await removeNotification(currentNotificationForJob._id, job._id);
          }
        }
      }

      

      // Filter out notifications that are no longer valid (e.g., associated job deleted or conditions no longer met)
      const finalNotifications = notificationsToDisplay.filter(notif =>
        combinedJobs.some(job => job._id === notif.jobId && !job.isArchived)
      );

      setNotifs(finalNotifications);

      getJobMetrics(jobTypes);

      // setIsLoading(false);
    };
    console.log("test");
    fetchData();
  }, [reloader]);

  const handleDeleteNotification = async (notificationId: string, jobId: string) => {
    const success = await removeNotification(notificationId, jobId);
    if (success) {
      console.log("Notification deleted and job updated.");
      reload(); // Re-fetch notifications and jobs
    } else {
      console.error("Failed to delete notification.");
    }
  };

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
              <NotificationsList notifsParams={notifs} onDeleteNotification={handleDeleteNotification} />
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

