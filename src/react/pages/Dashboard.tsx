import "../styles/Dashboard.css";
import "../styles/Global.css";
import Navbar from "../components/Navbar";

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
            </div>
          </div>
          <div id="dashboard-third-container">
            <div id="analytics-container">
              <h1>Analytics</h1>
            </div>
            <div id="notifications-container">
              <h1>Notifications</h1>
            </div>
          </div>
        </div>
      </div>
    </>
  )
  
}

export default Dashboard;
