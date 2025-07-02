import express from "express";
import { postCreateTest, getAllTests } from "../controllers/test.controller.js";

export default (router: express.Router) => {
  // Test
  router.get("/test/getAllTests", getAllTests);
  router.post("/test/createTest", postCreateTest);
};
