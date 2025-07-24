import { DBLink } from "../App";
import { updateJobNotificationStatus } from "./jobAPI";

export const getAllNotifications = async () => {
  const notifications = fetch(`${DBLink}/notification/getAllNotifications`)
    .then((res) => res.json())
    .catch((err) => console.log(err));
  if (!notifications) {
    return;
  }
  return notifications;
};

export const insertNotification = async (data: Notif) => {
  fetch(`${DBLink}/notification/insertNotification`, {
    method: "POST",
    mode: "cors",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
};

export const removeNotification = async (id: String, jobId: String) => {
  fetch(`${DBLink}/notification/removeNotification/${id}`, {
    method: "DELETE",
    mode: "cors",
    headers: { "Content-Type": "application/json" },
  })
    .then((res) => res.json())
    .then(async (data) => {
      // If notification is successfully removed, update the job's notification status
      if (data) {
        await updateJobNotificationStatus(jobId, true); // Set to true as notification has been deleted
      }
    })
    .catch((err) => console.log(err));
};
