import { app, BrowserWindow } from "electron";
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
  : "mongodb+srv://admin2:Password123@cluster0.8t2fxy9.mongodb.net/?";
const PORT = process.env.port || 5051;

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
    // size of window upon opening
    width: 800,
    height: 700,
    // min size of window
    minWidth: 800,
    minHeight: 700,
    // max size of window
    maxWidth: 2880,
    maxHeight: 1880,
    // hide top menu bar
    autoHideMenuBar: true,
    webPreferences: {
      // security purposes
      nodeIntegration: false,
      contextIsolation: true,
      preload: getPreloadPath(),
    },
  });

  if (isDev()) {
    // Open live server while in dev mode
    mainWindow.loadURL("http://localhost:5555");
  } else {
    // Open HTML file when app is built
    mainWindow.loadFile(path.join(app.getAppPath(), "/dist-react/index.html"));
  }
});
