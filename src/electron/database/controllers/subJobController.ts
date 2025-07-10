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
        .json({ message: "Error: Can not find 'Subjobs' MongoDB collection!" });
      return;
    }
    res.status(200).json(subJobs);
  } catch (err) {
    res.status(400).json(err);
  }
};

export const getSubJobById = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const id = req.params.id;
    const subJob = await schemas.SubJob.findById<SubJob>(id);
    if (!subJob) {
      res
        .status(404)
        .json({ message: `Error: Failed to find sub-job with ID: ${id}` });
      return;
    }
    res.status(200).json(subJob);
  } catch (err) {
    res.status(400).json(err);
  }
};

export const insertSubJob = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    // Create subjob for creation
    const tempSubJob: SubJob = req.body;

    // Check for mainJob ID
    const jobId = tempSubJob.jobId;
    if (!jobId) {
      res
        .status(404)
        .json({ message: "Error: Subjob does not have a main JobID" });
      return;
    }

    // Create new subjob in database
    const subJob = await schemas.SubJob.create(tempSubJob);
    if (!subJob) {
      res.status(404).json({ message: "Error: Failed to create subjob." });
      return;
    }
    const subJobId = subJob._id.toString(); // Convert objectid to string

    // Check if subJob id already exists within the mainJob then add/remove
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
        message: "Error: Failed to add subjob to main job.",
      });
      return;
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
      res.status(404).json({ message: "Error: Failed to provide sub-job ID!" });
      return;
    }
    const result = await schemas.SubJob.findByIdAndUpdate(id, req.body);
    if (!result) {
      res.status(404).json({
        message: `Error: Failed to find sub-job with ID: ${id}! Or could not process request.`,
      });
      return;
    }
    res.status(200).json(result);
  } catch (err) {
    res.status(400).json(err);
  }
};

export const removeSubJob = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const subJobId = req.params.id;
    // Get the subJob's mainJob ID
    const subJob = await schemas.SubJob.findById(subJobId);
    if (!subJob) {
      res.status(404).json({
        message: `Error: Failed to find sub-job with ID: ${subJobId}`,
      });
      return;
    }
    const mainJobId = subJob.jobId.toString();

    // Check if subJob id already exists within the mainJob then add/remove
    const updatedJob = await schemas.Job.updateMany({ _id: mainJobId }, [
      {
        $set: {
          subJobList: {
            $cond: [
              {
                $in: [subJobId, "$subJobList"],
              },
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
        message: "Error: Failed to remove subjob from main job.",
      });
      return;
    }

    // -------------------- Delete Dependencies --------------------
    // Delete all child cushions
    if (subJob.cushionList.length > 0) {
      const cushions = await Promise.all(
        subJob.cushionList.map(async (cushionId) => {
          const cushion = await schemas.Cushion.findByIdAndDelete(cushionId);
          return cushion;
        })
      );
      if (!cushions) {
        res
          .status(404)
          .json({ message: "Error: Failed to delete child cushions." });
      }
    }
    // Delete all child frames
    if (subJob.frameList.length > 0) {
      const frames = await Promise.all(
        subJob.frameList.map(async (frameId) => {
          const frame = await schemas.Frame.findByIdAndDelete(frameId);
          return frame;
        })
      );
      if (!frames) {
        res
          .status(404)
          .json({ message: "Error: Failed to delete child frames." });
      }
    }
    // Delete all child upholstery
    if (subJob.upholsteryList.length > 0) {
      const upholstery = await Promise.all(
        subJob.upholsteryList.map(async (upholsteryId) => {
          const upholstery = await schemas.Upholstery.findByIdAndDelete(
            upholsteryId
          );
          return upholstery;
        })
      );
      if (!upholstery) {
        res
          .status(404)
          .json({ message: "Error: Failed to delete child upholstery." });
      }
    }
    // -------------------------------------------------------------

    // Finally, delete the subjob
    const result = await schemas.SubJob.findByIdAndDelete(subJobId);
    if (!result) {
      res.status(404).json({
        message: `Error: Failed to delete subJob with ID: ${subJobId}! Or could not process request.`,
      });
      return;
    }

    res.status(200).json(result);
  } catch (err) {
    res.status(400).json(err);
  }
};
