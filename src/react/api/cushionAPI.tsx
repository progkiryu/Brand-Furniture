import { DBLink } from "../App";

// Get all the cushions
export const getAllCushions = async () => {
  const cushions = fetch(`${DBLink}/cushion/getAllCushions`)
    .then((res) => res.json())
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

// Get list of cushions from subJobId
export const getCushionsBySubJobId = async (subJobId: String) => {
  const cushions = fetch(`${DBLink}/cushions/getCushionsBySubJobId/${subJobId}`)
    .then((res) => res.json())
    .catch((err) => console.error(err));
  if (!cushions) {
    return;
  }
  return cushions;
};

// Create a new cushion
// export const createCushion = async (data: Cushion) => {
//   fetch(`${DBLink}/cushion/postCreateCushion`, {
//     method: "POST",
//     mode: "cors",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(data),
//   })
//     .then((res) => res.json())
//     .catch((err) => console.error(err));
// };

export const createCushion = async (data: Cushion) => {
  try {
    const res = await fetch(`${DBLink}/cushion/postCreateCushion`, {
      method: "POST",
      mode: "cors",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const newCushion = await res.json();
    return newCushion;
  } catch (err) {
    console.error("Error creating cushion:", err);
    return null;
  }
};

// Delete a cushion by ID
// export const deleteCushionById = async (id: String) => {
//   fetch(`${DBLink}/cushion/deleteCushionById/${id}`, {
//     method: "DELETE",
//     mode: "cors",
//     headers: { "Content-Type": "application/json" },
//   })
//     .then((res) => res.json())
//     .catch((err) => console.log(err));
// };

// Delete a cushion by ID
export const deleteCushionById = async (id: String) => {
  try {
    const res = await fetch(`${DBLink}/cushion/deleteCushionById/${id}`, {
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
    console.error("Error deleting cushion:", err);
    return false; // Indicate failure
  }
};

// Update a cushion
// export const updateCushion = async (data: Cushion) => {
//   fetch(`${DBLink}/cushion/putUpdateCushion`, {
//     method: "PUT",
//     mode: "cors",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(data),
//   })
//     .then((res) => res.json())
//     .catch((err) => console.error(err));
// };

export const updateCushion = async (data: Cushion) => {
  try {
    const res = await fetch(`${DBLink}/cushion/putUpdateCushion`, {
      method: "PUT",
      mode: "cors",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(`HTTP error! status: ${res.status}, message: ${errorText}`);
    }
    const updatedCushion = await res.json();
    return updatedCushion;
  } catch (err) {
    console.error("Error updating cushion:", err);
    return null;
  }
};