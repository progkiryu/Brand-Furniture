import { DBLink } from "../App";

// Get all the cushions
export const getAllCushions = async () => {
  const cushions = fetch(`${DBLink}/cushion/getAllCushions`)
    .then((res) => res.json)
    .catch((err) => console.error(err));
  if (!cushions) {
    return;
  }
  return cushions;
};

// Get a particular cushion by ID
export const getCushionById = async (id: String) => {
  const cushion = fetch(`${DBLink}/cushion/getCushionById/${id}`)
    .then((res) => res.json())
    .catch((err) => console.error(err));
  if (!cushion) {
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
    .then((res) => res.json())
    .catch((err) => console.error(err));
};

// Delete a cushion by ID
export const deleteCushionById = async (id: String) => {
  fetch(`${DBLink}/cushion/deleteCushionById/${id}`, {
    method: "DELETE",
    mode: "cors",
    headers: { "Content-Type": "application/json" },
  })
    .then((res) => res.json())
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
