import express from "express";
import { getAllJobs, insertJob } from "../controllers/jobController.js";

export default (router: express.Router) => {
    router.get("/jobs", getAllJobs);
    router.post("/jobs", insertJob);
}