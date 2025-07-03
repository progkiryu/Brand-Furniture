import express from "express";
import schemas from "../models/schema.js";

// Get all cushions
export const getAllCushions = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const cushions = await schemas.Cushion.find({});
    if (!cushions) {
      res.status(404).json({ message: "Failed to get chusions" });
      return;
    }
    res.status(200).json(cushions);
    return;
  } catch (err) {
    console.error(err);
    res.sendStatus(400);
    return;
  }
};

// Get a cushion by ID (url)
export const getCushionById = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const id = req.params.id;
    const cushion = await schemas.Cushion.findById(id);
    if (!cushion) {
      res
        .status(404)
        .json({ message: `Failed to find cushion with id: ${id}` });
      return;
    }
    res.status(200).json(cushion);
    return;
  } catch (err) {
    console.error(err);
    res.sendStatus(400);
    return;
  }
};

// Create new cushion
export const postCreateCushion = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const cushion = await schemas.Cushion.create(req.body);
    if (!cushion) {
      res.status(404).json({ message: "Failed to create new cushion" });
      return;
    }
    res.status(200).json(cushion);
    return;
  } catch (err) {
    console.error(err);
    res.sendStatus(400);
    return;
  }
};

// Delete a cushion by ID (url)
export const deleteCushionById = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const id = req.params.id;
    const cushion = await schemas.Cushion.findByIdAndDelete(id);
    if (!cushion) {
      res
        .status(404)
        .json({ message: `Failed to find cushion with id: ${id}` });
      return;
    }
    res.status(200).json({ message: "Cushion deleted successfully" });
    return;
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
    return;
  }
};

// Update a cushion by ID
export const putUpdateCushion = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const id = req.body.id;
    const cushion = await schemas.Cushion.findByIdAndUpdate(id, req.body);
    if (!cushion) {
      res
        .status(404)
        .json({ message: `Failed to find cushion with id: ${id}` });
      return;
    }
    const updatedCushion = await schemas.Cushion.findById(id);
    if (!updatedCushion) {
      res
        .status(404)
        .json({ message: `Failed to find updated cushion with id: ${id}` });
      return;
    }
    res.status(200).json(updatedCushion);
    return;
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
    return;
  }
};
