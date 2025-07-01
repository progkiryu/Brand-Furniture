type Task = {
    taskNo: Number,
    desc: String,
    specs: String,
    other: String,
    attach: String,
    royalty: String
}

type Job = {
    invoiceId: number,
    dueDate: Date
}

type Frame = {
    frameId: String,
    supplier: String,
    desc: String,
    orderDate: String,
    expectDate: String,
    receiveDate: String
}

type Cushion = {
    cushionId: String,
    supplier: String,
    type: String,
    desc: String,
    orderDate: String,
    expectDate: String,
    receiveDate: String
}

type Upholster = {
    upholsterId: String,
    supplier: String,
    desc: String,
    orderDate: String,
    expectDate: String,
    receiveDate: String
}

type Client = {
    name: String
}

interface Window {
    jobs: {
        getJobs: () => Promise<Array<Job>>;
    },
    orders: {
        getClients: () => Promise<Array<Client>>;
    }
}