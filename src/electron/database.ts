import express from "express";
import mongoose from "mongoose";

import dotenv from "dotenv";
dotenv.config();

const app = express();
const PORT = process.env.USER_PORT || 8000;
const MONGO_URL = process.env.MONGO_URL || "mongodb://localhost:27017/testing";

export function mongoConnect() {
    mongoose.connect(MONGO_URL).then(() => {
        console.log("Successful connection!");
        app.listen(PORT, () => {
            console.log(`MongoDB server running on port ${PORT}`);
        })
    });
}