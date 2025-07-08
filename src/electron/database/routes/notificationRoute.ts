import express from "express";
import {
    getAllNotifications,
    insertNotification,
    removeNotification
} from "../controllers/notificationController.js";

export default (router: express.Router) => {
    router.get("/notifications/getAllNotifications", getAllNotifications);
    router.post("/notifications/insertNotification",  insertNotification);
    router.delete("/notification/removeNotification/:id", removeNotification);
}