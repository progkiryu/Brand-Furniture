import "../styles/Schedule.css";
import "../styles/Global.css";
import "../styles/ModalForm.css"
import "../styles/SubJobModalForm.css" // Ensure this CSS file exists or create it if needed

import { createJob } from "../api/jobAPI";
import { updateJob } from "../api/jobAPI";
import { getAllJobs } from "../api/jobAPI";
 
import Navbar from "../components/Navbar";
import SearchBar from "../components/Searchbar"; // New component
import JobTable from "../components/JobTable"; // New component
import AddJobFormModel from "../components/AddJobFormModel"; // New modal component
import EditJobFormModal from "../components/EditJobFormModal"; 



import { DBLink } from "../App";

import { useState, useEffect } from 'react';

 
function Schedule() {
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [jobs, setJobs] = useState<Array<Job>>([]); // Manage jobs state here
    // Manage all top-level data arrays as state
    const [subJobs, setSubJobs] = useState<Array<SubJob>>([]);
    const [isAddJobModelOpen, setIsAddJobModelOpen] = useState(false);
    const [isEditJobModalOpen, setIsEditJobModalOpen] = useState(false);
    const [jobToEdit, setJobToEdit] = useState<Job | null>(null);

    useEffect(() => {
        fetch(`${DBLink}/job/getAllJobs`)
            .then(res => res.json())
            .then(data => {
                console.log(`the data: ${data}`);
                setJobs(data)
            })
            .catch(err => console.log(err));

            fetch(`${DBLink}/subJob/getAllSubJobs`)
            .then((res) => res.json())
            .then((data) => setSubJobs(data))
            .catch((err) => console.log(err));
    }, []);
 
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
        const updatedJobsList : Job[] = await updateJob(updatedData);
        if (updatedJobsList){
            setJobs(updatedJobsList);
            setIsEditJobModalOpen(false);
            setJobToEdit(null);
        }
        else {
            console.error("Failed to update job.");
        }
        
            
    };


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
                setSubJobs(prevJobs => [...prevJobs, addedSubJob]);
            } else {
                const errorText = await response.text(); // Read error response
                console.error("Failed to create sub-job:", response.status, errorText);
            }
        } catch (err) {
            console.error("Error creating sub-job:", err);
        }
    };

 
 
    return (
        <>
            <Navbar />
            <div id="first-container">
                <div id="schedule-first-container">
                    <div id="add-job-container">
                        <button onClick={() => setIsAddJobModelOpen(true)} className="add-job-btn">
                            Add Job
                        </button>
                    </div>
                    <div id="search-container">
                        <SearchBar searchTerm={searchTerm} onSearchChange={handleSearchChange} />
                    </div>
                    <div id="filter-container">
                        <h1>Filter</h1>
                    </div>
                </div>
                <div id="order-container">
                    {/* <h1>Orders</h1> */}
                    {/* Pass both jobs and subJobs to JobTable */}
                    <JobTable
                        searchTerm={searchTerm}
                        jobs={jobs}
                        subJobs={subJobs} // Pass all subJobs for filtering and display
                        onAddSubJob={handleAddSubJob} // Pass the handler for adding sub-jobs
                        onEditJobClick={handleEditJobClick}
                    />
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
        </>
    );
}
 
export default Schedule;