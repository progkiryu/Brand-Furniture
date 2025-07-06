// // schema.js
// import mongoose from "mongoose";

// // Define schemas for embedded documents first
// // Note: Mongoose automatically adds an _id to subdocuments by default.
// // Setting _id: { type: mongoose.Schema.Types.ObjectId, auto: true } makes it explicit.
// const frameSchema = new mongoose.Schema({
//     _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
//     supplier: String,
//     description: String,
//     ordereddate: String,
//     expecteddate: String,
//     receiveddate: String,
// });

// const cushionSchema = new mongoose.Schema({
//     _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
//     supplier: String,
//     type: String,
//     description: String,
//     ordereddate: String,
//     expecteddate: String,
//     receiveddate: String,
// });

// const upholsterySchema = new mongoose.Schema({
//     _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
//     supplier: String,
//     type: String,
//     description: String,
//     ordereddate: String,
//     expecteddate: String,
//     receiveddate: String,
// });

// // Define SubJob schema with nested arrays for frames, cushions, and upholstery
// const subJobSchema = new mongoose.Schema({
//     _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
//     subJobDetail: String,
//     note: String,
//     file: String,
//     depositAmount: Number,
//     depositDate: String,
//     paidInFull: String,
//     liaison: String,
//     paymentNote: String,
//     frames: [frameSchema], // Nested array of frame documents
//     cushions: [cushionSchema], // Nested array of cushion documents
//     upholstery: [upholsterySchema], // Nested array of upholstery documents
// });

// // Define Job schema with nested subJobs array
// const jobSchema = new mongoose.Schema({
//     _id: { type: mongoose.Schema.Types.ObjectId, auto: true }, // Main document _id
//     invoiceId: Number,
//     client: String, // Client is an attribute of Job
//     name: String,
//     type: String,
//     due: String,
//     subJobs: [subJobSchema], // Nested array of subJob documents
// });


// // Mongoose model for the top-level Job collection
// const Job = mongoose.model("Job", jobSchema);

// // Export only the top-level models that represent actual collections
// const schemas = { Job };

// export default schemas;

// import mongoose from "mongoose";

// const taskSchema = new mongoose.Schema({
//     taskNo: Number,
//     desc: String,
//     detailOther: String,
//     attach: String,
//     royalty: String,
//     depositAmount: Number,
//     liaison: String,
//     adminOther: String,
//     label: String
// });

// const jobSchema = new mongoose.Schema({
//     invoiceId: String,
//     dueDate: Date,
//     label: String
// });

// const frameSchema = new mongoose.Schema({
//     frameId: String,
//     supplier: String,
//     desc: String,
//     orderDate: String,
//     expectDate: String,
//     receiveDate: String
// });

// const cushionSchema = new mongoose.Schema({
//     cushionId: String,
//     supplier: String,
//     type: String,
//     desc: String,
//     orderDate: String,
//     expectDate: String,
//     receiveDate: String
// });

// const upholsterSchema = new mongoose.Schema({
//     upholsterId: String,
//     supplier: String,
//     desc: String,
//     orderDate: String,
//     expectDate: String,
//     receiveDate: String
// });

// const clientSchema = new mongoose.Schema({
//     name: String
// });

// const Job = mongoose.model("Job", jobSchema);
// const Task = mongoose.model("Task", taskSchema);
// const Frame = mongoose.model("Frame", frameSchema);
// const Cushion = mongoose.model("Model", cushionSchema);
// const Upholster = mongoose.model("Upholster", upholsterSchema);
// const Client = mongoose.model("Client", clientSchema);

// const schemas = { Job, Client, Task, Frame, Cushion, Upholster };

// export default schemas;

import mongoose from "mongoose";

const subJobSchema = new mongoose.Schema({
    jobId: String,
    subJobId: Number,  
    subJobDetail: String,
    note: String,
    file: String,
    depositAmount: Number,
    depositDate: String,
    paidInFull: String,
    liaison: String,
    paymentNote: String,
});


const jobSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    invoiceId: Number,
    client: String,
    name: String,
    type: String, // Added 'type' as per your mock data
    due: String,
});

const frameSchema = new mongoose.Schema({
    jobId: String,    // FK to Job
    subJobId: Number, // FK to SubJob (SubJob's 'subJobId')
    frameId: String,  // Unique MongoDB-style PK for Frame
    supplier: String,
    description: String,
    ordereddate: String,
    expecteddate: String,
    receiveddate: String,
});

const cushionSchema = new mongoose.Schema({
    jobId: String,    // FK to Job
    subJobId: Number, // FK to SubJob (SubJob's 'subJobId')
    cushionId: String, // Unique MongoDB-style PK for Cushion
    supplier: String,
    type: String,
    description: String,
    ordereddate: String,
    expecteddate: String,
    receiveddate: String,
});

const upholsterySchema = new mongoose.Schema({
    jobId: String,    // FK to Job
    subJobId: Number, // FK to SubJob (SubJob's 'subJobId')
    upholsteryId: String, // Unique MongoDB-style PK for Upholstery
    supplier: String,
    type: String, // Added 'type' as per your mock data
    description: String,
    ordereddate: String,
    expecteddate: String,
    receiveddate: String,
});

const Job = mongoose.model("Job", jobSchema);
const SubJob = mongoose.model("Task", subJobSchema);
const Frame = mongoose.model("Frame", frameSchema);
const Cushion = mongoose.model("Model", cushionSchema);
const Upholstery = mongoose.model("Upholster", upholsterySchema);

const schemas = { Job, SubJob, Frame, Cushion, Upholstery };

export default schemas;
