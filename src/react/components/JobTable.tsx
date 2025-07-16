import { useState, useEffect } from 'react';

interface JobTableProps {
    searchTerm: string;
    jobs: Job[];
    jobClicked: (job: Job) => Promise<void>;
    onEditJobClick: (job: Job) => void;
}

function JobTable({ searchTerm, jobs, jobClicked, onEditJobClick }: JobTableProps) {
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
                            <tr key={String(job._id)}>
                                <td onClick={() => jobClicked(job)}> {/* Keep existing click for details */}
                                    {job.name}
                                    <input 
                                        type="button" 
                                        value="Edit Job" 
                                        onClick={(e) => {
                                            e.stopPropagation(); // Prevent row click from firing
                                            onEditJobClick(job);
                                        }}
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}

export default JobTable;

