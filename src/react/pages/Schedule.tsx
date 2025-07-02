// import "../styles/Schedule.css";
// import "../styles/Global.css";
// import Navbar from "../components/Navbar";
// import SPSchedule from "../components/SPSchedule"
// import { useState } from 'react';
// import type { Job, FrameUpholstery, Cushion, SubJob } from '../types/jobTypes'; 
// import { mockJobs as initialJobsData } from '../data/mockJobs'; 

// function Schedule() {
//     const [searchTerm, setSearchTerm] = useState<string>('');
//     const [allJobs, setAllJobs] = useState<Job[]>(initialJobsData);

//     // Handler for when the search input changes
//     const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//         setSearchTerm(event.target.value);
//     };
//     return (
//         <>
//             <Navbar />
//             <div id="first-container">
//                 <div id="schedule-first-container">
//                     <div id="search-container">
//                         <input 
//                             type="search" 
//                             placeholder="Search"
//                             value={searchTerm}
//                             onChange={handleSearchChange}
//                             >
//                         </input>
//                     </div>
//                     <div id="filter-container">
//                         <h1>Filter</h1>
//                     </div>
//                 </div>
//                 <div id="order-container">
//                     <h1>Orders</h1>
//                     <SPSchedule searchTerm={searchTerm}/>
//                 </div>
//             </div>
//         </>
//     )
// }

// export default Schedule;

import "../styles/Schedule.css";
import "../styles/Global.css";
import "../styles/ModalForm.css"
import Navbar from "../components/Navbar";
import { useState } from 'react';

import SearchBar from "../components/Searchbar"; // New component
import JobTable from "../components/JobTable"; // New component
import AddJobFormModal from "../components/AddJobFormModal"; // New modal component
import { mockJobs as initialJobsData } from '../data/mockJobs'; // Import initial data

function Schedule() {
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [jobs, setJobs] = useState(initialJobsData); // Manage jobs state here
    const [isAddJobModalOpen, setIsAddJobModalOpen] = useState(false);

    // Handler for when the search input changes
    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    // Handler for adding a new job
    const handleAddJob = (newJobData: { jobId: string; invoiceId: number; client: string; name: string; due: string;}) => {
        // Create a new Job object with empty subJobs as requested
        const newJob = {
            ...newJobData,
            subJobs: [], // Empty subJobs array
        };
        setJobs(prevJobs => [...prevJobs, newJob]);
        setIsAddJobModalOpen(false); // Close the modal after adding
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
                    <JobTable searchTerm={searchTerm} jobs={jobs} /> {/* Pass jobs state to JobTable */}
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