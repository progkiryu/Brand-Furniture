import { DBLink } from "../App";

// Get all the frames from the database
export const getAllFrames = async () => {
  const frames = fetch(`${DBLink}/frame/getAllFrames`)
    .then((res) => res.json())
    .catch((err) => console.error(err));
  if (!frames) {
    return;
  }
  return frames;
};

// Get a particular frame by ID
export const getFrameById = async (id: String) => {
  const frame = fetch(`${DBLink}/frame/getFrameById/${id}`)
    .then((res) => res.json())
    .catch((err) => console.error(err));
  if (!frame) {
    return;
  }
  return frame;
};

// Get frames by subJobId
export const getFramesBySubJobId = async (subJobId: String) => {
  const frames = fetch(`${DBLink}/frame/getFramesBySubJobId/${subJobId}`)
    .then((res) => res.json())
    .catch((err) => console.error(err));
  if (!frames) {
    return;
  }
  return frames;
};

// Create a new frame
// export const createFrame = async (data: Frame) => {
//   fetch(`${DBLink}/frame/postCreateFrame`, {
//     method: "POST",
//     mode: "cors",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(data),
//   })
//     .then((res) => res.json())
//     .catch((err) => console.error(err));
// };

export const createFrame = async (data: Frame) => {
  try {
    const res = await fetch(`${DBLink}/frame/postCreateFrame`, {
      method: "POST",
      mode: "cors",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const newFrame = await res.json();
    return newFrame;
  } catch (err) {
    console.error("Error creating frame:", err);
    return null;
  }
};

// Delete a frame by ID
// export const deleteFrameById = async (id: String) => {
//   fetch(`${DBLink}/frame/deleteFrameById/${id}`, {
//     method: "DELETE",
//     mode: "cors",
//     headers: { "Content-Type": "application/json" },
//   })
//     .then((res) => res.json())
//     .catch((err) => console.error(err));
// };

// Delete a frame by ID
export const deleteFrameById = async (id: String) => {
  try {
    const res = await fetch(`${DBLink}/frame/deleteFrameById/${id}`, {
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
    console.error("Error deleting frame:", err);
    return false; // Indicate failure
  }
};

// Update a frame
// export const updateFrame = async (data: Frame) => {
//   fetch(`${DBLink}/frame/putUpdateFrame`, {
//     method: "PUT",
//     mode: "cors",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(data),
//   })
//     .then((res) => res.json())
//     .catch((err) => console.log(err));
// };

export const updateFrame = async (data: Frame) => {
  try {
    const res = await fetch(`${DBLink}/frame/putUpdateFrame`, {
      method: "PUT",
      mode: "cors",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(`HTTP error! status: ${res.status}, message: ${errorText}`);
    }
    const updatedFrame = await res.json();
    return updatedFrame;
  } catch (err) {
    console.error("Error updating frame:", err);
    return null;
  }
};