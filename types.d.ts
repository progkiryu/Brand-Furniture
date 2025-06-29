type Order = {
    _id: any,
    orderName: string,
    orderDesc: string
}

interface Window {
    orders: {
        getOrders: () => Promise<Order>;
    }
}