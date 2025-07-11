interface JobTableRowProps {
    job: any;
    subJobsForJob: SubJob[];
    // Update prop type to expect both jobId and invoiceId
    onAddSubJobClick: (jobId: string, invoiceId: string) => void;
    onEditJobClick: (job: Job) => void; 
}

function JobTableRow({ job, subJobsForJob, onAddSubJobClick, onEditJobClick }: JobTableRowProps) {
    
    return (
        <tr key={`${job._id}`}>
            <td>{job.invoiceId}</td>
            <td>{job.client}</td>
            <td>{job.name}</td>
            <td>{job.type}</td>
            <td>{String(job.due)}</td>
            <td>
                <div className="sp-sub-jobs-container">
                    {subJobsForJob.map((subjob) => (
                        <p
                            className="sp-sub-job"
                            key={`${subjob.jobId}-${subjob._id}`}
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
            <td>
                <input 
                    type="button" 
                    value="Edit"
                    onClick={() => onEditJobClick(job)} >
                </input>
            </td>
        </tr>
    );
}

export default JobTableRow;