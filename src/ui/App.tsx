import { useState, useEffect } from "react";

function App() {
  const [ jobs, setJobs ] = useState([]); 

  async function getOrders() {
    try {
      const rows: any = await window.jobs.getJobs();
      const jobsArray: any = [];
      rows.forEach((row: any) => {
        jobsArray.push(row._doc);
      });
      setJobs(jobsArray);
    }
    catch (err) {
      throw err;
    }
  }

  useEffect(() => {
    const retrieve = async () => {
      try {
        await getOrders();
      }
      catch (err) {
        console.log(err);
      }
    }
    retrieve();
  }, []);

  return (
    <table>
        <thead>
          <tr>
            <th>Due Date</th>
          </tr>
        </thead>
        <tbody>
        {
          jobs.map((job: Job) => {
              return <tr key={job.invoiceId}>
                  <td>{job.dueDate.toString()}</td>
              </tr>
          })
        } 
        </tbody>
    </table>
  );
}

export default App;