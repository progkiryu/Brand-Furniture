import { DBLink } from "../App";

// Get all the frames from the database
export const getAllFrames = async () => {
  const frames = fetch(`${DBLink}/frame/getAllFrames`)
    .then((res) => res.json())
    .catch((err) => console.error(err));
  return frames;
};

// Get a particular frame by ID
export const getFrameById = async (id: String) => {
  const frame = fetch(`${DBLink}/frame/getFrameById/${id}`)
    .then((res) => res.json())
    .catch((err) => console.error(err));
  return frame;
};

// Create a new frame
export const createFrame = async (data: Frame) => {
  fetch(`${DBLink}/frame/postCreateFrame`, {
    method: "POST",
    mode: "cors",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })
    .then((res) => {
      if (res.ok) {
        alert("Frame created successfully.");
      } else {
        console.error("Failed to delete frame");
      }
    })
    .catch((err) => console.error(err));
};

// Delete a frame by ID
export const deleteFrameById = async (id: String) => {
  fetch(`${DBLink}/frame/deleteFrameById/${id}`, {
    method: "DELETE",
    mode: "cors",
    headers: { "Content-Type": "application/json" },
  })
    .then((res) => {
      if (res.ok) {
        alert("Frame deleted successfully.");
      } else {
        console.error("Failed to delete frame");
      }
    })
    .catch((err) => console.error(err));
};

export const UpdateFrame = async (data: Frame) => {
  fetch(`${DBLink}/frame/putUpdateFrame`, {
    method: "PUT",
    mode: "cors",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
};
