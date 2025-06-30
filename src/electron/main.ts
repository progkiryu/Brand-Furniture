import { app, BrowserWindow } from "electron";
import path from "path";
import { isDev } from "./util.js";
import { connectMongoDB } from "./database/mongodb.js";

connectMongoDB();

app.on("ready", () => {
  const mainWindow = new BrowserWindow({});

  if (isDev()) {
    // Open live server while in dev mode
    mainWindow.loadURL("http://localhost:5555");
  } else {
    mainWindow.loadFile(path.join(app.getAppPath(), "/dist-react/index.html"));
  }
});
