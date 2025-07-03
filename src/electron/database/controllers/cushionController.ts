import express from "express";
import schemas from "../models/schema.js";

// Get all cushions
export const getAllCushions = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const cushion = await schemas.Cushion.find({});
    res.status(200).json(cushion);
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
      res.status(404).json({ message: `No cushion found with id: ${id}` });
      return;
    }
    res.status(200).json(cushion);
    return;
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
      res.status(404).json({ message: `No cushion found with id: ${id}` });
      return;
    }
    res.status(200).json({ message: "Cushion deleted successfully" });
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
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
      res.status(404).json({ message: `No cushion found with id: ${id}` });
      return;
    }
    const updatedCushion = await schemas.Cushion.findById(id);
    res.status(200).json(updatedCushion);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};
