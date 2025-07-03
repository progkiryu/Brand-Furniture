import express from "express";
import schemas from "../models/schema.js";

// frameId: String,
// supplier: String,
// desc: String,
// orderDate: String,
// expectDate: String,
// receiveDate: String

// Get all frames
export const getAllFrames = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const frames = await schemas.Frame.find({});
    res.status(200).json(frames);
    return;
  } catch (err) {
    console.error(err);
    res.sendStatus(400);
    return;
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
      res.status(404).json({ message: `No frame found with id: ${id}` });
      return;
    }
    res.status(200).json(frame);
    return;
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
      res.status(404).json({ message: `No frame found with id: ${id}` });
      return;
    }
    res.status(200).json({ message: "Frame deleted successfully" });
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};

// Update a frame by ID
export const putUpdateFrame = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const id = req.body.id;
    const frame = await schemas.Frame.findByIdAndUpdate(id, req.body);
    if (!frame) {
      res.status(404).json({ message: `No frame found with id: ${id}` });
      return;
    }
    const updatedFrame = await schemas.Frame.findById(id);
    res.status(200).json(updatedFrame);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};
