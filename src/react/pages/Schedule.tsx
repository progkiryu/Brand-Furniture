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



import { DBLink } from "../App";
// import { deleteJob } from "../api/jobAPI";
import { getAllJobs } from "../api/jobAPI";
import { getSubJobById } from "../api/subJobAPI";


import { useState, useEffect, useRef } from 'react';
import AddCushionFormModal from "../components/AddCushionModal";


function Schedule() {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [cushions, setCushions] = useState<Array<Cushion>>([]);
  const [isEditJobModalOpen, setIsEditJobModalOpen] = useState(false);
  const [jobToEdit, setJobToEdit] = useState<Job | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [isAddCushionModalOpen, setIsAddCushionModalOpen] = useState(false);
  const [jobs, setJobs] = useState<Job[]>([]); 
  const [subJobs, setSubJobs] = useState<SubJob[]>([]);
  const [isAddJobModelOpen, setIsAddJobModelOpen] = useState<boolean>(false);
  const [hasSelected, setSelected] = useState<boolean>(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);



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

  // useEffect(() => {
  //   fetch(`${DBLink}/job/getAllJobs`)
  //     .then(res => res.json())
  //     .then(data => {
  //       console.log(`the data: ${data}`);
  //       setJobs(data)
  //     })
  //     .catch(err => console.log(err));

  //   fetch(`${DBLink}/subJob/getAllSubJobs`)
  //     .then((res) => res.json())
  //     .then((data) => setSubJobs(data))
  //     .catch((err) => console.log(err));

  //   fetch(`${DBLink}/subJob/getAllCushions`)
  //     .then((res) => res.json())
  //     .then((data) => setCushions(data))
  //     .catch((err) => console.log(err));
  // }, []);



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


  // const handleUpdateJob = async (jobId: string, updatedData: Job) => {
  //     try {
  //         const dataToSend: Job = { ...updatedData };
  //         if (dataToSend.due) {
  //             dataToSend.due = dataToSend.due.toISOString() as any;
  //         }

  //         const response = await fetch(`${DBLink}/job/updateJob/${jobId}`, {
  //             method: "PUT",
  //             mode: "cors",
  //             headers: { "Content-Type": "application/json" },
  //             body: JSON.stringify({ _id: jobId, ...dataToSend }),
  //         });

  //         // ... rest of the function remains the same
  //         if (response.ok) {
  //             const updatedJob: Job = await response.json();

  //             const processedUpdatedJob = {
  //                 ...updatedJob,
  //                 due: updatedJob.due ? new Date(updatedJob.due) : updatedJob.due
  //             };

  //             const updatedJobsList = jobs.map((job) => 
  //                 job._id === processedUpdatedJob._id ? processedUpdatedJob : job
  //             );
  //             setJobs(updatedJobsList);


  //             setIsEditJobModalOpen(false);
  //             setJobToEdit(null);
  //         } else {
  //             const errorText = await response.text();
  //             console.error("Failed to update job:", response.status, errorText);
  //         }
  //     } catch (err) {
  //         console.error("Error updating job:", err);
  //     }
  // };

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
    try {
      const response = await fetch(`${DBLink}/subJob/insertSubJob`, {
        method: "POST",
        mode: "cors",
        headers: { "Content-Type": "application/json" }, // Corrected content type
        body: JSON.stringify(newSubJobData),
      });

      if (response.ok) {
        const addedSubJob: SubJob = await response.json(); // Assuming API returns the created job
        setSubJobs(prevSubJobs => [...prevSubJobs, addedSubJob]);
      } else {
        const errorText = await response.text(); // Read error response
        console.error("Failed to create sub-job:", response.status, errorText);
      }
    } catch (err) {
      console.error("Error creating sub-job:", err);
    }
  };

  const handleAddCushion = async (newCushionData: Cushion) => {
    try {
      const response = await fetch(`${DBLink}/cushion/postCreateCushion`, {
        method: "POST",
        mode: "cors",
        headers: { "Content-Type": "application/json" }, // Corrected content type
        body: JSON.stringify(newCushionData),
      });

      if (response.ok) {
        const addedCushion: Cushion = await response.json(); // Assuming API returns the created job
        setCushions(prevCushions => [...prevCushions, addedCushion]);
      } else {
        const errorText = await response.text(); // Read error response
        console.error("Failed to create cushion:", response.status, errorText);
      }
    } catch (err) {
      console.error("Error creating cushion:", err);
    }
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
                <SubJobTable subJobsParam={subJobs} />
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

      <EditJobFormModal
        isOpen={isEditJobModalOpen}
        onClose={() => {
          setIsEditJobModalOpen(false);
          setJobToEdit(null); // Clear jobToEdit when closing
        }}
        jobToEdit={jobToEdit}
        onUpdateJob={handleUpdateJob}
      />

      {/* <AddCushionFormModal
        isOpen={isAddCushionModalOpen}
        onClose={() => {
          setIsAddCushionModalOpen(false);
          setSelectedSubJobInfoForCushion(null);
        }}
        subJobId={selectedSubJobInfoForCushion?.subJobId || null}
        onAddCushion={handleAddCushion}
      /> */}
    </>
  );
}

export default Schedule;