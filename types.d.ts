type Job = {
  client: string;
  poNumber?: string;
  _id?: string;
  invoiceId?: string;
  client: string;
  name: string;
  type: string; // Added 'type' as per your mock data
  due: Date;
  depositAmount?: Number;
  depositDate?: Date;
  paidInFull?: Date;
  liaison?: string;
  paymentNote?: string;
  subJobList?: string[];
  isPinned?: Boolean;
  isArchived?: Boolean;
};

type SubJob = {
  _id?: string;
  jobId: string;
  subJobDetail: string;
  note?: string;
  file?: string;
  dueDate?: Date;
  frameList?: string[];
  cushionList?: string[];
  upholsteryList?: string[];
  status?: string; // status of subjob (5 colours), default: "Unassigned"
  frameFormed?: Boolean; // seperate to the 5 colours
};

type Frame = {
  _id?: string;
  subJobId: string; // FK to SubJob (SubJob's 'subJobId')
  supplier?: string;
  description?: string;
  orderedDate?: Date;
  expectedDate?: Date;
  receivedDate?: Date;
};

type Cushion = {
  _id?: string;
  subJobId: string; // FK to SubJob (SubJob's 'subJobId')
  type: string;
  supplier?: string;
  description?: string;
  orderedDate?: Date;
  expectedDate?: Date;
  receivedDate?: Date;
};

type Upholstery = {
  _id?: string;
  subJobId: string; // FK to SubJob (SubJob's 'subJobId')
  type: string;
  supplier?: string;
  description?: string;
  orderedDate?: Date;
  expectedDate?: Date;
  receivedDate?: Date;
};

type Notif = {
  _id?: string;
  icon?: "cart" | "pin";
  notifTitle: string;
  notifDesc: string;
  time: Date;
};

type DateRange = {
  startDate: Date;
  endDate: Date;
};

interface Window {
  electron: {
    greeting: () => void;
  };
}
