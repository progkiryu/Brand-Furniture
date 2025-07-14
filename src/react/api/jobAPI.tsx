import { DBLink } from "../App";

// Get all jobs
export const getAllJobs = async () => {
  const allJobs = fetch(`${DBLink}/job/getAllJobs`)
    .then((res) => res.json())
    .catch((err) => console.error(err));
  if (!allJobs) {
    alert("Error: Failed to retrieve jobs.");
    return;
  }
  return allJobs;
};

// Get a particular job by ID
export const getJobById = async (id: String) => {
  const job = fetch(`${DBLink}/job/getJobById/${id}`)
    .then((res) => res.json())
    .catch((err) => console.error(err));
  if (!job) {
    alert("Error: Failed to retrieve job.");
    return;
  }
  return job;
};

// Get current jobs
export const getCurrentJobs = async () => {
  const currentJobs = fetch(`${DBLink}/job/getCurrentJobs`)
    .then((res) => res.json())
    .catch((err) => console.error(err));
  if (!currentJobs) {
    return;
  }
  return currentJobs;
};

// Get all archived jobs
export const getArchivedJobs = async () => {
  const archivedJobs = fetch(`${DBLink}/job/getArchivedJobs`)
    .then((res) => res.json())
    .catch((err) => console.error(err));
  if (!archivedJobs) {
    return;
  }
  return archivedJobs;
};

// Create a new job
export const createJob = async (data: Job) => {
  try {
    const res = await fetch(`${DBLink}/job/insertJob`, {
      method: "POST",
      mode: "cors",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (res.ok) {
      const createdJob: Job = await res.json();
      alert("Job created successfully.");
      return createdJob;
    } else {
      alert("Error: Failed to create job.");
      return null;
    }
  } catch (err) {
    console.error(err);
    return null;
  }
};

// Get list of jobs within specified date range
export const getFilteredJobsByDate = async (startD: Date, endD: Date) => {
  const range = {
    startDate: startD,
    endDate: endD,
  };
  const jobs = fetch(`${DBLink}/job/getFilteredJobsByDate`, {
    method: "POST",
    mode: "cors",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(range),
  })
    .then((res) => res.json())
    .catch((err) => console.error(err));
  if (!jobs) {
    return;
  }
  return jobs;
};

// Get list of jobs with specific type. Note: must be exact match
export const getFilteredJobsByType = async (type: String) => {
  const jobs = fetch(`${DBLink}/job/getFilteredJobsByType`, {
    method: "POST",
    mode: "cors",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(type),
  })
    .then((res) => res.json())
    .catch((err) => console.error(err));
  if (!jobs) {
    return;
  }
  return jobs;
};

// Delete a job by Id
export const deleteJob = async (id: String) => {
  fetch(`${DBLink}/job/removeJob/${id}`, {
    method: "DELETE",
    mode: "cors",
    headers: { "Content-Type": "application/json" },
  })
    .then((res) => res.json())
    .catch((err) => console.error(err));
};

// Update a job
// export const updateJob = async (data: Job) => {
//   fetch(`${DBLink}/job/updateJob`, {
//     method: "PUT",
//     mode: "cors",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(data),
//   })
//     .then((res) => {
//       if (res.ok) {
//         alert("Job updated successfully.");
//       } else {
//         alert("Error: Failed to update job");
//       }
//     })
//     .catch((err) => console.error(err));
// };


// export const updateJob = async (data: Job) => {
//   try {
//     const res = await fetch(`${DBLink}/job/updateJob`, {
//       method: "PUT",
//       mode: "cors",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(data),
//     });

//     if (res.ok) {
//       alert("Job updated successfully.");
//       return res;
//     } else {
//       alert("Error: Failed to update job");
//       return null;
//     }
//   } catch (err) {
//     console.error("Error updating job:", err);
//     return null;
//   }
// };


export const updateJob = async (data: Job) => {
  try {
    const res = await fetch(`${DBLink}/job/updateJob`, {
      method: "PUT",
      mode: "cors",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (res.ok) {
      const updatedJob: Job = await res.json();

      const jobs = await getAllJobs();
                
      const processedUpdatedJob = {
          ...updatedJob,
          due: updatedJob.due ? new Date(updatedJob.due) : updatedJob.due
      };

      const updatedJobsList = jobs.map((job : Job) => 
          job._id === processedUpdatedJob._id ? processedUpdatedJob : job
      );
      alert("Job updated successfully.");
      return updatedJobsList;
    } else {
      alert("Error: Failed to update job");
      return null;
    }
  } catch (err) {
    console.error("Error updating job:", err);
    return null;
  }
};
