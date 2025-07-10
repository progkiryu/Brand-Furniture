import express from "express";
import schemas from "../models/schema.js";

// Get all upholstery
export const getAllUpholstery = async (
  _: express.Request,
  res: express.Response
) => {
  try {
    const upholstery = await schemas.Upholstery.find({});
    if (!upholstery) {
      res.status(404).json({ message: `Failed to get upholstery` });
      return;
    }
    res.status(200).json(upholstery);
  } catch (err) {
    console.error(err);
    res.status(400);
  }
};

// Get upholstery by ID (url)
export const getUpholsteryById = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const id = req.params.id.toString();

    const upholstery = await schemas.Upholstery.findById(id);
    if (!upholstery) {
      res
        .status(404)
        .json({ message: `Failed to find upholstery with id: ${id}` });
      return;
    }
    res.status(200).json(upholstery);
  } catch (err) {
    console.error(err);
    res.status(400).json(err);
  }
};

// Create a new upholstery
export const postCreateUpholstery = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    // Create temp upholstery obj
    const tempUpholstery: Upholstery = req.body;

    // Check for subjobId
    const subJobId = tempUpholstery.subJobId;
    if (!subJobId) {
      res.status(404).json({ message: "Error: Uphol does not have subjobID." });
      return;
    }

    // Create new upholstery
    const upholstery = await schemas.Upholstery.create(req.body);
    if (!upholstery) {
      res
        .status(404)
        .json({ message: "Error: Failed to create new Upholstery" });
      return;
    }
    const upholsteryId = upholstery._id.toString();

    // Check if the upholstery exists in the subJob then add/remove
    const updatedSubJob = await schemas.SubJob.updateMany({ _id: subJobId }, [
      {
        $set: {
          upholsteryList: {
            $cond: [
              {
                $in: [upholsteryId, "$upholsteryList"],
              },
              {
                $filter: {
                  input: "$upholsteryList",
                  cond: { $ne: ["$$this", upholsteryId] },
                },
              },
              { $concatArrays: ["$upholsteryList", [upholsteryId]] },
            ],
          },
        },
      },
    ]);
    if (!updatedSubJob) {
      res.status(404).json({
        message: "Failed to add upholstery from subjob.",
      });
      return;
    }

    // return created upholstery
    res.status(200).json(upholstery);
  } catch (err) {
    console.error(err);
    res.status(400).json(err);
  }
};

// Delete a upholstery by ID (url)
export const deleteUpholsteryById = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const upholsteryId = req.params.id;
    // Get upholstery's subJobId
    const upholstery = await schemas.Upholstery.findById(upholsteryId);
    if (!upholstery) {
      res.status(404).json({
        message: `Error: Failed to find upholsery with ID: ${upholsteryId}`,
      });
      return;
    }
    const subJobId = upholstery.subJobId.toString();

    // Check if the upholstery exists in the subJob then add/remove
    const updatedSubJob = await schemas.SubJob.updateMany({ _id: subJobId }, [
      {
        $set: {
          upholsteryList: {
            $cond: [
              {
                $in: [upholsteryId, "$upholsteryList"],
              },
              {
                $filter: {
                  input: "$upholsteryList",
                  cond: { $ne: ["$$this", upholsteryId] },
                },
              },
              { $concatArrays: ["$upholsteryList", [upholsteryId]] },
            ],
          },
        },
      },
    ]);
    if (!updatedSubJob) {
      res.status(404).json({
        message: "Failed to remove upholstery from subjob.",
      });
      return;
    }

    // Delete the upholstery
    const result = await schemas.Upholstery.findByIdAndDelete(upholsteryId);
    if (!result) {
      res.status(404).json({
        message: `Error: Failed to delete upholstery with id: ${upholsteryId}`,
      });
      return;
    }

    res.status(200).json(result);
  } catch (err) {
    console.error(err);
    res.status(400).json(err);
  }
};

// Update upholstery by id
export const putUpdateUpholstery = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const id = req.body._id;
    const upholstery = await schemas.Upholstery.findByIdAndUpdate(id, req.body);
    if (!upholstery) {
      res
        .status(404)
        .json({ message: `Error: Failed to find upholstery with id: ${id}` });
      return;
    }
    const updatedUpholstery = await schemas.Upholstery.findById(id);
    if (!updatedUpholstery) {
      res.status(404).json({
        message: `Error: failed to find updated upholstery with id: ${id}`,
      });
      return;
    }
    res.status(200).json(updatedUpholstery);
  } catch (err) {
    console.error(err);
    res.status(400).json(err);
  }
};
