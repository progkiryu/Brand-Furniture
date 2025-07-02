import express from "express";

import testRoute from "./test.route.js";

import jobRoute from "./jobRoute.js";
import taskRoute from "./taskRoute.js";

const router = express.Router();

export default (): express.Router => {
  jobRoute(router);
  taskRoute(router);
  testRoute(router);
  return router;
};
