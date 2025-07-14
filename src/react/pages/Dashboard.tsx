import "../styles/Dashboard.css";
import "../styles/Global.css";
import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";
import DashboardTable from "../components/DashboardTable.tsx";
import JobAnalytics from "../components/JobAnalytics";
import NotificationsList from "../components/NotificationsList";

import { DBLink } from "../App.tsx";
import { FaEdit, FaThumbtack } from "react-icons/fa";

import { getAllJobs } from "../api/jobAPI.tsx";
import { getAllNotifications  } from "../api/notificationAPI.tsx";

function Dashboard() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [notifs, setNotifs] = useState<Notif[]>([]);

  // retrieve sub-jobs by making a API fetch call
  useEffect(() => {
    const fetchData = async () => {
      const jobsPromise = getAllJobs();
      const notifPromise = getAllNotifications();
      try {
        const [jobData, notifData] = await Promise.all([
          jobsPromise,
          notifPromise
        ]);
        setJobs(jobData);
        setNotifs(notifData);
        
      }
      catch (err) {
        console.error(err);
      }
    }
    fetchData();
  }, []);

  return (
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
                <button className="add-job-button">Add Job</button>
                {/* <div className="color-key">
                  <div className="key-item">
                    <span className="key-color production"></span> Production
                  </div>
                  <div className="key-item">
                    <span className="key-color private"></span> Private
                  </div>
                  <div className="key-item">
                    <span className="key-color residential"></span> Residential
                  </div>
                  <div className="key-item">
                    <span className="key-color commercial"></span> Commercial
                  </div>
                </div> */}
              </div>
              <div className="upcoming-orders-scroll-container">
                <DashboardTable jobsParams={jobs}/>
              </div>
            </div>
          </div>
          <div id="dashboard-third-container">
            <div id="analytics-container">
              <JobAnalytics />
            </div>
            <div id="notifications-container">
              <h1>Notifications</h1>
              <NotificationsList notifsParams={staticNotifs} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
