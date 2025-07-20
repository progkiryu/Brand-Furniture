const { contextBridge, ipcRenderer } = require("electron");


contextBridge.exposeInMainWorld("electron", {
  greeting: () => console.log("Hello World!"),
  openExternalLink: (url: string) => ipcRenderer.send('open-external-link', url)
} satisfies Window["electron"]);

