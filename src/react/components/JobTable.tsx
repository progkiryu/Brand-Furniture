import { useState, useEffect } from 'react';
import { Pencil } from "lucide-react";

interface JobTableProps {
    searchTerm: string;
    invoiceIDTerm?: "asc" | "desc";
    jobNameTerm?: "asc" | "desc";
    clientTerm?: "asc" | "desc";
    dueDateTerm?: "asc" | "desc";
    jobs: Job[];
    subJobs: SubJob[];
    cutTerm: boolean;
    sewnTerm: boolean;
    upholsterTerm: boolean;
    foamedTerm: boolean;
    wrappedTerm: boolean;
    completeTerm: boolean;
    productionTerm: boolean;
    handleJobClick: (job: Job) => Promise<void>;
    onEditJobClick: (job: Job) => void;
}

function JobTable({ 
    searchTerm, 
    jobs, 
    subJobs, 
    cutTerm,
    sewnTerm,
    upholsterTerm,
    foamedTerm,
    wrappedTerm,
    completeTerm,
    productionTerm,
    handleJobClick, 
    invoiceIDTerm, 
    clientTerm, 
    dueDateTerm, 
    jobNameTerm,
    onEditJobClick
}: JobTableProps) {
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
 
    const statusFilter = (
        sortedJobs: Job[],
        cutTerm: boolean,
        sewnTerm: boolean,
        upholsterTerm: boolean,
        foamedTerm: boolean,
        wrappedTerm: boolean,
        completeTerm: boolean,
        productionTerm: boolean
    ) => {
        if (cutTerm === true) {
            const cutSet = new Set<Job>();
            const cutSubJobs: SubJob[] = subJobs.filter((subJob: SubJob) => {
                if (subJob.status === "Upholstery Cut") return true;
            });
            cutSubJobs.map((subJob: SubJob) => {
                const cutJob = jobs.find((job: Job) =>
                    job._id === subJob.jobId
                );
                if (cutJob) {
                    cutSet.add(cutJob);
                }
            });
            if (cutSet.size > 0) {
                const cutArray = [...cutSet];
                sortedJobs = sortedJobs.filter((job: Job) => cutArray.includes(job));
            }
        }
        if (sewnTerm === true) {
            const sewnSet = new Set<Job>();
            const sewnSubJobs: SubJob[] = subJobs.filter((subJob: SubJob) => {
                if (subJob.status === "Upholstery Sewn") return true;
            });
            sewnSubJobs.map((subJob: SubJob) => {
                const sewnJob = jobs.find((job: Job) =>
                    job._id === subJob.jobId
                );
                if (sewnJob) {
                    sewnSet.add(sewnJob);
                }
            });
            if (sewnSet.size > 0) {
                const sewnArray = [...sewnSet];
                sortedJobs = sortedJobs.filter((job: Job) => sewnArray.includes(job));
            }
        }
        if (upholsterTerm === true) {
            const upholsterSet = new Set<Job>();
            const upholsterSubJobs: SubJob[] = subJobs.filter((subJob: SubJob) => {
                if (subJob.status === "Body Upholstered") return true;
            });
            upholsterSubJobs.map((subJob: SubJob) => {
                const upholsterJob = jobs.find((job: Job) =>
                    job._id === subJob.jobId
                );
                if (upholsterJob) {
                    upholsterSet.add(upholsterJob);
                }
            });
            if (upholsterSet.size > 0) {
                const upholsterArray = [...upholsterSet];
                sortedJobs = sortedJobs.filter((job: Job) => upholsterArray.includes(job));
            }
        }
        if (foamedTerm === true) {
            const foamedSet = new Set<Job>();
            const foamedSubJobs: SubJob[] = subJobs.filter((subJob: SubJob) => {
                if (subJob.status === "Frame Foamed") return true;
            });
            foamedSubJobs.map((subJob: SubJob) => {
                const foamedJob = jobs.find((job: Job) => 
                    job._id === subJob.jobId
                );
                if (foamedJob) {
                    foamedSet.add(foamedJob);
                }
            });
            if (foamedSet.size > 0) {
                const foamedArray = [...foamedSet];
                sortedJobs = sortedJobs.filter((job: Job) => foamedArray.includes(job));
            }
        }
        if (wrappedTerm === true) {
            const wrappedSet = new Set<Job>();
            const wrappedSubJobs: SubJob[] = subJobs.filter((subJob: SubJob) => {
                if (subJob.status === "Waiting for wrapping") return true;
            });
            wrappedSubJobs.map((subJob: SubJob) => {
                const wrappedJob = jobs.find((job: Job) => 
                    job._id === subJob.jobId
                );
                if (wrappedJob) {
                    wrappedSet.add(wrappedJob);
                }
            });
            if (wrappedSet.size > 0) {
                const wrappedArray = [...wrappedSet];
                sortedJobs = sortedJobs.filter((job: Job) => wrappedArray.includes(job));
            }
        }
        if (completeTerm === true) {
            const completeSet = new Set<Job>();
            const completeSubJobs: SubJob[] = subJobs.filter((subJob: SubJob) => {
                if (subJob.status === "Completed") return true;
            });
            completeSubJobs.map((subJob: SubJob) => {
                const completeJob = jobs.find((job: Job) =>
                    job._id === subJob.jobId
                );
                if (completeJob) {
                    completeSet.add(completeJob);
                }
            });
            if (completeSet.size > 0) {
                const completeArray = [...completeSet];
                sortedJobs = sortedJobs.filter((job: Job) => completeArray.includes(job));
            }
        }
        if (productionTerm === true) {
            const productionSet = new Set<Job>();
            const productionSubJobs: SubJob[] = subJobs.filter((subJob: SubJob) => {
                if (subJob.status === "In Production") return true;
            });
            productionSubJobs.map((subJob: SubJob) => {
                const productionJob = jobs.find((job: Job) =>
                    job._id === subJob.jobId
                );
                if (productionJob) {
                    productionSet.add(productionJob);
                }
            });
            if (productionSet.size > 0) {
                const productionArray = [...productionSet];
                sortedJobs = sortedJobs.filter((job: Job) => productionArray.includes(job));
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
        filtered = statusFilter(
            filtered, 
            cutTerm,
            sewnTerm,
            upholsterTerm,
            foamedTerm,
            wrappedTerm,
            completeTerm,
            productionTerm
        );
        setDisplayedJobs(filtered);

    }, [searchTerm,
        jobs,
        invoiceIDTerm,
        clientTerm,
        dueDateTerm,
        jobNameTerm,
        cutTerm,
        sewnTerm,
        upholsterTerm,
        foamedTerm,
        wrappedTerm,
        completeTerm,
        productionTerm
    ]);

    const [selectedJobId, setSelectedJobId] = useState<string | null>(null);

const onRowClick = async (job: Job) => {
  setSelectedJobId(job._id as string);
  await handleJobClick(job);
};


    return (
        <>
            <div className="sp-jobs-container">
                <table>
                    <tbody>
                        {displayedJobs.map((job) => (
                            <tr
                                key={String(job._id)}
                                className={`job-row ${selectedJobId === job._id ? "selected-job" : ""}`}
                                onClick={() => onRowClick(job)}
                                >
                                <td className="job-name-cell">{job.name}</td>
                                <td>
                                    <Pencil
                                    className="edit-icon"
                                    onClick={(e: React.MouseEvent) => {
                                        e.stopPropagation(); // prevent click triggering jobClicked
                                        onEditJobClick(job);
                                    }}
                                    />
                                </td>
                                </tr>

                            // <tr key={String(job._id)}>
                            //     <td onClick={() => jobClicked(job)}> {/* Keep existing click for details */}
                            //         {job.name}
                            //     </td>
                            //     <td>
                            //         {/* Add the Edit Job button */}
                            //         <input 
                            //             type="button" 
                            //             value="Edit Job" 
                            //             onClick={(e) => {
                            //                 e.stopPropagation(); // Prevent row click from firing
                            //                 onEditJobClick(job);
                            //             }}
                            //         />
                            //     </td>
                            // </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}

export default JobTable;

