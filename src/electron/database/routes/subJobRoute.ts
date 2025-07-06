// import express from "express";
// import { getAllSubJobs } from "../controllers/subJobController.js";

// export default (router: express.Router) => {
//     router.get("/tasks", getAllSubJobs);
// }


import express from "express";
import { 
    getAllSubJobs, 
    getSubJobById, 
    insertSubJob, 
    updateSubJob, 
    removeSubJob 
} from "../controllers/subJobController.js";

export default (router: express.Router) => {
    router.get("/subJob/getAllSubJobs", getAllSubJobs);
    router.get("/subJob/getSubJobById/:id", getSubJobById)
    router.post("/subJob/insertSubJob", insertSubJob);
    router.put("/subJob/updateSubJob/:id", updateSubJob);
    router.delete("/subJob/removeSubJob/:id", removeSubJob);
}