import { DBLink } from "../App";

// Get all upholstery
export const getAllUpholstery = async () => {
  const upholstery = fetch(`${DBLink}/upholtsery/getAllUpholstery`)
    .then((res) => res.json())
    .catch((err) => console.error(err));
  if (!upholstery) {
    alert("Error: failed to retrieve upholstery.");
    return;
  }
  return upholstery;
};

// Get a particular upholstery by ID
export const getUpholsteryById = async (id: String) => {
  const upholstery = fetch(`${DBLink}/upholstery/getUpholsteryById/${id}`)
    .then((res) => res.json())
    .catch((err) => console.error(err));
  if (!upholstery) {
    alert("Error: Failed to retrieve upholstery");
    return;
  }
  return upholstery;
};

// Create a new upholstery
export const createUpholstery = async (data: Upholstery) => {
  fetch(`${DBLink}/upholstery/postCreateUpholstery`, {
    method: "POST",
    mode: "cors",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })
    .then((res) => {
      if (res.ok) {
        alert("Upholstery created successfully.");
      } else {
        alert("Error: Failed to create upholstery.");
      }
    })
    .catch((err) => console.error(err));
};

// Delete a upholstery by ID
export const deleteUpholstery = async (id: String) => {
  fetch(`${DBLink}/upholstery/deleteUpholsteryById/${id}`, {
    method: "DELETE",
    mode: "cors",
    headers: { "Content-Type": "application/json" },
  })
    .then((res) => {
      if (res.ok) {
        alert("Upholstery deleted successfully.");
      } else {
        alert("Error: Failed to delete upholstery.");
      }
    })
    .catch((err) => console.error(err));
};

// Update a upholstery
export const updateUpholstery = async (data: Upholstery) => {
  fetch(`${DBLink}/upholstery/putUpdateUpholstery`, {
    method: "PUT",
    mode: "cors",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })
    .then((res) => {
      if (res.ok) {
        alert("Upholstery updated successfully.");
      } else {
        alert("Error: Failed to update upholstery.");
      }
    })
    .catch((err) => console.error(err));
};
