// backend/controllers/notificationController.js

import express from "express";
import schemas from "../models/schema.js";


export const getAllNotifications = async (
    _: express.Request,
    res: express.Response
): Promise<void> => { // <--- Change return type to Promise<void>
    try {
        const notifs = await schemas.Notif.find<Array<Notif>>();
        
        if (!notifs) { // As noted before, find() returns an empty array, not null/undefined for no docs.
            res.status(404).json({ message: "Error finding 'Notifications' MongoDB collection!" });
            return; // Ensure the function exits after sending a response
        }

        res.status(200).json(notifs).end();
    }
    catch (err) {
        console.error("Error in getAllNotifications:", err);
        res.status(400).json(err).end();
    }
}

export const insertNotification = async (
    req: express.Request,
    res: express.Response
): Promise<void> => { // <--- Change return type to Promise<void>
    try {
        const { jobId, notifTitle, notifDesc, time, icon } = req.body;

        let existingNotif = await schemas.Notif.findOne<Notif>({ jobId: jobId });

        if (existingNotif) {
            const newTime = new Date(time);
            const existingTime = existingNotif.time instanceof Date ? existingNotif.time : new Date(existingNotif.time);

            if (existingNotif.notifTitle !== notifTitle ||
                existingNotif.notifDesc !== notifDesc ||
                existingTime.getTime() !== newTime.getTime() ||
                existingNotif.icon !== icon)
            {
                existingNotif.notifTitle = notifTitle;
                existingNotif.notifDesc = notifDesc;
                existingNotif.time = newTime;
                existingNotif.icon = icon;
                
                const updatedResult = await (existingNotif as any).save(); 
                res.status(200).json(updatedResult).end(); // <--- Remove 'return' here
                return; // Ensure the function exits
            } else {
                res.status(200).json(existingNotif).end(); // <--- Remove 'return' here
                return; // Ensure the function exits
            }
        } else {
            const newNotifData = {
                jobId,
                notifTitle,
                notifDesc,
                time: new Date(time),
                icon
            };
            const result = await schemas.Notif.create<Notif>(newNotifData);

            if (!result) {
                res.status(500).json({ message: "Could not insert new Notification!" }).end();
                return; // Ensure the function exits
            }

            res.status(201).json(result).end(); // <--- Remove 'return' here
        }
    }
    catch (err) {
        console.error("Error in insertNotification (idempotent logic):", err);
        res.status(400).json(err).end();
    }
}

export const removeNotification = async (
    req: express.Request,
    res: express.Response
): Promise<void> => { // <--- Change return type to Promise<void>
    try {
        const id = req.params.id;

        if (!id) {
            res.status(404).json({ message: "Failed to provide notification ID!"});
            return; // Ensure the function exits
        }

        const result = await schemas.Notif.findByIdAndDelete<Notif>(id);

        if (!result) {
            res.status(404).json({ message: `Failed to find job with ID: ${id}! Or could not process request.` });
            return; // Ensure the function exits
        }

        res.status(200).json(result).end();
    }
    catch (err) {
        console.error("Error in removeNotification:", err);
        res.status(400).json(err).end();
    }
}

export const getNotificationByJobId = async (
    req: express.Request,
    res: express.Response
): Promise<void> => { // <--- Already correct, just for consistency check
    try {
        const jobId = req.params.jobId;

        if (!jobId) {
            res.status(400).json({ message: "Job ID not provided!" }).end();
            return;
        }

        const notification = await schemas.Notif.findOne<Notif>({ jobId: jobId });

        if (!notification) {
            res.status(404).json({ message: `No notification found for Job ID: ${jobId}` }).end();
            return;
        }

        res.status(200).json(notification).end();
    } catch (err) {
        console.error("Error in getNotificationByJobId:", err);
        res.status(400).json(err).end();
    }
}

export const updateNotification = async (
    req: express.Request,
    res: express.Response
): Promise<void> => { // <--- Already correct, just for consistency check
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