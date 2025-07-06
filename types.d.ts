// type Job = {
//     _id: any;
//     invoiceId: number;
//     client: string;
//     name: string;
//     type: string; // Added 'type' as per your mock data
//     due: string;
// }

// type SubJob = {
//     jobId: string; 
//     subJobId: number;    
//     subJobDetail: string;
//     note: string;
//     file: string;
//     depositAmount: number;
//     depositDate: string;
//     paidInFull: string;
//     liaison: string;
//     paymentNote: string;
// }

// type Frame = {
//     jobId: string;    // FK to Job
//     subJobId: number; // FK to SubJob (SubJob's 'subJobId')
//     frameId: string;  // Unique MongoDB-style PK for Frame
//     supplier: string;
//     description: string;
//     ordereddate: string;
//     expecteddate: string;
//     receiveddate: string;
// }

// type Cushion = {
//     jobId: string;    // FK to Job
//     subJobId: number; // FK to SubJob (SubJob's 'subJobId')
//     cushionId: string; // Unique MongoDB-style PK for Cushion
//     supplier: string;
//     type: string;
//     description: string;
//     ordereddate: string;
//     expecteddate: string;
//     receiveddate: string;
// }

// type Upholstery = {
//     jobId: string;    // FK to Job
//     subJobId: number; // FK to SubJob (SubJob's 'subJobId')
//     upholsteryId: string; // Unique MongoDB-style PK for Upholstery
//     supplier: string;
//     type: string; // Added 'type' as per your mock data
//     description: string;
//     ordereddate: string;
//     expecteddate: string;
//     receiveddate: string;
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
    _id: string;
    invoiceId: number;
    client: string;
    name: string;
    type: string; // Added 'type' as per your mock data
    due: string;
}

type SubJob = {
    jobId: string; 
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

