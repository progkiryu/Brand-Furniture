import express from "express";
import schemas from "../models/schema.js";

export const getAllNotifications = async (
    _: express.Request,
    res: express.Response
) => {
    try {
        const notifs = await schemas.Notif.find<Array<Notif>>();
        
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
        const result = await schemas.Notif.create<Notif>(req.body);

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

        const result = await schemas.Notif.findByIdAndDelete<Notif>(id);

        if (!result) {
            res.status(404).json({ message: `Failed to find job with ID: ${id}! Or could not process request.` });
        }

        res.status(200).json(result).end();
    }
    catch (err) {
        res.status(400).json(err).end();
    }
}

export const getNotificationByJobId = async (
    req: express.Request,
    res: express.Response
): Promise<void> => {
    try {
        const jobId = req.params.jobId;

        if (!jobId) {
            res.status(400).json({ message: "Job ID not provided!" }).end();
            return;
        }

        const notification = await schemas.Notif.findOne<Notif>({ jobId: jobId });

        res.status(200).json(notification).end();
    } catch (err) {
        console.error("Error in getNotificationByJobId:", err);
        res.status(400).json(err).end();
    }
}

export const updateNotification = async (
    req: express.Request,
    res: express.Response
): Promise<void> => {
    try {
        const id = req.params.id;
        const updatedData = req.body;

        if (!id) {
            res.status(400).json({ message: "Notification ID not provided!" }).end();
            return;
        }

        const result = await schemas.Notif.findByIdAndUpdate<Notif>(id, updatedData, { new: true });

        if (!result) {
            res.status(404).json({ message: `Failed to find notification with ID: ${id} or could not update.` }).end();
            return;
        }

        res.status(200).json(result).end();
    } catch (err) {
        console.error("Error in updateNotification:", err);
        res.status(400).json(err).end();
    }
}