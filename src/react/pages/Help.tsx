import "../styles/Global.css";
import "../styles/Help.css";
import Navbar from "../components/Navbar";

function Help() {
  return (
    <>
      <Navbar />
      <div id="first-container">
        <div id="header-container">
          <h1>Help</h1>
        </div>
        <div className="help-content">
          <h2>How to Use Threadline</h2>

          <div className="help-video-placeholder">
            {/* Replace this with a real video embed later */}
            <div className="video-frame">
              <p style={{ color: "white" }}>Video Placeholder</p>
            </div>
          </div>

          <div className="help-notes">
            <h3>Key Notes</h3>

            <h4>Dashboard</h4>
            <ul>
              <li>Lists job components or sub-jobs that are pinned (first priority).</li>
              <li>Analytics window details ordered and received parts for progress.</li>
              <li>Notifications pop up to provide reminders on pinned jobs and order due dates.</li>
            </ul>

            <h4>Schedule</h4>
            <ul>
              <li>Provides a detailed list of all the jobs with search and filter options.</li>
            </ul>

            <h4>Analytics</h4>
            <ul>
              <li>Provides graphs for order types, completion, and volume across timeframes.</li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

export default Help;
