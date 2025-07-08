import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
  {
    invoiceId: { type: String, unique: true },
    client: { type: String, require: true },
    name: { type: String, require: true },
    type: { type: String, require: true }, // Added 'type' as per your mock data
    due: { type: Date, require: true },
    subJobList: { type: [String], default: [] },
    isPinned: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

const subJobSchema = new mongoose.Schema(
  {
    jobId: { type: String, require: true },
    subJobDetail: { type: String, require: true },
    note: { type: String, default: "" },
    file: { type: String, default: "" },
    dueDate: { type: Date, require: false },
    depositAmount: { type: Number, default: 0 },
    depositDate: { type: Date, require: false },
    paidInFull: { type: Boolean, default: false },
    liaison: { type: String, default: "" },
    paymentNote: { type: String, default: "" },
    frameList: { type: [String], default: [] },
    cushionList: { type: [String], default: [] },
    upholsteryList: { type: [String], defailt: [] },
    isArchived: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

const frameSchema = new mongoose.Schema(
  {
    subJobId: { type: String, require: true }, // FK to SubJob (SubJob's 'subJobId')
    supplier: { type: String, default: "" },
    description: { type: String, default: "" },
    orderedDate: { type: Date, require: false },
    expectedDate: { type: Date, require: false },
    receivedDate: { type: Date, require: false },
  },
  {
    timestamps: true,
  }
);

const cushionSchema = new mongoose.Schema(
  {
    subJobId: { type: String, require: true }, // FK to SubJob (SubJob's 'subJobId')
    supplier: { type: String, default: "" },
    type: { type: String, require: true },
    description: { type: String, default: "" },
    orderedDate: { type: Date, require: false },
    expectedDate: { type: Date, require: false },
    receivedDate: { type: Date, require: false },
  },
  {
    timestamps: true,
  }
);

const upholsterySchema = new mongoose.Schema(
  {
    subJobId: { type: String, require: true }, // FK to SubJob (SubJob's 'subJobId')
    supplier: { type: String, default: "" },
    type: { type: String, require: true },
    description: { type: String, default: "" },
    orderedDate: { type: Date, require: false },
    expectedDate: { type: Date, require: false },
    receivedDate: { type: Date, require: false },
  },
  {
    timestamps: true,
  }
);

const notificationSchema = new mongoose.Schema(
  {
    notifTitle: { type: String, require: true },
    notifDesc: { type: String, require: true},
    time: { type: Date, required: true },
  },
  {
    timestamps: true
  }
)

const Job = mongoose.model("Job", jobSchema);
const SubJob = mongoose.model("Subjob", subJobSchema);
const Frame = mongoose.model("Frame", frameSchema);
const Cushion = mongoose.model("Model", cushionSchema);
const Upholstery = mongoose.model("Upholster", upholsterySchema);
const Notification = mongoose.model("Notification", notificationSchema);

const schemas = { Job, SubJob, Frame, Cushion, Upholstery, Notification };

export default schemas;
