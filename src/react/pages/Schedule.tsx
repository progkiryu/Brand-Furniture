import "../styles/Schedule.css";
import "../styles/Global.css";
import "../styles/ModalForm.css"
import "../styles/SubJobModalForm.css" // Ensure this CSS file exists or create it if needed
import Navbar from "../components/Navbar";
import { useState, useEffect } from 'react';
 

import SearchBar from "../components/Searchbar"; // New component
import JobTable from "../components/JobTable"; // New component
import AddJobFormModel from "../components/AddJobFormModel"; // New modal component
import EditJobFormModal from "../components/EditJobFormModal";

 
import { DBLink } from "../App";

export interface NewSubJobDataForAdd {
    jobId: string; // SubJob now has jobId directly
    subJobDetail: string;
    note?: string;
    file?: string;
    dueDate?: Date;
    depositAmount?: number;
    depositDate?: Date;
    paidInFull?: boolean;
    liaison?: string;
    paymentNote?: string;
    isArchived?: boolean;
}

export interface NewJobDataForAdd {
    invoiceId: String;
    client: String;
    name: String;
    type: String; // Added 'type' as per your mock data
    due: Date;
}

export interface UpdateJobData {
    invoiceId?: string;
    client?: string;
    name?: string;
    type?: string;
    due?: Date;
    isPinned?: boolean; // Include optional fields that can be updated
}

 
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
    }, []);

    useEffect(() => {
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

    const handleEditJobClick = (job: Job) => {
        setJobToEdit(job); // Set the job to be edited
        setIsEditJobModalOpen(true); // Open the edit modal
    };
    

    const handleUpdateJob = async (jobId: string, updatedData: UpdateJobData) => {
        try {
            const dataToSend: UpdateJobData = { ...updatedData };
            if (dataToSend.due) {
                dataToSend.due = dataToSend.due.toISOString() as any;
            }

            const response = await fetch(`${DBLink}/job/updateJob/${jobId}`, {
                method: "PUT",
                mode: "cors",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ _id: jobId, ...dataToSend }),
            });

            // ... rest of the function remains the same
            if (response.ok) {
                const updatedJob: Job = await response.json();
                
                const processedUpdatedJob = {
                    ...updatedJob,
                    due: updatedJob.due ? new Date(updatedJob.due) : updatedJob.due
                };

                const updatedJobsList = jobs.map((job) => 
                    job._id === processedUpdatedJob._id ? processedUpdatedJob : job
                );
                setJobs(updatedJobsList);


                setIsEditJobModalOpen(false);
                setJobToEdit(null);
            } else {
                const errorText = await response.text();
                console.error("Failed to update job:", response.status, errorText);
            }
        } catch (err) {
            console.error("Error updating job:", err);
        }
    };


    const handleAddSubJob = (jobId: string, newSubJobData: NewSubJobDataForAdd) => {
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