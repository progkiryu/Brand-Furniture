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
      return;
    }
    res.status(200).json(subJobs);
    return;
  } catch (err) {
    res.status(400).json(err);
    return;
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
    res.status(200).json(subJob);
    return;
  } catch (err) {
    res.status(400).json(err);
    return;
  }
};

export const insertSubJob = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    // Search for the main job
    const jobId = req.body.jobId;
    if (!jobId) {
      res
        .status(404)
        .json({ message: "Subjob Creation: Failed to find main job." });
    }

    // Assign main jobId to subJob
    const tempSubJob: SubJob = req.body;
    tempSubJob.jobId = jobId;

    // Create new subjob in database
    const subJob = await schemas.SubJob.create(tempSubJob);
    if (!subJob) {
      res
        .status(404)
        .json({ message: "Subjob Creation: Failed to create subjob." });
    }
    const subJobId = subJob._id.toString(); // Convert objectid to string

    // Check if subJob id already exists within the main Job then add/remove
    const updatedJob = await schemas.Job.updateMany({ _id: jobId }, [
      {
        $set: {
          subJobList: {
            $cond: [
              { $in: [subJobId, "$subJobList"] },
              {
                $filter: {
                  input: "$subJobList",
                  cond: { $ne: ["$$this", subJobId] },
                },
              },
              { $concatArrays: ["$subJobList", [subJobId]] },
            ],
          },
        },
      },
    ]);
    if (!updatedJob) {
      res.status(404).json({
        message: "Subjob Creation: Failed to add subjob to main job.",
      });
    }
    // Return newly created subjob
    res.status(200).json(subJob);
  } catch (err) {
    res.status(400).json(err);
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
    res.status(200).json(result);
    return;
  } catch (err) {
    res.status(400).json(err);
    return;
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
    res.status(200).json(result);
    return;
  } catch (err) {
    res.status(400).json(err);
    return;
  }
};
