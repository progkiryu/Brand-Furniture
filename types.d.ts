type Job = {
  client: String;
  poNumber: String;
  _id?: String;
  invoiceId: String;
  name: String;
  type: String; // Added 'type' as per your mock data
  due: Date;
  subJobList?: String[];
  isPinned?: Boolean;
};

type SubJob = {
  _id?: String;
  jobId: String;
  subJobDetail: String;
  note?: String;
  file?: String;
  dueDate?: Date;
  depositAmount?: Number;
  depositDate?: Date;
  paidInFull?: Boolean;
  liaison?: String;
  paymentNote?: String;
  frameList?: String[];
  cushionList?: String[];
  upholsteryList?: String[];
  isArchived?: Boolean;
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
  icon?: "cart" | "pin";
  title: string;
  description: string;
  time: string;
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
