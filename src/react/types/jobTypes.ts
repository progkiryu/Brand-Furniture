export interface FrameUpholstery {
  supplier: string;
  description: string;
  ordereddate: string;
  expecteddate: string;
  receiveddate: string;
}

export interface Cushion {
  supplier: string;
  type: string;
  description: string;
  ordereddate: string;
  expecteddate: string;
  receiveddate: string;
}

export interface SubJob {
  id: number;
  jobdetail: string;
  note: string;
  file: string;
  frame: FrameUpholstery[];
  cushion: Cushion[];
  upholstery: FrameUpholstery[];
  depositAmount: number;
  depositDate: string;
  paidInFull: string;
  liaison: string;
  paymentNote: string;
}

export interface Job {
  jobId: string;
  invoiceId: number;
  client: string;
  name: string;
  due: string;
  subJobs: SubJob[];
}