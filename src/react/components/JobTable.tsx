// import { useState, useEffect } from 'react';
// import type { Job } from '../types/jobTypes'; // Ensure Job and SubJob types are imported
// // Removed import of mockJobs as it's now passed via props
// import AddSubJobFormModal from "../components/AddSubJobFormModal";
// import JobTableRow from './JobTableRow'; // New component

// interface JobTableProps {
//     searchTerm: string;
//     jobs: Job[]; // Accept jobs as a prop
// }

// function JobTable({ searchTerm, jobs }: JobTableProps) { // Destructure jobs from props
//     const [displayedJobs, setDisplayedJobs] = useState<Job[]>(jobs); // Initialize with prop jobs
//     const [isAddSubJobModalOpen, setIsAddSubJobModalOpen] = useState(false);

//     useEffect(() => {
//         const lowerCaseSearchTerm = searchTerm.toLowerCase();

//         const filtered = jobs.filter(job => { // Filter the 'jobs' prop
//             if (String(job.invoiceId).toLowerCase().includes(lowerCaseSearchTerm)) {
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
//             // Ensure subJobs array exists before trying to access it
//             if (job.subJobs && job.subJobs.some(subjob =>
//                 subjob.jobdetail.toLowerCase().includes(lowerCaseSearchTerm)
//             )) {
//                 return true;
//             }
//             return false;
//         });
//         setDisplayedJobs(filtered);
//     }, [searchTerm, jobs]); // Add 'jobs' to dependency array

//     // This data transformation can stay here as it's directly used by showSubJobList
//     const allSubJobs = jobs.flatMap((job) => // Use the 'jobs' prop
//         job.subJobs.map((subjob) => ({
//             jobId: job.jobId,
//             invoiceId: job.invoiceId,
//             jobName: job.name,
//             jobDue: job.due,
//             jobClient: job.client,
//             ...subjob,
//         }))
//     );

//     const showSubJobList = (currentJobId: String) => {
//         const filteredSubJobs = allSubJobs.filter(
//             (subjob) => subjob.jobId === currentJobId
//         );

//         return filteredSubJobs.map((sj, index) => (
//             <p 
//                 className="sp-sub-job" 
//                 key={`${sj.jobId}-${sj.id || index}-${index}`}
//                 onClick={() => setIsAddSubJobModalOpen(true)}
//             >
//                 {sj.jobdetail}
//             </p>
//         ));
//     };

//     return (
//         <>
//             <div className="sp-jobs-container">
//                 <table>
//                     <thead>
//                         <tr>
//                             <th>Invoice ID</th>
//                             <th>Client Name</th>
//                             <th>Job Name</th>
//                             <th>Due Date</th>
//                             <th>Job Component</th>
//                             <th></th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {displayedJobs.map((job) => (
//                             <JobTableRow
//                                 key={job.jobId}
//                                 job={job}
//                                 showSubJobList={showSubJobList} // Pass the function down
//                             />
//                         ))}
//                     </tbody>
//                 </table>
//             </div>

//             {/* Add Job Pop-up Modal */}
//             {/* <AddSubJobFormModal
//                 job={allSubJobs}
//                 isOpen={isAddSubJobModalOpen}
//                 onSubJobModalClose={() => setIsAddSubJobModalOpen(false)}
                
//             /> */}
//         </>
        
//     );
// }

// export default JobTable;

// JobTable.tsx
// import { useState, useEffect } from 'react';
// import type { Job, SubJob } from '../types/jobTypes-erd';
// import AddSubJobFormModal from "../components/AddSubJobFormModal";
// import JobTableRow from './JobTableRow';

// interface JobTableProps {
//     searchTerm: string;
//     jobs: Job[];
//     subJobs: SubJob[]; // Accept all subJobs as a prop
//     onAddSubJob: (newSubJobData: Omit<SubJob, 'jobId'> & { jobId: string }) => void; // Handler for adding sub-jobs
// }

// function JobTable({ searchTerm, jobs, subJobs, onAddSubJob }: JobTableProps) {
//     const [displayedJobs, setDisplayedJobs] = useState<Job[]>(jobs);
//     const [isAddSubJobModalOpen, setIsAddSubJobModalOpen] = useState(false);
//     // State to hold both jobId and invoiceId for the selected job
//     const [selectedJobInfoForSubJob, setSelectedJobInfoForSubJob] = useState<{ jobId: string; invoiceId: number } | null>(null);

//     useEffect(() => {
//         const lowerCaseSearchTerm = searchTerm.toLowerCase();

//         const filteredJobs = jobs.filter(job => {
//             // Search in Job properties
//             if (String(job.invoiceId).toLowerCase().includes(lowerCaseSearchTerm)) {
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
//             if (job.jobId.toLowerCase().includes(lowerCaseSearchTerm)) {
//                 return true;
//             }
//             if (job.type.toLowerCase().includes(lowerCaseSearchTerm)) {
//                 return true;
//             }

//             // Search in associated SubJob properties
//             // Find subJobs for the current job
//             const jobSpecificSubJobs = subJobs.filter(subjob => subjob.jobId === job.jobId);
//             if (jobSpecificSubJobs.some(subjob =>
//                 subjob.subJobDetail.toLowerCase().includes(lowerCaseSearchTerm)
//             )) {
//                 return true;
//             }
//             return false;
//         });
//         setDisplayedJobs(filteredJobs);
//     }, [searchTerm, jobs, subJobs]);

//     // This function now filters the global subJobs array for the specific job
//     // JOIN query to retrieve sub-jobs belong to a job with "currentJobId"
//     const getSubJobsForJob = (currentJobId: string) => {
//         return subJobs.filter(subjob => subjob.jobId === currentJobId);
//     };

//     // Updated handler to receive both jobId and invoiceId
//     const handleOpenAddSubJobModal = (jobId: string, invoiceId: number) => {
//         setSelectedJobInfoForSubJob({ jobId, invoiceId });
//         setIsAddSubJobModalOpen(true);
//     };

//     const handleCloseAddSubJobModal = () => {
//         setIsAddSubJobModalOpen(false);
//         setSelectedJobInfoForSubJob(null); // Clear selected job info on close
//     };


//     return (
//         <>
//             <div className="sp-jobs-container">
//                 <table>
//                     <thead>
//                         <tr>
//                             <th>Invoice ID</th>
//                             <th>Client Name</th>
//                             <th>Job Name</th>
//                             <th>Type</th>
//                             <th>Due Date</th>
//                             <th>Job Component</th>
//                             <th></th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {displayedJobs.map((job) => (
//                             <JobTableRow
//                                 key={job.jobId}
//                                 job={job}
//                                 subJobsForJob={getSubJobsForJob(job.jobId)}
//                                 // Pass both jobId and invoiceId to the click handler
//                                 onAddSubJobClick={handleOpenAddSubJobModal}
//                             />
//                         ))}
//                     </tbody>
//                 </table>
//             </div>

//             {/* Add SubJob Pop-up Modal */}
//             <AddSubJobFormModal
//                 isOpen={isAddSubJobModalOpen}
//                 onClose={handleCloseAddSubJobModal}
//                 jobId={selectedJobInfoForSubJob?.jobId || null} // Pass jobId
//                 invoiceId={selectedJobInfoForSubJob?.invoiceId || null} // Pass invoiceId
//                 onAddSubJob={onAddSubJob}
//             />
//         </>
//     );
// }

// export default JobTable;


// Denver's database
import { useState, useEffect } from 'react';
// import type { Job, SubJob } from '../types/jobTypes-erd';
import AddSubJobFormModal from "../components/AddSubJobFormModal";
import JobTableRow from './JobTableRow';


interface JobTableProps {
    searchTerm: string;
    jobs: Job[];
    subJobs: SubJob[]; // Accept all subJobs as a prop
    onAddSubJob: (newSubJobData: Omit<SubJob, 'jobId'> & { jobId: string }) => void; // Handler for adding sub-jobs
}

function JobTable({ searchTerm, jobs, subJobs, onAddSubJob }: JobTableProps) {
    const [displayedJobs, setDisplayedJobs] = useState<Job[]>(jobs);
    const [isAddSubJobModalOpen, setIsAddSubJobModalOpen] = useState(false);
    // State to hold both jobId and invoiceId for the selected job
    const [selectedJobInfoForSubJob, setSelectedJobInfoForSubJob] = useState<{ jobId: string; invoiceId: number } | null>(null);


    useEffect(() => {
        const lowerCaseSearchTerm = searchTerm.toLowerCase();

        const filteredJobs = jobs.filter(job => {
            // Search in Job properties
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
            if (job.jobId.toLowerCase().includes(lowerCaseSearchTerm)) {
                return true;
            }
            if (job.type.toLowerCase().includes(lowerCaseSearchTerm)) {
                return true;
            }

            // Search in associated SubJob properties
            // Find subJobs for the current job
            const jobSpecificSubJobs = subJobs.filter(subjob => subjob.jobId === job.jobId);
            if (jobSpecificSubJobs.some(subjob =>
                subjob.subJobDetail.toLowerCase().includes(lowerCaseSearchTerm)
            )) {
                return true;
            }
            return false;
        });
        setDisplayedJobs(filteredJobs);
    }, [searchTerm, jobs, subJobs]);

    // This function now filters the global subJobs array for the specific job
    // JOIN query to retrieve sub-jobs belong to a job with "currentJobId"
    const getSubJobsForJob = (currentJobId: string) => {
        return subJobs.filter(subjob => subjob.jobId === currentJobId);
    };

    // Updated handler to receive both jobId and invoiceId
    const handleOpenAddSubJobModal = (jobId: string, invoiceId: number) => {
        setSelectedJobInfoForSubJob({ jobId, invoiceId });
        setIsAddSubJobModalOpen(true);
    };

    const handleCloseAddSubJobModal = () => {
        setIsAddSubJobModalOpen(false);
        setSelectedJobInfoForSubJob(null); // Clear selected job info on close
    };


    return (
        <>
            <div className="sp-jobs-container">
                <table>
                    <thead>
                        <tr>
                            <th>Invoice ID</th>
                            <th>Client Name</th>
                            <th>Job Name</th>
                            <th>Type</th>
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
                                subJobsForJob={getSubJobsForJob(job.jobId)}
                                // Pass both jobId and invoiceId to the click handler
                                onAddSubJobClick={handleOpenAddSubJobModal}
                            />
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Add SubJob Pop-up Modal */}
            <AddSubJobFormModal
                isOpen={isAddSubJobModalOpen}
                onClose={handleCloseAddSubJobModal}
                jobId={selectedJobInfoForSubJob?.jobId || null} // Pass jobId
                invoiceId={selectedJobInfoForSubJob?.invoiceId || null} // Pass invoiceId
                onAddSubJob={onAddSubJob}
            />
        </>
    );
}

export default JobTable;