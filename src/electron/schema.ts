import mongoose from "mongoose"

const orderSchema = new mongoose.Schema({
    orderName: String,
    orderDesc: String
});

const Order = mongoose.model("Order", orderSchema);

export default Order;