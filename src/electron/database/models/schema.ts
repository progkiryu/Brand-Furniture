import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
  {
    invoiceId: { type: String, default: ""},
    poNumber: { type: String, default: "" },
    client: { type: String, required: true, unique: false },
    name: { type: String, required: true },
    type: { type: String, default: "Commercial" }, // Added 'type' as per your mock data
    due: { type: Date, required: false },
    depositAmount: { type: Number, default: 0},
    depositDate: { type: Date, required: false, default: () => Date.now },
    paidInFull: { type: Date, required: false },
    liaison: { type: String, default: "" },
    paymentNote: { type: String, default: "" },
    subJobList: { type: [String], default: [] },
    isPinned: { type: Boolean, default: false },
    isArchived: { type: Boolean, default: false },
    hasNoDeletedNotification: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  }
);

const subJobSchema = new mongoose.Schema(
  {
    jobId: { type: String, required: true },
    subJobDetail: { type: String, required: true },
    note: { type: String, default: "" },
    file:  { type: [String], default: [] },
    dueDate: { type: Date, required: false },
    frameList: { type: [String], default: [] },
    cushionList: { type: [String], default: [] },
    upholsteryList: { type: [String], default: [] },
  },
  {
    timestamps: true,
  }
);

const frameSchema = new mongoose.Schema(
  {
    subJobId: { type: String, required: true }, // FK to SubJob (SubJob's 'subJobId')
    supplier: { type: String, default: "" },
    description: { type: String, default: "" },
    orderedDate: { type: Date, required: false },
    expectedDate: { type: Date, required: false },
    receivedDate: { type: Date, required: false },
    status: { type: String, default: "In Production" }, 
  },
  {
    timestamps: true,
  }
);

const cushionSchema = new mongoose.Schema(
  {
    subJobId: { type: String, required: true }, // FK to SubJob (SubJob's 'subJobId')
    supplier: { type: String, default: "" },
    type: { type: String, required: true },
    description: { type: String, default: "" },
    orderedDate: { type: Date, required: false },
    expectedDate: { type: Date, required: false },
    receivedDate: { type: Date, required: false },
    status: { type: String, default: "In Production" }, 
  },
  {
    timestamps: true,
  }
);

const upholsterySchema = new mongoose.Schema(
  {
    subJobId: { type: String, required: true }, // FK to SubJob (SubJob's 'subJobId')
    supplier: { type: String, default: "" },
    type: { type: String, required: true },
    description: { type: String, default: "" },
    orderedDate: { type: Date, required: false },
    expectedDate: { type: Date, required: false },
    receivedDate: { type: Date, required: false },
    status: { type: String, default: "In Production" }, 
  },
  {
    timestamps: true,
  }
);

const notifSchema = new mongoose.Schema(
  {
    jobId: { type: String, required: true }, 
    notifTitle: { type: String, required: true },
    notifDesc: { type: String, required: true },
    time: { type: Date, required: true },
  },
  {
    timestamps: true,
  }
);

const Job = mongoose.model("Job", jobSchema);
const SubJob = mongoose.model("Subjob", subJobSchema);
const Frame = mongoose.model("Frame", frameSchema);
const Cushion = mongoose.model("Cushion", cushionSchema);
const Upholstery = mongoose.model("Upholster", upholsterySchema);
const Notif = mongoose.model("Notification", notifSchema);

const schemas = { Job, SubJob, Frame, Cushion, Upholstery, Notif };

export default schemas;
