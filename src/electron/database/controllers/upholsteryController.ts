import express from "express";
import schemas from "../models/schema.js";

// Get all upholstery
export const getAllUpholstery = async (
  _: express.Request,
  res: express.Response
) => {
  try {
    const upholstery = await schemas.Upholstery.find({});
    res.status(200).json(upholstery);
    if (!upholstery) {
      res.status(404).json({ message: `Failed to get upholstery` });
      return;
    }
    return;
  } catch (err) {
    console.error(err);
    res.sendStatus(400);
    return;
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
    return;
  } catch (err) {
    console.error(err);
    res.sendStatus(400);
  }
};

// Create a new upholstry
export const postCreateUpholstry = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const upholstery = await schemas.Upholstery.create(req.body);
    if (!upholstery) {
      res.status(404).json({ message: "Failed to create new Upholstery" });
      return;
    }
    res.status(200).json(upholstery);
    return;
  } catch (err) {
    console.error(err);
    res.sendStatus(400);
    return;
  }
};

// Delete a upholstry by ID (url)
export const deleteUpholstryById = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const id = req.params.id;
    const upholstery = await schemas.Upholstery.findByIdAndDelete(id);
    if (!upholstery) {
      res
        .status(404)
        .json({ message: `Failed to find upholstery with id: ${id}` });
      return;
    }
    res.status(200).json({ message: "Upholstry deleted successfully" });
  } catch (err) {
    console.error(err);
    res.sendStatus(400);
    return;
  }
};

// Update upholstry by id
export const putUpdateUpholstry = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const id = req.body._id;
    const upholstery = await schemas.Upholstery.findByIdAndUpdate(id, req.body);
    if (!upholstery) {
      res
        .status(404)
        .json({ message: `Failed to find upholstery with id: ${id}` });
      return;
    }
    const updatedUpholstry = await schemas.Upholstery.findById(id);
    if (!updatedUpholstry) {
      res
        .status(404)
        .json({ message: `Failed to find updated upholstery with id: ${id}` });
      return;
    }
    res.status(200).json(updatedUpholstry);
    return;
  } catch (err) {
    console.error(err);
    res.sendStatus(400);
    return;
  }
};
