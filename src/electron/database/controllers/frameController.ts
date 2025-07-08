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
      res.status(404).json({ message: "Failed to get frames" });
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
      res.status(404).json({ message: `Failed to find frame with id: ${id}` });
    }
    res.status(200).json(frame);
  } catch (err) {
    console.error(err);
    res.sendStatus(400);
  }
};

// Create new frame
export const postCreateFrame = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const frame = await schemas.Frame.create(req.body);
    if (!frame) {
      res.status(404).json({ message: "Failed to create new Frame" });
    }
    res.status(200).json(frame);
  } catch (err) {
    console.error(err);
    res.sendStatus(400);
  }
};

// Delete a frame by ID (url)
export const deleteFrameById = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const id = req.params.id;
    const frame = await schemas.Frame.findByIdAndDelete(id);
    if (!frame) {
      res.status(404).json({ message: `Failed to find frame with id: ${id}` });
    }
    res.status(200).json({ message: "Frame deleted successfully" });
  } catch (err) {
    console.error(err);
    res.sendStatus(400);
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
      res.status(404).json({ message: `Failed to find frame with id: ${id}` });
    }
    const updatedFrame = await schemas.Frame.findById(id);
    if (!updatedFrame) {
      res
        .status(404)
        .json({ message: `Failed to find updated frame with id: ${id}` });
    }
    res.status(200).json(updatedFrame);
  } catch (err) {
    console.error(err);
    res.sendStatus(400);
  }
};
