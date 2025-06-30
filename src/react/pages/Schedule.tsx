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

// src/pages/Schedule.tsx
import "../styles/Schedule.css";
import "../styles/Global.css";
import Navbar from "../components/Navbar";
import { useState } from 'react';
import type { Job } from '../types/jobTypes'; // Keep Job type if needed elsewhere, otherwise move
import { mockJobs as initialJobsData } from '../data/mockJobs'; // Keep initialJobsData if needed for initial state here

import SearchBar from "../components/SearchBar"; // New component
import JobTable from "../components/JobTable"; // New component

function Schedule() {
    const [searchTerm, setSearchTerm] = useState<string>('');

    // Handler for when the search input changes
    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    return (
        <>
            <Navbar />
            <div id="first-container">
                <div id="schedule-first-container">
                    <div id="search-container">
                        <SearchBar searchTerm={searchTerm} onSearchChange={handleSearchChange} />
                    </div>
                    <div id="filter-container">
                        <h1>Filter</h1>
                    </div>
                </div>
                <div id="order-container">
                    <h1>Orders</h1>
                    <JobTable searchTerm={searchTerm} /> {/* Pass searchTerm to JobTable */}
                </div>
            </div>
        </>
    );
}

export default Schedule;