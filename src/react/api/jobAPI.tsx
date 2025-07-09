import { DBLink } from "../App";

// Get all jobs
export const getAllJobs = async () => {
  const jobs = fetch(`${DBLink}/job/getAllJobs`)
    .then((res) => res.json())
    .catch((err) => console.error(err));
  if (!jobs) {
    alert("Error: Failed to retrieve jobs.");
    return;
  }
  return jobs;
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

// Get list of jobs within specified date range
export const getFilteredJobsByDate = async (range: DateRange) => {
  const jobs = fetch(`${DBLink}/job/getFilteredJobsByDate`, {
    method: "POST",
    mode: "cors",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(range),
  })
    .then((res) => res.json())
    .catch((err) => console.error(err));
  if (!jobs) {
    alert("Error: Failed to find any jobs within date range.");
    return;
  }
  return jobs;
};

// Create a new job
export const createJob = async (data: Job) => {
  fetch(`${DBLink}/job/insertJob`, {
    method: "POST",
    mode: "cors",
    headers: { "Content-Type": "application.json" },
    body: JSON.stringify(data),
  })
    .then((res) => {
      if (res.ok) {
        alert("Job created successfully.");
      } else {
        alert("Error: Failed to create job.");
      }
    })
    .catch((err) => console.error(err));
};

// Delete a job by Id
export const deleteJob = async (id: String) => {
  fetch(`${DBLink}/job/removeJob/${id}`, {
    method: "DELETE",
    mode: "cors",
    headers: { "Content-Type": "application/json" },
  })
    .then((res) => {
      if (res.ok) {
        alert("Job deleted successfully");
      } else {
        alert("Error: Failed to delete job");
      }
    })
    .catch((err) => console.error(err));
};

// Update a job
export const updateJob = async (data: Job) => {
  fetch(`${DBLink}/job/updateJob`, {
    method: "PUT",
    mode: "cors",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })
    .then((res) => {
      if (res.ok) {
        alert("Job updated successfully.");
      } else {
        alert("Error: Failed to update job");
      }
    })
    .catch((err) => console.error(err));
};
