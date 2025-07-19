import { DBLink } from "../App";

// Get all upholstery
export const getAllUpholstery = async () => {
  const upholstery = fetch(`${DBLink}/upholstery/getAllUpholstery`)
    .then((res) => res.json())
    .catch((err) => console.error(err));
  if (!upholstery) {
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
    return;
  }
  return upholstery;
};

// Get upholstery list from subjob ID
export const getUpholsteryBySubJobId = async (subJobId: String) => {
  const upholstery = fetch(
    `${DBLink}/upholstery/getUpholsteryBySubJobId/${subJobId}`
  )
    .then((res) => res.json())
    .catch((err) => console.error(err));
  if (!upholstery) {
    return;
  }
  return upholstery;
};

// Create a new upholstery
// export const createUpholstery = async (data: Upholstery) => {
//   fetch(`${DBLink}/upholstery/postCreateUpholstery`, {
//     method: "POST",
//     mode: "cors",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(data),
//   })
//     .then((res) => res.json())
//     .catch((err) => console.error(err));
// };

export const createUpholstery = async (data: Upholstery) => {
  try {
    const res = await fetch(`${DBLink}/upholstery/postCreateUpholstery`, {
      method: "POST",
      mode: "cors",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const newUpholstery = await res.json();
    return newUpholstery;
  } catch (err) {
    console.error("Error creating upholstery:", err);
    return null;
  }
};

// Delete a upholstery by ID
// export const deleteUpholstery = async (id: String) => {
//   fetch(`${DBLink}/upholstery/deleteUpholsteryById/${id}`, {
//     method: "DELETE",
//     mode: "cors",
//     headers: { "Content-Type": "application/json" },
//   })
//     .then((res) => res.json())
//     .catch((err) => console.error(err));
// };

// Delete a upholstery by ID
export const deleteUpholstery = async (id: String) => {
  try {
    const res = await fetch(`${DBLink}/upholstery/deleteUpholsteryById/${id}`, {
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
    console.error("Error deleting upholstery:", err);
    return false; // Indicate failure
  }
};

// // Update a upholstery
// export const updateUpholstery = async (data: Upholstery) => {
//   fetch(`${DBLink}/upholstery/putUpdateUpholstery`, {
//     method: "PUT",
//     mode: "cors",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(data),
//   })
//     .then((res) => res.json())
//     .catch((err) => console.error(err));
// };

// Update a upholstery
export const updateUpholstery = async (data: Upholstery) => {
  try {
    const res = await fetch(`${DBLink}/upholstery/putUpdateUpholstery`, {
      method: "PUT",
      mode: "cors",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(`HTTP error! status: ${res.status}, message: ${errorText}`);
    }
    const updatedUpholstery = await res.json();
    return updatedUpholstery;
  } catch (err) {
    console.error("Error updating upholstery:", err);
    return null;
  }
};
