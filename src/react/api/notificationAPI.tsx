import { DBLink } from "../App"; // Assuming DBLink is defined in App.tsx
import { updateJob } from "./jobAPI"; // Import updateJob from jobAPI

export const getAllNotifications = async (): Promise<Notif[]> => {
  try {
    const response = await fetch(`${DBLink}/notification/getAllNotifications`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const notifications: Notif[] = await response.json();
    return notifications;
  } catch (err) {
    console.error("Error fetching notifications:", err);
    return [];
  }
};

export const insertNotification = async (data: Notif) => {
  try {
    const res = await fetch(`${DBLink}/notification/insertNotification`, {
      method: "POST",
      mode: "cors",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(
        `HTTP error! status: ${res.status}, message: ${errorText}`
      );
    }
    return await res.json();
  } catch (err) {
    console.error("Error inserting notification:", err);
  }
};

export const removeNotification = async (
  id: String,
  jobId: String | undefined
): Promise<boolean> => {
  try {
    const res = await fetch(`${DBLink}/notification/removeNotification/${id}`, {
      method: "DELETE",
      mode: "cors",
      headers: { "Content-Type": "application/json" },
    });

    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(
        `HTTP error! status: ${res.status}, message: ${errorText}`
      );
    }

    // After deleting the notification, update the associated job's hasNoDeletedNotification to false
    const jobUpdatePayload = {
      _id: jobId,
      hasNoDeletedNotification: false,
    };
    await updateJob(jobUpdatePayload as Job); // Cast to Job, as we're only sending partial data

    return true; // Indicate success
  } catch (err) {
    console.error("Error deleting notification:", err);
    return false; // Indicate failure
  }
};

export const getNotificationByJobId = async (
  jobId: string
): Promise<Notif | null> => {
  try {
    const response = await fetch(
      `${DBLink}/notification/getNotificationByJobId/${jobId}`
    );
    if (!response.ok) {
      if (response.status === 404) {
        return null; // Notification not found for this job
      }
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const notification: Notif = await response.json();
    return notification;
  } catch (err) {
    console.error("Error fetching notification by job ID:", err);
    return null;
  }
};

export const updateNotification = async (data: Notif): Promise<Notif | null> => {
  try {
    const res = await fetch(`${DBLink}/notification/updateNotification/${data._id}`, {
      method: "PUT",
      mode: "cors",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (res.ok) {
      const updatedNotif: Notif = await res.json();
      return updatedNotif;
    } else {
      const errorText = await res.text();
      throw new Error(
        `HTTP error! status: ${res.status}, message: ${errorText}`
      );
    }
  } catch (err) {
    console.error("Error updating notification:", err);
    return null;
  }
};