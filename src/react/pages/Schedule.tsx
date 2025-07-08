import "../styles/Schedule.css";
import "../styles/Global.css";
import "../styles/ModalForm.css"
import "../styles/SubJobModalForm.css" // Ensure this CSS file exists or create it if needed
import Navbar from "../components/Navbar";
import { useState, useEffect } from 'react';
 

import SearchBar from "../components/Searchbar"; // New component
import JobTable from "../components/JobTable"; // New component
import AddJobFormModel from "../components/AddJobFormModel"; // New modal component

 
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

 
function Schedule() {
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [jobs, setJobs] = useState<Array<Job>>([]); // Manage jobs state here
    // Manage all top-level data arrays as state
    const [subJobs, setSubJobs] = useState<Array<SubJob>>([]);
    const [isAddJobModelOpen, setIsAddJobModelOpen] = useState(false);

    useEffect(() => {
        fetch(`${DBLink}/job/getAllJobs`)
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setJobs(data)
            })
            .catch(err => console.log(err));
    }, []);

    useEffect(() => {
        fetch(`${DBLink}/subJob/getAllSubJobs`)
        .then((res) => res.json())
        .then((data) => setSubJobs(data))
        .catch((err) => console.log(err));

        console.log(subJobs);
    }, []);
 
    // Handler for when the search input changes
    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };
 
    // Handler for adding a new Job
    // const handleAddJob = (newJobData: NewJobDataForAdd) => {
    //     // newJobData already contains jobId, invoiceId, client, name, due, type
    //     const newJob: Job = { // Asserting type to Job
            
    //         ...newJobData,
    //     };
    //     setJobs(prevJobs => [...prevJobs, newJob]);
    //     setIsAddJobModelOpen(false); // Close the modal after adding
    // };

 
    const handleAddJob = async (newJobData: NewJobDataForAdd) => {
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
                alert("Job created successfully.");
                setIsAddJobModelOpen(false); // Close the modal after adding
            } else {
                const errorText = await response.text(); // Read error response
                alert(`Error: Failed to create job. ${errorText}`);
                console.error("Failed to create job:", response.status, errorText);
            }
        } catch (err) {
            console.error("Error creating job:", err);
            alert("Error: Failed to connect to the server or create job.");
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
                    <h1>Orders</h1>
                    {/* Pass both jobs and subJobs to JobTable */}
                    <JobTable
                        searchTerm={searchTerm}
                        jobs={jobs}
                        subJobs={subJobs} // Pass all subJobs for filtering and display
                        onAddSubJob={handleAddSubJob} // Pass the handler for adding sub-jobs
                    />
                </div>
            </div>
 
            {/* Add Job Pop-up Modal */}
            <AddJobFormModel
                isOpen={isAddJobModelOpen}
                onClose={() => setIsAddJobModelOpen(false)}
                onAddJob={handleAddJob}
            />
        </>
    );
}
 
export default Schedule;