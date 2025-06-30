import React from 'react';
import type { Job } from '../types/jobTypes';

interface JobTableRowProps {
    job: Job;
    showSubJobList: (jobId: number) => React.JSX.Element[]; // Define the type for the function
}

function JobTableRow({ job, showSubJobList }: JobTableRowProps) {
    return (
        <tr>
            <td>{job.id}</td>
            <td>{job.client}</td>
            <td>{job.name}</td>
            <td>{job.due}</td>
            <td>
                <div className="sp-sub-jobs-container">
                    {showSubJobList(job.id)}
                    <input type="button" value="+"></input>
                </div>
            </td>
            <td><input type="button" value="Edit"></input></td>
        </tr>
    );
}

export default JobTableRow;