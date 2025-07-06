import express from "express";
import schemas from "../models/schema.js";

export const getAllSubJobs = async (
    _: express.Request,
    res: express.Response
) => {
    try {
        const tasks = await schemas.SubJob.find<Array<SubJob>>();
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
        const { taskNo, desc, specs, other, attach, royalty } = req.body;
        const newTask = new schemas.SubJob({
            taskNo,
            desc,
            specs,
            other,
            attach,
            royalty
        });
        await newTask.save();
        res.status(200).json(newTask).end();
    }
    catch (err) {
        res.sendStatus(400);
        throw err;
    }
}

