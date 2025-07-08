import express from "express";
import schemas from "../models/schema.js";

export const getAllNotifications = async (
    _: express.Request,
    res: express.Response
) => {
    try {
        const notifs = await schemas.Notification.find<Array<Notification>>();
        
        if (!notifs) {
            res
                .status(404)
                .json({ message: "Error finding 'Notifications' MongoDB collection!" });
        }

        res.status(200).json(notifs).end();
    }
    catch (err) {
        res.status(400).json(err).end();
    }
}

export const insertNotification = async (
    req: express.Request,
    res: express.Response
) => {
    try {
        const result = await schemas.Notification.create<Notification>(req.body);

        if (!result) {
            throw new Error("Could not insert new Notification!");
        }

        res.status(200).json(result).end();
    }
    catch (err) {
        res.status(400).json(err).end();
    }
}

export const removeNotification = async (
    req: express.Request,
    res: express.Response
) => {
    try {
        const id = req.params.id;

        if (!id) {
            res.status(404).json({ message: "Failed to provide notification ID!"});
        }

        const result = await schemas.Notification.findByIdAndDelete<Notification>();

        if (!result) {
            res.status(404).json({ message: `Failed to find job with ID: ${id}! Or could not process request.` });
        }

        res.status(200).json(result).end();
    }
    catch (err) {
        res.status(400).json(err).end();
    }
}