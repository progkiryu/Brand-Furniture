import { ipcMain } from "electron";
import schemas from "../schema.js";

export function getOrders() {
    ipcMain.handle("getOrders", async () => {
        try {
            const orders = await schemas.Order.find<Order[]>();
            return orders;
        }
        catch (err) {
            throw err;
        }
    });
}