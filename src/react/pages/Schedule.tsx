import "../styles/Schedule.css";
import "../styles/Global.css";
import "../styles/ModalForm.css"
import "../styles/SubJobModalForm.css" // Ensure this CSS file exists or create it if needed

import { createJob, updateJob, getAllJobs, deleteJob } from "../api/jobAPI"; // Import deleteJobById
import { createSubJob, getSubJobById, updateSubJob, deleteSubJob } from "../api/subJobAPI"; // Import deleteSubJob

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

import { DBLink } from "../App";
import { createFrame, updateFrame, deleteFrameById } from "../api/frameAPI"; // Import updateFrame, deleteFrameById
import { createCushion, updateCushion, deleteCushionById } from "../api/cushionAPI"; // Import updateCushion, deleteCushionById
import { createUpholstery, updateUpholstery, deleteUpholstery } from "../api/upholsteryAPI"; // Import updateUpholstery, deleteUpholstery


import { useState, useEffect, useRef } from 'react';


function Schedule() {

  const [searchTerm, setSearchTerm] = useState<string>('');
  const [cushions, setCushions] = useState<Array<Cushion>>([]); 
  const [frames, setFrames] = useState<Array<Frame>>([]); 
  const [upholstery, setUpholstery] = useState<Array<Upholstery>>([]); 

  const [isEditJobModalOpen, setIsEditJobModalOpen] = useState(false);
  const [jobToEdit, setJobToEdit] = useState<Job | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  const [jobs, setJobs] = useState<Job[]>([]); 
  const [subJobs, setSubJobs] = useState<SubJob[]>([]);
  const [isAddJobModelOpen, setIsAddJobModelOpen] = useState<boolean>(false);
  const [hasSelected, setSelected] = useState<boolean>(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isAddSubJobModalOpen, setIsAddSubJobModalOpen] = useState(false); 
  const [selectedJobForSubJob, setSelectedJobForSubJob] = useState<Job | null>(null); 

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
  }, [subJobs, frames, cushions, upholstery]);



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


  const handleUpdateJob = async (jobId: string, updatedData: Job) => {
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
        setSubJobs(fetchedSubJobs);
      }
      else {
        setSubJobs([]);
      }
      setSelected(true);
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


  const handleUpdateSubJob = async (subJobId: string, updatedData: SubJob) => {
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
      setSubJobs(prevSubJobs => prevSubJobs.filter(subJob => subJob._id !== subJobId));
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

  const handleUpdateCushion = async (cushionId: string, updatedData: Cushion) => {
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
      setSubJobs(prevSubJobs => prevSubJobs.map(subJob => {
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

  const handleUpdateFrame = async (frameId: string, updatedData: Frame) => {
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
      setSubJobs(prevSubJobs => prevSubJobs.map(subJob => {
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

  const handleUpdateUpholstery = async (upholsteryId: string, updatedData: Upholstery) => {
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
      setSubJobs(prevSubJobs => prevSubJobs.map(subJob => {
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
                    <label><input type="radio" name="invoice" /> Ascending</label>
                    <label><input type="radio" name="invoice" /> Descending</label>
                  </div>
                  <div className="sort-option-group">
                    <strong>Client</strong>
                    <label><input type="radio" name="client" /> Ascending</label>
                    <label><input type="radio" name="client" /> Descending</label>
                  </div>
                  <div className="sort-option-group">
                    <strong>Job Name</strong>
                    <label><input type="radio" name="jobname" /> Ascending</label>
                    <label><input type="radio" name="jobname" /> Descending</label>
                  </div>
                  <div className="sort-option-group">
                    <strong>Due Date</strong>
                    <label><input type="radio" name="duedate" /> Ascending</label>
                    <label><input type="radio" name="duedate" /> Descending</label>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div id="add-job-archive-wrapper">
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
                onEditJobClick={handleEditJobClick} 
              />
            }
          </div>
          <div id="job-detail-container">
            {hasSelected &&  <SubJobTable
              subJobsParam={subJobs} onAddComponentClick={openAddSubJobModal}
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