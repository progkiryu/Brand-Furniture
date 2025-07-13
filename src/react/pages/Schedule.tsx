import "../styles/Schedule.css";
import "../styles/Global.css";
import "../styles/ModalForm.css"
import "../styles/SubJobModalForm.css" // Ensure this CSS file exists or create it if needed
import Navbar from "../components/Navbar";
import { useState, useEffect, useRef } from 'react';



import SearchBar from "../components/Searchbar"; // New component
import JobTable from "../components/JobTable"; // New component
import AddJobFormModel from "../components/AddJobFormModel"; // New modal component
// import EditJobFormModal from "../components/EditJobFormModal"; 
import SubJobTable from "../components/SubJobTable";
import { DBLink } from "../App";
// import { deleteJob } from "../api/jobAPI";
import { getAllJobs } from "../api/jobAPI";
import { getSubJobById } from "../api/subJobAPI";
 
function Schedule() {
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [jobs, setJobs] = useState<Job[]>([]); // Manage jobs state here
    // Manage all top-level data arrays as state
    const [subJobs, setSubJobs] = useState<SubJob[]>([]);
    const [isAddJobModelOpen, setIsAddJobModelOpen] = useState<boolean>(false);
    const [hasSelected, setSelected] = useState<boolean>(false);
    // const [isEditJobModalOpen, setIsEditJobModalOpen] = useState(false);
    // const [jobToEdit, setJobToEdit] = useState<Job | null>(null);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);



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
    }, []);
 
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
        try {
            const response = await fetch(`${DBLink}/job/insertJob`, {
                method: "POST",
                mode: "cors",
                headers: { "Content-Type": "application/json" }, // Corrected content type
                body: JSON.stringify(newJobData),
            });

            if (response.ok) {
                const addedJob: Job = await response.json(); // Assuming API returns the created job
                setJobs(prevJobs => [...prevJobs, addedJob]);
                setIsAddJobModelOpen(false); // Close the modal after adding
            } else {
                const errorText = await response.text(); // Read error response
                console.error("Failed to create job:", response.status, errorText);
            }
        } catch (err) {
            console.error("Error creating job:", err);
        }
    };

    const displayJobDetails = async (job: Job) => {
        try {
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


    const handleAddSubJob = (jobId: String, newSubJobData: SubJob) => {
        // This function will be passed to JobTable and then to AddSubJobFormModal
        // It needs the jobId to correctly associate the sub-job
        const newSubJob: SubJob = {
            ...newSubJobData,
            // You might need to generate a unique subJobId here if it's not coming from the form
            // For now, assuming subJobId is provided or will be generated in the modal
        };
        setSubJobs(prevSubJobs => [...prevSubJobs, newSubJob]);
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
                        <JobTable searchTerm={searchTerm}
                        jobs={jobs}
                        jobClicked={displayJobDetails}
                        />
                    }
                    </div>
                    <div id="job-detail-container">
                    {    
                        hasSelected && (<>
                            <SubJobTable subJobsParam={subJobs}/>
                            <button>Add Component</button>
                        </>)
                    }
                    </div>
                    {/* <h1>Orders</h1> */}
                    {/* Pass both jobs and subJobs to JobTable */}
                    {/* <JobTable
                        searchTerm={searchTerm}
                        jobs={jobs}
                        subJobs={subJobs} // Pass all subJobs for filtering and display
                        onAddSubJob={handleAddSubJob} // Pass the handler for adding sub-jobs
                        onEditJobClick={handleEditJobClick}
                    /> */}
                </div>
            </div>
 
            {/* Add Job Pop-up Modal */}
            <AddJobFormModel
                isOpen={isAddJobModelOpen}
                onClose={() => setIsAddJobModelOpen(false)}
                onAddJob={handleAddJob}
            />

            {/* <EditJobFormModal
                isOpen={isEditJobModalOpen}
                onClose={() => {
                    setIsEditJobModalOpen(false);
                    setJobToEdit(null); // Clear jobToEdit when closing
                }}
                jobToEdit={jobToEdit}
                onUpdateJob={handleUpdateJob}
                onDeleteJob={handleDeleteJob}
            /> */}
        </>
    );
}
 
export default Schedule;