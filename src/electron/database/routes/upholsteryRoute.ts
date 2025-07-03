import express from "express";
import {
  deleteUpholstryById,
  getAllUpholstery,
  getUpholsteryById,
  postCreateUpholstry,
  putUpdateUpholstry,
} from "../controllers/upholsteryController.js";

export default (router: express.Router) => {
  // Get Routes
  router.get("/upholstry/getAllUpholstery", getAllUpholstery);
  router.get("/upholstry/getUpholsteryById/:id", getUpholsteryById);
  // Post Routes
  router.get("/upholstry/postCreateUpholstry", postCreateUpholstry);
  // Delete Routes
  router.delete("/upholstry/deleteUpholstryById/:id", deleteUpholstryById);
  // Put Routes
  router.put("/upholstry/putUpdateUpholstry", putUpdateUpholstry);
};
