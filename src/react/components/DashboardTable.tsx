import "../styles/Dashboard.css";

import { useEffect, useState } from "react";
import { FaEdit, FaThumbtack } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

import { getSubJobsByJobId } from "../api/subJobAPI";
import { updateJob } from "../api/jobAPI";
import { FaThumbtackSlash } from "react-icons/fa6";

interface DashboardTableProps {
  jobsParams: Array<Job>;
}

function DashboardTable({ jobsParams }: DashboardTableProps) {
  const [jobs, setJobs] = useState<Job[]>(jobsParams);

  const navigate = useNavigate();
  const handleEditIcon = async (job: Job) => {
    if (!job._id) {
      return;
    }

    const subJobsPromise = getSubJobsByJobId(job._id);
    const [subJobs] = await Promise.all([subJobsPromise]);
    navigate("/Schedule", {
      state: {
        selectedJob: job,
        selectedSubJobs: subJobs,
      },
    });
  };

  const handlePinIcon = (job: Job) => {
    if (!job._id) {
      return;
    }

    // Aternate job isPinned to true/false
    let isPinned: boolean = job.isPinned ? job.isPinned : false;
    if (job.isPinned) {
      isPinned = false;
    } else {
      isPinned = true;
    }

    // Create updated job obj
    const temp: Job = {
      _id: job._id,
      client: job.client,
      name: job.name,
      type: job.type,
      due: job.due,
      isPinned: isPinned,
      isArchived: job.isArchived
    };

    updateJob(temp);
    window.location.reload();
  };

  useEffect(() => {
    setJobs(jobsParams);
  }, [jobsParams]);

  return (
    <div className="job-list">
      <div className="job-list-header">
        <span>Client</span>
        <span>PO#</span>
        <span>Invoice No.</span>
        <span>Job Name</span>
        <span>Job Type</span>
        <span>Due</span>
      </div>
      {jobs.map((job: Job) => (
        <div key={String(job._id)} className="job-list-row">
          <span>{job.client}</span>
          <span>{job.poNumber || "—"}</span>
          <span>{job.invoiceId}</span>
          <span>{job.name}</span>
          <span>{job.type}</span>
          <span
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <span>{String(job.due)}</span>
            <span className="icon-wrapper-vertical">
              {job.isPinned === true ? (
                <FaThumbtackSlash
                  onClick={() => handlePinIcon(job)}
                  className="icon-pin"
                />
              ) : (
                <FaThumbtack
                  onClick={() => handlePinIcon(job)}
                  className="icon-pin"
                />
              )}

              <FaEdit
                onClick={() => handleEditIcon(job)}
                className="icon-edit"
              />
            </span>
          </span>
        </div>
      ))}
    </div>
  );
}

export default DashboardTable;
