// import React from 'react';
// import type { Job } from '../types/jobTypes';

// interface JobTableRowProps {
//     job: Job;
//     // showSubJobList: (jobId: number) => React.JSX.Element[]; 
//     showSubJobList: (jobId: String) => React.JSX.Element[]; 
// }

// function JobTableRow({ job, showSubJobList }: JobTableRowProps) {
//     return (
//         <tr>
//             <td>{job.invoiceId}</td>
//             <td>{job.client}</td>
//             <td>{job.name}</td>
//             <td>{job.due}</td>
//             <td>
//                 <div className="sp-sub-jobs-container">
//                     {showSubJobList(job.jobId)}
//                     <input type="button" value="+"></input>
//                 </div>
//             </td>
//             <td><input type="button" value="Edit"></input></td>
//         </tr>
//     );
// }

// export default JobTableRow;



// JobTableRow.tsx
// import type { Job, SubJob } from '../types/jobTypes-erd';

// interface JobTableRowProps {
//     job: Job;
//     subJobsForJob: SubJob[];
//     // Update prop type to expect both jobId and invoiceId
//     onAddSubJobClick: (jobId: string, invoiceId: number) => void;
// }

// function JobTableRow({ job, subJobsForJob, onAddSubJobClick }: JobTableRowProps) {
//     return (
//         <tr>
//             <td>{job.invoiceId}</td>
//             <td>{job.client}</td>
//             <td>{job.name}</td>
//             <td>{job.type}</td>
//             <td>{job.due}</td>
//             <td>
//                 <div className="sp-sub-jobs-container">
//                     {subJobsForJob.map((subjob) => (
//                         <p
//                             className="sp-sub-job"
//                             key={`${subjob.jobId}-${subjob.subJobId}`}
//                             // onClick={() => handleEditSubJob(subjob.jobId, subjob.subJobId)} // Placeholder for future edit
//                         >
//                             {subjob.subJobDetail}
//                         </p>
//                     ))}
//                     <input
//                         type="button"
//                         value="+"
//                         // Pass both job.jobId and job.invoiceId
//                         onClick={() => onAddSubJobClick(job.jobId, job.invoiceId)}
//                     />
//                 </div>
//             </td>
//             <td><input type="button" value="Edit"></input></td>
//         </tr>
//     );
// }

// export default JobTableRow;



interface JobTableRowProps {
    job: any;
    subJobsForJob: SubJob[];
    // Update prop type to expect both jobId and invoiceId
    onAddSubJobClick: (jobId: string, invoiceId: number) => void;
}

function JobTableRow({ job, subJobsForJob, onAddSubJobClick }: JobTableRowProps) {
    
    return (
        <tr>
            <td>{job.invoiceId}</td>
            <td>{job.client}</td>
            <td>{job.name}</td>
            <td>{job.type}</td>
            <td>{job.due}</td>
            <td>
                <div className="sp-sub-jobs-container">
                    {subJobsForJob.map((subjob) => (
                        <p
                            className="sp-sub-job"
                            key={`${subjob.jobId}-${subjob.subJobId}`}
                            // onClick={() => handleEditSubJob(subjob.jobId, subjob.subJobId)} // Placeholder for future edit
                        >
                            {subjob.subJobDetail}
                        </p>
                    ))}
                    <input
                        type="button"
                        value="+"
                        // Pass both job.jobId and job.invoiceId
                        onClick={() => onAddSubJobClick(job._id, job.invoiceId)}
                    />
                </div>
            </td>
            <td><input type="button" value="Edit"></input></td>
        </tr>
    );
}

export default JobTableRow;


