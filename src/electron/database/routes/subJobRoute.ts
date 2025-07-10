import express from "express";
import {
  getAllSubJobs,
  getSubJobById,
  insertSubJob,
  updateSubJob,
  removeSubJob,
} from "../controllers/subJobController.js";

export default (router: express.Router) => {
  // Get Routes
  router.get("/subJob/getAllSubJobs", getAllSubJobs);
  router.get("/subJob/getSubJobById/:id", getSubJobById);
  // Post Routes
  router.post("/subJob/insertSubJob", insertSubJob);
  // Put Routes
  router.put("/subJob/updateSubJob", updateSubJob);
  // Delete Routes
  router.delete("/subJob/removeSubJob/:id", removeSubJob);
};
