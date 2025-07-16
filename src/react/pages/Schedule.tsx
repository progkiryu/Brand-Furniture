import "../styles/Schedule.css";
import "../styles/Global.css";
import "../styles/ModalForm.css"
import "../styles/SubJobModalForm.css" // Ensure this CSS file exists or create it if needed

import { createJob, updateJob, getAllJobs, deleteJob } from "../api/jobAPI"; // Import deleteJobById
import { createSubJob, getAllSubJobs, getSubJobById, updateSubJob, deleteSubJob } from "../api/subJobAPI"; // Import deleteSubJob

import Navbar from "../components/Navbar";
import SearchBar from "../components/Searchbar"; // New component
import JobTable from "../components/JobTable"; // New component
import AddJobFormModel from "../components/AddJobFormModel"; // New modal component
// import EditJobFormModal from "../components/EditJobFormModal"; 
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

import { createFrame, updateFrame, deleteFrameById } from "../api/frameAPI"; // Import updateFrame, deleteFrameById
import { createCushion, updateCushion, deleteCushionById } from "../api/cushionAPI"; // Import updateCushion, deleteCushionById
import { createUpholstery, updateUpholstery, deleteUpholstery } from "../api/upholsteryAPI"; // Import updateUpholstery, deleteUpholstery

import { useState, useEffect, useRef } from 'react';
import { useLocation } from "react-router-dom";

function Schedule() {

  const [searchTerm, setSearchTerm] = useState<string>('');
  const [cushions] = useState<Array<Cushion>>([]); 
  const [frames] = useState<Array<Frame>>([]); 
  const [upholstery] = useState<Array<Upholstery>>([]); 

  const [isEditJobModalOpen, setIsEditJobModalOpen] = useState(false);
  const [jobToEdit, setJobToEdit] = useState<Job | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // radio button states
  const [invoiceIDAsc, setInvoiceIDAsc] = useState<boolean>(false);
  const [invoiceIDDesc, setInvoiceIDDesc] = useState<boolean>(false);
  const [clientAsc, setClientAsc] = useState<boolean>(false);
  const [clientDesc, setClientDesc] = useState<boolean>(false);
  const [jobNameAsc, setJobNameAsc] = useState<boolean>(false);
  const [jobNameDesc, setJobNameDesc] = useState<boolean>(false);
  const [dueDateAsc, setDueDateAsc] = useState<boolean>(false);
  const [dueDateDesc, setDueDateDesc] = useState<boolean>(false);

  const [jobs, setJobs] = useState<Job[]>([]); 
  const [subJobs, setSubJobs] = useState<SubJob[]>([]);

  const [selectedSubJobs, setSelectedSubJobs] = useState<SubJob[]>([]);
  const [isAddJobModelOpen, setIsAddJobModelOpen] = useState<boolean>(false);
  const [hasSelected, setSelected] = useState<boolean>(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isAddSubJobModalOpen, setIsAddSubJobModalOpen] = useState(false); 
  const [selectedJobForSubJob, setSelectedJobForSubJob] = useState<Job | null>(null);

  const location = useLocation();
  
  const [filterInvoiceID, setFilterInvoiceID] = useState<"asc" | "desc" | undefined>();
  const [filterClient, setFilterClient] = useState<"asc" | "desc" | undefined>();
  const [filterJobName, setFilterJobName] = useState<"asc" | "desc" | undefined>();
  const [filterDueDate, setFilterDueDate] = useState<"asc" | "desc" | undefined>();

  const [filterCut, setFilterCut] = useState<boolean>(false);
  const [filterSewn, setFilterSewn] = useState<boolean>(false);
  const [filterUpholster, setFilterUpholster] = useState<boolean>(false);
  const [filterFoamed, setFilterFoamed] = useState<boolean>(false);
  const [filterWrapped, setFilterWrapped] = useState<boolean>(false);
  const [filterComplete, setFilterComplete] = useState<boolean>(false);
  const [filterProduction, setFilterProduction] = useState<boolean>(false); 

  const [isAddCushionModalOpen, setIsAddCushionModalOpen] = useState(false);
  const [isAddFrameModalOpen, setIsAddFrameModalOpen] = useState(false);
  const [isAddUpholsteryModalOpen, setIsAddUpholsteryModalOpen] = useState(false);

  const [selectedSubJobInfoForCushion, setSelectedSubJobInfoForCushion] = useState<{ subJobId: String | null, subJobDetail: String | null } | null>(null);
  const [selectedSubJobInfoForFrame, setSelectedSubJobInfoForFrame] = useState<{ subJobId: String | null, subJobDetail: String | null } | null>(null);
  const [selectedSubJobInfoForUpholstery, setSelectedSubJobInfoForUpholstery] = useState<{ subJobId: String | null, subJobDetail: String | null } | null>(null);

  // State for Edit Modals
  const [isEditSubJobModalOpen, setIsEditSubJobModalOpen] = useState(false);
  const [subJobToEdit, setSubJobToEdit] = useState<SubJob | null>(null);

  const [isEditFrameModalOpen, setIsEditFrameModalOpen] = useState(false);
  const [frameToEdit, setFrameToEdit] = useState<Frame | null>(null);

  const [isEditCushionModalOpen, setIsEditCushionModalOpen] = useState(false);
  const [cushionToEdit, setCushionToEdit] = useState<Cushion | null>(null);

  const [isEditUpholsteryModalOpen, setIsEditUpholsteryModalOpen] = useState(false);
  const [upholsteryToEdit, setUpholsteryToEdit] = useState<Upholstery | null>(null);


  useEffect(() => {
    if (location.state !== null) {
      const { selectedJob, selectedSubJobs } = location.state;
      console.log(selectedSubJobs);
      setSelectedSubJobs(selectedSubJobs);
      setSelectedJobForSubJob(selectedJob);
      setSelected(true);

      const fetchJobs = async () => {
        const jobsPromise = getAllJobs();
        try {
          const [fetchJobs] = await Promise.all([jobsPromise]);
          setJobs(fetchJobs);
        }
        catch (err) {
          console.error("Could not fetch Jobs!");
        }
      }
      fetchJobs();
      
      location.state === null;
    }
    else {
      const fetchJobs = async () => {
        const jobsPromise = getAllJobs();
        const subJobsPromise = getAllSubJobs();
        try {
          const [fetchJobs, fetchSubJobs] = await Promise.all([jobsPromise, subJobsPromise]);
          setJobs(fetchJobs);
          setSubJobs(fetchSubJobs);
        }
        catch (err) {
          console.error("Could not fetch Jobs!");
        }
      }
      fetchJobs();
    }
  }, [subJobs, frames, cushions, upholstery]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
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
      setJobs(prevJobs => [...prevJobs, addedJob]);
      setIsAddJobModelOpen(false);
    } else {
      console.error("Failed to create job.");
    }
  };

  const handleEditJobClick = (job: Job) => {
    setJobToEdit(job);
    setIsEditJobModalOpen(true);
  };

  const handleDeleteJob = async (jobId: string) => {
    const success = await deleteJob(jobId as String);
    if (success) {
      setJobs(prevJobs => prevJobs.filter(job => job._id !== jobId));
      setIsEditJobModalOpen(false);
      setJobToEdit(null);
      setSubJobs([]); // Clear subjobs as well
    } else {
      console.error("Failed to delete job.");
    }
  };


  const handleUpdateJob = async (updatedData: Job) => {
    const updatedJobFromServer = await updateJob(updatedData);
    if (updatedJobFromServer) {
      setJobs(prevJobs => prevJobs.map(job =>
        job._id === updatedJobFromServer._id ? updatedJobFromServer : job
      ));
      setIsEditJobModalOpen(false);
      setJobToEdit(null);
    }
    else {
      console.error("Failed to update job.");
    }
  };



  const displayJobDetails = async (job: Job) => {
    try {
      setSelectedJobForSubJob(job);
      if (job.subJobList && job.subJobList.length > 0) {
        const subJobs = job.subJobList.map((subJobId: String) => {
          return getSubJobById(subJobId);
        });
        const fetchedSubJobs: SubJob[] = await Promise.all(subJobs);
        setSelectedSubJobs(fetchedSubJobs);
      }
      else {
        setSelectedSubJobs([]);
      }
      setSelected(true);
    }
    catch (err) {
      console.log("Error deleting job:", err);
    }
  }

  const handleAddSubJob = async (newSubJobData: SubJob) => {
    if (!selectedJobForSubJob) {
      console.error("No job selected to add sub-job to.");
      return;
    }

    try {
      const addedSubJob = await createSubJob(newSubJobData);
      if (addedSubJob && addedSubJob._id) {
        const updatedSubJobList = [...(selectedJobForSubJob.subJobList || []), addedSubJob._id];
        const jobToUpdate = {
          ...selectedJobForSubJob,
          subJobList: updatedSubJobList,
        };
        const updatedJobFromServer = await updateJob(jobToUpdate);
        if (updatedJobFromServer) {
          setJobs(prevJobs => prevJobs.map(job =>
            job._id === updatedJobFromServer._id ? updatedJobFromServer : job
          ));
          await displayJobDetails(updatedJobFromServer); // Ensure sub-jobs are re-fetched and updated
          setIsAddSubJobModalOpen(false);
          setSelectedJobForSubJob(updatedJobFromServer); // Update the selected job to reflect changes
        }
      }
    }
    catch (err) {
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
    const success = await deleteSubJob(subJobId as String);
    if (success) {
      setSelectedSubJobs(prevSubJobs => prevSubJobs.filter(subJob => subJob._id !== subJobId));
      // Also update the parent job's subJobList
      if (selectedJobForSubJob && selectedJobForSubJob._id) {
        const updatedJob: Job = {
          ...selectedJobForSubJob,
          subJobList: selectedJobForSubJob.subJobList?.filter(id => id !== subJobId)
        };
        await updateJob(updatedJob);
        setJobs(prevJobs => prevJobs.map(job =>
          job._id === updatedJob._id ? updatedJob : job
        ));
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
      setSelectedSubJobs(prevSubJobs => prevSubJobs.map(subJob => {
        if (subJob._id === addedCushion.subJobId) {
          return {
            ...subJob,
            cushionList: [...(subJob.cushionList || []), addedCushion._id as String]
          };
        }
        return subJob;
      }));
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
    const success = await deleteCushionById(cushionId as String);
    if (success) {
      // Update the subJob's cushionList
      setSelectedSubJobs(prevSubJobs => prevSubJobs.map(subJob => {
        if (subJob.cushionList?.includes(cushionId as String)) {
          const updatedSubJob = {
            ...subJob,
            cushionList: subJob.cushionList.filter(id => id !== (cushionId as String))
          };
          updateSubJob(updatedSubJob); // Persist change to backend
          return updatedSubJob;
        }
        return subJob;
      }));
      setIsEditCushionModalOpen(false);
      setCushionToEdit(null);
    } else {
      console.error("Failed to delete cushion.");
    }
  };

  const handleAddFrame = async (newFrameData: Frame) => { // New handler for AddFrameModal
    const addedFrame = await createFrame(newFrameData);
    if (addedFrame) {
      setSelectedSubJobs(prevSubJobs => prevSubJobs.map(subJob => {
        if (subJob._id === addedFrame.subJobId) {
          return {
            ...subJob,
            frameList: [...(subJob.frameList || []), addedFrame._id as String]
          };
        }
        return subJob;
      }));
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
    const success = await deleteFrameById(frameId as String);
    if (success) {
      // Update the subJob's frameList
      setSelectedSubJobs(prevSubJobs => prevSubJobs.map(subJob => {
        if (subJob.frameList?.includes(frameId as String)) {
          const updatedSubJob = {
            ...subJob,
            frameList: subJob.frameList.filter(id => id !== (frameId as String))
          };
          updateSubJob(updatedSubJob); // Persist change to backend
          return updatedSubJob;
        }
        return subJob;
      }));
      setIsEditFrameModalOpen(false);
      setFrameToEdit(null);
    } else {
      console.error("Failed to delete frame.");
    }
  };

  const handleAddUpholstery = async (newUpholsteryData: Upholstery) => { // New handler for AddUpholsteryModal
    const addedUpholstery = await createUpholstery(newUpholsteryData);
    if (addedUpholstery) {
      setSelectedSubJobs(prevSubJobs => prevSubJobs.map(subJob => {
        if (subJob._id === addedUpholstery.subJobId) {
          return {
            ...subJob,
            upholsteryList: [...(subJob.upholsteryList || []), addedUpholstery._id as String]
          };
        }
        return subJob;
      }));
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
    const success = await deleteUpholstery(upholsteryId as String);
    if (success) {
      // Update the subJob's upholsteryList
      setSelectedSubJobs(prevSubJobs => prevSubJobs.map(subJob => {
        if (subJob.upholsteryList?.includes(upholsteryId as String)) {
          const updatedSubJob = {
            ...subJob,
            upholsteryList: subJob.upholsteryList.filter(id => id !== (upholsteryId as String))
          };
          updateSubJob(updatedSubJob); // Persist change to backend
          return updatedSubJob;
        }
        return subJob;
      }));
      setIsEditUpholsteryModalOpen(false);
      setUpholsteryToEdit(null);
    } else {
      console.error("Failed to delete upholstery.");
    }
  };

  const openAddSubJobModal = () => { // New function to open sub-job modal
    setIsAddSubJobModalOpen(true); //
  };

  const openAddFrameModal = (subJobId: String, subJobDetail: String) => { // New function
    setSelectedSubJobInfoForFrame({ subJobId, subJobDetail });
    setIsAddFrameModalOpen(true);
  };

  const openAddCushionModal = (subJobId: String, subJobDetail: String) => { // Modified to accept subJobId and subJobDetail
    setSelectedSubJobInfoForCushion({ subJobId, subJobDetail });
    setIsAddCushionModalOpen(true);
  };

  const openAddUpholsteryModal = (subJobId: String, subJobDetail: String) => { // New function
    setSelectedSubJobInfoForUpholstery({ subJobId, subJobDetail });
    setIsAddUpholsteryModalOpen(true);
  };

  const handleAscDscFilterChange = (attribute: String, type?: "asc" | "desc") => {
    if (attribute === "invoiceId") {
      if (type === "asc") {
        setFilterInvoiceID("asc");
        setInvoiceIDAsc(true);
        setInvoiceIDDesc(false);
      }
      else {
        setFilterInvoiceID("desc");
        setInvoiceIDAsc(false);
        setInvoiceIDDesc(true);
      }
      setFilterClient(undefined);
      setFilterJobName(undefined);
      setFilterDueDate(undefined);

      setClientAsc(false);
      setClientDesc(false);
      setJobNameAsc(false);
      setJobNameDesc(false);
      setDueDateAsc(false);
      setDueDateDesc(false);
    }
    else if (attribute === "client") {
      if (type === "asc") { 
        setFilterClient("asc"); 
        setClientAsc(true);
        setClientDesc(false);
      } 
      else { 
        setFilterClient("desc");
        setClientAsc(false);
        setClientDesc(true);
      }
      setFilterInvoiceID(undefined);
      setFilterJobName(undefined);
      setFilterDueDate(undefined);

      setInvoiceIDAsc(false);
      setInvoiceIDDesc(false);
      setJobNameAsc(false);
      setJobNameDesc(false);
      setDueDateAsc(false);
      setDueDateDesc(false);
    }
    else if (attribute === "jobName") {
      if (type === "asc") { 
        setFilterJobName("asc"); 
        setJobNameAsc(true);
        setJobNameDesc(false);
      } 
      else { 
        setFilterJobName("desc"); 
        setJobNameAsc(false);
        setJobNameDesc(true);
      }
      setFilterInvoiceID(undefined);
      setFilterClient(undefined);
      setFilterDueDate(undefined);  
      
      setInvoiceIDAsc(false);
      setInvoiceIDDesc(false);
      setClientAsc(false);
      setClientDesc(false);
      setDueDateAsc(false);
      setDueDateDesc(false);
    }
    else if (attribute === "dueDate") {
      if (type === "asc") { 
        setFilterDueDate("asc"); 
        setDueDateAsc(true);
        setDueDateDesc(false);
      }
      else { 
        setFilterDueDate("desc"); 
        setDueDateAsc(false);
        setDueDateDesc(true);
      }
      setFilterInvoiceID(undefined);
      setFilterClient(undefined);
      setFilterJobName(undefined);

      setInvoiceIDAsc(false);
      setInvoiceIDDesc(false);
      setClientAsc(false);
      setClientDesc(false);
      setJobNameAsc(false);
      setJobNameDesc(false);
    }
  }

  const resetAscDscFilter = () => {
      setFilterInvoiceID(undefined);
      setFilterClient(undefined);
      setFilterJobName(undefined);
      setFilterDueDate(undefined);

      setInvoiceIDAsc(false);
      setInvoiceIDDesc(false);
      setClientAsc(false);
      setClientDesc(false);
      setJobNameAsc(false);
      setJobNameDesc(false);
      setDueDateAsc(false);
      setDueDateDesc(false);
  }

  const handleStatusChange = (checked: boolean, status: String) => {
    if (status === "cut") {
      checked === true ? setFilterCut(false) : setFilterCut(true);
    }
    else if (status === "upholster") {
      checked === true ? setFilterUpholster(false) : setFilterUpholster(true);
    }
    else if (status === "wrapped") {
      checked === true ? setFilterWrapped(false) : setFilterWrapped(true);
    }
    else if (status === "sewn") {
      checked === true ? setFilterSewn(false) : setFilterSewn(true);
    }
    else if (status === "foamed") {
      checked === true ? setFilterFoamed(false) : setFilterFoamed(true);
    }
    else if (status === "complete") {
      checked === true ? setFilterComplete(false) : setFilterFoamed(true);
    }
    else if (status === "production") {
      checked === true ? setFilterProduction(false) : setFilterProduction(true);
    }
  }  
  
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



  return (
    <>
      <Navbar />
      <div id="first-container">
        <div id="schedule-first-container">
          <div id="search-and-dropdown-container">
            <div id="search-container">
              <SearchBar searchTerm={searchTerm} onSearchChange={handleSearchChange} />
            </div>

            <div id="dropdown-wrapper" ref={dropdownRef}>
              <div id="dropdown-bar" onClick={() => setDropdownOpen(!dropdownOpen)}>
                Sort & Filter
                <span className="dropdown-arrow">▼</span>
              </div>

              {dropdownOpen && (
                <div id="dropdown-panel">
                  <div className="sort-option-group">
                    <strong>Invoice ID</strong>
                    <label><input type="radio" name="option" onClick={
                      () => handleAscDscFilterChange("invoiceId", "asc")
                    } defaultChecked={invoiceIDAsc}/> Ascending</label>
                    <label><input type="radio" name="option" onClick={
                      () => handleAscDscFilterChange("invoiceId", "desc")
                    } defaultChecked={invoiceIDDesc} /> Descending</label>

                    <strong>Client</strong>
                    <label><input type="radio" name="option" onClick={
                      () => handleAscDscFilterChange("client", "asc")
                    } defaultChecked={clientAsc} /> Ascending</label>
                    <label><input type="radio" name="option" onClick={
                      () => handleAscDscFilterChange("client", "desc")
                    } defaultChecked={clientDesc} /> Descending</label>

                    <strong>Job Name</strong>
                    <label><input type="radio" name="option" onClick={
                      () => handleAscDscFilterChange("jobName", "asc")
                    } defaultChecked={jobNameAsc} /> Ascending</label>
                    <label><input type="radio" name="option" onClick={
                      () => handleAscDscFilterChange("jobName", "desc")
                    } defaultChecked={jobNameDesc} /> Descending</label>

                    <strong>Due Date</strong>
                    <label><input type="radio" name="option" onClick={
                      () => handleAscDscFilterChange("dueDate", "asc")
                    } defaultChecked={dueDateAsc} /> Ascending</label>
                    <label><input type="radio" name="option" onClick={
                      () => handleAscDscFilterChange("dueDate", "desc")
                    } defaultChecked={dueDateDesc} /> Descending</label>
                  </div>

                  <button onClick={() => {
                    resetAscDscFilter();
                    setDropdownOpen(!dropdownOpen);
                  }}>Reset</button>
                </div>
              )}
            </div>
          </div>

          <div id="add-job-wrapper">
            <div id="add-job-container">
              <button onClick={() => setIsAddJobModelOpen(true)} className="add-job-btn">
                Add Job
              </button>
            </div>
            <div id="archive-container">
              <label>
                <input type="checkbox" />
                Archive
              </label>
            </div>
          </div>

          <div id="filter-container">
            {/* filter-checkboxes stay unchanged here */}
            <div className="filter-wrapper">
              <div className="filter-column">
                <label className="filter-item upholstery-cut">
                  <input type="checkbox" defaultChecked={filterCut} onChange={(e) => handleStatusChange(e.target.defaultChecked, "cut")}/> Upholstery Cut
                </label>
                <label className="filter-item body-upholstered">
                  <input type="checkbox" defaultChecked={filterUpholster} onChange={(e) => handleStatusChange(e.target.defaultChecked, "upholster")}/> Body Upholstered
                </label>
                <label className="filter-item waiting-for-wrapping">
                  <input type="checkbox" defaultChecked={filterWrapped} onChange={(e) => handleStatusChange(e.target.defaultChecked, "wrapped")}/> Waiting for wrapping
                </label>
              </div>
              <div className="filter-column">
                <label className="filter-item upholstery-sewn">
                  <input type="checkbox" defaultChecked={filterSewn} onChange={(e) => handleStatusChange(e.target.defaultChecked, "sewn")}/> Upholstery Sewn
                </label>
                <label className="filter-item frame-foamed">
                  <input type="checkbox" defaultChecked={filterFoamed} onChange={(e) => handleStatusChange(e.target.defaultChecked, "foamed")}/> Frame Foamed
                </label>
                <label className="filter-item complete">
                  <input type="checkbox" defaultChecked={filterComplete} onChange={(e) => handleStatusChange(e.target.defaultChecked, "complete")}/> Complete
                </label>
                <label className="filter-item in-production">
                  <input type="checkbox" defaultChecked={filterProduction} onChange={(e) => handleStatusChange(e.target.defaultChecked, "production")}/> In Production
                </label>
              </div>
            </div>
          </div>

        </div>
        <div id="order-container">
          <div id="job-list-container">
            {
              <JobTable
                key="job-table"
                searchTerm={searchTerm}
                jobs={jobs}
                subJobs={subJobs}
                jobClicked={displayJobDetails}
                invoiceIDTerm={filterInvoiceID}
                clientTerm={filterClient}
                jobNameTerm={filterJobName}
                dueDateTerm={filterDueDate}

                cutTerm={filterCut}
                sewnTerm={filterSewn}
                upholsterTerm={filterUpholster}
                foamedTerm={filterFoamed}
                wrappedTerm={filterWrapped}
                completeTerm={filterComplete}
                productionTerm={filterProduction}
                onEditJobClick={handleEditJobClick} 
              />
            }
          </div>
          <div id="job-detail-container">
            {hasSelected && <SubJobTable
              subJobsParam={selectedSubJobs} onAddComponentClick={openAddSubJobModal}
              onAddFrameClick={openAddFrameModal} // Pass to SubJobTable
              onAddCushionClick={openAddCushionModal} // Pass to SubJobTable
              onAddUpholsteryClick={openAddUpholsteryModal} // Pass to SubJobTable
              onEditSubJobClick={openEditSubJobModal} // Pass to SubJobTable
              onEditFrameClick={openEditFrameModal} // Pass to SubJobTable
              onEditCushionClick={openEditCushionModal} // Pass to SubJobTable
              onEditUpholsteryClick={openEditUpholsteryModal} // Pass to SubJobTable
            />}
          </div>
        </div>
        <div>
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
            subJobDetail={selectedSubJobInfoForFrame?.subJobDetail?.toString() || ""}
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
            subJobDetail={selectedSubJobInfoForCushion?.subJobDetail?.toString() || ""}
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
            subJobDetail={selectedSubJobInfoForUpholstery?.subJobDetail?.toString() || ""}
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
        </div>
      </div>
    </>
  )

}

export default Schedule;
