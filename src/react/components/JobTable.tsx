import { useState, useEffect } from "react";
import { FaEdit, FaThumbtack } from "react-icons/fa";

import "../styles/JobTable.css";
import { FaThumbtackSlash } from "react-icons/fa6";
import { updateJob } from "../api/jobAPI";

interface JobTableProps {
  searchTerm: string;
  jobNameTerm?: "asc" | "desc";
  clientTerm?: "asc" | "desc";
  dueDateTerm?: "asc" | "desc";
  yearTerm: string;
  jobs: Job[];
  subJobs: SubJob[];
  frames: Frame[];
  cushions: Cushion[];
  upholstery: Upholstery[];
  cutTerm: boolean;
  sewnTerm: boolean;
  upholsterTerm: boolean;
  foamedTerm: boolean;
  completeTerm: boolean;
  productionTerm: boolean;
  archiveTerm: boolean;
  handleJobClick: (job: Job) => Promise<void>;
  onEditJobClick: (job: Job) => void;
  initialSelectedJobId?: string | null;
}

function JobTable({
  searchTerm,
  jobs,
  subJobs,
  frames,
  cushions,
  upholstery,
  cutTerm,
  sewnTerm,
  upholsterTerm,
  foamedTerm,
  completeTerm,
  productionTerm,
  archiveTerm,
  handleJobClick,
  clientTerm,
  dueDateTerm,
  jobNameTerm,
  yearTerm,
  onEditJobClick,
  initialSelectedJobId,
}: JobTableProps) {
  const [displayedJobs, setDisplayedJobs] = useState<Job[]>(jobs);
  // State to hold both jobId and invoiceId for the selected job

  useEffect(() => {
    setSelectedJobId(initialSelectedJobId || null);
  }, [initialSelectedJobId]);

  const searchFilter = (searchTerm: String) => {
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    const filteredJobs = jobs.filter((job) => {
      if (job.name.toLowerCase().includes(lowerCaseSearchTerm)) {
        return true;
      }
    });
    return filteredJobs;
  };

  const ascDescFilter = (
    sortedJobs: Job[],
    invoiceIDTerm?: "asc" | "desc",
    jobNameTerm?: "asc" | "desc",
    clientTerm?: "asc" | "desc",
    dueDateTerm?: "asc" | "desc"
  ) => {
    if (invoiceIDTerm) {
      if (invoiceIDTerm === "asc") {
        sortedJobs.sort((a, b) => {
          const invoiceIdA = a.invoiceId?.toLowerCase() || "";
          const invoiceIdB = b.invoiceId?.toLowerCase() || "";
          return invoiceIdA.localeCompare(invoiceIdB);
        });
      } else if (invoiceIDTerm === "desc") {
        sortedJobs.sort((a, b) => {
          const invoiceIdA = a.invoiceId?.toLowerCase() || "";
          const invoiceIdB = b.invoiceId?.toLowerCase() || "";
          return invoiceIdB.localeCompare(invoiceIdA);
        });
      }
    }
    if (jobNameTerm) {
      if (jobNameTerm === "asc") {
        sortedJobs.sort((a, b) => {
          const jobNameA = a.name.toLowerCase();
          const jobNameB = b.name.toLowerCase();
          return jobNameA.localeCompare(jobNameB);
        });
      } else if (jobNameTerm === "desc") {
        sortedJobs.sort((a, b) => {
          const jobNameA = a.name.toLowerCase();
          const jobNameB = b.name.toLowerCase();
          return jobNameB.localeCompare(jobNameA);
        });
      }
    }
    if (clientTerm) {
      if (clientTerm === "asc") {
        sortedJobs.sort((a, b) => {
          const clientA = a.client.toLowerCase();
          const clientB = b.client.toLowerCase();
          return clientA.localeCompare(clientB);
        });
      } else if (clientTerm === "desc") {
        sortedJobs.sort((a, b) => {
          const clientA = a.client.toLowerCase();
          const clientB = b.client.toLowerCase();
          return clientB.localeCompare(clientA);
        });
      }
    }
    if (dueDateTerm) {
      if (dueDateTerm === "asc") {
        sortedJobs.sort((a, b) => {
          const dueDateA = String(a.due).toLowerCase();
          const dueDateB = String(b.due).toLowerCase();
          return dueDateA.localeCompare(dueDateB);
        });
      } else if (dueDateTerm === "desc") {
        sortedJobs.sort((a, b) => {
          const dueDateA = String(a.due).toLowerCase();
          const dueDateB = String(b.due).toLowerCase();
          return dueDateB.localeCompare(dueDateA);
        });
      }
    }
    return sortedJobs;
  };

  const statusFilter = (
    sortedJobs: Job[],
    cutTerm: boolean,
    sewnTerm: boolean,
    upholsterTerm: boolean,
    foamedTerm: boolean,
    completeTerm: boolean,
    productionTerm: boolean
  ) => {
    const statusJobSet = new Set<Job>();
    if (cutTerm === true) {
      const cutJobSet = new Set<Job>();
      const cutSubJobSet = new Set<SubJob>();
      const cutCushions: Cushion[] = cushions.filter((cushion: Cushion) => {
        if (cushion.status === "Upholstery Cut") return true;
      });
      cutCushions.map((cushion: Cushion) => {
        const cutSubJob = subJobs.find(
          (subJob: SubJob) => subJob._id === cushion.subJobId
        );
        if (cutSubJob) cutSubJobSet.add(cutSubJob);
      });
      if (cutSubJobSet.size > 0) {
        const cutSubJobArray = [...cutSubJobSet];
        cutSubJobArray.map((subJob: SubJob) => {
          const cutJob = jobs.find((job: Job) => job._id === subJob.jobId);
          if (cutJob) cutJobSet.add(cutJob);
        });
        if (cutJobSet.size > 0) {
          const cutJobArray = [...cutJobSet];
          cutJobArray.map((job: Job) => {
            statusJobSet.add(job);
          });
        }
      } else {
        sortedJobs = [];
      }
      console.log(statusJobSet);
    }
    if (upholsterTerm === true) {
      const upholsterJobSet = new Set<Job>();
      const upholsterSubJobSet = new Set<SubJob>();

      const upholsterUpholstery: Upholstery[] = upholstery.filter(
        (upholster: Upholstery) => {
          if (upholster.status === "Body Upholstered") return true;
        }
      );
      upholsterUpholstery.map((upholster: Upholstery) => {
        const upholsterSubJob = subJobs.find(
          (subJob: SubJob) => subJob._id === upholster.subJobId
        );
        if (upholsterSubJob) upholsterSubJobSet.add(upholsterSubJob);
      });
      const upholsterCushions: Cushion[] = cushions.filter(
        (cushion: Cushion) => {
          if (cushion.status === "Body Upholstered") return true;
        }
      );
      upholsterCushions.map((cushion: Cushion) => {
        const upholsterSubJob = subJobs.find(
          (subJob: SubJob) => subJob._id === cushion.subJobId
        );
        if (upholsterSubJob) upholsterSubJobSet.add(upholsterSubJob);
      });

      if (upholsterSubJobSet.size > 0) {
        const upholsterSubJobArray = [...upholsterSubJobSet];
        upholsterSubJobArray.map((subJob: SubJob) => {
          const upholsterJob = jobs.find(
            (job: Job) => job._id === subJob.jobId
          );
          if (upholsterJob) upholsterJobSet.add(upholsterJob);
        });
        if (upholsterJobSet.size > 0) {
          const upholsterJobArray = [...upholsterJobSet];
          upholsterJobArray.map((job: Job) => {
            statusJobSet.add(job);
          });
        }
      } else {
        sortedJobs = [];
      }
    }
    if (sewnTerm === true) {
      const sewnJobSet = new Set<Job>();
      const sewnSubJobSet = new Set<SubJob>();

      const sewnCushions: Cushion[] = cushions.filter((cushion: Cushion) => {
        if (cushion.status === "Upholstery Sewn") return true;
      });
      sewnCushions.map((cushion: Cushion) => {
        const sewnSubJob = subJobs.find(
          (subJob: SubJob) => subJob._id === cushion.subJobId
        );
        if (sewnSubJob) sewnSubJobSet.add(sewnSubJob);
      });
      if (sewnSubJobSet.size > 0) {
        const sewnSubJobArray = [...sewnSubJobSet];
        sewnSubJobArray.map((subJob: SubJob) => {
          const sewnJob = jobs.find((job: Job) => job._id === subJob.jobId);
          if (sewnJob) sewnJobSet.add(sewnJob);
        });
        if (sewnJobSet.size > 0) {
          const sewnJobArray = [...sewnJobSet];
          sewnJobArray.map((job: Job) => {
            statusJobSet.add(job);
          });
        }
      } else {
        sortedJobs = [];
      }
    }
    if (foamedTerm === true) {
      const foamedJobSet = new Set<Job>();
      const foamedSubJobSet = new Set<SubJob>();

      const foamedFrames: Frame[] = frames.filter((frame: Frame) => {
        if (frame.status === "Frame Foamed") return true;
      });
      foamedFrames.map((frame: Frame) => {
        const foamedSubJob = subJobs.find(
          (subJob: SubJob) => subJob._id === frame.subJobId
        );
        if (foamedSubJob) foamedSubJobSet.add(foamedSubJob);
      });
      if (foamedSubJobSet.size > 0) {
        const foamedSubJobArray = [...foamedSubJobSet];
        foamedSubJobArray.map((subJob: SubJob) => {
          const foamedJob = jobs.find((job: Job) => job._id === subJob.jobId);
          if (foamedJob) foamedJobSet.add(foamedJob);
        });
        if (foamedJobSet.size > 0) {
          const foamedJobArray = [...foamedJobSet];
          foamedJobArray.map((job: Job) => {
            statusJobSet.add(job);
          });
        }
      } else {
        sortedJobs = [];
      }
    }
    if (completeTerm === true) {
      const completeJobSet = new Set<Job>();
      const completeSubJobSet = new Set<SubJob>();

      const completeFrames: Frame[] = frames.filter((frame: Frame) => {
        if (frame.status === "Complete") return true;
      });
      completeFrames.map((frame: Frame) => {
        const completeSubJob = subJobs.find(
          (subJob: SubJob) => subJob._id === frame.subJobId
        );
        if (completeSubJob) completeSubJobSet.add(completeSubJob);
      });

      const completeCushions: Cushion[] = cushions.filter(
        (cushion: Cushion) => {
          if (cushion.status === "Complete") return true;
        }
      );
      completeCushions.map((cushion: Cushion) => {
        const completeSubJob = subJobs.find(
          (subJob: SubJob) => subJob._id === cushion.subJobId
        );
        if (completeSubJob) completeSubJobSet.add(completeSubJob);
      });

      const completeUpholstery: Upholstery[] = upholstery.filter(
        (upholster: Upholstery) => {
          if (upholster.status === "Complete") return true;
        }
      );
      completeUpholstery.map((upholster: Upholstery) => {
        const completeSubJob = subJobs.find(
          (subJob: SubJob) => subJob._id === upholster.subJobId
        );
        if (completeSubJob) completeSubJobSet.add(completeSubJob);
      });

      if (completeSubJobSet.size > 0) {
        const completeSubJobArray = [...completeSubJobSet];
        completeSubJobArray.map((subJob: SubJob) => {
          const completeJob = jobs.find((job: Job) => job._id === subJob.jobId);
          if (completeJob) completeJobSet.add(completeJob);
        });
        if (completeJobSet.size > 0) {
          const completeJobArray = [...completeJobSet];
          completeJobArray.map((job: Job) => {
            statusJobSet.add(job);
          });
        }
      } else {
        sortedJobs = [];
      }
    }
    if (productionTerm === true) {
      const productionJobSet = new Set<Job>();
      const productionSubJobSet = new Set<SubJob>();

      const productionFrames: Frame[] = frames.filter((frame: Frame) => {
        if (frame.status === "In Production") return true;
      });
      productionFrames.map((frame: Frame) => {
        const productionSubJob = subJobs.find(
          (subJob: SubJob) => subJob._id === frame.subJobId
        );
        if (productionSubJob) productionSubJobSet.add(productionSubJob);
      });

      const productionCushions: Cushion[] = cushions.filter(
        (cushion: Cushion) => {
          if (cushion.status === "In Production") return true;
        }
      );
      productionCushions.map((cushion: Cushion) => {
        const productionSubJob = subJobs.find(
          (subJob: SubJob) => subJob._id === cushion.subJobId
        );
        if (productionSubJob) productionSubJobSet.add(productionSubJob);
      });

      const productionUpholstery: Upholstery[] = upholstery.filter(
        (upholster: Upholstery) => {
          if (upholster.status === "In Production") return true;
        }
      );
      productionUpholstery.map((upholster: Upholstery) => {
        const productionSubJob = subJobs.find(
          (subJob: SubJob) => subJob._id === upholster.subJobId
        );
        if (productionSubJob) productionSubJobSet.add(productionSubJob);
      });

      if (productionSubJobSet.size > 0) {
        const productionSubJobArray = [...productionSubJobSet];
        productionSubJobArray.map((subJob: SubJob) => {
          const productionJob = jobs.find(
            (job: Job) => job._id === subJob.jobId
          );
          if (productionJob) productionJobSet.add(productionJob);
        });
        if (productionJobSet.size > 0) {
          const productionJobArray = [...productionJobSet];
          productionJobArray.map((job: Job) => {
            statusJobSet.add(job);
          });
        }
      } else {
        sortedJobs = [];
      }
    }
    if (statusJobSet.size > 0) {
      sortedJobs = [...statusJobSet];
    }
    return sortedJobs;
  };

  const archiveFilter = (sortedJobs: Job[], archiveTerm: boolean) => {
    if (archiveTerm === true) {
      sortedJobs = sortedJobs.filter((job: Job) => {
        if (job.isArchived === true) return true;
      });
    } else {
      sortedJobs = sortedJobs.filter((job: Job) => {
        if (job.isArchived === false) return true;
      });
    }
    return sortedJobs;
  };

  const yearFilter = (sortedJobs: Job[], yearTerm: string) => {
    if (yearTerm !== "--") {
      const yearJobs: Job[] = [];
      const yearNumber = parseInt(yearTerm);
      sortedJobs.map((job: Job) => {
        const jobYear = parseInt(String(job.due).substring(0, 4));
        if (jobYear === yearNumber) yearJobs.push(job);
      });
      sortedJobs = yearJobs;
    }
    return sortedJobs;
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
    };
    updateJob(temp);
    window.location.reload();
  };

  useEffect(() => {
    let filtered = [...jobs];
    filtered = searchFilter(searchTerm);
    filtered = ascDescFilter(filtered, jobNameTerm, clientTerm, dueDateTerm);
    filtered = statusFilter(
      filtered,
      cutTerm,
      sewnTerm,
      upholsterTerm,
      foamedTerm,
      completeTerm,
      productionTerm
    );
    filtered = archiveFilter(filtered, archiveTerm);
    filtered = yearFilter(filtered, yearTerm);
    setDisplayedJobs(filtered);
  }, [
    searchTerm,
    jobs,
    subJobs,
    frames,
    cushions,
    upholstery,
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
  ]);

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
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default JobTable;
