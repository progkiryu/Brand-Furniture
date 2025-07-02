// import { useState, useEffect } from 'react';
// import type { Job } from '../types/jobTypes'; // Ensure Job and SubJob types are imported
// import { mockJobs as initialJobsData } from '../data/mockJobs';

// import JobTableRow from './JobTableRow'; // New component

// interface JobTableProps {
//     searchTerm: string;
// }

// function JobTable({ searchTerm }: JobTableProps) {
//     const [displayedJobs, setDisplayedJobs] = useState<Job[]>(initialJobsData);

//     useEffect(() => {
//         const lowerCaseSearchTerm = searchTerm.toLowerCase();

//         const filtered = initialJobsData.filter(job => {
//             if (String(job.id).toLowerCase().includes(lowerCaseSearchTerm)) {
//                 return true;
//             }
//             if (job.client.toLowerCase().includes(lowerCaseSearchTerm)) {
//                 return true;
//             }
//             if (job.name.toLowerCase().includes(lowerCaseSearchTerm)) {
//                 return true;
//             }
//             if (job.due.toLowerCase().includes(lowerCaseSearchTerm)) {
//                 return true;
//             }
//             if (job.subJobs.some(subjob =>
//                 subjob.jobdetail.toLowerCase().includes(lowerCaseSearchTerm)
//             )) {
//                 return true;
//             }
//             return false;
//         });
//         setDisplayedJobs(filtered);
//     }, [searchTerm]);

//     // This data transformation can stay here as it's directly used by showSubJobList
//     const allSubJobs = initialJobsData.flatMap((job) =>
//         job.subJobs.map((subjob) => ({
//             jobId: job.id,
//             jobName: job.name,
//             jobDue: job.due,
//             jobClient: job.client,
//             ...subjob,
//         }))
//     );

//     const showSubJobList = (currentJobId: number) => {
//         const filteredSubJobs = allSubJobs.filter(
//             (subjob) => subjob.jobId === currentJobId
//         );

//         return filteredSubJobs.map((sj, index) => (
//             // A separate SubJobItem component could be created if these paragraphs grow complex
//             <p className="sp-sub-job" key={`${sj.jobId}-${sj.id || index}-${index}`}>{sj.jobdetail}</p>
//         ));
//     };

//     return (
//         <div className="sp-jobs-container">
//             <table>
//                 <thead>
//                     <tr>
//                         <th>Invoice ID</th>
//                         <th>Client Name</th>
//                         <th>Job Name</th>
//                         <th>Due Date</th>
//                         <th>Job Component</th>
//                         <th></th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {displayedJobs.map((job) => (
//                         <JobTableRow
//                             key={job.id} // Important for list rendering
//                             job={job}
//                             showSubJobList={showSubJobList} // Pass the function down
//                         />
//                     ))}
//                 </tbody>
//             </table>
//         </div>
//     );
// }

// export default JobTable;

import { useState, useEffect } from 'react';
import type { Job } from '../types/jobTypes'; // Ensure Job and SubJob types are imported
// Removed import of mockJobs as it's now passed via props

import JobTableRow from './JobTableRow'; // New component

interface JobTableProps {
    searchTerm: string;
    jobs: Job[]; // Accept jobs as a prop
}

function JobTable({ searchTerm, jobs }: JobTableProps) { // Destructure jobs from props
    const [displayedJobs, setDisplayedJobs] = useState<Job[]>(jobs); // Initialize with prop jobs

    useEffect(() => {
        const lowerCaseSearchTerm = searchTerm.toLowerCase();

        const filtered = jobs.filter(job => { // Filter the 'jobs' prop
            if (String(job.invoiceId).toLowerCase().includes(lowerCaseSearchTerm)) {
                return true;
            }
            if (job.client.toLowerCase().includes(lowerCaseSearchTerm)) {
                return true;
            }
            if (job.name.toLowerCase().includes(lowerCaseSearchTerm)) {
                return true;
            }
            if (job.due.toLowerCase().includes(lowerCaseSearchTerm)) {
                return true;
            }
            // Ensure subJobs array exists before trying to access it
            if (job.subJobs && job.subJobs.some(subjob =>
                subjob.jobdetail.toLowerCase().includes(lowerCaseSearchTerm)
            )) {
                return true;
            }
            return false;
        });
        setDisplayedJobs(filtered);
    }, [searchTerm, jobs]); // Add 'jobs' to dependency array

    // This data transformation can stay here as it's directly used by showSubJobList
    const allSubJobs = jobs.flatMap((job) => // Use the 'jobs' prop
        job.subJobs.map((subjob) => ({
            jobId: job.jobId,
            invoiceId: job.invoiceId,
            jobName: job.name,
            jobDue: job.due,
            jobClient: job.client,
            ...subjob,
        }))
    );

    const showSubJobList = (currentJobId: String) => {
        const filteredSubJobs = allSubJobs.filter(
            (subjob) => subjob.jobId === currentJobId
        );

        return filteredSubJobs.map((sj, index) => (
            <p className="sp-sub-job" key={`${sj.jobId}-${sj.id || index}-${index}`}>{sj.jobdetail}</p>
        ));
    };

    return (
        <div className="sp-jobs-container">
            <table>
                <thead>
                    <tr>
                        <th>Invoice ID</th>
                        <th>Client Name</th>
                        <th>Job Name</th>
                        <th>Due Date</th>
                        <th>Job Component</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {displayedJobs.map((job) => (
                        <JobTableRow
                            key={job.jobId}
                            job={job}
                            showSubJobList={showSubJobList} // Pass the function down
                        />
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default JobTable;