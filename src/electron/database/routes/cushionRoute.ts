import express from "express";
import {
  deleteCushionById,
  getAllCushions,
  getCushionById,
  getCushionsBySubJobId,
  getCushionsByStatus,
  postCreateCushion,
  putUpdateCushion,
} from "../controllers/cushionController.js";

export default (router: express.Router) => {
  // Get Routes
  router.get("/cushion/getAllCushions", getAllCushions);
  router.get("/cushion/getCushionById/:id", getCushionById);
  router.get("/cushion/getCushionsBySubJobId/:subjobid", getCushionsBySubJobId);
  router.get("/cushion/getCushionsByStatus/:status", getCushionsByStatus);
  // Post Routes
  router.post("/cushion/postCreateCushion", postCreateCushion);
  // Delete Routes
  router.delete("/cushion/deleteCushionById/:id", deleteCushionById);
  // Get Routes
  router.put("/cushion/putUpdateCushion", putUpdateCushion);
};
