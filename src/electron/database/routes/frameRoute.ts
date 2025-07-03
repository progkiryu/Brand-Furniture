import express from "express";
import {
  getAllFrames,
  getFrameById,
  postCreateFrame,
  deleteFrameById,
  putUpdateFrame,
} from "../controllers/frameController.js";

export default (router: express.Router) => {
  // Get Routes
  router.get("/frame/getAllFrames", getAllFrames);
  router.get("/frame/getFrameById/:id", getFrameById);
  // Post Routes
  router.post("/frame/postCreateFrame", postCreateFrame);
  // Delete Routes
  router.delete("/frame/deleteFrameById/:id", deleteFrameById);
  // Get Routes
  router.put("/frame/putUpdateFrame", putUpdateFrame);
};
