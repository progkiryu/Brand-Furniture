const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("jobs", {
    getJobs: () => ipcRenderer.invoke("getJobs"),
} satisfies Window["jobs"] );

contextBridge.exposeInMainWorld("clients", {
    getClients: () => ipcRenderer.invoke("getClients")
} satisfies Window["orders"] );

contextBridge.exposeInMainWorld("tasks", {
    getTasks: () => ipcRenderer.invoke("getTasks")
} satisfies Window["tasks"] );

contextBridge.exposeInMainWorld("frame", {
    getFrames: () => ipcRenderer.invoke("getFrames")
} satisfies Window["frame"] );

contextBridge.exposeInMainWorld("upholster", {
    getUpholstery: () => ipcRenderer.invoke("getUpholstery")
} satisfies Window["upholster"] );

contextBridge.exposeInMainWorld("cushion", {
    getCushions: () => ipcRenderer.invoke("getCushions")
} satisfies Window["cushion"] );