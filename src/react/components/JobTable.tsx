import { useState, useEffect } from 'react';
import AddSubJobFormModal from "../components/AddSubJobFormModal";
import JobTableRow from './JobTableRow';
import type { NewSubJobDataForAdd } from '../pages/Schedule';



interface JobTableProps {
    searchTerm: string;
    jobs: Job[];
    subJobs: SubJob[]; // Accept all subJobs as a prop
    // onAddSubJob: (NewSubJobDataForAdd: Omit<SubJob, 'jobId'> & { jobId: string }) => void; // Handler for adding sub-jobs
    onAddSubJob: (jobId: string, newSubJobData: NewSubJobDataForAdd) => void;
    onEditJobClick: (job: Job) => void;
}

function JobTable({ searchTerm, jobs, subJobs, onAddSubJob, onEditJobClick }: JobTableProps) {
    const [displayedJobs, setDisplayedJobs] = useState<Job[]>(jobs);
    const [isAddSubJobModalOpen, setIsAddSubJobModalOpen] = useState(false);
    // State to hold both jobId and invoiceId for the selected job
    const [selectedJobInfoForSubJob, setSelectedJobInfoForSubJob] = useState<{ jobId: string; invoiceId: string } | null>(null);


    useEffect(() => {
        const lowerCaseSearchTerm = searchTerm.toLowerCase();

        const filteredJobs = jobs.filter(job => {
            // Search in Job properties
            if (job.invoiceId.toLowerCase().includes(lowerCaseSearchTerm)) {
                return true;
            }
            if (job.client.toLowerCase().includes(lowerCaseSearchTerm)) {
                return true;
            }
            if (job.name.toLowerCase().includes(lowerCaseSearchTerm)) {
                return true;
            }
            if (String(job.due).toLowerCase().includes(lowerCaseSearchTerm)) {
                return true;
            }
            if (job.type.toLowerCase().includes(lowerCaseSearchTerm)) {
                return true;
            }

            // Search in associated SubJob properties
            // Find subJobs for the current job
            const jobSpecificSubJobs = subJobs.filter(subjob => subjob.jobId === job._id);
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
    const getSubJobsForJob = (currentJobId: String | undefined) => {
        return subJobs.filter(subjob => subjob.jobId === currentJobId);
    };

    // Updated handler to receive both jobId and invoiceId
    const handleOpenAddSubJobModal = (jobId: string, invoiceId: string) => {
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
                                key={String(job._id)}
                                job={job}
                                subJobsForJob={getSubJobsForJob(job._id)}
                                // Pass both jobId and invoiceId to the click handler
                                onAddSubJobClick={handleOpenAddSubJobModal}
                                onEditJobClick={onEditJobClick}
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