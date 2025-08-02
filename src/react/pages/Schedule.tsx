import "../styles/Schedule.css";
import "../styles/Global.css";
import "../styles/ModalForm.css";
import "../styles/SubJobModalForm.css"; // Ensure this CSS file exists or create it if needed

import {
  createJob,
  updateJob,
  deleteJob
} from "../api/jobAPI"; // Import deleteJobById
import {
  createSubJob,
  getSubJobById,
  updateSubJob,
  deleteSubJob,
  getSubJobsByJobId,
} from "../api/subJobAPI"; // Import deleteSubJob

import Navbar from "../components/Navbar";
import SearchBar from "../components/Searchbar"; // New component
import JobTable from "../components/JobTable"; // New component
import AddJobFormModel from "../components/AddJobFormModel";
import SubJobTable from "../components/SubJobTable";
import EditJobFormModal from "../components/EditJobFormModal";
import AddSubJobFormModal from "../components/AddSubJobFormModal";
import AddFrameFormModal from "../components/AddFrameModal";
import AddCushionFormModal from "../components/AddCushionModal";
import AddUpholsteryFormModal from "../components/AddUpholsteryModal";

// Import Edit Modals
import EditSubJobFormModal from "../components/EditSubJobFormModal";
import EditFrameFormModal from "../components/EditFrameFormModal";
import EditCushionFormModal from "../components/EditCushionFormModal";
import EditUpholsteryFormModal from "../components/EditUpholsteryFormModal";

import {
  createFrame,
  updateFrame,
  deleteFrameById,
} from "../api/frameAPI"; // Import updateFrame, deleteFrameById
import {
  createCushion,
  updateCushion,
  deleteCushionById,
} from "../api/cushionAPI"; // Import updateCushion, deleteCushionById
import {
  createUpholstery,
  updateUpholstery,
  deleteUpholstery,
} from "../api/upholsteryAPI"; // Import updateUpholstery, deleteUpholstery

import { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

function Schedule() {
  const [searchTerm, setSearchTerm] = useState<string>("");

  const [isEditJobModalOpen, setIsEditJobModalOpen] = useState(false);
  const [jobToEdit, setJobToEdit] = useState<Job | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // radio button states
  const [selectedYear, setSelectedYear] = useState<string>("--");
  const [clientAsc, setClientAsc] = useState<boolean>(false);
  const [clientDesc, setClientDesc] = useState<boolean>(false);
  const [jobNameAsc, setJobNameAsc] = useState<boolean>(false);
  const [jobNameDesc, setJobNameDesc] = useState<boolean>(false);
  const [dueDateAsc, setDueDateAsc] = useState<boolean>(false);

  const [selectedSubJobs, setSelectedSubJobs] = useState<SubJob[]>([]);
  const [isAddJobModelOpen, setIsAddJobModelOpen] = useState<boolean>(false);
  const [hasSelected, setSelected] = useState<boolean>(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const [isAddSubJobModalOpen, setIsAddSubJobModalOpen] = useState(false);
  const [selectedJobForSubJob, setSelectedJobForSubJob] = useState<Job | null>(
    null
  );

  const [filterClient, setFilterClient] = useState<
    "asc" | "desc" | undefined
  >();
  const [filterJobName, setFilterJobName] = useState<
    "asc" | "desc" | undefined
  >();
  const [filterDueDate, setFilterDueDate] = useState<
    "asc" | "desc" | undefined
  >();

  const [filterCut, setFilterCut] = useState<boolean>(false);
  const [filterSewn, setFilterSewn] = useState<boolean>(false);
  const [filterUpholster, setFilterUpholster] = useState<boolean>(false);
  const [filterFoamed, setFilterFoamed] = useState<boolean>(false);
  const [filterComplete, setFilterComplete] = useState<boolean>(false);
  const [filterProduction, setFilterProduction] = useState<boolean>(false);

  const [filterArchive, setFilterArchive] = useState<boolean>(false);

  const [isAddCushionModalOpen, setIsAddCushionModalOpen] = useState(false);
  const [isAddFrameModalOpen, setIsAddFrameModalOpen] = useState(false);

  const [isAddUpholsteryModalOpen, setIsAddUpholsteryModalOpen] =
    useState(false);

  const [selectedSubJobInfoForCushion, setSelectedSubJobInfoForCushion] =
    useState<{ subJobId: String | null; subJobDetail: String | null } | null>(
      null
    );
  const [selectedSubJobInfoForFrame, setSelectedSubJobInfoForFrame] = useState<{
    subJobId: String | null;
    subJobDetail: String | null;
  } | null>(null);
  const [selectedSubJobInfoForUpholstery, setSelectedSubJobInfoForUpholstery] =
    useState<{ subJobId: String | null; subJobDetail: String | null } | null>(
      null
    );

  const [selectedDeleteJobs, setSelectedDeleteJobs] = useState<Job[]>([]);

  // State for Edit Modals
  const [isEditSubJobModalOpen, setIsEditSubJobModalOpen] = useState(false);
  const [subJobToEdit, setSubJobToEdit] = useState<SubJob | null>(null);

  const [isEditFrameModalOpen, setIsEditFrameModalOpen] = useState(false);
  const [frameToEdit, setFrameToEdit] = useState<Frame | null>(null);

  const [isEditCushionModalOpen, setIsEditCushionModalOpen] = useState(false);
  const [cushionToEdit, setCushionToEdit] = useState<Cushion | null>(null);

  const [isEditUpholsteryModalOpen, setIsEditUpholsteryModalOpen] =
    useState(false);
  const [upholsteryToEdit, setUpholsteryToEdit] = useState<Upholstery | null>(
    null
  );

  const [reloadState, setReloadState] = useState<boolean>(false);

  const location = useLocation();
  const initialSelectedJob = location.state?.selectedJob;

  const unconditionalReload = () => {
    reloadState === false ? setReloadState(true) : setReloadState(false);
  }

  useEffect(() => {
    if (location.state !== null) {
      const { selectedJob, selectedSubJobs } = location.state;
      setSelectedSubJobs(selectedSubJobs);
      setSelectedJobForSubJob(selectedJob);
      setSelected(true);
      location.state === null;
    } 
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };

    if (dropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownOpen]);

  // Handler for when the search input changes
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleAddJob = async (newJobData: Job) => {
    const addedJob = await createJob(newJobData);
    if (addedJob) {
      setIsAddJobModelOpen(false);
      unconditionalReload();
      setSelectedDeleteJobs([]);
    } else {
      console.error("Failed to create job.");
    }
  };

  const handleEditJobClick = (job: Job) => {
    setJobToEdit(job);
    setIsEditJobModalOpen(true);
  };

  const handleDeleteJob = async (jobId: string) => {
    try {
      const jobs = await getSubJobsByJobId(jobId);
      if (jobs) {
        for (const job of jobs) {
          await deleteSubJob(job._id);
        }
      }
      const success = await deleteJob(jobId);
      if (success) {
        setSelectedSubJobs([]);
        setIsEditJobModalOpen(false);
        setJobToEdit(null);
        setSelected(false);
        unconditionalReload();
        setSelectedDeleteJobs([]);
      } else {
        console.error("Failed to delete job.");
      }
    } catch (err) {
      console.error("Error deleting job and its sub-jobs: ", err);
    }
  };

  const handleUpdateJob = async (updatedData: Job) => {
    const updatedJobFromServer = await updateJob(updatedData);
    if (updatedJobFromServer) {
      setIsEditJobModalOpen(false);
      setJobToEdit(null);
      unconditionalReload();
      setSelectedDeleteJobs([]);
    } else {
      console.error("Failed to update job.");
    }
  };

  const displayJobDetails = async (job: Job) => {
    try {
      var arr = [];
      setSelectedJobForSubJob(job);
      if (job.subJobList && job.subJobList.length > 0) {

        //   const subJobs = job.subJobList.map((subJobId: String) => {
        //   return getSubJobById(subJobId);
        // });
        // const fetchedSubJobs: SubJob[] = await Promise.all(subJobs);

        for (let i = 0; i < job.subJobList.length; i++) {
          const subJob = await getSubJobById(job.subJobList[i]);
          arr.push(subJob);
        }
        setSelectedSubJobs(arr);
      } else {
        setSelectedSubJobs([]);
      }
      setSelected(true);
    } catch (err) {
      console.log("Error deleting job:", err);
    }
  };

  const handleAddSubJob = async (newSubJobData: SubJob) => {
    if (!selectedJobForSubJob) {
      console.error("No job selected to add sub-job to.");
      return;
    }

    try {
      const addedSubJob = await createSubJob(newSubJobData);
      if (addedSubJob && addedSubJob._id) {
        const updatedSubJobList = [
          ...(selectedJobForSubJob.subJobList || []),
          addedSubJob._id,
        ];
        const jobToUpdate = {
          ...selectedJobForSubJob,
          subJobList: updatedSubJobList,
        };
        const updatedJobFromServer = await updateJob(jobToUpdate);
        if (updatedJobFromServer) {
          await displayJobDetails(updatedJobFromServer); // Ensure sub-jobs are re-fetched and updated
          setIsAddSubJobModalOpen(false);
          setSelectedJobForSubJob(updatedJobFromServer); // Update the selected job to reflect changes
        }
      }
    } catch (err) {
      console.error("Error adding sub-job:", err);
    }
  };

  const handleUpdateSubJob = async (updatedData: SubJob) => {
    const updatedSubJobFromServer = await updateSubJob(updatedData);
    if (updatedSubJobFromServer) {
      // --- NEW APPROACH ---
      if (selectedJobForSubJob) {
        await displayJobDetails(selectedJobForSubJob); // Re-fetch all sub-jobs for the current job
      }
      // --- END NEW APPROACH ---
      setIsEditSubJobModalOpen(false);
      setSubJobToEdit(null);
    } else {
      console.error("Failed to update sub-job.");
    }
  };

  const handleDeleteSubJob = async (subJobId: string) => {
    const success = await deleteSubJob(subJobId);
    if (success) {
      setSelectedSubJobs((prevSubJobs) =>
        prevSubJobs.filter((subJob) => subJob._id !== subJobId)
      );
      // Also update the parent job's subJobList
      if (selectedJobForSubJob && selectedJobForSubJob._id) {
        const updatedJob: Job = {
          ...selectedJobForSubJob,
          subJobList: selectedJobForSubJob.subJobList?.filter(
            (id) => id !== subJobId
          ),
        };
        await updateJob(updatedJob);
        setSelectedJobForSubJob(updatedJob);
      }
      setIsEditSubJobModalOpen(false);
      setSubJobToEdit(null);
    } else {
      console.error("Failed to delete sub-job.");
    }
  };

  const handleAddCushion = async (newCushionData: Cushion) => {
    const addedCushion = await createCushion(newCushionData);
    if (addedCushion) {
      // Update the subJob's cushionList
      setSelectedSubJobs((prevSubJobs) =>
        prevSubJobs.map((subJob) => {
          if (subJob._id === addedCushion.subJobId) {
            return {
              ...subJob,
              cushionList: [...(subJob.cushionList || []), addedCushion._id],
            };
          }
          return subJob;
        })
      );
      setIsAddCushionModalOpen(false); // Close modal
      setSelectedSubJobInfoForCushion(null); // Clear selected subjob info
    } else {
      console.error("Failed to create cushion.");
    }
  };

  const handleUpdateCushion = async (updatedData: Cushion) => {
    const updatedCushionFromServer = await updateCushion(updatedData);
    if (updatedCushionFromServer) {
      // Find the subJob that contains this cushion and update its cushionList (if necessary)
      // Or, if cushions are directly displayed, update the cushions state
      // For now, let's re-fetch subjobs to ensure consistency if lists are not directly managed
      if (selectedJobForSubJob) {
        displayJobDetails(selectedJobForSubJob); // Re-fetch all subjobs for the current job
      }
      setIsEditCushionModalOpen(false);
      setCushionToEdit(null);
    } else {
      console.error("Failed to update cushion.");
    }
  };

  const handleDeleteCushion = async (cushionId: string) => {
    const success = await deleteCushionById(cushionId);
    if (success) {
      // Update the subJob's cushionList
      setSelectedSubJobs((prevSubJobs) =>
        prevSubJobs.map((subJob) => {
          if (subJob.cushionList?.includes(cushionId)) {
            const updatedSubJob = {
              ...subJob,
              cushionList: subJob.cushionList.filter((id) => id !== cushionId),
            };
            updateSubJob(updatedSubJob); // Persist change to backend
            return updatedSubJob;
          }
          return subJob;
        })
      );
      setIsEditCushionModalOpen(false);
      setCushionToEdit(null);
    } else {
      console.error("Failed to delete cushion.");
    }
  };

  const handleAddFrame = async (newFrameData: Frame) => {
    // New handler for AddFrameModal
    const addedFrame = await createFrame(newFrameData);
    if (addedFrame) {
      setSelectedSubJobs((prevSubJobs) =>
        prevSubJobs.map((subJob) => {
          if (subJob._id === addedFrame.subJobId) {
            return {
              ...subJob,
              frameList: [...(subJob.frameList || []), addedFrame._id],
            };
          }
          return subJob;
        })
      );
    } else {
      console.error("Failed to create frame.");
    }
  };

  const handleUpdateFrame = async (updatedData: Frame) => {
    const updatedFrameFromServer = await updateFrame(updatedData);
    if (updatedFrameFromServer) {
      // Re-fetch subjobs to ensure consistency if lists are not directly managed
      if (selectedJobForSubJob) {
        displayJobDetails(selectedJobForSubJob); // Re-fetch all subjobs for the current job
      }
      setIsEditFrameModalOpen(false);
      setFrameToEdit(null);
    } else {
      console.error("Failed to update frame.");
    }
  };

  const handleDeleteFrame = async (frameId: string) => {
    const success = await deleteFrameById(frameId);
    if (success) {
      // Update the subJob's frameList
      setSelectedSubJobs((prevSubJobs) =>
        prevSubJobs.map((subJob) => {
          if (subJob.frameList?.includes(frameId)) {
            const updatedSubJob = {
              ...subJob,
              frameList: subJob.frameList.filter((id) => id !== frameId),
            };
            updateSubJob(updatedSubJob); // Persist change to backend
            return updatedSubJob;
          }
          return subJob;
        })
      );
      setIsEditFrameModalOpen(false);
      setFrameToEdit(null);
    } else {
      console.error("Failed to delete frame.");
    }
  };

  const handleAddUpholstery = async (newUpholsteryData: Upholstery) => {
    // New handler for AddUpholsteryModal
    const addedUpholstery = await createUpholstery(newUpholsteryData);
    if (addedUpholstery) {
      setSelectedSubJobs((prevSubJobs) =>
        prevSubJobs.map((subJob) => {
          if (subJob._id === addedUpholstery.subJobId) {
            return {
              ...subJob,
              upholsteryList: [
                ...(subJob.upholsteryList || []),
                addedUpholstery._id,
              ],
            };
          }
          return subJob;
        })
      );
    } else {
      console.error("Failed to create upholstery.");
    }
  };

  const handleUpdateUpholstery = async (updatedData: Upholstery) => {
    const updatedUpholsteryFromServer = await updateUpholstery(updatedData);
    if (updatedUpholsteryFromServer) {
      // Re-fetch subjobs to ensure consistency if lists are not directly managed
      if (selectedJobForSubJob) {
        displayJobDetails(selectedJobForSubJob); // Re-fetch all subjobs for the current job
      }
      setIsEditUpholsteryModalOpen(false);
      setUpholsteryToEdit(null);
    } else {
      console.error("Failed to update upholstery.");
    }
  };

  const handleDeleteUpholstery = async (upholsteryId: string) => {
    const success = await deleteUpholstery(upholsteryId);
    if (success) {
      // Update the subJob's upholsteryList
      setSelectedSubJobs((prevSubJobs) =>
        prevSubJobs.map((subJob) => {
          if (subJob.upholsteryList?.includes(upholsteryId)) {
            const updatedSubJob = {
              ...subJob,
              upholsteryList: subJob.upholsteryList.filter(
                (id) => id !== upholsteryId
              ),
            };
            updateSubJob(updatedSubJob); // Persist change to backend
            return updatedSubJob;
          }
          return subJob;
        })
      );
      setIsEditUpholsteryModalOpen(false);
      setUpholsteryToEdit(null);
    } else {
      console.error("Failed to delete upholstery.");
    }
  };

  const openAddSubJobModal = () => {
    // New function to open sub-job modal
    setIsAddSubJobModalOpen(true); //
  };

  const openAddFrameModal = (subJobId: String, subJobDetail: String) => {
    // New function
    setSelectedSubJobInfoForFrame({ subJobId, subJobDetail });
    setIsAddFrameModalOpen(true);
  };

  const openAddCushionModal = (subJobId: String, subJobDetail: String) => {
    // Modified to accept subJobId and subJobDetail
    setSelectedSubJobInfoForCushion({ subJobId, subJobDetail });
    setIsAddCushionModalOpen(true);
  };

  const openAddUpholsteryModal = (subJobId: String, subJobDetail: String) => {
    // New function
    setSelectedSubJobInfoForUpholstery({ subJobId, subJobDetail });
    setIsAddUpholsteryModalOpen(true);
  };

  const handleAscDscFilterChange = (
    attribute: String,
    type?: "asc" | "desc"
  ) => {
    if (attribute === "client") {
      if (type === "asc") {
        setFilterClient("asc");
        setClientAsc(true);
        setClientDesc(false);
      } else {
        setFilterClient("desc");
        setClientAsc(false);
        setClientDesc(true);
      }
      setFilterJobName(undefined);
      setFilterDueDate(undefined);

      setJobNameAsc(false);
      setJobNameDesc(false);
      setDueDateAsc(false);
    } else if (attribute === "jobName") {
      if (type === "asc") {
        setFilterJobName("asc");
        setJobNameAsc(true);
        setJobNameDesc(false);
      } else {
        setFilterJobName("desc");
        setJobNameAsc(false);
        setJobNameDesc(true);
      }
      setFilterClient(undefined);
      setFilterDueDate(undefined);

      setClientAsc(false);
      setClientDesc(false);
      setDueDateAsc(false);
    } else if (attribute === "dueDate") {
      if (type === "asc") {
        setFilterDueDate("asc");
        setDueDateAsc(true);
      } else {
        setFilterDueDate("desc");
        setDueDateAsc(false);
      }
      setFilterClient(undefined);
      setFilterJobName(undefined);

      setClientAsc(false);
      setClientDesc(false);
      setJobNameAsc(false);
      setJobNameDesc(false);
    }
  };

  const resetAscDscFilter = () => {
    setFilterClient(undefined);
    setFilterJobName(undefined);
    setFilterDueDate(undefined);
    setSelectedYear("--");

    setClientAsc(false);
    setClientDesc(false);
    setJobNameAsc(false);
    setJobNameDesc(false);
    setDueDateAsc(false);
  };

  const handleSelectYear = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedYear(event.target.value);
  };

  const generateYears = () => {
    const currentYear = new Date().getFullYear();
    const startYear = currentYear - 25;
    const endYear = currentYear + 5;

    const years = [];
    for (var year = endYear; year >= startYear; year--) {
      years.push(year);
    }
    return years;
  };

  const handleStatusChange = (checked: boolean, status: String) => {
    if (status === "cut") {
      checked === true ? setFilterCut(false) : setFilterCut(true);
    } else if (status === "upholster") {
      checked === true ? setFilterUpholster(false) : setFilterUpholster(true);
    } else if (status === "sewn") {
      checked === true ? setFilterSewn(false) : setFilterSewn(true);
    } else if (status === "foamed") {
      checked === true ? setFilterFoamed(false) : setFilterFoamed(true);
    } else if (status === "complete") {
      checked === true ? setFilterComplete(false) : setFilterComplete(true);
    } else if (status === "production") {
      checked === true ? setFilterProduction(false) : setFilterProduction(true);
    }
  };

  const handleArchiveChange = (checked: boolean) => {
    checked === true ? setFilterArchive(false) : setFilterArchive(true);
  };

  const openEditSubJobModal = (subJob: SubJob) => {
    setSubJobToEdit(subJob);
    setIsEditSubJobModalOpen(true);
  };

  const openEditFrameModal = (frame: Frame) => {
    setFrameToEdit(frame);
    setIsEditFrameModalOpen(true);
  };

  const openEditCushionModal = (cushion: Cushion) => {
    setCushionToEdit(cushion);
    setIsEditCushionModalOpen(true);
  };

  const openEditUpholsteryModal = (upholstery: Upholstery) => {
    setUpholsteryToEdit(upholstery);
    setIsEditUpholsteryModalOpen(true);
  };

  const addJobForDeletion = (checked: boolean, job: Job) => {
    checked === true ? 
    setSelectedDeleteJobs(prevJobs => [...prevJobs, job]) :
    setSelectedDeleteJobs(prevJobs => prevJobs.filter((prevJob: Job) => prevJob != job));
  }

  const deleteSelectedJobs = async () => {
    const selectedDeletePromise = selectedDeleteJobs.map(async (job: Job) => {
      if (job._id) await deleteJob(job._id);
    });

    await Promise.all(selectedDeletePromise);
    unconditionalReload();
    setSelectedDeleteJobs([]);
  }

  const clearSelectedJobs = () => {
    unconditionalReload();
    setSelectedDeleteJobs([]);
  }

  return (
    <>
      <Navbar />
      <div id="first-container">
        <div id="schedule-first-container">
          <div id="add-job-wrapper">
            <div id="add-job-container">
              <button
                onClick={() => setIsAddJobModelOpen(true)}
                className="add-job-btn"
              >
                Add Job
              </button>
            </div>
            <div id="archive-container">
              <label>
                <input
                  type="checkbox"
                  defaultChecked={filterArchive}
                  onChange={(e) => handleArchiveChange(e.target.defaultChecked)}
                />
                Show Archived Jobs
              </label>
            </div>
          </div>

          <div id="search-and-dropdown-container">
            <div id="search-container">
              <SearchBar
                searchTerm={searchTerm}
                onSearchChange={handleSearchChange}
              />
            </div>

            <div id="dropdown-wrapper" ref={dropdownRef}>
              <div
                id="dropdown-bar"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                Sort & Filter
                <span className="dropdown-arrow">▼</span>
              </div>

              {dropdownOpen && (
                <div id="dropdown-panel">
                  <div className="sort-option-group">
                    <strong>Year</strong>
                    <label>
                      <select
                        name="option"
                        value={selectedYear}
                        onChange={handleSelectYear}
                      >
                        <option value="--">--</option>
                        {generateYears().map((year: number) => (
                          <option key={year} value={String(year)}>
                            {year}
                          </option>
                        ))}
                      </select>
                    </label>

                    <strong>Client</strong>
                    <label>
                      <input
                        type="radio"
                        name="option"
                        onClick={() =>
                          handleAscDscFilterChange("client", "asc")
                        }
                        defaultChecked={clientAsc}
                      />{" "}
                      A-Z
                    </label>
                    <label>
                      <input
                        type="radio"
                        name="option"
                        onClick={() =>
                          handleAscDscFilterChange("client", "desc")
                        }
                        defaultChecked={clientDesc}
                      />{" "}
                      Z-A
                    </label>

                    <strong>Job Name</strong>
                    <label>
                      <input
                        type="radio"
                        name="option"
                        onClick={() =>
                          handleAscDscFilterChange("jobName", "asc")
                        }
                        defaultChecked={jobNameAsc}
                      />{" "}
                      A-Z
                    </label>
                    <label>
                      <input
                        type="radio"
                        name="option"
                        onClick={() =>
                          handleAscDscFilterChange("jobName", "desc")
                        }
                        defaultChecked={jobNameDesc}
                      />{" "}
                      Z-A
                    </label>

                    <strong>Due Date</strong>
                    <label>
                      <input
                        type="radio"
                        name="option"
                        onClick={() =>
                          handleAscDscFilterChange("dueDate", "asc")
                        }
                        defaultChecked={dueDateAsc}
                      />{" "}
                      Oldest
                    </label>
                  </div>

                  <button
                    onClick={() => {
                      resetAscDscFilter();
                      setDropdownOpen(!dropdownOpen);
                    }}
                  >
                    Reset
                  </button>
                </div>
              )}
            </div>
          </div>

          <div id="filter-container">
            {/* filter-checkboxes stay unchanged here */}
            <div className="filter-wrapper">
              <div className="filter-column">
                <label className="filter-item upholstery-cut">
                  <input
                    type="checkbox"
                    defaultChecked={filterCut}
                    onChange={(e) =>
                      handleStatusChange(e.target.defaultChecked, "cut")
                    }
                  />{" "}
                  Upholstery Cut
                </label>
                <label className="filter-item body-upholstered">
                  <input
                    type="checkbox"
                    defaultChecked={filterUpholster}
                    onChange={(e) =>
                      handleStatusChange(e.target.defaultChecked, "upholster")
                    }
                  />{" "}
                  Body Upholstered
                </label>
                <label className="filter-item in-production">
                  <input
                    type="checkbox"
                    defaultChecked={filterProduction}
                    onChange={(e) =>
                      handleStatusChange(e.target.defaultChecked, "production")
                    }
                  />{" "}
                  In Production
                </label>
              </div>
              <div className="filter-column">
                <label className="filter-item upholstery-sewn">
                  <input
                    type="checkbox"
                    defaultChecked={filterSewn}
                    onChange={(e) =>
                      handleStatusChange(e.target.defaultChecked, "sewn")
                    }
                  />{" "}
                  Upholstery Sewn
                </label>
                <label className="filter-item frame-foamed">
                  <input
                    type="checkbox"
                    defaultChecked={filterFoamed}
                    onChange={(e) =>
                      handleStatusChange(e.target.defaultChecked, "foamed")
                    }
                  />{" "}
                  Frame Foamed
                </label>
                <label className="filter-item complete">
                  <input
                    type="checkbox"
                    defaultChecked={filterComplete}
                    onChange={(e) =>
                      handleStatusChange(e.target.defaultChecked, "complete")
                    }
                  />{" "}
                  Complete
                </label>
              </div>
            </div>
          </div>
        </div>{" "}
        { selectedDeleteJobs.length > 0 &&
          <div id="select-delete-container">
            <p id="delete-paragraph">{selectedDeleteJobs.length} selected!</p>
            <button
              onClick={deleteSelectedJobs}
              className="delete-job-btn"
            >
            Delete Jobs
            </button>
            <button
              onClick={clearSelectedJobs}
              className="deselect-btn"
            > 
            De-select All
            </button>
          </div>
        } 
        {/* This closes the #filter-container div */}
        <div id="order-container">
          {/* Left Column - Job Name */}
          <JobTable
            key="job-table"
            checkedJobs={selectedDeleteJobs}
            searchTerm={searchTerm}
            reload={reloadState}
            handleJobClick={displayJobDetails}
            clientTerm={filterClient}
            jobNameTerm={filterJobName}
            dueDateTerm={filterDueDate}
            yearTerm={selectedYear}
            cutTerm={filterCut}
            sewnTerm={filterSewn}
            upholsterTerm={filterUpholster}
            foamedTerm={filterFoamed}
            completeTerm={filterComplete}
            productionTerm={filterProduction}
            archiveTerm={filterArchive}
            onEditJobClick={handleEditJobClick}
            jobDeleteClick={addJobForDeletion}
            initialSelectedJobId={initialSelectedJob?._id || null}
          />

          {/* Right Column - Job Components */}
          <div id="components-section-wrapper">
            <div className="job-section-header">Job Components</div>
            <div className="job-components-header">
              <div>Details</div>
              <div>Frames/Parts</div>
              <div>Cushion</div>
              <div>Upholstery</div>
            </div>
            <div id="job-detail-container">
              {hasSelected && (
                <SubJobTable
                  subJobsParam={selectedSubJobs}
                  onAddComponentClick={openAddSubJobModal}
                  onAddFrameClick={openAddFrameModal}
                  onAddCushionClick={openAddCushionModal}
                  onAddUpholsteryClick={openAddUpholsteryModal}
                  onEditSubJobClick={openEditSubJobModal}
                  onEditFrameClick={openEditFrameModal}
                  onEditCushionClick={openEditCushionModal}
                  onEditUpholsteryClick={openEditUpholsteryModal}
                />
              )}
            </div>
          </div>
        </div>
      </div>
      <AddJobFormModel
        isOpen={isAddJobModelOpen}
        onClose={() => setIsAddJobModelOpen(false)}
        onAddJob={handleAddJob}
      />
      {/* Edit Job Modal */}
      <EditJobFormModal
        isOpen={isEditJobModalOpen}
        onClose={() => {
          setIsEditJobModalOpen(false);
          setJobToEdit(null);
        }}
        jobToEdit={jobToEdit}
        onUpdateJob={handleUpdateJob}
        onDeleteJob={handleDeleteJob} // Pass delete handler
      />
      <AddSubJobFormModal // New AddSubJobFormModal component
        isOpen={isAddSubJobModalOpen} //
        onClose={() => setIsAddSubJobModalOpen(false)} //
        jobId={selectedJobForSubJob?._id?.toString() || null} // Pass the jobId
        invoiceId={selectedJobForSubJob?.invoiceId?.toString() || null} // Pass the invoiceId
        onAddSubJob={handleAddSubJob} // Pass the handler for adding sub-jobs
      />
      {/* Edit SubJob Modal */}
      <EditSubJobFormModal
        isOpen={isEditSubJobModalOpen}
        onClose={() => {
          setIsEditSubJobModalOpen(false);
          setSubJobToEdit(null);
        }}
        subJobToEdit={subJobToEdit}
        onUpdateSubJob={handleUpdateSubJob}
        onDeleteSubJob={handleDeleteSubJob}
      />
      <AddFrameFormModal // New AddFrameModal component
        isOpen={isAddFrameModalOpen}
        onClose={() => setIsAddFrameModalOpen(false)}
        subJobId={selectedSubJobInfoForFrame?.subJobId?.toString() || ""}
        subJobDetail={
          selectedSubJobInfoForFrame?.subJobDetail?.toString() || ""
        }
        onAddFrame={handleAddFrame}
      />
      {/* Edit Frame Modal */}
      <EditFrameFormModal
        isOpen={isEditFrameModalOpen}
        onClose={() => {
          setIsEditFrameModalOpen(false);
          setFrameToEdit(null);
        }}
        frameToEdit={frameToEdit}
        onUpdateFrame={handleUpdateFrame}
        onDeleteFrame={handleDeleteFrame}
      />
      <AddCushionFormModal
        isOpen={isAddCushionModalOpen}
        onClose={() => setIsAddCushionModalOpen(false)}
        subJobId={selectedSubJobInfoForCushion?.subJobId?.toString() || ""}
        subJobDetail={
          selectedSubJobInfoForCushion?.subJobDetail?.toString() || ""
        }
        onAddCushion={handleAddCushion}
      />
      {/* Edit Cushion Modal */}
      <EditCushionFormModal
        isOpen={isEditCushionModalOpen}
        onClose={() => {
          setIsEditCushionModalOpen(false);
          setCushionToEdit(null);
        }}
        cushionToEdit={cushionToEdit}
        onUpdateCushion={handleUpdateCushion}
        onDeleteCushion={handleDeleteCushion}
      />
      <AddUpholsteryFormModal // New AddUpholsteryModal component
        isOpen={isAddUpholsteryModalOpen}
        onClose={() => setIsAddUpholsteryModalOpen(false)}
        subJobId={selectedSubJobInfoForUpholstery?.subJobId?.toString() || ""}
        subJobDetail={
          selectedSubJobInfoForUpholstery?.subJobDetail?.toString() || ""
        }
        onAddUpholstery={handleAddUpholstery}
      />
      <EditUpholsteryFormModal
        isOpen={isEditUpholsteryModalOpen}
        onClose={() => {
          setIsEditUpholsteryModalOpen(false);
          setUpholsteryToEdit(null);
        }}
        upholsteryToEdit={upholsteryToEdit}
        onUpdateUpholstery={handleUpdateUpholstery}
        onDeleteUpholstery={handleDeleteUpholstery}
      />
    </>
  );
}

export default Schedule;
