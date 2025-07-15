import "../styles/Schedule.css";
import "../styles/Global.css";
import "../styles/ModalForm.css"
import "../styles/SubJobModalForm.css" // Ensure this CSS file exists or create it if needed

import { createJob } from "../api/jobAPI";
import { updateJob } from "../api/jobAPI";

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



import { DBLink } from "../App";
// import { deleteJob } from "../api/jobAPI";
import { getAllJobs } from "../api/jobAPI";
import { getAllSubJobs, getSubJobById, createSubJob } from "../api/subJobAPI";

import { createFrame } from "../api/frameAPI";
import { createCushion } from "../api/cushionAPI";
import { createUpholstery } from "../api/upholsteryAPI";


import { useState, useEffect, useRef } from 'react';

function Schedule() {

  const [searchTerm, setSearchTerm] = useState<string>('');
  const [cushions, setCushions] = useState<Array<Cushion>>([]); // Keep existing cushion state
  const [frames, setFrames] = useState<Array<Frame>>([]); // New state for frames
  const [upholstery, setUpholstery] = useState<Array<Upholstery>>([]); // New state for upholstery

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
  
  const [hasSelected, setSelected] = useState<boolean>(false);
  const [jobs, setJobs] = useState<Job[]>([]); 
  const [subJobs, setSubJobs] = useState<SubJob[]>([]);
  const [selectedSubJobs, setSelectedSubJobs] = useState<SubJob[]>([]);
  const [isAddJobModelOpen, setIsAddJobModelOpen] = useState<boolean>(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isAddSubJobModalOpen, setIsAddSubJobModalOpen] = useState(false); 
  const [selectedJobForSubJob, setSelectedJobForSubJob] = useState<Job | null>(null);
  
  const [filterInvoiceID, setFilterInvoiceID] = useState<"asc" | "desc" | undefined>();
  const [filterClient, setFilterClient] = useState<"asc" | "desc" | undefined>();
  const [filterJobName, setFilterJobName] = useState<"asc" | "desc" | undefined>();
  const [filterDueDate, setFilterDueDate] = useState<"asc" | "desc" | undefined>();

  const [isAddCushionModalOpen, setIsAddCushionModalOpen] = useState(false);
  const [isAddFrameModalOpen, setIsAddFrameModalOpen] = useState(false); // New state for AddFrameModal
  const [isAddUpholsteryModalOpen, setIsAddUpholsteryModalOpen] = useState(false); // New state for AddUpholsteryModal

  const [selectedSubJobInfoForCushion, setSelectedSubJobInfoForCushion] = useState<{ subJobId: String | null, subJobDetail: String | null } | null>(null);
  const [selectedSubJobInfoForFrame, setSelectedSubJobInfoForFrame] = useState<{ subJobId: String | null, subJobDetail: String | null } | null>(null); // New state for selected subjob for frame
  const [selectedSubJobInfoForUpholstery, setSelectedSubJobInfoForUpholstery] = useState<{ subJobId: String | null, subJobDetail: String | null } | null>(null); // New state for selected subjob for upholstery


  useEffect(() => {
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
  }, [subJobs]);



  // Handler for when the search input changes
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

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
    setJobToEdit(job); // Set the job to be edited
    setIsEditJobModalOpen(true); // Open the edit modal
  };

  const handleUpdateJob = async (jobId: string, updatedData: Job) => {
    const updatedJobsList: Job[] = await updateJob(updatedData);
    if (updatedJobsList) {
      setJobs(updatedJobsList);
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
        console.log(fetchedSubJobs);
        setSelectedSubJobs(fetchedSubJobs);
      }
      else {
        setSelectedSubJobs([]);
      }
    }
    catch (err) {
      console.log("Error deleting job:", err);
    }
  }

  const handleAddSubJob = async (newSubJobData: SubJob) => {
    const addedSubJob = await createSubJob(newSubJobData);
    if (addedSubJob) {
      // Update the subJob's cushionList
      setSubJobs(prevSubJobs => [...prevSubJobs, addedSubJob]);
      setIsAddSubJobModalOpen(false); // Close modal
      setSelectedJobForSubJob(null); // Clear selected subjob info
    } else {
      console.error("Failed to create cushion.");
    }
  };

  const handleAddCushion = async (newCushionData: Cushion) => {
    const addedCushion = await createCushion(newCushionData);
    if (addedCushion) {
      // Update the subJob's cushionList
      setSubJobs(prevSubJobs => prevSubJobs.map(subJob => {
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

  const handleAddFrame = async (newFrameData: Frame) => { // New handler for AddFrameModal
    const addedFrame = await createFrame(newFrameData);
    if (addedFrame) {
      setSubJobs(prevSubJobs => prevSubJobs.map(subJob => {
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

  const handleAddUpholstery = async (newUpholsteryData: Upholstery) => { // New handler for AddUpholsteryModal
    const addedUpholstery = await createUpholstery(newUpholsteryData);
    if (addedUpholstery) {
      setSubJobs(prevSubJobs => prevSubJobs.map(subJob => {
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

  const handleAscDscFilterChange = (attribute: String, type: "asc" | "desc" | undefined) => {
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
                    } checked={invoiceIDAsc}/> Ascending</label>
                    <label><input type="radio" name="option" onClick={
                      () => handleAscDscFilterChange("invoiceId", "desc")
                    } checked={invoiceIDDesc} /> Descending</label>

                    <strong>Client</strong>
                    <label><input type="radio" name="option" onClick={
                      () => handleAscDscFilterChange("client", "asc")
                    } checked={clientAsc} /> Ascending</label>
                    <label><input type="radio" name="option" onClick={
                      () => handleAscDscFilterChange("client", "desc")
                    } checked={clientDesc} /> Descending</label>

                    <strong>Job Name</strong>
                    <label><input type="radio" name="option" onClick={
                      () => handleAscDscFilterChange("jobName", "asc")
                    } checked={jobNameAsc} /> Ascending</label>
                    <label><input type="radio" name="option" onClick={
                      () => handleAscDscFilterChange("jobName", "desc")
                    } checked={jobNameDesc} /> Descending</label>

                    <strong>Due Date</strong>
                    <label><input type="radio" name="option" onClick={
                      () => handleAscDscFilterChange("dueDate", "asc")
                    } checked={dueDateAsc} /> Ascending</label>
                    <label><input type="radio" name="option" onClick={
                      () => handleAscDscFilterChange("dueDate", "desc")
                    } checked={dueDateDesc} /> Descending</label>
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
                  <input type="checkbox" /> Upholstery Cut
                </label>
                <label className="filter-item body-upholstered">
                  <input type="checkbox" /> Body Upholstered
                </label>
                <label className="filter-item waiting-for-wrapping">
                  <input type="checkbox" /> Waiting for wrapping
                </label>
              </div>
              <div className="filter-column">
                <label className="filter-item upholstery-sewn">
                  <input type="checkbox" /> Upholstery Sewn
                </label>
                <label className="filter-item frame-foamed">
                  <input type="checkbox" /> Frame Foamed
                </label>
                <label className="filter-item complete">
                  <input type="checkbox" /> Complete
                </label>
                <label className="filter-item in-production">
                  <input type="checkbox" /> In Production
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
                jobClicked={displayJobDetails}
                invoiceIDTerm={filterInvoiceID}
                clientTerm={filterClient}
                jobNameTerm={filterJobName}
                dueDateTerm={filterDueDate}
              />
            }
          </div>
          <div id="job-detail-container">
          {
            hasSelected &&
                <SubJobTable 
                  subJobsParam={selectedSubJobs} onAddComponentClick={openAddSubJobModal} 
                  onAddFrameClick={openAddFrameModal} // Pass to SubJobTable
                  onAddCushionClick={openAddCushionModal} // Pass to SubJobTable
                  onAddUpholsteryClick={openAddUpholsteryModal} // Pass to SubJobTable
                />
          }
          </div>
        </div>
        <div>
          <AddJobFormModel
            isOpen={isAddJobModelOpen}
            onClose={() => setIsAddJobModelOpen(false)}
            onAddJob={handleAddJob}
          />

          <EditJobFormModal
            isOpen={isEditJobModalOpen}
            onClose={() => {
              setIsEditJobModalOpen(false);
              setJobToEdit(null);
            }}
            jobToEdit={jobToEdit}
            onUpdateJob={handleUpdateJob}
          />

          <AddSubJobFormModal // New AddSubJobFormModal component
            isOpen={isAddSubJobModalOpen} //
            onClose={() => setIsAddSubJobModalOpen(false)} //
            jobId={selectedJobForSubJob?._id?.toString() || null} // Pass the jobId
            invoiceId={selectedJobForSubJob?.invoiceId?.toString() || null} // Pass the invoiceId
            onAddSubJob={handleAddSubJob} // Pass the handler for adding sub-jobs
          />

          <AddFrameFormModal // New AddFrameModal component
            isOpen={isAddFrameModalOpen}
            onClose={() => setIsAddFrameModalOpen(false)}
            subJobId={selectedSubJobInfoForFrame?.subJobId?.toString() || ""}
            subJobDetail={selectedSubJobInfoForFrame?.subJobDetail?.toString() || ""}
            onAddFrame={handleAddFrame}
          />

          <AddCushionFormModal
            isOpen={isAddCushionModalOpen}
            onClose={() => setIsAddCushionModalOpen(false)}
            subJobId={selectedSubJobInfoForCushion?.subJobId?.toString() || ""}
            subJobDetail={selectedSubJobInfoForCushion?.subJobDetail?.toString() || ""}
            onAddCushion={handleAddCushion}
          />

          <AddUpholsteryFormModal // New AddUpholsteryModal component
            isOpen={isAddUpholsteryModalOpen}
            onClose={() => setIsAddUpholsteryModalOpen(false)}
            subJobId={selectedSubJobInfoForUpholstery?.subJobId?.toString() || ""}
            subJobDetail={selectedSubJobInfoForUpholstery?.subJobDetail?.toString() || ""}
            onAddUpholstery={handleAddUpholstery}
          />
        </div>
      </div>
    </>
  )

}

export default Schedule;