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

// Create a new subjob
export const createSubJob = async (data: SubJob) => {
  fetch(`${DBLink}/subJob/insertSubJob`, {
    method: "POST",
    mode: "cors",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .catch((err) => console.error(err));
};

// Delete a subjob by ID
export const deleteSubJob = async (id: String) => {
  fetch(`${DBLink}/subJob/removeSubJob/${id}`, {
    method: "DELETE",
    mode: "cors",
    headers: { "Content-Type": "application/json" },
  })
    .then((res) => res.json())
    .catch((err) => console.error(err));
};

// Update a existing job
export const updateSubJob = async (data: SubJob) => {
  fetch(`${DBLink}/updateSubJob`, {
    method: "PUT",
    mode: "cors",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .catch((err) => console.error(err));
};
