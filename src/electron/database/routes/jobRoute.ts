import express from "express";
import {
  getAllJobs,
  getJobById,
  insertJob,
  updateJob,
  removeJob,
  getFilteredJobsByDate,
  getFilteredJobsByType,
  getArchivedJobs,
  getCurrentJobs,
  getPinnedJobs,
} from "../controllers/jobController.js";

export default (router: express.Router) => {
  // Get Routes
  router.get("/job/getAllJobs", getAllJobs);
  router.get("/job/getJobById/:id", getJobById);
  router.get("/job/getCurrentJobs", getCurrentJobs);
  router.get("/job/getArchivedJobs", getArchivedJobs);
  router.get("/job/getPinnedJobs", getPinnedJobs);
  // Post Routes
  router.post("/job/insertJob", insertJob);
  router.post("/job/getFilteredJobsByDate", getFilteredJobsByDate);
  router.post("/job/getFilteredJobsByType", getFilteredJobsByType);
  // Put Routes
  router.put("/job/updateJob/:id", updateJob);
  // Delete Routes
  router.delete("/job/removeJob/:id", removeJob);
};
