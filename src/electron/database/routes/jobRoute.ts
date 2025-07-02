import express from "express";
import { getAllJobs } from "../controllers/jobController.js";

export default (router: express.Router) => {
    router.get("/jobs", getAllJobs);
}