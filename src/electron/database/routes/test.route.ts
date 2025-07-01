import express from "express";
import { registerTest } from "../controllers/test.controller.js";

export default (router: express.Router) => {
  router.post("/test/register", registerTest);
};
