const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electron", {
    greeting: () => console.log("Hello World!")
} satisfies Window["electron"]);