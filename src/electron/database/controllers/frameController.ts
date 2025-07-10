import express from "express";
import schemas from "../models/schema.js";

// Get all frames
export const getAllFrames = async (
  _: express.Request,
  res: express.Response
) => {
  try {
    const frames = await schemas.Frame.find({});
    if (!frames) {
      res.status(404).json({ message: "Error: Failed to get frames" });
    }
    res.status(200).json(frames);
  } catch (err) {
    console.error(err);
    res.sendStatus(400);
  }
};

// Get a frame by ID (url)
export const getFrameById = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const id = req.params.id;
    const frame = await schemas.Frame.findById(id);
    if (!frame) {
      res
        .status(404)
        .json({ message: `Error: Failed to find frame with id: ${id}` });
      return;
    }
    res.status(200).json(frame);
  } catch (err) {
    console.error(err);
    res.status(400);
  }
};

// Create new frame
export const postCreateFrame = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    // Create temp fram obj
    const tempFrame: Frame = req.body;

    // Check for subjobId
    const subJobId = tempFrame.subJobId;
    if (!subJobId) {
      res.status(404).json({ message: "Error: Frame does not have subjobID." });
      return;
    }

    // Create new frame in db
    const frame = await schemas.Frame.create(req.body);
    if (!frame) {
      res.status(404).json({ message: "Error: Failed to create new Frame" });
      return;
    }
    const frameId = frame._id.toString();

    // Check if the frameid exists in subjob then add/remove
    const updatedSubJob = await schemas.SubJob.updateMany({ _id: subJobId }, [
      {
        $set: {
          frameList: {
            $cond: [
              { $in: [frameId, "$frameList"] },
              {
                $filter: {
                  input: "$frameList",
                  cond: { $ne: ["$$this", frameId] },
                },
              },
              { $concatArrays: ["$frameList", [frameId]] },
            ],
          },
        },
      },
    ]);
    if (!updatedSubJob) {
      res.status(404).json({
        message: "Error: Failed to add frame to subjob.",
      });
      return;
    }

    // return frame
    res.status(200).json(frame);
  } catch (err) {
    console.error(err);
    res.status(400).json(err);
  }
};

// Delete a frame by ID (url)
export const deleteFrameById = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const frameId = req.params.id;
    // Get frame's subjobId
    const frame = await schemas.Frame.findById(frameId);
    if (!frame) {
      res
        .status(404)
        .json({ message: `Failed to find frame with ID: ${frameId}` });
      return;
    }
    const subJobId = frame.subJobId.toString();

    // Check if the frame exists within subjob them add/remove
    const updatedSubJob = await schemas.SubJob.updateMany({ _id: subJobId }, [
      {
        $set: {
          frameList: {
            $cond: [
              {
                $in: [frameId, "$frameList"],
              },
              {
                $filter: {
                  input: "$frameList",
                  cond: { $ne: ["$$this", frameId] },
                },
              },
              { $concatArrays: ["frameList", [frameId]] },
            ],
          },
        },
      },
    ]);
    if (!updatedSubJob) {
      res.status(404).json({
        message: "Failed to remove frame from subjob.",
      });
      return;
    }

    // Delete the frame.
    const result = await schemas.Frame.findByIdAndDelete(frameId);
    if (!result) {
      res
        .status(404)
        .json({ message: `Error: Failed to delete frame with id: ${frameId}` });
      return;
    }
    res.status(200).json({ message: "Frame deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(400).json(err);
  }
};

// Update a frame by ID
export const putUpdateFrame = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const id = req.body._id;
    const frame = await schemas.Frame.findByIdAndUpdate(id, req.body);
    if (!frame) {
      res
        .status(404)
        .json({ message: `Error: Failed to find frame with id: ${id}` });
      return;
    }
    const updatedFrame = await schemas.Frame.findById(id);
    if (!updatedFrame) {
      res.status(404).json({
        message: `Error: Failed to find updated frame with id: ${id}`,
      });
      return;
    }
    res.status(200).json(updatedFrame);
  } catch (err) {
    console.error(err);
    res.status(400).json(err);
  }
};
