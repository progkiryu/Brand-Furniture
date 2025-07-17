import "../styles/Dashboard.css"

import { useEffect, useState } from "react";
import { FaEdit, FaThumbtack } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

import { getSubJobsByJobId } from "../api/subJobAPI";

interface DashboardTableProps {
  jobsParams: Array<Job>
}

function DashboardTable({ jobsParams }: DashboardTableProps) {

  const [ jobs, setJobs ] = useState<Job[]>(jobsParams);
  
  const navigate = useNavigate();
  const navigateSchedule = async (job: Job) => {
    if (job._id) {
      const subJobsPromise = getSubJobsByJobId(job._id);
      const [subJobs] = await Promise.all([subJobsPromise]);
      navigate("/Schedule", {state: {
        selectedJob: job, selectedSubJobs: subJobs
      }});
    }
  }
  
  useEffect(() => {
    setJobs(jobsParams);
  }, [jobsParams]);

  return (
    <div className="job-list">
      <div className="job-list-header">
        <span>Client</span>
        <span>Invoice No.</span>
        <span>Job Name</span>
        <span>Job Type</span>
        <span>Due</span>
      </div>
      {
        jobs.map((job: Job) => 
          (<div key={String(job._id)} className="job-list-row" onClick={() => navigateSchedule(job)}>
            <span>{job.client}</span>
            <span>{job.invoiceId}</span>
            <span>{job.name}</span>
            <span>{job.type}</span>
            <span style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span>{String(job.due)}</span>
              <span className="icon-wrapper-vertical">
                <FaThumbtack className="icon-pin" />
                <FaEdit className="icon-edit" />
              </span>
            </span>
          </div>)
        )
      }
    </div>
  );
};

export default DashboardTable;
