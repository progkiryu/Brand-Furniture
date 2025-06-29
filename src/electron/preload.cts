const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("orders", {
    getOrders: () => ipcRenderer.invoke("getOrders"),
} satisfies Window["orders"] );