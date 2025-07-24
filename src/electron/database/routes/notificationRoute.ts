import express from "express";
import {
    getAllNotifications,
    insertNotification,
    removeNotification,
    getNotificationByJobId, // Import new function
    updateNotification // Import new function
} from "../controllers/notificationController.js";

export default (router: express.Router) => {
    router.get("/notification/getAllNotifications", getAllNotifications);
    router.post("/notification/insertNotification",  insertNotification);
    router.delete("/notification/removeNotification/:id", removeNotification);
    router.get("/notification/getNotificationByJobId/:jobId", getNotificationByJobId); // New GET route
    router.put("/notification/updateNotification/:id", updateNotification); // New PUT route
}