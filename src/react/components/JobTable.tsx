import { useState, useEffect } from "react";
import { FaEdit, FaThumbtack } from "react-icons/fa";

import "../styles/JobTable.css";
import { FaThumbtackSlash } from "react-icons/fa6";

import { updateJob, getJobById, multiFilterSearch } from "../api/jobAPI";
import { getFramesByStatus } from "../api/frameAPI";
import { getCushionsByStatus } from "../api/cushionAPI";
import { getUpholsteryByStatus } from "../api/upholsteryAPI";
import { getSubJobById } from "../api/subJobAPI";

interface JobTableProps {
  searchTerm: string;
  invoiceIDTerm?: "asc" | "desc";
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
  invoiceIDTerm,
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

  const handleMultiFilter = async () => {
    var filteredJobs: Job[] = [];
    var props: RequestProps = { searchTerm: searchTerm, archiveTerm: String(archiveTerm) };
    if (invoiceIDTerm) {
      invoiceIDTerm === "asc" ? props.invoiceIdTerm = "ascending" : props.invoiceIdTerm = "descending";
    }
    if (clientTerm) {
      clientTerm === "asc" ? props.clientTerm = "ascending" : props.clientTerm = "descending";
    }
    if (jobNameTerm) {
      jobNameTerm === "asc" ? props.jobNameTerm = "ascending" : props.jobNameTerm = "descending";
    }
    if (dueDateTerm) {
      dueDateTerm === "asc" ? props.dueDateTerm = "ascending" : props.dueDateTerm = "descending";
    }
    if (yearTerm !== "--") {
      props.yearTerm = yearTerm;
    }
    filteredJobs = await multiFilterSearch(props);
    return filteredJobs;
  }

  const statusFilter = async (
    sortedJobs: Job[],
  ) => {
    var jobIdSet = new Set<string>();
    if (cutTerm === true) {
      const cutJobSet = new Set<Job>();
      const cutSubJobSet = new Set<SubJob>();

      const cutUpholstery: Cushion[] = await getCushionsByStatus("Upholstery Cut");
      const cutCushionPromise = cutUpholstery.map(async (cushion: Cushion) => {
        const cutSubJob = await getSubJobById(cushion.subJobId);
        if (cutSubJob) cutSubJobSet.add(cutSubJob);
      });

      await Promise.all(cutCushionPromise);
      
      if (cutSubJobSet.size > 0) {
        const cutSubJobArray = [...cutSubJobSet];
        const cutSubJobPromise = cutSubJobArray.map(async (subJob: SubJob) => {
          const cutJob = await getJobById(subJob.jobId);
          if (cutJob) cutJobSet.add(cutJob);
        });

        await Promise.all(cutSubJobPromise);

        if (cutJobSet.size > 0) {
          const cutJobArray = [...cutJobSet];
          cutJobArray.map((job: Job) => {
            if (job._id) jobIdSet.add(job._id);
          });
        }
      }
    }
    if (upholsterTerm === true) {
      const upholsterJobSet = new Set<Job>();
      const upholsterSubJobSet = new Set<SubJob>();

      const upholsterUpholstery: Upholstery[] = await getUpholsteryByStatus("Body Upholstered");
      const upholsterUpholsteryPromise = upholsterUpholstery.map(async (upholster: Upholstery) => {
        const upholsterSubJob = await getSubJobById(upholster.subJobId);
        if (upholsterSubJob) upholsterSubJobSet.add(upholsterSubJob);
      });

      await Promise.all(upholsterUpholsteryPromise);

      const upholsterCushions: Cushion[] = await getCushionsByStatus("Body Upholstered");
      const upholsterCushionPromise = upholsterCushions.map(async (cushion: Cushion) => {
        const cushionSubJob = await getSubJobById(cushion.subJobId);
        if (cushionSubJob) upholsterSubJobSet.add(cushionSubJob);
      });

      await Promise.all(upholsterCushionPromise);

      if (upholsterSubJobSet.size > 0) {
        const upholsterSubJobArray = [...upholsterSubJobSet];
        const upholsterSubJobPromise = upholsterSubJobArray.map(async (subJob: SubJob) => {
          const upholsterJob = await getJobById(subJob.jobId);
          if (upholsterJob) upholsterJobSet.add(upholsterJob);
        });

        await Promise.all(upholsterSubJobPromise);

        if (upholsterJobSet.size > 0) {
          const upholsterJobArray = [...upholsterJobSet];
          upholsterJobArray.map((job: Job) => {
            if (job._id) jobIdSet.add(job._id);
          });
        }
      }
    }

    if (sewnTerm === true) {
      const sewnJobSet = new Set<Job>();
      const sewnSubJobSet = new Set<SubJob>();

      const sewnCushions: Cushion[] = await getCushionsByStatus("Upholstery Sewn");
      const sewnCushionsPromise = sewnCushions.map(async (cushion: Cushion) => {
        const sewnSubJob = await getSubJobById(cushion.subJobId);
        if (sewnSubJob) sewnSubJobSet.add(sewnSubJob);
      });

      await Promise.all(sewnCushionsPromise);

      if (sewnSubJobSet.size > 0) {
        const sewnSubJobArray = [...sewnSubJobSet];
        const sewnSubJobPromise = sewnSubJobArray.map(async (subJob: SubJob) => {
          const sewnJob = await getJobById(subJob.jobId);
          if (sewnJob) sewnJobSet.add(sewnJob);
        });

        await Promise.all(sewnSubJobPromise);

        if (sewnJobSet.size > 0) {
          const sewnJobArray = [...sewnJobSet];
          sewnJobArray.map(async (job: Job) => {
            if (job._id) jobIdSet.add(job._id);
          });
        }
      }
    }
    if (foamedTerm === true) {
      const foamedJobSet = new Set<Job>();
      const foamedSubJobSet = new Set<SubJob>();

      const foamedFrames: Frame[] = await getFramesByStatus("Frame Foamed");
      const foamedFramesPromise = foamedFrames.map(async (frame: Frame) => {
        const frameSubJob = await getSubJobById(frame.subJobId);
        if (frameSubJob) foamedSubJobSet.add(frameSubJob);
      });

      await Promise.all(foamedFramesPromise);

      if (foamedSubJobSet.size > 0) {
        const foamedSubJobArray = [...foamedSubJobSet];
        const foamedSubJobPromise = foamedSubJobArray.map(async (subJob: SubJob) => {
          const foamedJob = await getJobById(subJob.jobId);
          if (foamedJob) foamedJobSet.add(foamedJob);
        });

        await Promise.all(foamedSubJobPromise);

        if (foamedJobSet.size > 0) {
          const foamedJobArray = [...foamedJobSet];
          foamedJobArray.map((job: Job) => {
            if (job._id) jobIdSet.add(job._id);
          });
        }
      }
    }
    if (completeTerm === true) {
      const completeJobSet = new Set<Job>();
      const completeSubJobSet = new Set<SubJob>();

      const completeFrames: Frame[] = await getFramesByStatus("Complete");
      const completeFramesPromise = completeFrames.map(async (frame: Frame) => {
        const frameSubJob = await getSubJobById(frame.subJobId);
        if (frameSubJob) completeSubJobSet.add(frameSubJob);
      });

      await Promise.all(completeFramesPromise);

      const completeCushions: Cushion[] = await getCushionsByStatus("Complete");
      const completeCushionsPromise = completeCushions.map(async (cushion: Cushion) => {
        const cushionSubJob = await getSubJobById(cushion.subJobId);
        if (cushionSubJob) completeSubJobSet.add(cushionSubJob);
      }); 

      await Promise.all(completeCushionsPromise);

      const completeUpholstery: Upholstery[] = await getUpholsteryByStatus("Complete");
      const completeUpholsteryPromise = completeUpholstery.map(async (upholster: Upholstery) => {
        const upholsterSubJob = await getSubJobById(upholster.subJobId);
        if (upholsterSubJob) completeSubJobSet.add(upholsterSubJob);
      });

      await Promise.all(completeUpholsteryPromise);

      if (completeSubJobSet.size > 0) {
        const completeSubJobArray = [...completeSubJobSet];
        const completeSubJobPromise = completeSubJobArray.map(async (subJob: SubJob) => {
          const completeJob = await getJobById(subJob.jobId);
          if (completeJob) completeJobSet.add(completeJob);
        });

        await Promise.all(completeSubJobPromise);

        if (completeJobSet.size > 0) {
          const completeJobArray = [...completeJobSet];
          completeJobArray.map(async (job: Job) => {
            if (job._id) jobIdSet.add(job._id);
          });
        }
      }
    }
    if (productionTerm === true) {
      const productionJobSet = new Set<Job>();
      const productionSubJobSet = new Set<SubJob>();

      const productionFrames: Frame[] = await getFramesByStatus("Complete");
      const productionFramesPromise = productionFrames.map(async (frame: Frame) => {
        const frameSubJob = await getSubJobById(frame.subJobId);
        if (frameSubJob) productionSubJobSet.add(frameSubJob);
      });

      await Promise.all(productionFramesPromise);

      const productionCushions: Cushion[] = await getCushionsByStatus("Complete");
      const productionCushionsPromise = productionCushions.map(async (cushion: Cushion) => {
        const productionSubJob = await getSubJobById(cushion.subJobId);
        if (productionSubJob) productionSubJobSet.add(productionSubJob);
      }); 

      await Promise.all(productionCushionsPromise);

      const productionUpholstery: Upholstery[] = await getUpholsteryByStatus("Complete");
      const productionUpholsteryPromise = productionUpholstery.map(async (upholster: Upholstery) => {
        const productionSubJob = await getSubJobById(upholster.subJobId);
        if (productionSubJob) productionSubJobSet.add(productionSubJob);
      });

      await Promise.all(productionUpholsteryPromise);

      if (productionSubJobSet.size > 0) {
        const completeSubJobArray = [...productionSubJobSet];
        const completeSubJobPromise = completeSubJobArray.map(async (subJob: SubJob) => {
          const completeJob = await getJobById(subJob.jobId);
          if (completeJob) productionJobSet.add(completeJob);
        });

        await Promise.all(completeSubJobPromise);

        if (productionJobSet.size > 0) {
          const productionJobArray = [...productionJobSet];
          productionJobArray.map(async (job: Job) => {
            if (job._id) jobIdSet.add(job._id);
          });
        }
      }
    }
    if (jobIdSet.size > 0) {
      const jobIdArray = [...jobIdSet];
      const newJobs: Job[] = [];
      const jobsPromise = jobIdArray.map(async (id: string) => {
        const newJob = await getJobById(id);
        if (newJob) newJobs.push(newJob);
      });

      await Promise.all(jobsPromise);

      sortedJobs = newJobs;
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
    const filter = async () => {
      let filtered = jobs;
      filtered = await handleMultiFilter();
      // filtered = await statusFilter(filtered);
      // filtered = archiveFilter(filtered, archiveTerm);
      // filtered = yearFilter(filtered, yearTerm);
      setDisplayedJobs(filtered);
    }
    filter();
  }, [
    searchTerm,
    jobs,
    subJobs,
    frames,
    cushions,
    upholstery,
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
