import express from "express";
import {
    getAllNotifications,
    insertNotification,
    // updateNotification,
    removeNotification
} from "../controllers/notificationController.js";

export default (router: express.Router) => {
    router.get("/notification/getAllNotifications", getAllNotifications);
    router.post("/notification/insertNotification",  insertNotification);
    // router.put("/notification/updateNotification/", updateNotification);
    router.delete("/notification/removeNotification/:id", removeNotification);
}