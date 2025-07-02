import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
    taskNo: Number,
    desc: String,
    detailOther: String,
    attach: String,
    royalty: String,
    depositAmount: Number,
    liaison: String,
    adminOther: String,
    label: String
});

const jobSchema = new mongoose.Schema({
    invoiceId: String,
    dueDate: Date,
    label: String
});

const frameSchema = new mongoose.Schema({
    frameId: String,
    supplier: String,
    desc: String,
    orderDate: String,
    expectDate: String,
    receiveDate: String
});

const cushionSchema = new mongoose.Schema({
    cushionId: String,
    supplier: String,
    type: String,
    desc: String,
    orderDate: String,
    expectDate: String,
    receiveDate: String
});

const upholsterSchema = new mongoose.Schema({
    upholsterId: String,
    supplier: String,
    desc: String,
    orderDate: String,
    expectDate: String,
    receiveDate: String
});

const clientSchema = new mongoose.Schema({
    name: String
});

const Job = mongoose.model("Job", jobSchema);
const Task = mongoose.model("Task", taskSchema);
const Frame = mongoose.model("Frame", frameSchema);
const Cushion = mongoose.model("Model", cushionSchema);
const Upholster = mongoose.model("Upholster", upholsterSchema);
const Client = mongoose.model("Client", clientSchema);

const schemas = { Job, Client, Task, Frame, Cushion, Upholster };

export default schemas;