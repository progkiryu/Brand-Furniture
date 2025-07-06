type Job = {
    _id: string;
    invoiceId: number;
    client: string;
    name: string;
    type: string; // Added 'type' as per your mock data
    due: string;
    isPinned: boolean;
}

type SubJob = {
    _id: string;
    jobId: string;   
    subJobDetail: string;
    note: string;
    file: string;
    depositAmount: number;
    depositDate: string;
    paidInFull: string;
    liaison: string;
    paymentNote: string;
    isArchived: boolean;
}

type Frame = {
    _id: string;
    jobId: string;    // FK to Job
    subJobId: number; // FK to SubJob (SubJob's 'subJobId')
    supplier: string;
    description: string;
    ordereddate: string;
    expecteddate: string;
    receiveddate: string;
}

type Cushion = {
    _id: string;
    jobId: string;    // FK to Job
    subJobId: number; // FK to SubJob (SubJob's 'subJobId')
    supplier: string;
    type: string;
    description: string;
    ordereddate: string;
    expecteddate: string;
    receiveddate: string;
}

type Upholstery = {
    _id: string;
    jobId: string;    // FK to Job
    subJobId: number; // FK to SubJob (SubJob's 'subJobId')
    supplier: string;
    type: string; // Added 'type' as per your mock data
    description: string;
    ordereddate: string;
    expecteddate: string;
    receiveddate: string;
}


interface Window {
    electron: {
        greeting: () => void;
    }
}