type Order = {
    orderName: string,
    orderDesc: string
}

interface Window {
    orders: {
        getOrders: () => Promise<Order>;
    }
}