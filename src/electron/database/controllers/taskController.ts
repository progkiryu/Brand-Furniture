// import express from "express";
// import schemas from "../models/schema.js";

// export const getAllTasks = async (
//     _: express.Request,
//     res: express.Response
// ) => {
//     try {
//         const tasks = await schemas.Task.find<Array<Task>>();
//         res.status(200).json(tasks).end();
//     }
//     catch (err) {
//         res.sendStatus(400);
//         throw err;
//     }
// }

// export const insertTask = async (
//     req: express.Request,
//     res: express.Response
// ) => {
//     try {
//         const { taskNo, desc, specs, other, attach, royalty } = req.body;
//         const newTask = new schemas.Task({
//             taskNo,
//             desc,
//             specs,
//             other,
//             attach,
//             royalty
//         });
//         await newTask.save();
//         res.status(200).json(newTask).end();
//     }
//     catch (err) {
//         res.sendStatus(400);
//         throw err;
//     }
// }

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

export const insertSubJob = async (
    req: express.Request,
    res: express.Response
) => {
    try {

        const { jobId, subJobId,  subJobDetail, note, file, depositAmount, depositDate, paidInFull, liaison, paymentNote } = req.body;
        const newSubJob = new schemas.SubJob({
            jobId,
            subJobId,  
            subJobDetail,
            note,
            file,
            depositAmount,
            depositDate,
            paidInFull,
            liaison,
            paymentNote,
        });
        await newSubJob.save();
        res.status(200).json(newSubJob).end();
    }
    catch (err) {
        res.sendStatus(400);
        throw err;
    }
}