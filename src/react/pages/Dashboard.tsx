import "../styles/Dashboard.css";
import "../styles/Global.css";
import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";
import SubJobTable from "../components/SubJobTable.tsx";
import JobAnalytics from "../components/JobAnalytics";
import NotificationsList from "../components/NotificationsList";
import { DBLink } from "../App.tsx";

function Dashboard() {

  const [ subJobs, setSubJobs ] = useState<Array<SubJob>>([]);
  const [ jobs, setJobs ] = useState<Array<Job>>([]);
  
  // retrieve sub-jobs by making a API fetch call
  useEffect(() => {
    fetch(`${DBLink}/subJob/getAllSubJobs`)
      .then(res => res.json())
      .then(data => setSubJobs(data))
      .catch(err => console.log(err));

    fetch(`${DBLink}/job/getAllJobs`)
      .then(res => res.json())
      .then(data => setJobs(data))
      .catch(err => console.log(err));
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
                <h1>Upcoming Job Components</h1>
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
                <SubJobTable subJobsParams={subJobs} jobsParams={jobs} />
              </div>
            </div>
          </div>
          <div id="dashboard-third-container">
            <div id="analytics-container">
              <h1>Analytics</h1>
              <JobAnalytics />
            </div>
            <div id="notifications-container">
              <h1>Notifications</h1>
              <NotificationsList />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
