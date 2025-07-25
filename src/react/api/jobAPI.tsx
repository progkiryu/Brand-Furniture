import { DBLink } from "../App";

// Get all jobs
export const getAllJobs = async () => {
  const allJobs = fetch(`${DBLink}/job/getAllJobs`)
    .then((res) => res.json())
    .catch((err) => console.error(err));
  if (!allJobs) {
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

// Get current unpinned w/o due dates
export const getCurrentJobsUnpinnedNullDue = async () => {
  const jobs = fetch(`${DBLink}/job/getCurrentJobsUnpinnedNullDue`)
    .then((res) => res.json())
    .catch((err) => console.error(err));
  if (!jobs) {
    return;
  }
  return jobs;
};

// Get current unpinned w/ due dates
export const getCurrentJobsUnpinnedWithDue = async () => {
  const jobs = fetch(`${DBLink}/job/getCurrentJobsUnpinnedWithDue`)
    .then((res) => res.json())
    .catch((err) => console.error(err));
  if (!jobs) {
    return;
  }
  return jobs;
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

// Get pinned jobs
export const getPinnedJobs = async () => {
  const pinnedJobs = fetch(`${DBLink}/job/getPinnedJobs`)
    .then((res) => res.json())
    .catch((err) => console.error(err));
  if (!pinnedJobs) {
    return;
  }
  return pinnedJobs;
};

// Get unique job types
export const getUniqueJobTypes = async () => {
  const uniqueJobTypes = fetch(`${DBLink}/job/getUniqueTypes`)
    .then((res) => res.json())
    .catch((err) => console.error(err));
  if (!uniqueJobTypes) {
    return;
  }
  return uniqueJobTypes;
};

export const multiFilterSearch = async (props: RequestProps) => {
  try {
    const res = await fetch(`${DBLink}/job/multiFilterSearch`, {
      method: "POST",
      mode: "cors",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(props)
    });
    if (res.ok) {
      const filteredJobs = await res.json();
      return filteredJobs;
    }
    else {
      return null;
    }
  }
  catch (err) {
    console.error(err);
    return null;
  }
}

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
      return createdJob;
    } else {
      return null;
    }
  } catch (err) {
    console.error(err);
    return null;
  }
};

// Get list of jobs with fall within a specific month and year
export const getJobsByMonthAndYearNumber = async (
  monthNumber: number,
  yearNumber: number
) => {
  const data = {
    monthNumber: monthNumber,
    yearNumber: yearNumber,
  };
  const jobs = fetch(`${DBLink}/job/getJobsByMonthAndYearNumber`, {
    method: "POST",
    mode: "cors",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .catch((err) => console.error(err));
  if (!jobs) {
    return;
  }
  return jobs;
};

// Get list of jobs specific type within date range
export const getJobsByTypeByDate = async (
  type: string,
  startD: Date,
  endD: Date
) => {
  const data = {
    type: type,
    startDate: startD,
    endDate: endD,
  };
  const jobs = fetch(`${DBLink}/job/getJobsByTypeByDate`, {
    method: "POST",
    mode: "cors",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .catch((err) => console.error(err));
  if (!jobs) {
    return;
  }
  return jobs;
};

// Get list of jobs within date range
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
  const temp = {
    type: type,
  };
  const jobs = fetch(`${DBLink}/job/getFilteredJobsByType`, {
    method: "POST",
    mode: "cors",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(temp),
  })
    .then((res) => res.json())
    .catch((err) => console.error(err));
  if (!jobs) {
    return;
  }
  return jobs;
};

// Delete a job by ID
export const deleteJob = async (id: String) => {
  try {
    const res = await fetch(`${DBLink}/job/removeJob/${id}`, {
      method: "DELETE",
      mode: "cors",
      headers: { "Content-Type": "application/json" },
    });

    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(
        `HTTP error! status: ${res.status}, message: ${errorText}`
      );
    }
    return true; // Indicate success
  } catch (err) {
    console.error("Error deleting job:", err);
    return false; // Indicate failure
  }
};

// Update a job
export const updateJob = async (data: Job): Promise<Job | null> => {
  try {
    const res = await fetch(`${DBLink}/job/updateJob/${data._id}`, {
      method: "PUT",
      mode: "cors",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (res.ok) {
      const updatedJob: Job = await res.json();

      const processedUpdatedJob = {
        ...updatedJob,
        due: updatedJob.due ? new Date(updatedJob.due) : updatedJob.due,
      };

      // Return the single processed updated job
      return processedUpdatedJob;
    } else {
      const errorText = await res.text();
      console.error(`Error updating job: ${res.status}, message: ${errorText}`);
      return null;
    }
  } catch (err) {
    console.error("Error updating job:", err);
    return null;
  }
};
