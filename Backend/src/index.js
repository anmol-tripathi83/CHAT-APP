import express from "express";      // before using import make sure make type as module in package.json
import dotenv from "dotenv";    // help to fetch the env file values

import {connectDB} from "./lib/db.js";

dotenv.config();
const app = express();

const PORT = process.env.PORT;

app.listen(PORT, ()=>{
    console.log("server is runnng on PORT: "+ PORT);
    connectDB();
});  