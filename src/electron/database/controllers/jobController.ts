import express from "express";
import schemas from "../models/schema.js";

export const getAllJobs = async (_: express.Request, res: express.Response) => {
  try {
    const jobs = await schemas.Job.find<Array<Job>>();

    if (!jobs) {
      res
        .status(404)
        .json({ message: "Error finding 'Jobs' MongoDB collection!" });
    }

    res.status(200).json(jobs).end();
  } catch (err) {
    res.status(400).json(err).end();
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
      return;
    }

    const job = await schemas.Job.findById<Job>(id);

    if (!job) {
      res.status(404).json({ message: `Failed to find job with ID: ${id}` });
      return;
    }

    res.status(200).json(job).end();
  } catch (err) {
    res.status(400).json(err).end();
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

    res.status(200).json(result).end();
  } catch (err) {
    res.status(400).json(err).end();
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
      return;
    }

    const result = await schemas.Job.findByIdAndUpdate(id, req.body);

    if (!result) {
      res.status(404).json({
        message: `Failed to find job with ID: ${id}! Or could not process request.`,
      });
      return;
    }
    res.status(200).json(result).end();
  } catch (err) {
    res.status(400).json(err).end();
  }
};

export const removeJob = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const id = req.params.id;

    if (!id) {
      res.status(404).json({ message: "Failed to provide job ID! " });
      return;
    }

    const result = await schemas.Job.findByIdAndDelete<Job>(id);

    if (!result) {
      res.status(404).json({
        message: `Failed to find job with ID: ${id}! Or could not process request.`,
      });
      return;
    }

    res.status(200).json(result).end();
  } catch (err) {
    res.status(400).json(err).end();
  }
};
