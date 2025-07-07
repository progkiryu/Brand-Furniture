type Job = {
  invoiceId: String;
  client: String;
  name: String;
  type: String; // Added 'type' as per your mock data
  due: String;
  subJobList: String[];
  isPinned: Boolean;
};

type SubJob = {
  jobId: String;
  subJobDetail: String;
  note: String;
  file: String;
  depositAmount: Number;
  depositDate: Date;
  paidInFull: Boolean;
  liaison: String;
  paymentNote: String;
  frameList: String[];
  cushionList: String[];
  upholsteryList: String[];
  isArchived: Boolean;
};

type Frame = {
  subJobId: String; // FK to SubJob (SubJob's 'subJobId')
  supplier: String;
  description: String;
  orderedDate: Date;
  expectedDate: Date;
  receivedDate: Date;
};

type Cushion = {
  subJobId: String; // FK to SubJob (SubJob's 'subJobId')
  supplier: String;
  type: String;
  description: String;
  orderedDate: Date;
  expectedDate: Date;
  receivedDate: Date;
};

type Upholstery = {
  subJobId: String; // FK to SubJob (SubJob's 'subJobId')
  supplier: String;
  type: String;
  description: String;
  orderedDate: Date;
  expectedDate: Date;
  receivedDate: Date;
};

interface Window {
  jobs: {
    getJobs: () => Promise<Array<Job>>;
  };
  orders: {
    getClients: () => Promise<Array<Client>>;
  };
}
