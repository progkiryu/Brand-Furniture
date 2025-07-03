import express from "express";
import { getAllSubJobs } from "../controllers/taskController.js";

export default (router: express.Router) => {
    router.get("/tasks", getAllSubJobs);
}