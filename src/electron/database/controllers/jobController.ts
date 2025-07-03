import express from "express";
import schemas from "../models/schema.js";

export const getAllJobs = async (
    _: express.Request, 
    res: express.Response
) => {
    try {
        const jobs = await schemas.Job.find<Array<Job>>();
        res.status(200).json(jobs).end();
    }
    catch (err) {
        res.sendStatus(400);
        throw err;
    }
}

export const insertJob = async (
    req: express.Request,
    res: express.Response
) => {
    try {
        const { jobNo, invoiceId, dueDate, label, tasks, isPinned } = req.body;
        const newJob = new schemas.SubJob({
            jobNo,
            invoiceId,
            dueDate,
            label,
            tasks,
            isPinned,
        });
        res.status(200).json(newJob).end();
    }
    catch (err) {
        res.sendStatus(400);
        throw err;
    }
}