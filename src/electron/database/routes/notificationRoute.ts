import express from "express";
import {
    getAllNotifications,
    insertNotification,
    removeNotification
} from "../controllers/notificationController.js";

export default (router: express.Router) => {
    router.get("/notification/getAllNotifications", getAllNotifications);
    router.post("/notification/insertNotification",  insertNotification);
    router.delete("/notification/removeNotification/:id", removeNotification);
}