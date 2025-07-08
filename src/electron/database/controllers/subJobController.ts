import express from "express";
import schemas from "../models/schema.js";

export const getAllSubJobs = async (
  _: express.Request,
  res: express.Response
) => {
  try {
    const subJobs = await schemas.SubJob.find<Array<SubJob>>();
    if (!subJobs) {
      res
        .status(404)
        .json({ message: "Error finding 'Subjobs' MongoDB collection!" });
    }
    res.status(200).json(subJobs).end();
  } catch (err) {
    res.status(400).json(err).end();
  }
};

export const getSubJobById = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const id = req.params.id;
    if (!id) {
      res
        .status(404)
        .json({ message: `Failed to find sub-job with ID: ${id}` });
      return;
    }
    const subJob = await schemas.SubJob.findById<SubJob>(id);
    if (!subJob) {
      res
        .status(404)
        .json({ message: `Failed to find sub-job with ID: ${id}` });
      return;
    }
    res.status(200).json(subJob).end();
  } catch (err) {
    res.status(400).json(err).end();
  }
};

export const insertSubJob = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const result = await schemas.SubJob.create(req.body);
    if (!result) {
      throw new Error("Could not insert new Sub-job!");
    }
    res.status(200).json(result).end();
  } catch (err) {
    res.status(400).json(err).end();
  }
};

export const updateSubJob = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const id = req.body._id;
    if (!id) {
      res.status(404).json({ message: "Failed to provide sub-job ID!" });
    }
    const result = await schemas.SubJob.findByIdAndUpdate(id, req.body);
    if (!result) {
      res.status(404).json({
        message: `Failed to find sub-job with ID: ${id}! Or could not process request.`,
      });
      return;
    }
    res.status(200).json(result).end();
  } catch (err) {
    res.status(400).json(err).end();
  }
};

export const removeSubJob = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const id = req.params.id;
    if (!id) {
      res.status(404).json({ message: "Failed to provide ID!" });
      return;
    }
    const result = await schemas.SubJob.findByIdAndDelete(id);
    if (!result) {
      res.status(404).json({
        message: `Failed to find sub-job with ID: ${id}! Or could not process request.`,
      });
      return;
    }
    res.status(200).json(result).end();
  } catch (err) {
    res.status(400).json(err).end();
  }
};
