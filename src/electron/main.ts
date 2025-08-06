import { app, BrowserWindow, ipcMain, shell, dialog } from "electron";
import path from "path";
import { isDev } from "./util.js";
import { getPreloadPath } from "./pathResolver.js";

import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import router from "./database/routes/router.js";

// --------------------DB setup-----------------------
const appDB = express();
appDB.use(express.json());
appDB.use(express.urlencoded({ extended: false }));
appDB.use(cors());
appDB.use(cookieParser());

dotenv.config();

const MONGO_URI = process.env.MONGO_URI
  ? process.env.MONGO_URI
  : "mongodb+srv://nicolettek28:cJf6qbZ7JMPoHHuF@cluster0.8t2fxy9.mongodb.net/?";
const PORT = process.env.port || 5050;

// Connect to mongoDB
async function connectMongoDB() {
  try {
    const conn = await mongoose.connect(MONGO_URI);
    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (err) {
    console.log("Error connecting to mongoDB: ", err);
  }
}
connectMongoDB();

appDB.use("/", router());

appDB.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
// ---------------------------------------------------

app.on("ready", () => {
  // create browser window
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 700,
    minWidth: 800,
    minHeight: 700,
    maxWidth: 2880,
    maxHeight: 1880,
    autoHideMenuBar: true,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: getPreloadPath(),
    },
  });

  if (isDev()) {
    mainWindow.loadURL("http://localhost:5555");
  } else {
    mainWindow.loadFile(path.join(app.getAppPath(), "/dist-react/index.html"));
  }

  ipcMain.on('open-external-link', (_, url) => {
    shell.openExternal(url);
  });

  // New: Handle open-file-path from renderer
  ipcMain.on('open-file-path', (_, filePath) => {
    shell.openPath(filePath)
      .catch(err => {
        console.error("Failed to open file path:", filePath, err);
        dialog.showErrorBox('Error Opening File', `Could not open file: ${filePath}\n\nError: ${err.message}`);
      });
  });

  // New: Handle open-file-dialog from renderer
  ipcMain.handle('open-file-dialog', async (_) => {
    const { canceled, filePaths } = await dialog.showOpenDialog(mainWindow, {
      properties: ["openFile"],
    });
    return canceled ? undefined : filePaths[0];
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    // createBrowserWindow();
  }
});
