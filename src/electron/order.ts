import { mongoConnect } from "./database.js";
//import Order from "./schema.js";
import schemas from "./schema.js";

mongoConnect();

export async function getOrders() {
    try {
        const orders = await schemas.Order.find();
        console.log(orders);
    }
    catch (err) {
        console.log(err);
    }
}