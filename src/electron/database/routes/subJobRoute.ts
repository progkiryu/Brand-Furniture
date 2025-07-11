import express from "express";
import {
  getAllSubJobs,
  getSubJobById,
  insertSubJob,
  updateSubJob,
  removeSubJob,
  getFilteredSubJobsByStatus,
  getSubJobsByJobId,
} from "../controllers/subJobController.js";

export default (router: express.Router) => {
  // Get Routes
  router.get("/subJob/getAllSubJobs", getAllSubJobs);
  router.get("/subJob/getSubJobById/:id", getSubJobById);
  router.get("/subJob/getSubJobsByJobId/:jobid", getSubJobsByJobId);
  // Post Routes
  router.post("/subJob/insertSubJob", insertSubJob);
  router.post("/subJob/getFilteredSubJobsByStatus", getFilteredSubJobsByStatus);
  // Put Routes
  router.put("/subJob/updateSubJob", updateSubJob);
  // Delete Routes
  router.delete("/subJob/removeSubJob/:id", removeSubJob);
};
