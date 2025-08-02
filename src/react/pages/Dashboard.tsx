import "../styles/Dashboard.css";
import "../styles/Global.css";
import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";
import DashboardTable from "../components/DashboardTable.tsx";
import DashboardJobChartPie from "../components/DashboardJobChartPie.tsx";
import NotificationsList from "../components/NotificationsList";

import {
  createJob,
  // getCurrentJobsUnpinnedNullDue,
  // getCurrentJobsUnpinnedWithDue,
  getJobsByTypeByDate,
  getOrganisedJobs,
  // getPinnedJobs,
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

  const reload = () => {
    // Reloads since tracked in useEffect
    reloader === true ? setReloader(false) : setReloader(true);
  };

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

  const handleAddJob = async (newJobData: Job) => {
    const addedJob = await createJob(newJobData);
    if (addedJob) {
      setIsAddJobModelOpen(false);
      reload();
    } else {
      console.error("Failed to create job.");
    }
  };

  const handleDeleteNotification = async (
    notificationId: string,
    jobId: string
  ) => {
    const success = await removeNotification(notificationId, jobId);
    if (success) {
      reload(); // Re-fetch notifications and jobs
    } else {
      console.error("Failed to delete notification.");
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
      // setIsLoading(true);

      const [
        // pinnedJobData,
        // currentJobData,
        // currentJobsUnpinnedData,
        organisedJobsData,
        notifData,
        jobTypes,
      ] = await Promise.all([
        // getPinnedJobs(),
        // getCurrentJobsUnpinnedWithDue(),
        // getCurrentJobsUnpinnedNullDue(),
        getOrganisedJobs(),
        getAllNotifications(),
        getUniqueJobTypes(),
      ]);
      // organiseJobs(currentJobData, currentJobsUnpinnedData, pinnedJobData);
      setOrganisedJobs(organisedJobsData);

      let combinedJobs: Job[] = [];
      if (organisedJobsData)
        combinedJobs = combinedJobs.concat(organisedJobsData);
      // if (currentJobData) combinedJobs = combinedJobs.concat(currentJobData);
      // if (currentJobsUnpinnedData)
      //   combinedJobs = combinedJobs.concat(currentJobsUnpinnedData);

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

          if (diffDays < 14 && diffDays >= 0 && job.hasNoDeletedNotification) {
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
      const finalNotifications = activeNotifications.filter((notif) =>
        combinedJobs.some((job) => job._id === notif.jobId && !job.isArchived)
      );

      setNotifs(finalNotifications);

      getJobMetrics(jobTypes);

      // setIsLoading(false);
    };
    fetchData();
  }, [reloader]);

  return (
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
                {organisedJobs.length > 0 ? (
                  <DashboardTable jobsParams={organisedJobs} />
                ) : (
                  <p><i>No jobs!</i></p>
                )}
              </div>
            </div>
          </div>
          <div id="dashboard-third-container">
            <div id="analytics-container">
              <DashboardJobChartPie data={JobAnalytics} />
            </div>
            <div id="notifications-container">
              <h3>Notifications</h3>
              {notifs.length > 0 ? (
                <NotificationsList
                  notifsParams={notifs}
                  onDeleteNotification={handleDeleteNotification}
                />
              ) : (
                <p><i>No notifications!</i></p>
              )}
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
