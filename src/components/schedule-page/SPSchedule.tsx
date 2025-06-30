import { useState } from 'react';
import {
  Table,
  Modal,
  Tabs,
  Text,
  Group,
  Badge,
  ActionIcon,
  Accordion,
  Button,
  AccordionItem,
} from '@mantine/core';
import { IconPlus, IconTrash } from '@tabler/icons-react';

// Import interfaces from the new types file
// import type { Job, FrameUpholstery, Cushion, SubJob } from '/Users/namtruong/Desktop/Projects/Electron-Practice/src/types/jobTypes.ts'

import type { Job, FrameUpholstery, Cushion, SubJob } from '../../types/jobTypes'; // Corrected path

// From: /Users/namtruong/Desktop/Projects/Electron-Practice/src/data/mockJobs.ts
// To:   ../../data/mockJobs
import { mockJobs as initialJobsData } from '../../data/mockJobs'; // Corrected path

/* ─────────────── Component ─────────────── */
function SPSchedule() {
    const [selectedJob, setSelectedJob] = useState<Job | null>(null); // State to hold the clicked job
    const [isDropdownListOpen, setIsDropdownListOpen] = useState(false); // State to control modal visibility
    const [isJobOpen, setIsJobOpen] = useState(false); // State to hold the clicked job


    const allSubJobs = initialJobsData.flatMap((job) =>
        job.subJobs.map((subjob) => ({
            jobId: job.id,
            jobName: job.name,
            jobDue: job.due,
            jobClient: job.client,
            ...subjob,
         // Add the parent job's ID for reference if needed
        }))
    );

    

    const showSubJobList = (currentJobId: number) => {
        const filteredSubJobs = allSubJobs.filter(
            (subjob) => subjob.jobId === currentJobId
        );

        return filteredSubJobs.map((sj, index) => (
            <>
                <p className="sp-sub-job" key={`${sj.jobId}-${sj.id}-${index}`}>{sj.jobdetail}</p>
            </>
        ));
    };


    const showJobList = initialJobsData.map((job) => (
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
            <td className="sp-job-edit-icon">Edit</td>
        </tr>
    ))


    return (
    <>      
        <div className="sp-jobs-container">
            <table>
                <thead>
                    <tr>
                        <th>Invoice ID</th>
                        <th>Cliet Name</th>
                        <th>Job Name</th>
                        <th>Due Date</th>
                        <th>Sub Job</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {showJobList}
                </tbody>      
            </table> 
        </div>         
    </>
    );
}


export default SPSchedule;