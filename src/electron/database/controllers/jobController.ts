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