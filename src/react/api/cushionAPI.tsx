import { DBLink } from "../App";

// Get all the cushions
export const getAllCushions = async () => {
  const cushions = fetch(`${DBLink}/cushion/getAllCushions`)
    .then((res) => res.json)
    .catch((err) => console.error(err));
  if (!cushions) {
    alert("Error: Failed to retrive cushions.");
    return;
  }
  return cushions;
};

// Get a particular cushion by ID
export const getCushionById = async (id: String) => {
  const cushion = fetch(`${DBLink}/frame/getCushionById/${id}`)
    .then((res) => res.json())
    .catch((err) => console.error(err));
  if (!cushion) {
    alert("Error: Failed to retrive frame.");
    return;
  }
  return cushion;
};

// Create a new cushion
export const createCushion = async (data: Cushion) => {
  fetch(`${DBLink}/cushion/postCreateCushion`, {
    method: "POST",
    mode: "cors",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })
    .then((res) => {
      if (res.ok) {
        alert("Cushion created successfully.");
      } else {
        alert("Error: Failed to create cushion.");
      }
    })
    .catch((err) => console.error(err));
};

// Delete a cushion by ID
export const deleteCushionById = async (id: String) => {
  fetch(`${DBLink}/cushion/deleteCushionById/${id}`, {
    method: "DELETE",
    mode: "cors",
    headers: { "Content-Type": "application/json" },
  })
    .then((res) => {
      if (res.ok) {
        alert("Cushion deleted successfully.");
      } else {
        alert("Error: Failed to delete cushion.");
      }
    })
    .catch((err) => console.log(err));
};

// Update a cushion
export const updateCushion = async (data: Cushion) => {
  fetch(`${DBLink}/cushion/putUpdateCushion`, {
    method: "PUT",
    mode: "cors",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .catch((err) => console.error(err));
};
