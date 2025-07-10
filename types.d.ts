type Job = {
  _id?: String;
  invoiceId: String;
  client: String;
  name: String;
  type: String; // Added 'type' as per your mock data
  due: Date;
  depositAmount?: Number;
  depositDate?: Date;
  paidInFull?: Date;
  liaison?: String;
  paymentNote?: String;
  subJobList?: String[];
  isPinned?: Boolean;
  isArchived?: Boolean;
};

type SubJob = {
  _id?: String;
  jobId: String;
  subJobDetail: String;
  note?: String;
  file?: String;
  dueDate?: Date;
  frameList?: String[];
  cushionList?: String[];
  upholsteryList?: String[];
};

type Frame = {
  _id?: String;
  subJobId: String; // FK to SubJob (SubJob's 'subJobId')
  supplier?: String;
  description?: String;
  orderedDate?: Date;
  expectedDate?: Date;
  receivedDate?: Date;
};

type Cushion = {
  _id?: String;
  subJobId: String; // FK to SubJob (SubJob's 'subJobId')
  type: String;
  supplier?: String;
  description?: String;
  orderedDate?: Date;
  expectedDate?: Date;
  receivedDate?: Date;
};

type Upholstery = {
  _id?: String;
  subJobId: String; // FK to SubJob (SubJob's 'subJobId')
  type: String;
  supplier?: String;
  description?: String;
  orderedDate?: Date;
  expectedDate?: Date;
  receivedDate?: Date;
};

type Notif = {
  _id?: String;
  notifTitle: String;
  notifDesc: String;
  time: Date;
}

interface Window {
  jobs: {
    getJobs: () => Promise<Array<Job>>;
  };
  orders: {
    getClients: () => Promise<Array<Client>>;
  };
  electron: {
    greeting: () => void;
  };
}
