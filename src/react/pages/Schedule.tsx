// // Schedule.tsx
import "../styles/Schedule.css";
import "../styles/Global.css";
import "../styles/ModalForm.css"
import "../styles/SubJobModalForm.css" // Ensure this CSS file exists or create it if needed
import Navbar from "../components/Navbar";
import { useState, useEffect } from 'react';
import {
    mockSubJobsData,
} from '../data/mockJobs-erd'; // Corrected import path and names
import SearchBar from "../components/Searchbar"; // New component
import JobTable from "../components/JobTable"; // New component
import AddJobFormModal from "../components/AddJobFormModal"; // New modal component

import { DBLink } from "../App";

export interface NewJobDataForAdd {
  _id: any;
  invoiceId: number; // Changed from 'id' to 'invoiceId' for consistency
  client: string;
  name: string;
  type: string; // Added 'type' for consistency
  due: string;
}

function Schedule() {
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [jobs, setJobs] = useState([]);
    const [subJobs, setSubJobs] = useState<SubJob[]>(mockSubJobsData);
    const [isAddJobModalOpen, setIsAddJobModalOpen] = useState(false);


    // Handler for when the search input changes
    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    // Handler for adding a new Job
    const handleAddJob = (newJobData: NewJobDataForAdd) => {
        // newJobData already contains jobId, invoiceId, client, name, due, type
        const newJob: Job = { // Asserting type to Job
            ...newJobData,
        };
        // @ts-ignore
        setJobs(prevJobs => [...prevJobs, newJob]);
        setIsAddJobModalOpen(false); // Close the modal after adding
    };


    useEffect(() => {
        fetch(`${DBLink}/job/getAllJobs`)
            .then(res => res.json())
            .then(jobs => {
                console.log(jobs);
                setJobs(jobs)
            })
            .catch(err => console.log(err));
    }, []);

    // Handler for adding a new SubJob
    const handleAddSubJob = (newSubJobData: Omit<SubJob, 'jobId'> & { jobId: string }) => {
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
                        <button onClick={() => setIsAddJobModalOpen(true)} className="add-job-btn">
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
            <AddJobFormModal
                isOpen={isAddJobModalOpen}
                onClose={() => setIsAddJobModalOpen(false)}
                onAddJob={handleAddJob}
            />
        </>
    );
}

export default Schedule;






