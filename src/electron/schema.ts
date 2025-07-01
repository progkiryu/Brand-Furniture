import mongoose from "mongoose";

const taskSchema = new mongoose.Schema<Task>({
    taskNo: Number,
    desc: String,
    specs: String,
    other: String,
    attach: String,
    royalty: String
});

const jobSchema = new mongoose.Schema<Job>({
    invoiceId: String,
    dueDate: Date
});

const frameSchema = new mongoose.Schema<Frame>({
    frameId: String,
    supplier: String,
    desc: String,
    orderDate: String,
    expectDate: String,
    receiveDate: String
});

const cushionSchema = new mongoose.Schema<Cushion>({
    cushionId: String,
    supplier: String,
    type: String,
    desc: String,
    orderDate: String,
    expectDate: String,
    receiveDate: String
});

const upholsterSchema = new mongoose.Schema<Upholster>({
    upholsterId: String,
    supplier: String,
    desc: String,
    orderDate: String,
    expectDate: String,
    receiveDate: String
});

const clientSchema = new mongoose.Schema<Client>({
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