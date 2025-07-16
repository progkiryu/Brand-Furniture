import express from "express";
import schemas from "../models/schema.js";

// Get all cushions
export const getAllCushions = async (
  _: express.Request,
  res: express.Response
) => {
  try {
    const cushions = await schemas.Cushion.find({});
    if (!cushions) {
      res.status(404).json({ message: "Error: Failed to get cushions" });
      return;
    }
    res.status(200).json(cushions);
  } catch (err) {
    console.error(err);
    res.status(400).json(err);
  }
};

// Get a cushion by ID (url)
export const getCushionById = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const cushionId = req.params.id;
    const cushion = await schemas.Cushion.findById(cushionId);
    if (!cushion) {
      res.status(404).json({
        message: `Error: Failed to find cushion with id: ${cushionId}`,
      });
      return;
    }
    res.status(200).json(cushion);
  } catch (err) {
    console.error(err);
    res.status(400).json(err);
  }
};

export const getCushionsBySubJobId = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const subJobId = req.params.subjobid;
    const cushions = await schemas.SubJob.find({
      subJobId: { $in: subJobId },
    });
    if (!cushions) {
      res.status(404).json({ message: "Error: Failed to retrieve cushions" });
      return;
    }

    res.status(200).json(cushions);
  } catch (err) {
    console.error(err);
    res.status(400).json(err);
  }
};

// Create new cushion
export const postCreateCushion = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    // Create cushion for creation
    const tempCushion: Cushion = req.body;

    // Check for subjobId
    const subJobId = tempCushion.subJobId;
    if (!subJobId) {
      res
        .status(404)
        .json({ message: "Error: Cushion does not have subjobID." });
      return;
    }

    // Create new cushion in database
    const cushion = await schemas.Cushion.create(tempCushion);
    if (!cushion) {
      res.status(404).json({ message: "Error: Failed to create new cushion" });
      return;
    }
    const cushionId = cushion._id.toString();

    // Check if cushionId exists in subJob then add/remove
    const updatedSubJob = await schemas.SubJob.updateMany({ _id: subJobId }, [
      {
        $set: {
          cushionList: {
            $cond: [
              { $in: [cushionId, "$cushionList"] },
              {
                $filter: {
                  input: "$cushionList",
                  cond: { $ne: ["$$this", cushionId] },
                },
              },
              { $concatArrays: ["$cushionList", [cushionId]] },
            ],
          },
        },
      },
    ]);
    if (!updatedSubJob) {
      res.status(404).json({
        message: "Error: Failed to add cushion to subjob.",
      });
      return;
    }

    // Return newly created cushion
    res.status(200).json(cushion);
  } catch (err) {
    console.error(err);
    res.status(400).json(err);
  }
};

// Delete a cushion by ID (url)
export const deleteCushionById = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const cushionId = req.params.id;
    // Get cushions' subJob ID
    const cushion = await schemas.Cushion.findById(cushionId);
    if (!cushion) {
      res.status(404).json({
        message: `Error: Failed to find cushion with ID: ${cushionId}`,
      });
      return;
    }
    const subJobId = cushion.subJobId.toString();

    // Check if cushion already exists within subjob then add/remove
    const updatedSubJob = await schemas.SubJob.updateMany({ _id: subJobId }, [
      {
        $set: {
          cushionList: {
            $cond: [
              {
                $in: [cushionId, "$cushionList"],
              },
              {
                $filter: {
                  input: "$cushionList",
                  cond: { $ne: ["$$this", cushionId] },
                },
              },
              { $concatArrays: ["cushionList", [cushionId]] },
            ],
          },
        },
      },
    ]);
    if (!updatedSubJob) {
      res.status(404).json({
        message: "Error: Failed to remove cushion from subjob.",
      });
      return;
    }

    // Delete the cushion.
    const result = await schemas.Cushion.findByIdAndDelete(cushionId);
    if (!result) {
      res.status(404).json({
        message: `Error: Failed to delete cushion with id: ${cushionId}}`,
      });
      return;
    }

    res.status(200).json(result);
  } catch (err) {
    console.error(err);
    res.status(400).json(err);
  }
};

// Update a cushion by ID
export const putUpdateCushion = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const cushionId = req.body._id;
    const cushion = await schemas.Cushion.findByIdAndUpdate(
      cushionId,
      req.body
    );
    if (!cushion) {
      res.status(404).json({
        message: `Error: Failed to find cushion with id: ${cushionId}`,
      });
      return;
    }
    const updatedCushion = await schemas.Cushion.findById(cushionId);
    if (!updatedCushion) {
      res.status(404).json({
        message: `Error: Failed to find updated cushion with id: ${cushionId}}`,
      });
      return;
    }
    res.status(200).json(updatedCushion);
  } catch (err) {
    console.log("err");
    console.error(err);
    res.status(400).json(err);
  }
};
