import express from "express";
import schemas from "../models/schema.js";

export const getAllTasks = async (
    _: express.Request,
    res: express.Response
) => {
    try {
        const tasks = await schemas.Task.find<Array<Task>>();
        res.status(200).json(tasks).end();
    }
    catch (err) {
        res.sendStatus(400);
        throw err;
    }
}

export const insertTask = async (
    req: express.Request,
    res: express.Response
) => {
    try {
        const { taskNo, desc, detailOther, attach, royalty, depositAmount, liaison, adminOther, label, jobNo, isArchived } = req.body;
        const newTask = new schemas.Task({
            taskNo,
            desc,
            detailOther,
            attach,
            royalty,
            depositAmount,
            liaison,
            adminOther,
            label,
            jobNo,
            isArchived
        });
        await newTask.save();
        res.status(200).json(newTask).end();
    }
    catch (err) {
        res.sendStatus(400);
        throw err;
    }
}