import "../styles/Dashboard.css";
import "../styles/Global.css";
import Navbar from "../components/Navbar";
import JobTable from "../components/JobTable";
import UpcomingOrders from "../components/UpcomingOrders";
import JobAnalytics from "../components/JobAnalytics";
import NotificationsList from "../components/NotificationsList";


function Dashboard() {
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
              <h1>Schedule</h1>
              <UpcomingOrders /> {/* ADD:Upcoming orders table component */}
            </div>
          </div>
          <div id="dashboard-third-container">
            <div id="analytics-container">
              <h1>Analytics</h1>
              <JobAnalytics /> {/* ADD: Job analytics component */}
            </div>
            <div id="notifications-container">
              <h1>Notifications</h1>
              <NotificationsList /> {/* ADD: Notifications list component */}
            </div>
          </div>
        </div>
      </div>
    </>
  )
  
}

export default Dashboard;
