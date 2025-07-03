// jobTypes-erd.ts

// Frame now includes foreign keys and its own unique string PK
export interface Frame {
  jobId: string;    // FK to Job
  subJobId: number; // FK to SubJob (SubJob's 'subJobId')
  frameId: string;  // Unique MongoDB-style PK for Frame
  supplier: string;
  description: string;
  ordereddate: string;
  expecteddate: string;
  receiveddate: string;
}

// Cushion now includes foreign keys and its own unique string PK
export interface Cushion {
  jobId: string;    // FK to Job
  subJobId: number; // FK to SubJob (SubJob's 'subJobId')
  cushionId: string; // Unique MongoDB-style PK for Cushion
  supplier: string;
  type: string;
  description: string;
  ordereddate: string;
  expecteddate: string;
  receiveddate: string;
}

// Upholstery now includes foreign keys and its own unique string PK
export interface Upholstery {
  jobId: string;    // FK to Job
  subJobId: number; // FK to SubJob (SubJob's 'subJobId')
  upholsteryId: string; // Unique MongoDB-style PK for Upholstery
  supplier: string;
  type: string; // Added 'type' as per your mock data
  description: string;
  ordereddate: string;
  expecteddate: string;
  receiveddate: string;
}

// SubJob now explicitly includes jobId as part of its identifying key,
// and no longer directly nests Frame, Cushion, Upholstery arrays.
export interface SubJob {
  jobId: string; // Foreign Key from Job, also part of SubJob's composite PK
  subJobId: number;    // Unique ID *within* the context of its parent jobId (SubJob's PK)
  subJobDetail: string;
  note: string;
  file: string;
  depositAmount: number;
  depositDate: string;
  paidInFull: string;
  liaison: string;
  paymentNote: string;
}

// Job no longer contains the subJobs array directly
export interface Job {
  jobId: string; // Primary Key for Job
  invoiceId: number;
  client: string;
  name: string;
  type: string; // Added 'type' as per your mock data
  due: string;
}

export interface NewJobDataForAdd {
  jobId: string;
  invoiceId: number; // Changed from 'id' to 'invoiceId' for consistency
  client: string;
  name: string;
  type: string; // Added 'type' for consistency
  due: string;
}