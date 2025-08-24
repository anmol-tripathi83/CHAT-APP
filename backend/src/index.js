import express from "express";      // before using import make sure make type as module in package.json
import dotenv from "dotenv";    // help to fetch the env file values
import cookieParser from "cookie-parser";
import cors from "cors";

import path from "path";

import {connectDB} from "./lib/db.js";
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import { app, server } from "./lib/socket.js";

dotenv.config();

const PORT = process.env.PORT;
const __dirname = path.resolve();

app.use(express.json());   // allow to extract json dataout of body
app.use(cookieParser());   // allow to pars the cookie to extract values in it
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true    // allow the cookies in the header to authenticate
}));

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get(/(.*)/, (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));   // entry point for the react application
  });
}

server.listen(PORT, ()=>{
    console.log("server is runnng on PORT: "+ PORT);
    connectDB();
});  