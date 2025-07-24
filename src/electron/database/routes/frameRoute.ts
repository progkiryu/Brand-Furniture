import express from "express";
import {
  getAllFrames,
  getFrameById,
  postCreateFrame,
  deleteFrameById,
  putUpdateFrame,
  getFramesBySubJobId,
  getFramesByStatus,
} from "../controllers/frameController.js";

export default (router: express.Router) => {
  // Get Routes
  router.get("/frame/getAllFrames", getAllFrames);
  router.get("/frame/getFrameById/:id", getFrameById);
  router.get("/frame/getFramesBySubJobId/:subjobid", getFramesBySubJobId);
  router.get("/frame/getFramesByStatus/:status", getFramesByStatus);
  // Post Routes
  router.post("/frame/postCreateFrame", postCreateFrame);
  // Delete Routes
  router.delete("/frame/deleteFrameById/:id", deleteFrameById);
  // Get Routes
  router.put("/frame/putUpdateFrame", putUpdateFrame);
};
