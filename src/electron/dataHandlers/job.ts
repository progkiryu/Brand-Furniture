import { ipcMain } from "electron";
import schemas from "../database/models/schema.js";

export function jobHandler() {
  ipcMain.handle("getJobs", async () => {
    try {
      const jobs = await schemas.Job.find<Array<Job>>();
      return jobs;
    } catch (err) {
      throw err;
    }
  });
}
