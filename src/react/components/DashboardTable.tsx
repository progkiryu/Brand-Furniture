import { useEffect, useState } from "react";

interface DashboardTableProps {
  jobsParams: Array<Job>
}

function DashboardTable({ jobsParams }: DashboardTableProps) {

  const [ jobs, setJobs ] = useState<Array<Job>>(jobsParams);

  useEffect(() => {
    setJobs(jobsParams);
  }, [jobsParams]);

  return (
    <div className="upcoming-job-components">
      <table className="orders-table">
        <thead>
          <tr>
            <th>INVOICE ID</th>
            <th>CLIENT</th>
            <th>NAME</th>
            <th>TYPE</th>
            <th>DUE DATE</th>
          </tr>
        </thead>
        <tbody>
        {
          jobs.map((job: Job) => {
            return <tr key={String(job._id)}>
              <td>{job.invoiceId ? job.invoiceId : "N/A"}</td>
              <td>{job.client}</td>
              <td>{job.name}</td>
              <td>{job.type}</td>
              <td>{String(job.due)}</td>
            </tr>
          })
        }
        </tbody>
      </table>
    </div>
  );
};

export default DashboardTable;
