import express from "express";
import { getAllTasks } from "../controllers/taskController.js";

export default (router: express.Router) => {
    router.get("/tasks", getAllTasks);
}