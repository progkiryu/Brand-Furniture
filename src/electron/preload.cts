const { contextBridge, ipcRenderer } = require("electron");


contextBridge.exposeInMainWorld("electron", {
  greeting: () => console.log("Hello World!"),
  openExternalLink: (url: string) => ipcRenderer.send('open-external-link', url),
  // New IPC channel to open a local file path
  openFilePath: (filePath: string) => ipcRenderer.send('open-file-path', filePath),
  // New IPC channel to open a file dialog
  openFileDialog: (): Promise<string | undefined> => ipcRenderer.invoke('open-file-dialog'),
} satisfies Window["electron"]);