import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    orderName: String,
    orderDesc: String,
});

const clientSchema = new mongoose.Schema({
    name: String
})

const Order = mongoose.model("Order", orderSchema);
const Client = mongoose.model("Client", clientSchema);

const schemas = { Order, Client };

export default schemas;