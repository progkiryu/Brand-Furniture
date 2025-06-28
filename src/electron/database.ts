import express from "express";
import mongoose from "mongoose";

import dotenv from "dotenv";
dotenv.config();

const app = express();
const PORT = process.env.USER_PORT || 8000;
const MONGO_URL = process.env.MONGO_URL;

export function mongoConnect() {
    if (!MONGO_URL) {
        throw new Error("MONGO_URL undefined!");
    }

    mongoose.connect(MONGO_URL).then(() => {
        console.log("Successful connection!");
        app.listen(PORT, () => {
            console.log(`MongoDB server running on port ${PORT}`);
        })
    }).catch((err) => console.log(err));
}