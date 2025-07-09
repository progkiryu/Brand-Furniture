import express from "express";
import schemas from "../models/schema.js";

export const getAllJobs = async (_: express.Request, res: express.Response) => {
  try {
    const jobs = await schemas.Job.find();
    if (!jobs) {
      res
        .status(404)
        .json({ message: "Error finding 'Jobs' MongoDB collection!" });
    }
    res.status(200).json(jobs);
  } catch (err) {
    res.status(400).json(err);
  }
};

export const getJobById = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const id = req.params.id;
    if (!id) {
      res.status(404).json({ message: "Failed to provide ID!" });
    }
    const job = await schemas.Job.findById(id);
    if (!job) {
      res.status(404).json({ message: `Failed to find job with ID: ${id}` });
    }
    res.status(200).json(job);
  } catch (err) {
    res.status(400).json(err);
  }
};

export const insertJob = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const result = await schemas.Job.create(req.body);
    if (!result) {
      throw new Error("Could not insert new Job!");
    }
    res.status(200).json(result);
  } catch (err) {
    res.status(400).json(err);
  }
};

export const updateJob = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const id = req.body._id; 
    if (!id) {
      res.status(404).json({ message: "Failed to provide job ID!" });
    }
    const result = await schemas.Job.findByIdAndUpdate(id, req.body, {new: true});
    if (!result) {
      res.status(404).json({
        message: `Failed to find job with ID: ${id}! Or could not process request.`,
      });
    }
    res.status(200).json(result);
  } catch (err) {
    res.status(400).json(err);
  }
};

export const removeJob = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    // Check for provided ID
    const id = req.params.id;
    if (!id) {
      res.status(404).json({ message: "Failed to provide job ID!" });
    }

    // Check if job exists
    const job = await schemas.Job.findById(id);
    if (!job) {
      res.status(404).json({ message: `Failed to find job with ID: ${id}` });
      return;
    }

    // Delete all subJobs
    const removedSubJobs = await Promise.all(
      job.subJobList.map(async (subJobId) => {
        const subJob = await schemas.SubJob.findByIdAndDelete(subJobId);
        return subJob;
      })
    );
    if (!removedSubJobs) {
      res.status(404).json({
        message: `Failed to delete subJobs or could not process request.`,
      });
      return;
    }

    // Delete the job
    const result = await schemas.Job.findByIdAndDelete<Job>(id);
    if (!result) {
      res.status(404).json({
        message: `Failed to find job with ID: ${id}! Or could not process request.`,
      });
    }
    res.status(200).json(result);
  } catch (err) {
    res.status(400).json(err);
  }
};
