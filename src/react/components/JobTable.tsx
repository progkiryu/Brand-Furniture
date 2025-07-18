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
    frames: Frame[];
    cushions: Cushion[];
    upholstery: Upholstery[];
    cutTerm: boolean;
    sewnTerm: boolean;
    upholsterTerm: boolean;
    foamedTerm: boolean;
    completeTerm: boolean;
    productionTerm: boolean;
    handleJobClick: (job: Job) => Promise<void>;
    onEditJobClick: (job: Job) => void;
}

function JobTable({ 
    searchTerm, 
    jobs, 
    subJobs,
    frames,
    cushions,
    upholstery, 
    cutTerm,
    sewnTerm,
    upholsterTerm,
    foamedTerm,
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
        completeTerm: boolean,
        productionTerm: boolean
    ) => {
        const statusJobSet = new Set<Job>();
        if (cutTerm === true) {
            const cutJobSet = new Set<Job>();
            const cutSubJobSet = new Set<SubJob>();
            const cutCushions: Cushion[] = cushions.filter((cushion: Cushion) => {
                if (cushion.status === "Upholstery Cut") return true;
            });
            cutCushions.map((cushion: Cushion) => {
                const cutSubJob = subJobs.find((subJob: SubJob) =>
                    subJob._id === cushion.subJobId
                );
                if (cutSubJob) cutSubJobSet.add(cutSubJob);
            });
            if (cutSubJobSet.size > 0) {
                const cutSubJobArray = [...cutSubJobSet];
                cutSubJobArray.map((subJob: SubJob) => {
                    const cutJob = jobs.find((job: Job) =>
                        job._id === subJob._id
                    );
                    if (cutJob) cutJobSet.add(cutJob);
                });
                if (cutJobSet.size > 0) {
                    const cutJobArray = [...cutJobSet];
                    cutJobArray.map((job: Job) => {
                        statusJobSet.add(job);
                    });
                }
            }
        }
        if (upholsterTerm === true) {
            const upholsterJobSet = new Set<Job>();
            const upholsterSubJobSet = new Set<SubJob>();

            const upholsterUpholstery: Upholstery[] = upholstery.filter((upholster: Upholstery) => {
                if (upholster.status === "Body Upholstered") return true;
            });
            upholsterUpholstery.map((upholster: Upholstery) => {
                const upholsterSubJob = subJobs.find((subJob: SubJob) =>
                    subJob._id === upholster.subJobId
                );
                if (upholsterSubJob) upholsterSubJobSet.add(upholsterSubJob);
            });
            const upholsterCushions: Cushion[] = cushions.filter((cushion: Cushion) => {
                if (cushion.status === "Body Upholstered") return true;
            });
            upholsterCushions.map((cushion: Cushion) => {
                const upholsterSubJob = subJobs.find((subJob: SubJob) =>
                    subJob._id === cushion.subJobId
                );
                if (upholsterSubJob) upholsterSubJobSet.add(upholsterSubJob);
            });

            if (upholsterSubJobSet.size > 0) {
                const upholsterSubJobArray = [...upholsterSubJobSet];
                upholsterSubJobArray.map((subJob: SubJob) => {
                    const upholsterJob = jobs.find((job: Job) =>
                        job._id === subJob.jobId
                    );
                    if (upholsterJob) upholsterJobSet.add(upholsterJob);
                });
                if (upholsterJobSet.size > 0) {
                    const upholsterJobArray = [...upholsterJobSet];
                    upholsterJobArray.map((job: Job) => {
                        statusJobSet.add(job);
                    });
                }
            }
        }
        if (sewnTerm === true) {
            const sewnJobSet = new Set<Job>();
            const sewnSubJobSet = new Set<SubJob>();

            const sewnCushions: Cushion[] = cushions.filter((cushion: Cushion) => {
                if (cushion.status === "Upholstery Sewn") return true;
            });
            sewnCushions.map((cushion: Cushion) => {
                const sewnSubJob = subJobs.find((subJob: SubJob) =>
                    subJob._id === cushion.subJobId
                );
                if (sewnSubJob) sewnSubJobSet.add(sewnSubJob);
            });
            if (sewnSubJobSet.size > 0) {
                const sewnSubJobArray = [...sewnSubJobSet];
                sewnSubJobArray.map((subJob: SubJob) => {
                    const sewnJob = jobs.find((job: Job) =>
                        job._id === subJob.jobId
                    );
                    if (sewnJob) sewnJobSet.add(sewnJob);
                });
                if (sewnJobSet.size > 0) {
                    const sewnJobArray = [...sewnJobSet];
                    sewnJobArray.map((job: Job) => {
                        statusJobSet.add(job);
                    });
                }
            }
        }
        if (foamedTerm === true) {
            const foamedJobSet = new Set<Job>();
            const foamedSubJobSet = new Set<SubJob>();

            const foamedFrames: Frame[] = frames.filter((frame: Frame) => {
                if (frame.status === "Frame Foamed") return true;
            });
            foamedFrames.map((frame: Frame) => {
                const foamedSubJob = subJobs.find((subJob: SubJob) =>
                    subJob._id === frame.subJobId
                );
                if (foamedSubJob) foamedSubJobSet.add(foamedSubJob);
            });
            if (foamedSubJobSet.size > 0) {
                const foamedSubJobArray = [...foamedSubJobSet];
                foamedSubJobArray.map((subJob: SubJob) => {
                    const foamedJob = jobs.find((job: Job) =>
                        job._id === subJob.jobId
                    );
                    if (foamedJob) foamedJobSet.add(foamedJob);
                });
                if (foamedJobSet.size > 0) {
                    const foamedJobArray = [...foamedJobSet];
                    foamedJobArray.map((job: Job) => {
                        statusJobSet.add(job);
                    });   
                }
            }
        }
        if (completeTerm === true) {
            const completeJobSet = new Set<Job>();
            const completeSubJobSet = new Set<SubJob>();

            const completeFrames: Frame[] = frames.filter((frame: Frame) => {
                if (frame.status === "Complete") return true;
            });
            completeFrames.map((frame: Frame) => {
                const completeSubJob = subJobs.find((subJob: SubJob) => 
                    subJob._id === frame.subJobId
                );
                if (completeSubJob) completeSubJobSet.add(completeSubJob);
            });

            const completeCushions: Cushion[] = cushions.filter((cushion: Cushion) => {
                if (cushion.status === "Complete") return true;
            });
            completeCushions.map((cushion: Cushion) => {
                const completeSubJob = subJobs.find((subJob: SubJob) =>
                    subJob._id === cushion.subJobId
                );
                if (completeSubJob) completeSubJobSet.add(completeSubJob);
            });

            const completeUpholstery: Upholstery[] = upholstery.filter((upholster: Upholstery) => {
                if (upholster.status === "Complete") return true;
            });
            completeUpholstery.map((upholster: Upholstery) => {
                const completeSubJob = subJobs.find((subJob: SubJob) =>
                    subJob._id === upholster.subJobId
                );
                if (completeSubJob) completeSubJobSet.add(completeSubJob);
            });

            if (completeSubJobSet.size > 0) {
                const completeSubJobArray = [...completeSubJobSet];
                completeSubJobArray.map((subJob: SubJob) => {
                    const completeJob = jobs.find((job: Job) =>
                        job._id === subJob.jobId
                    );
                    if (completeJob) completeJobSet.add(completeJob);
                });
                if (completeJobSet.size > 0) {
                    const completeJobArray = [...completeJobSet];
                    completeJobArray.map((job: Job) => {
                        statusJobSet.add(job);
                    });
                } 
            }
        }
        if (productionTerm === true) {
            const productionJobSet = new Set<Job>();
            const productionSubJobSet = new Set<SubJob>();

            const productionFrames: Frame[] = frames.filter((frame: Frame) => {
                if (frame.status === "Complete") return true;
            });
            productionFrames.map((frame: Frame) => {
                const productionSubJob = subJobs.find((subJob: SubJob) => 
                    subJob._id === frame.subJobId
                );
                if (productionSubJob) productionSubJobSet.add(productionSubJob);
            });

            const productionCushions: Cushion[] = cushions.filter((cushion: Cushion) => {
                if (cushion.status === "Complete") return true;
            });
            productionCushions.map((cushion: Cushion) => {
                const productionSubJob = subJobs.find((subJob: SubJob) =>
                    subJob._id === cushion.subJobId
                );
                if (productionSubJob) productionSubJobSet.add(productionSubJob);
            });

            const productionUpholstery: Upholstery[] = upholstery.filter((upholster: Upholstery) => {
                if (upholster.status === "Complete") return true;
            });
            productionUpholstery.map((upholster: Upholstery) => {
                const productionSubJob = subJobs.find((subJob: SubJob) =>
                    subJob._id === upholster.subJobId
                );
                if (productionSubJob) productionSubJobSet.add(productionSubJob);
            });

            if (productionSubJobSet.size > 0) {
                const productionSubJobArray = [...productionSubJobSet];
                productionSubJobArray.map((subJob: SubJob) => {
                    const productionJob = jobs.find((job: Job) =>
                        job._id === subJob.jobId
                    );
                    if (productionJob) productionJobSet.add(productionJob);
                });
                if (productionJobSet.size > 0) {
                    const productionJobArray = [...productionJobSet];
                    productionJobArray.map((job: Job) => {
                        statusJobSet.add(job);
                    });
                } 
            }
        }
        if (statusJobSet.size > 0) {
            sortedJobs = [...statusJobSet];
        }
        return sortedJobs;

        // if (cutTerm === true) {
        //     const cutSet = new Set<Job>();
        //     const cutSubJobs: SubJob[] = subJobs.filter((subJob: SubJob) => {
        //         if (subJob.status === "Upholstery Cut") return true;
        //     });
        //     cutSubJobs.map((subJob: SubJob) => {
        //         const cutJob = jobs.find((job: Job) =>
        //             job._id === subJob.jobId
        //         );
        //         if (cutJob) {
        //             cutSet.add(cutJob);
        //         }
        //     });
        //     if (cutSet.size > 0) {
        //         const cutArray = [...cutSet];
        //         sortedJobs = sortedJobs.filter((job: Job) => cutArray.includes(job));
        //     }
        // }

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


                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}

export default JobTable;

