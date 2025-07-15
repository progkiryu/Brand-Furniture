import { DBLink } from "../App";

// Get all subjobs
export const getAllSubJubs = async () => {
  const subJobs = fetch(`${DBLink}/subJob/getALlSubJobs`)
    .then((res) => res.json())
    .catch((err) => console.error(err));
  if (!subJobs) {
    return;
  }
  return subJobs;
};

// Get a particular subjob by ID
export const getSubJobById = async (id: String) => {
  const subJob = fetch(`${DBLink}/subJob/getSubJobById/${id}`)
    .then((res) => res.json())
    .catch((err) => console.error(err));
  if (!subJob) {
    return;
  }
  return subJob;
};

// Get list of subjobs by mainJob ID
export const getSubJobsByJobId = async (jobId: String) => {
  const subJobs = fetch(`${DBLink}/subJob/getSubJobsByJobId/${jobId}`)
    .then((res) => res.json())
    .catch((err) => console.error(err));
  if (!subJobs) {
    return;
  }
  return subJobs;
};

// Create a new subjob
export const createSubJob = async (data: SubJob) => {
  try {
    const res = await fetch(`${DBLink}/subjob/insertSubJob`, {
      method: "POST",
      mode: "cors",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const newSubJob = await res.json();
    return newSubJob;
  } catch (err) {
    console.error("Error creating sub-job:", err);
    return null;
  }
};

// Get list of subjobs with filtered status. Exact matches.
export const getFilteredSubJobsByStatus = async (status: String) => {
  const temp = {
    status: status,
  };
  const subJobs = fetch(`${DBLink}/subJobs/getFilteredSubJobsByStatus`, {
    method: "POST",
    mode: "cors",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(temp),
  })
    .then((res) => res.json())
    .catch((err) => console.error(err));
  if (!subJobs) {
    return;
  }
  return subJobs;
};

// Delete a subjob by ID
// export const deleteSubJob = async (id: String) => {
//   fetch(`${DBLink}/subJob/removeSubJob/${id}`, {
//     method: "DELETE",
//     mode: "cors",
//     headers: { "Content-Type": "application/json" },
//   })
//     .then((res) => res.json())
//     .catch((err) => console.error(err));
// };

// Delete a subjob by ID
export const deleteSubJob = async (id: String) => {
  try {
    const res = await fetch(`${DBLink}/subJob/removeSubJob/${id}`, {
      method: "DELETE",
      mode: "cors",
      headers: { "Content-Type": "application/json" },
    });
    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(`HTTP error! status: ${res.status}, message: ${errorText}`);
    }
    return true; // Indicate success
  } catch (err) {
    console.error("Error deleting subjob:", err);
    return false; // Indicate failure
  }
};

// Update a existing job
// export const updateSubJob = async (data: SubJob) => {
//   fetch(`${DBLink}/updateSubJob`, {
//     method: "PUT",
//     mode: "cors",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(data),
//   })
//     .then((res) => res.json())
//     .catch((err) => console.error(err));
// };

export const updateSubJob = async (data: SubJob): Promise<SubJob | null> => {
  try {
    const res = await fetch(`${DBLink}/subJob/updateSubJob`, {
      method: "PUT",
      mode: "cors",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (res.ok) {
      const updatedSubJob: SubJob = await res.json();
      return updatedSubJob;
    } else {
      const errorText = await res.text();
      console.error(`Error updating subjob: ${res.status} - ${errorText}`);
      return null;
    }
  } catch (err) {
    console.error("Error updating subjob:", err);
    return null;
  }
};