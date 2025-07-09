import express from "express";
import {
  getAllJobs,
  getJobById,
  insertJob,
  updateJob,
  removeJob,
  getFilteredJobsByDate,
} from "../controllers/jobController.js";

export default (router: express.Router) => {
  // Get Routes
  router.get("/job/getAllJobs", getAllJobs);
  router.get("/job/getJobById/:id", getJobById);
  // Post Routes
  router.post("/job/getFilteredJobsByDate", getFilteredJobsByDate);
  router.post("/job/insertJob", insertJob);
  // Put Routes
  router.put("/job/updateJob/:id", updateJob);
  // Delete Routes
  router.delete("/job/removeJob/:id", removeJob);
};
