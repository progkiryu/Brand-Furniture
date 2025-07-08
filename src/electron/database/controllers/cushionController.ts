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
      res.status(404).json({ message: "Failed to get chusions" });
    }
    res.status(200).json(cushions);
  } catch (err) {
    console.error(err);
    res.sendStatus(400);
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
    }
    res.status(200).json(cushion);
  } catch (err) {
    console.error(err);
    res.sendStatus(400);
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
    }
    res.status(200).json(cushion);
  } catch (err) {
    console.error(err);
    res.sendStatus(400);
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
    }
    res.status(200).json({ message: "Cushion deleted successfully" });
  } catch (err) {
    console.error(err);
    res.sendStatus(400);
  }
};

// Update a cushion by ID
export const putUpdateCushion = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const id = req.body._id;
    const cushion = await schemas.Cushion.findByIdAndUpdate(id, req.body);
    if (!cushion) {
      res
        .status(404)
        .json({ message: `Failed to find cushion with id: ${id}` });
    }
    const updatedCushion = await schemas.Cushion.findById(id);
    if (!updatedCushion) {
      res
        .status(404)
        .json({ message: `Failed to find updated cushion with id: ${id}` });
    }
    res.status(200).json(updatedCushion);
  } catch (err) {
    console.error(err);
    res.sendStatus(400);
  }
};
