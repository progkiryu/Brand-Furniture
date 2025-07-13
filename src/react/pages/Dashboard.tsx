import "../styles/Dashboard.css";
import "../styles/Global.css";
import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";
import SubJobTable from "../components/SubJobTable.tsx";
import JobAnalytics from "../components/JobAnalytics";
import NotificationsList from "../components/NotificationsList";
import { DBLink } from "../App.tsx";
import { FaEdit, FaThumbtack } from "react-icons/fa";

// ------------------------------TESTING------------------------------
// REMOVE THIS LATER
import {
  createFrame,
  deleteFrameById,
  getAllFrames,
  getFrameById,
  UpdateFrame,
} from "../api/frameAPI.tsx";
// ------------------------------TESTING------------------------------

// type Notif = {
//   icon?: React.ReactNode;
//   title: string;
//   description: string;
//   time: string;
// };

const staticNotifs: Notif[] = [
  {
    icon: "cart",
    title: "Order Due",
    description: "Order due in 2 days.",
    time: "9:41 AM",
  },
  {
    icon: "pin",
    title: "Pinned Item",
    description: "It has been 6 days since you last pinned this order.",
    time: "9:41 AM",
  },
  {
    icon: "cart",
    title: "Order Due",
    description: "Order due in 7 days.",
    time: "9:41 AM",
  },
];


function Dashboard() {
  const [subJobs, setSubJobs] = useState<Array<SubJob>>([]);
  const [jobs, setJobs] = useState<Array<Job>>([]);
  const [notifs, setNotifs] = useState<Array<Notif>>([]);
  const [allFrames, setAllFrames] = useState<Frame[]>([]);
  const [frame, setFrame] = useState<Frame>();

  // // ------------------------------TESTING------------------------------
  // // REMOVE THIS LATER
  // const tempFrame: Frame = {
  //   subJobId: "change 1",
  //   supplier: "Big Ounce",
  //   _id: "686b32490a06936ecbd0c992",
  // };

  // const tempFrameForCreation: Frame = {
  //   subJobId: "1234567890",
  //   supplier: "Big Ounce",
  // };

  // const handleGetAllFrames = async () => {
  //   const allFrames = await getAllFrames();
  //   setAllFrames(allFrames);
  //   console.log("handleGetAllFrames: Done.");
  // };

  // const handleGetFrameById = async () => {
  //   if (!tempFrame._id) {
  //     tempFrame._id = "";
  //   }
  //   const frame = await getFrameById(tempFrame._id);
  //   setFrame(frame);
  //   console.log("handleGetFrameById: Done.");
  // };

  // const handleCreateFrame = async () => {
  //   await createFrame(tempFrameForCreation);
  //   console.log("handleCreateFrame: Done.");
  // };

  // const handleDeleteFrame = async () => {
  //   if (!tempFrame._id) {
  //     tempFrame._id = "";
  //   }
  //   await deleteFrameById(tempFrame._id);
  //   console.log("handleDeleteFrame: Done.");
  // };

  // const handleUpdateFrame = async () => {
  //   await UpdateFrame(tempFrame);
  //   console.log("handleUpdateFrame: Done.");
  // };

  // const handleConsoleLogger = () => {
  //   console.log("All Frames:");
  //   allFrames.map((frame) => {
  //     console.log(frame);
  //   });
  //   console.log("Single Frame:");
  //   console.log(frame);
  // };

  // // retrieve sub-jobs by making a API fetch call
  useEffect(() => {
    fetch(`${DBLink}/subJob/getAllSubJobs`)
      .then((res) => res.json())
      .then((data) => setSubJobs(data))
      .catch((err) => console.log(err));

    fetch(`${DBLink}/job/getAllJobs`)
      .then((res) => res.json())
      .then((data) => setJobs(data))
      .catch((err) => console.log(err));

    // fetch(`${DBLink}/notifications/getAllNotifications`)
    //   .then((res) => res.json())
    //   .then((data) => setNotifs(data))
    //   .catch((err) => console.log(err));

    const sampleNotifs: Notif[] = [
  {
    title: "Order Due",
    description: "Order due in 2 days.",
    time: "9:41 AM",
  },
  {
    title: "Pinned Item",
    description: "It has been 6 days since you last pinned this order.",
    time: "9:41 AM",
  },
  {
    title: "Order Due",
    description: "Order due in 7 days.",
    time: "9:41 AM",
  },
];

setNotifs(sampleNotifs);

  }, []);

  return (
    <>
      <Navbar />
      <div id="first-container">
        {/*------------------------------TESTING------------------------------*/}
        {/* REMOVE THIS LATER */}
        {/* <button onClick={handleGetAllFrames}>getAllFrames</button>
        <button onClick={handleGetFrameById}>getFrameById</button>
        <button onClick={handleCreateFrame}>createFrame</button>
        <button onClick={handleDeleteFrame}>deleteFrame</button>
        <button onClick={handleUpdateFrame}>updateFrame</button>
        <button onClick={handleConsoleLogger}>THE CONSOLE LOG BUTTON</button> */}
        {/*------------------------------TESTING------------------------------*/}

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
                <div className="job-list">
            <div className="job-list-header">
              <span>Client</span>
              <span>PO#</span>
              <span>INV.</span>
              <span>Job Name</span>
              <span>Job Type</span>
              <span>Due</span>
            </div>

{jobs.map((job) => (
  <div key={String(job._id)} className="job-list-row">
    <span>{job.client}</span>
    <span>{job.poNumber || "—"}</span>
    <span>{job.invoiceId || "—"}</span>
    <span>{job.name}</span>
    <span>{job.type}</span>
    <span style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
      <span>{new Date(job.due).toLocaleDateString()}</span>
      <span className="icon-wrapper-vertical">
        <FaThumbtack className="icon-pin" />
        <FaEdit className="icon-edit" />
      </span>
    </span>
  </div>
))}
</div>

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
