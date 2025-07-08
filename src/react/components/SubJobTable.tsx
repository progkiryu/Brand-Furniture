import { useEffect, useState } from "react";

interface SubJobProps {
  subJobsParams: Array<SubJob>,
  jobsParams: Array<Job>
}

function SubJobTable({ subJobsParams, jobsParams }: SubJobProps) {

  const [ subJobs, setSubJobs ] = useState<Array<SubJob>>(subJobsParams);
  const [ jobs, setJobs ] = useState<Array<Job>>(jobsParams);

  useEffect(() => {
    setSubJobs(subJobsParams);
    setJobs(jobsParams);
  }, [subJobsParams, jobsParams]);

  return (
    <div className="upcoming-job-components">
      <table className="orders-table">
        <thead>
          <tr>
            <th>CLIENT</th>
            <th>JOB NAME</th>
            <th>JOB</th>
            <th>DUE</th>
          </tr>
        </thead>
        <tbody>
        {
          subJobs.map((subJob: SubJob) => {
            const job = jobs.filter(job => subJob.jobId === job._id);

            let client = "N/A";
            let name = "N/A"
            if (job.length !== 0) {
              client = String(job[0].client);
              name = String(job[0].name);
            }

            return <tr key={String(subJob._id)}>
              <td>{client}</td>
              <td>{name}</td>
              <td>{subJob.subJobDetail}</td>
              <td>{subJob.dueDate ? String(subJob.dueDate) : "N/A"}</td>
            </tr>
          })
        }
        </tbody>
      </table>
    </div>
  );
};

export default SubJobTable;
