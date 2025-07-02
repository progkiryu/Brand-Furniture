import { ipcMain } from "electron";
import schemas from "../schema.js";

export function clientHandler() {
  ipcMain.handle("getOrders", async () => {
    try {
      const clients = await schemas.Client.find<Array<Client>>();
      return clients;
    } catch (err) {
      throw err;
    }
  });
}
