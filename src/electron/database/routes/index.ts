import express from "express";

import testRoute from "./test.route.js";

const router = express.Router();

export default (): express.Router => {
  testRoute(router);
  return router;
};
