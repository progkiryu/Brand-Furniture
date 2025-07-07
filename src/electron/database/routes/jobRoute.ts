import express from "express";
import {
  getAllJobs,
  getJobById,
  insertJob,
  updateJob,
  removeJob,
} from "../controllers/jobController.js";

export default (router: express.Router) => {
  router.get("/job/getAllJobs", getAllJobs);
  router.get("/job/getJobById/:id", getJobById);
  router.post("/job/insertJob", insertJob);
  router.put("/job/updateJob/:id", updateJob);
  router.delete("/job/removeJob/:id", removeJob);
};
