import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";

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
export async function connectMongoDB() {
  try {
    const conn = await mongoose.connect(MONGO_URI);
    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (err) {
    console.log("Error connecting to mongoDB: ", err);
  }
}

appDB.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
