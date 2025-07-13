import { useState, useEffect } from 'react';


interface JobTableProps {
    searchTerm: string;
    jobs: Job[];
    jobClicked: (job: Job) => Promise<void>;
    // onAddSubJob: (NewSubJobDataForAdd: Omit<SubJob, 'jobId'> & { jobId: string }) => void; // Handler for adding sub-jobs
    onAddSubJob: (newSubJobData: SubJob) => void;
    onEditJobClick: (job: Job) => void;
}

function JobTable({ searchTerm, jobs, jobClicked }: JobTableProps) {
    const [displayedJobs, setDisplayedJobs] = useState<Job[]>(jobs);
    // State to hold both jobId and invoiceId for the selected job


    useEffect(() => {
        const lowerCaseSearchTerm = searchTerm.toLowerCase();

        const filteredJobs = jobs.filter(job => {
            // Search in Job properties

            if (job.name.toLowerCase().includes(lowerCaseSearchTerm)) {
                return true;
            }
        });
        setDisplayedJobs(filteredJobs);
    }, [searchTerm, jobs]);

    return (
        <>
            <div className="sp-jobs-container">
                <table>
                    <tbody>
                        {displayedJobs.map((job) => (
                            <tr key={String(job._id)}
                                onClick={() => jobClicked(job)}
                            >
                                <td>{job.name}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}

export default JobTable;

