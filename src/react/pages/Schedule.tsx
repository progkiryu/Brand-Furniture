// import "../styles/Schedule.css";
// import "../styles/Global.css";
// import "../styles/ModalForm.css"
// import "../styles/SubJobModalForm.css"
// import Navbar from "../components/Navbar";
// import { useState } from 'react';

// import SearchBar from "../components/Searchbar"; // New component
// import JobTable from "../components/JobTable"; // New component
// import AddJobFormModal from "../components/AddJobFormModal"; // New modal component
// import { mockJobs as initialJobsData } from '../data/mockJobs'; // Import initial data

// function Schedule() {
//     const [searchTerm, setSearchTerm] = useState<string>('');
//     const [jobs, setJobs] = useState(initialJobsData); // Manage jobs state here
//     const [isAddJobModalOpen, setIsAddJobModalOpen] = useState(false);

//     // Handler for when the search input changes
//     const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//         setSearchTerm(event.target.value);
//     };

//     // Handler for adding a new job
//     const handleAddJob = (newJobData: {jobId: string; invoiceId: number; client: string; name: string; due: string;}) => {
//         // Create a new Job object with empty subJobs as requested
//         const newJob = {
//             ...newJobData,
//             subJobs: [], // Empty subJobs array
//         };
//         setJobs(prevJobs => [...prevJobs, newJob]);
//         setIsAddJobModalOpen(false); // Close the modal after adding

//     };

//     return (
//         <>
//             <Navbar />
//             <div id="first-container">
//                 <div id="schedule-first-container">
//                     <div id="add-job-container">
//                         <button onClick={() => setIsAddJobModalOpen(true)} className="add-job-btn">
//                             Add Job
//                         </button>
//                     </div>
//                     <div id="search-container">
//                         <SearchBar searchTerm={searchTerm} onSearchChange={handleSearchChange} />
//                     </div>
//                     <div id="filter-container">
//                         <h1>Filter</h1>
//                     </div>
//                 </div>
//                 <div id="order-container">
//                     <h1>Orders</h1>
//                     <JobTable searchTerm={searchTerm} jobs={jobs} /> {/* Pass jobs state to JobTable */}
//                 </div>
//             </div>

//             {/* Add Job Pop-up Modal */}
//             <AddJobFormModal
//                 isOpen={isAddJobModalOpen}
//                 onClose={() => setIsAddJobModalOpen(false)}
//                 onAddJob={handleAddJob}
//             />

//         </>
//     );
// }

// export default Schedule;





// // Schedule.tsx
// import "../styles/Schedule.css";
// import "../styles/Global.css";
// import "../styles/ModalForm.css"
// import "../styles/SubJobModalForm.css" // Ensure this CSS file exists or create it if needed
// import Navbar from "../components/Navbar";
// import { useState, useEffect } from 'react';


// // Import all mock data arrays from the ERD-style mockJobs-erd.ts
// import {
//     mockJobsData,
//     mockSubJobsData,
// } from '../data/mockJobs-erd'; // Corrected import path and names
// import type { Job, SubJob, NewJobDataForAdd } from '../types/jobTypes-erd'; // Corrected import path and names
// import SearchBar from "../components/Searchbar"; // New component
// import JobTable from "../components/JobTable"; // New component
// import AddJobFormModal from "../components/AddJobFormModal"; // New modal component
// import { mockJobs as initialJobsData } from '../data/mockJobs'; // Import initial data

// import { Link } from "../App";

// function Schedule() {
//     const [searchTerm, setSearchTerm] = useState<string>('');
//     // const [jobs, setJobs] = useState([]); // Manage jobs state here
//     // Manage all top-level data arrays as state
//     const [jobs, setJobs] = useState<Job[]>(mockJobsData);
//     const [subJobs, setSubJobs] = useState<SubJob[]>(mockSubJobsData);
    

//     const [isAddJobModalOpen, setIsAddJobModalOpen] = useState(false);

//     // Handler for when the search input changes
//     const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//         setSearchTerm(event.target.value);
//     };

//     // Handler for adding a new Job
//     const handleAddJob = (newJobData: NewJobDataForAdd) => {
//         // newJobData already contains jobId, invoiceId, client, name, due, type
//         const newJob: Job = { // Asserting type to Job
//             ...newJobData,
//         };
//         // @ts-ignore
//         setJobs(prevJobs => [...prevJobs, newJob]);
//         setIsAddJobModalOpen(false); // Close the modal after adding
//     };

//     //useEffect(() => {
//         //fetch(`${Link}/jobs`)
//             //.then(res => res.json())
//             //.then(jobs => {
//                 //console.log(jobs);
//                 //setJobs(jobs)
//             //})
//             //.catch(err => console.log(err));
//     //}, []);

//     // Handler for adding a new SubJob
//     const handleAddSubJob = (newSubJobData: Omit<SubJob, 'jobId'> & { jobId: string }) => {
//         // This function will be passed to JobTable and then to AddSubJobFormModal
//         // It needs the jobId to correctly associate the sub-job
//         const newSubJob: SubJob = {
//             ...newSubJobData,
//             // You might need to generate a unique subJobId here if it's not coming from the form
//             // For now, assuming subJobId is provided or will be generated in the modal
//         };
//         setSubJobs(prevSubJobs => [...prevSubJobs, newSubJob]);
//     };


//     return (
//         <>
//             <Navbar />
//             <div id="first-container">
//                 <div id="schedule-first-container">
//                     <div id="add-job-container">
//                         <button onClick={() => setIsAddJobModalOpen(true)} className="add-job-btn">
//                             Add Job
//                         </button>
//                     </div>
//                     <div id="search-container">
//                         <SearchBar searchTerm={searchTerm} onSearchChange={handleSearchChange} />
//                     </div>
//                     <div id="filter-container">
//                         <h1>Filter</h1>
//                     </div>
//                 </div>
//                 <div id="order-container">
//                     <h1>Orders</h1>
//                     {/* Pass both jobs and subJobs to JobTable */}
//                     <JobTable
//                         searchTerm={searchTerm}
//                         jobs={jobs}
//                         subJobs={subJobs} // Pass all subJobs for filtering and display
//                         onAddSubJob={handleAddSubJob} // Pass the handler for adding sub-jobs
//                     />
//                 </div>
//             </div>

//             {/* Add Job Pop-up Modal */}
//             <AddJobFormModal
//                 isOpen={isAddJobModalOpen}
//                 onClose={() => setIsAddJobModalOpen(false)}
//                 onAddJob={handleAddJob}
//             />
//         </>
//     );
// }

// export default Schedule;




// Schedule.tsx
// import "../styles/Schedule.css";
// import "../styles/Global.css";
// import "../styles/ModalForm.css";
// import "../styles/SubJobModalForm.css"; // Ensure this CSS file exists or create it if needed
// import Navbar from "../components/Navbar";
// // import { useState, useEffect } from 'react';
// import { useState, useEffect } from "react";

// // Import all mock data arrays from the ERD-style mockJobs-erd.ts
// import { mockJobsData, mockSubJobsData } from "../data/mockJobs-erd"; // Corrected import path and names
// import type { Job, SubJob, NewJobDataForAdd } from "../types/jobTypes-erd"; // Corrected import path and names
// import SearchBar from "../components/Searchbar"; // New component
// import JobTable from "../components/JobTable"; // New component
// import AddJobFormModal from "../components/AddJobFormModal"; // New modal component
// // import { mockJobs as initialJobsData } from '../data/mockJobs'; // Import initial data

// // import { Link } from "../App";

// function Schedule() {
//     const [searchTerm, setSearchTerm] = useState<string>('');
//     const [jobs, setJobs] = useState([]); // Manage jobs state here
//     // Manage all top-level data arrays as state
//     const [subJobs, setSubJobs] = useState<SubJob[]>(mockSubJobsData);
    

//     const [isAddJobModalOpen, setIsAddJobModalOpen] = useState(false);

//     // Handler for when the search input changes
//     const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//         setSearchTerm(event.target.value);
//     };

//     // Handler for adding a new Job
//     const handleAddJob = (newJobData: NewJobDataForAdd) => {
//         // newJobData already contains jobId, invoiceId, client, name, due, type
//         const newJob: Job = { // Asserting type to Job
//             ...newJobData,
//         };
//         // @ts-ignore
//         setJobs(prevJobs => [...prevJobs, newJob]);
//         setIsAddJobModalOpen(false); // Close the modal after adding
//     };

//     useEffect(() => {
//         fetch(`${Link}/jobs`)
//             .then(res => res.json())
//             .then(jobs => {
//                 console.log(jobs);
//                 setJobs(jobs)
//             })
//             .catch(err => console.log(err));
//     }, []);

//     // Handler for adding a new SubJob
//     const handleAddSubJob = (newSubJobData: Omit<SubJob, 'jobId'> & { jobId: string }) => {
//         // This function will be passed to JobTable and then to AddSubJobFormModal
//         // It needs the jobId to correctly associate the sub-job
//         const newSubJob: SubJob = {
//             ...newSubJobData,
//             // You might need to generate a unique subJobId here if it's not coming from the form
//             // For now, assuming subJobId is provided or will be generated in the modal
//         };
//         setSubJobs(prevSubJobs => [...prevSubJobs, newSubJob]);
//     };
//     setSubJobs((prevSubJobs) => [...prevSubJobs, newSubJob]);
//   };

//   return (
//     <>
//       <Navbar />
//       <div id="first-container">
//         <div id="schedule-first-container">
//           <div id="add-job-container">
//             <button
//               onClick={() => setIsAddJobModalOpen(true)}
//               className="add-job-btn"
//             >
//               Add Job
//             </button>
//           </div>
//           <div id="search-container">
//             <SearchBar
//               searchTerm={searchTerm}
//               onSearchChange={handleSearchChange}
//             />
//           </div>
//           <div id="filter-container">
//             <h1>Filter</h1>
//           </div>
//         </div>
//         <div id="order-container">
//           <h1>Orders</h1>
//           {/* Pass both jobs and subJobs to JobTable */}
//           <JobTable
//             searchTerm={searchTerm}
//             jobs={jobs}
//             subJobs={subJobs} // Pass all subJobs for filtering and display
//             onAddSubJob={handleAddSubJob} // Pass the handler for adding sub-jobs
//           />
//         </div>
//       </div>

//       {/* Add Job Pop-up Modal */}
//       <AddJobFormModal
//         isOpen={isAddJobModalOpen}
//         onClose={() => setIsAddJobModalOpen(false)}
//         onAddJob={handleAddJob}
//       />
//     </>
//   );
// }

// export default Schedule;


import "../styles/Schedule.css";
import "../styles/Global.css";
import "../styles/ModalForm.css"
import "../styles/SubJobModalForm.css" // Ensure this CSS file exists or create it if needed
import Navbar from "../components/Navbar";
import { useState, useEffect } from 'react';
 
 
// Import all mock data arrays from the ERD-style mockJobs-erd.ts
import {
    mockJobsData,
    mockSubJobsData,
} from '../data/mockJobs-erd'; // Corrected import path and names
import SearchBar from "../components/Searchbar"; // New component
import JobTable from "../components/JobTable"; // New component
import AddJobFormModal from "../components/AddJobFormModal"; // New modal component
import { mockJobs as initialJobsData } from '../data/mockJobs'; // Import initial data
 
import { DBLink } from "../App";
 
function Schedule() {
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [jobs, setJobs] = useState([]); // Manage jobs state here
    // Manage all top-level data arrays as state
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