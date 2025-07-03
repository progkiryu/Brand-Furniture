import express from "express";

import jobRoute from "./jobRoute.js";
import taskRoute from "./taskRoute.js";
import frameRoute from "./frameRoute.js";

import testRoute from "./test.route.js"; // Remove Later

const router = express.Router();

export default (): express.Router => {
  jobRoute(router);
  taskRoute(router);
  frameRoute(router);
  testRoute(router); // Remove Later

  return router;
};
