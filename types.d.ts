// type Task = {
//     taskNo: Number,
//     desc: String,
//     detailOther: String,
//     attach: String,
//     royalty: String,
//     depositAmount: Number,
//     liaison: String,
//     adminOther: String,
//     label: String,
//     job: Number
// }

// type Job = {
//     jobNo: number,
//     invoiceId: number,
//     dueDate: Date,
//     label: string,
//     tasks: Array<Number>
// }

// type Frame = {
//     frameId: String,
//     supplier: String,
//     desc: String,
//     orderDate: String,
//     expectDate: String,
//     receiveDate: String
//     task: number
// }

// type Cushion = {
//     cushionId: String,
//     supplier: String,
//     type: String,
//     desc: String,
//     orderDate: String,
//     expectDate: String,
//     receiveDate: String
//     task: number
// }

// type Upholster = {
//     upholsterId: String,
//     supplier: String,
//     desc: String,
//     orderDate: String,
//     expectDate: String,
//     receiveDate: String
//     task: number
// }

// type Client = {
//     name: String
//     job: Array<Number>
// }

// interface Window {
//     jobs: {
//         getJobs: () => Promise<Array<Job>>;
//     },
//     orders: {
//         getClients: () => Promise<Array<Client>>;
//     }
// }


type Job = {
    _id: any;
    invoiceId: number;
    client: string;
    name: string;
    type: string; // Added 'type' as per your mock data
    due: string;
}

type SubJob = {
    jobId: any; 
    subJobId: number;    
    subJobDetail: string;
    note: string;
    file: string;
    depositAmount: number;
    depositDate: string;
    paidInFull: string;
    liaison: string;
    paymentNote: string;
}

type Frame = {
    jobId: string;    // FK to Job
    subJobId: number; // FK to SubJob (SubJob's 'subJobId')
    frameId: string;  // Unique MongoDB-style PK for Frame
    supplier: string;
    description: string;
    ordereddate: string;
    expecteddate: string;
    receiveddate: string;
}

type Cushion = {
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

type Upholstery = {
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


interface Window {
    jobs: {
        getJobs: () => Promise<Array<Job>>;
    },
    orders: {
        getClients: () => Promise<Array<Client>>;
    }
}


