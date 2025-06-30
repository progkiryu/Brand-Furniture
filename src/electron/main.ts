import { app, BrowserWindow } from "electron";
import path from "path";
import { isDev } from "./util.js";

// DB Imports
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";

app.on("ready", () => {
  const mainWindow = new BrowserWindow({});

  if (isDev()) {
    // Open live server while in dev mode
    mainWindow.loadURL("http://localhost:5555");
  } else {
    mainWindow.loadFile(path.join(app.getAppPath(), "/dist-react/index.html"));
  }
});

// DB
const appDB = express();
appDB.use(express.json());
appDB.use(express.urlencoded({ extended: false }));
appDB.use(cors());
appDB.use(cookieParser());
dotenv.config();

dotenv.config();

const MONGO_URI = process.env.MONGO_URI ? process.env.MONGO_URI : "";
const PORT = process.env.port || 5051;

// Connect to mongoDB
try {
  const conn = await mongoose.connect(MONGO_URI);
  console.log(`MongoDB connected: ${conn.connection.host}`);
} catch (err) {
  console.log("Error connecting to mongoDB: ", err);
}

// appDB.get("/", (req, res) => {
//   res.status(200).send("Hello World");
// });

appDB.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
