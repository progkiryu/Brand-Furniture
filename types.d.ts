type Task = {
    taskNo: Number,
    desc: String,
    detailOther: String,
    attach: String,
    royalty: String,
    depositAmount: Number,
    liaison: String,
    adminOther: String,
    label: String,
    isArchived: boolean,
    job: Number
}

type Job = {
    jobNo: number,
    invoiceId: number,
    dueDate: Date,
    label: string,
    tasks: Array<Number>
    isPinned: boolean,
}

type Frame = {
    frameId: String,
    supplier: String,
    desc: String,
    orderDate: String,
    expectDate: String,
    receiveDate: String
    task: number
}

type Cushion = {
    cushionId: String,
    supplier: String,
    type: String,
    desc: String,
    orderDate: String,
    expectDate: String,
    receiveDate: String
    task: number
}

type Upholster = {
    upholsterId: String,
    supplier: String,
    desc: String,
    orderDate: String,
    expectDate: String,
    receiveDate: String
    task: number
}

type Client = {
    name: String
    job: Array<Number>
}

interface Window {
    jobs: {
        getJobs: () => Promise<Array<Job>>;
    },
    orders: {
        getClients: () => Promise<Array<Client>>;
    }
}