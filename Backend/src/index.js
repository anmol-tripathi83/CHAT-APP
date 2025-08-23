import express from "express";      // before using import make sure make type as module in package.json
import dotenv from "dotenv";    // help to fetch the env file values
import cookieParser from "cookie-parser";
import cors from "cors";

import {connectDB} from "./lib/db.js";
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";

dotenv.config();
const app = express();

const PORT = process.env.PORT;

app.use(express.json());   // allow to extract json dataout of body
app.use(cookieParser());   // allow to pars the cookie to extract values in it
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true    // allow the cookies in the header to authenticate
}));

app.use("/api/auth", authRoutes);
app.use("/api/message", messageRoutes);

app.listen(PORT, ()=>{
    console.log("server is runnng on PORT: "+ PORT);
    connectDB();
});  