import { useEffect, useState } from "react";

interface SubJobProps {
  subJobsParams: Array<SubJob>,
  jobsParams: Array<Job>
}

function SubJobTable({ subJobsParams, jobsParams }: SubJobProps) {

  const [ subJobs, setSubJobs ] = useState<Array<SubJob>>([]);
  const [ jobs, setJobs ] = useState<Array<Job>>([]);

  useEffect(() => {
    setSubJobs(subJobsParams);
    setJobs(jobsParams);
  }, [subJobsParams, jobsParams]);

  return (
    <div className="upcoming-job-components">
      <table className="orders-table">
        <thead>
          <tr>
            <th>Job ID</th>
            <th>CLIENT</th>
            <th>JOB NAME</th>
            <th>JOB</th>
            <th>DUE</th>
          </tr>
        </thead>
        <tbody>
        </tbody>
      </table>
    </div>
  );
};

export default SubJobTable;
