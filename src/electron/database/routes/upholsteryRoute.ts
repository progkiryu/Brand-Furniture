import express from "express";
import {
  deleteUpholsteryById,
  getAllUpholstery,
  getUpholsteryById,
  getUpholsteryByStatus,
  getUpholsteryBySubJobId,
  postCreateUpholstery,
  putUpdateUpholstery,
} from "../controllers/upholsteryController.js";

export default (router: express.Router) => {
  // Get Routes
  router.get("/upholstery/getAllUpholstery", getAllUpholstery);
  router.get("/upholstery/getUpholsteryById/:id", getUpholsteryById);
  router.get(
    "/upholstery/getUpholsteryBySubJobId/:subjobid",
    getUpholsteryBySubJobId
  );
  router.get("/upholstery/getUpholsteryByStatus/:status", getUpholsteryByStatus);
  // Post Routes
  router.post("/upholstery/postCreateUpholstery", postCreateUpholstery);
  // Delete Routes
  router.delete("/upholstery/deleteUpholsteryById/:id", deleteUpholsteryById);
  // Put Routes
  router.put("/upholstery/putUpdateUpholstery", putUpdateUpholstery);
};
