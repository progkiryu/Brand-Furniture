const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("api", {
    greeting: () => console.log("Hello World!")
} satisfies Window["api"] );