const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("jobs", {
    getJobs: () => ipcRenderer.invoke("getJobs"),
} satisfies Window["jobs"] );