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
} from "../api/jobAPI.tsx";
import { getAllNotifications, insertNotification, removeNotification } from "../api/notificationAPI.tsx";
import AddJobFormModel from "../components/AddJobFormModel.tsx";

export type TypeInfoDash = {
  name: string;
  value: number;
};

// Helper function to calculate days until due
const calculateDaysUntilDue = (dueDate: Date): number => {
  const today = new Date();
  const due = new Date(dueDate);

  today.setHours(0, 0, 0, 0);
  due.setHours(0, 0, 0, 0);
  const diffTime = due.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
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

  const generateOrderDueNotification = () => {
    const orderDueNotifications: Notif[] = [];
    organisedJobs.forEach((job: Job) => {
        const daysUntilDue = calculateDaysUntilDue(job.due);
        if (daysUntilDue <= 7 && daysUntilDue >= 0) {
          const dueTodayText = "Order due today";
          const dueInDaysText = `Order due in ${daysUntilDue} days`;
          const notifDesc = daysUntilDue === 0 ? dueTodayText : dueInDaysText;
          orderDueNotifications.push({
            // Assuming a 'type' property exists or can be added to Notif for filtering later if needed
            // For now, using 'cart' icon as per existing logic
            icon: "cart", 
            notifTitle: "Order Due",
            notifDesc: `${notifDesc}\n${new Date(job.due).toLocaleDateString()}`,
            // Using a timestamp for time, which can be sorted for chronological order
            time: new Date(job.due), 
          });
        }
    })
    
     // Sort notifications chronologically (earliest due date first)
    orderDueNotifications.sort((a, b) => {
      const aDays = calculateDaysUntilDue(new Date(a.notifDesc.split('\n')[0].replace('Order due in ', '').replace(' days', '')));
      const bDays = calculateDaysUntilDue(new Date(b.notifDesc.split('\n')[0].replace('Order due in ', '').replace(' days', '')));

      if (aDays === 0 && bDays !== 0) return -1;
      if (aDays !== 0 && bDays === 0) return 1;
      
      return (aDays) - (bDays);
    });

    return orderDueNotifications;
  };

  useEffect(() => {
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
        
        const generatedOrderNotifications = generateOrderDueNotification();
        setNotifs(generatedOrderNotifications);
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
