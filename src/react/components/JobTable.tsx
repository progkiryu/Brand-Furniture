import { useState, useEffect } from 'react';
interface JobTableProps {
    searchTerm: string;
    invoiceIDTerm?: "asc" | "desc";
    jobNameTerm?: "asc" | "desc";
    clientTerm?: "asc" | "desc";
    dueDateTerm?: "asc" | "desc";
    jobs: Job[];
    jobClicked: (job: Job) => Promise<void>;
    // onEditJobClick: (job: Job) => void;
}

function JobTable({ searchTerm, jobs, jobClicked, invoiceIDTerm, clientTerm, dueDateTerm, jobNameTerm }: JobTableProps) {
    const [displayedJobs, setDisplayedJobs] = useState<Job[]>(jobs);
    // State to hold both jobId and invoiceId for the selected job

    const searchFilter = (searchTerm: String) => {
        const lowerCaseSearchTerm = searchTerm.toLowerCase();
        const filteredJobs = jobs.filter(job => {
            if (job.name.toLowerCase().includes(lowerCaseSearchTerm)) {
                return true;
            }
        })
        return filteredJobs;
    }

    const ascDescFilter = (
        sortedJobs: Job[],
        invoiceIDTerm?: "asc" | "desc", 
        jobNameTerm?: "asc" | "desc",
        clientTerm?: "asc" | "desc",
        dueDateTerm?: "asc" | "desc",
    ) => {
        if (invoiceIDTerm) {
            if (invoiceIDTerm === "asc") {
                sortedJobs.sort((a, b) => {
                    const invoiceIdA = a.invoiceId?.toLowerCase() || '';
                    const invoiceIdB = b.invoiceId?.toLowerCase() || '';
                    return invoiceIdA.localeCompare(invoiceIdB);
                });
            }
            else if (invoiceIDTerm === "desc") {
                sortedJobs.sort((a, b) => {
                    const invoiceIdA = a.invoiceId?.toLowerCase() || '';
                    const invoiceIdB = b.invoiceId?.toLowerCase() || '';
                    return invoiceIdB.localeCompare(invoiceIdA);
                });
            }
        }
        if (jobNameTerm) {
            if (jobNameTerm === "asc") {
                sortedJobs.sort((a, b) => {
                    const jobNameA = a.name.toLowerCase();
                    const jobNameB = b.name.toLowerCase();
                    return jobNameA.localeCompare(jobNameB);
                });
            }
            else if (jobNameTerm === "desc") {
                sortedJobs.sort((a, b) => {
                    const jobNameA = a.name.toLowerCase();
                    const jobNameB = b.name.toLowerCase();
                    return jobNameB.localeCompare(jobNameA);
                });
            }
        }
        if (clientTerm) {
            if (clientTerm === "asc") {
                sortedJobs.sort((a, b) => {
                    const clientA = a.client.toLowerCase();
                    const clientB = b.client.toLowerCase();
                    return clientA.localeCompare(clientB);
                });
            }
            else if (clientTerm === "desc") {
                sortedJobs.sort((a, b) => {
                    const clientA = a.client.toLowerCase();
                    const clientB = b.client.toLowerCase();
                    return clientB.localeCompare(clientA);
                });
            }
        }
        if (dueDateTerm) {
            if (dueDateTerm === "asc") {
                sortedJobs.sort((a, b) => {
                    const dueDateA = String(a.due).toLowerCase();
                    const dueDateB = String(b.due).toLowerCase();
                    return dueDateA.localeCompare(dueDateB);
                });
            }
            else if (dueDateTerm === "desc") {
                sortedJobs.sort((a, b) => {
                    const dueDateA = String(a.due).toLowerCase();
                    const dueDateB = String(b.due).toLowerCase();
                    return dueDateB.localeCompare(dueDateA);
                });
            }
        }
        return sortedJobs;
    }

    useEffect(() => {
        let filtered = [...jobs];
        filtered = searchFilter(searchTerm);
        filtered = ascDescFilter(
            filtered, 
            invoiceIDTerm,
            jobNameTerm,
            clientTerm,
            dueDateTerm
        )
        setDisplayedJobs(filtered);

    }, [searchTerm,
        jobs,
        invoiceIDTerm,
        clientTerm,
        dueDateTerm,
        jobNameTerm]);

    return (
        <>
            <div className="sp-jobs-container">
                <table>
                    <tbody>
                        {displayedJobs.map((job) => (
                            <tr key={String(job._id)}>
                                <td key={String(job._id)}
                                onClick={() => jobClicked(job)}>{job.name}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}

export default JobTable;

