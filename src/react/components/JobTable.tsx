import { useState, useEffect } from "react";
import { FaEdit, FaThumbtack } from "react-icons/fa";

import "../styles/JobTable.css";
import { FaThumbtackSlash } from "react-icons/fa6";

import { updateJob, multiFilterSearch } from "../api/jobAPI";

interface JobTableProps {
  searchTerm: string;
  invoiceIDTerm?: "asc" | "desc";
  jobNameTerm?: "asc" | "desc";
  clientTerm?: "asc" | "desc";
  dueDateTerm?: "asc" | "desc";
  yearTerm: string;
  cutTerm: boolean;
  sewnTerm: boolean;
  upholsterTerm: boolean;
  foamedTerm: boolean;
  completeTerm: boolean;
  productionTerm: boolean;
  archiveTerm: boolean;
  reload: boolean;
  checkedJobs: Job[];
  handleJobClick: (job: Job) => Promise<void>;
  onEditJobClick: (job: Job) => void;
  jobDeleteClick: (checked: boolean, job: Job) => void;
  initialSelectedJobId?: string | null;
}

function JobTable({
  checkedJobs,
  searchTerm,
  cutTerm,
  sewnTerm,
  upholsterTerm,
  foamedTerm,
  completeTerm,
  productionTerm,
  archiveTerm,
  handleJobClick,
  invoiceIDTerm,
  clientTerm,
  dueDateTerm,
  jobNameTerm,
  yearTerm,
  reload,
  onEditJobClick,
  jobDeleteClick,
  initialSelectedJobId,
}: JobTableProps) {
  const [displayedJobs, setDisplayedJobs] = useState<Job[]>([]);
  // State to hold both jobId and invoiceId for the selected job

  const handleMultiFilter = async () => {
    var filteredJobs: Job[] = [];
    var props: RequestProps = {
      searchTerm: searchTerm,
      archiveTerm: String(archiveTerm),
      yearTerm: yearTerm,
      cutTerm: String(cutTerm),
      sewnTerm: String(sewnTerm),
      upholsterTerm: String(upholsterTerm),
      foamedTerm: String(foamedTerm),
      completeTerm: String(completeTerm),
      productionTerm: String(productionTerm),
    };
    if (invoiceIDTerm) {
      invoiceIDTerm === "asc"
        ? (props.invoiceIdTerm = "ascending")
        : (props.invoiceIdTerm = "descending");
    }
    if (clientTerm) {
      clientTerm === "asc"
        ? (props.clientTerm = "ascending")
        : (props.clientTerm = "descending");
    }
    if (jobNameTerm) {
      jobNameTerm === "asc"
        ? (props.jobNameTerm = "ascending")
        : (props.jobNameTerm = "descending");
    }
    if (dueDateTerm) {
      dueDateTerm === "asc"
        ? (props.dueDateTerm = "ascending")
        : (props.dueDateTerm = "descending");
    }
    if (yearTerm !== "--") {
      props.yearTerm = yearTerm;
    }
    filteredJobs = await multiFilterSearch(props);
    return filteredJobs;
  };

  const handlePinIcon = (job: Job) => {
    if (!job._id) {
      return;
    }
    // Aternate job isPinned to true/false
    let isPinned: boolean = job.isPinned ? job.isPinned : false;
    job.isPinned === true ? (isPinned = false) : (isPinned = true);
    // Create updated job obj
    const temp: Job = {
      _id: job._id,
      client: job.client,
      name: job.name,
      type: job.type,
      due: job.due,
      isPinned: isPinned,
      isArchived: job.isArchived,
      hasNoDeletedNotification: job.hasNoDeletedNotification,
    };
    updateJob(temp);
    window.location.reload();
  };

  useEffect(() => {
    const filter = async () => {
      const filtered = await handleMultiFilter();
      setDisplayedJobs(filtered);
    };
    filter();
  }, [
    searchTerm,
    invoiceIDTerm,
    clientTerm,
    dueDateTerm,
    jobNameTerm,
    yearTerm,
    cutTerm,
    sewnTerm,
    upholsterTerm,
    foamedTerm,
    completeTerm,
    productionTerm,
    archiveTerm,
    reload,
  ]);

  useEffect(() => {
    setSelectedJobId(initialSelectedJobId || null);
  }, [initialSelectedJobId]);

  const [selectedJobId, setSelectedJobId] = useState<string | null>(null);

  const onRowClick = async (job: Job) => {
    setSelectedJobId(job._id as string);
    await handleJobClick(job);
  };

  return (
    <>
      <div className="sp-jobs-container">
        <div className="job-table-header">Job List</div>
        <div className="job-list-wrapper">
          {displayedJobs.map((job) => (
            <div
              key={String(job._id)}
              className={`job-card ${
                selectedJobId === job._id ? "selected-job" : ""
              }`}
              onClick={() => onRowClick(job)}
            >
              <span className="job-name-cell">{job.name}</span>
              <div className="icon-container">
                {job.isPinned === true ? (
                  <FaThumbtackSlash
                    onClick={() => {
                      handlePinIcon(job);
                    }}
                    className="icon-pin"
                  />
                ) : (
                  <FaThumbtack
                    onClick={() => {
                      handlePinIcon(job);
                    }}
                    className="icon-pin"
                  />
                )}
                <FaEdit
                  className="icon-edit"
                  onClick={(e) => {
                    e.stopPropagation();
                    onEditJobClick(job);
                  }}
                />
                <input
                type="checkbox"
                onChange={(e) => jobDeleteClick(e.target.checked, job)}
                checked={checkedJobs.includes(job)}
                ></input>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default JobTable;
