import express from "express";

import jobRoute from "./jobRoute.js";
import taskRoute from "./taskRoute.js";
import frameRoute from "./frameRoute.js";

const router = express.Router();

export default (): express.Router => {
  jobRoute(router);
  taskRoute(router);
  frameRoute(router);

  return router;
};
