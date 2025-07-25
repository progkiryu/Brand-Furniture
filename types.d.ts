type Job = {
  _id?: string;
  invoiceId?: string;
  poNumber?: string;
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
  isPinned: boolean;
  isArchived: boolean;
};

type SubJob = {
  _id?: string;
  jobId: string;
  subJobDetail: string;
  note?: string;
  file?: string[];
  dueDate?: Date;
  frameList?: string[];
  cushionList?: string[];
  upholsteryList?: string[];
};

type Frame = {
  _id?: string;
  subJobId: string; // FK to SubJob (SubJob's 'subJobId')
  supplier?: string;
  description?: string;
  orderedDate?: Date;
  expectedDate?: Date;
  receivedDate?: Date;
  status?: string;
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
  status?: string;
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
  status?: string;
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

interface RequestProps {
  searchTerm: string;
  archiveTerm: string;
  jobNameTerm?: string;
  invoiceIdTerm?: string;
  clientTerm?: string;
  dueDateTerm?: string;
  yearTerm?: string;
}

interface Window {
  electron: {
    greeting: () => void;
    openExternalLink: (url: string) => void;
  };
}
