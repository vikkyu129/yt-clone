import express, { json } from "express";
import cookieParser from "cookie-parser";
import authRoute from "./routes/auth.js";

import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config({
  path: "../../.env",
});

const connect = () => {};
mongoose.connect(process.env.MONGO_CONNECTION_STRING).then((r) => {
  console.log("Connection to Mongo Successful.");
});

const app = express();
app.use(cookieParser());
app.use(json());

// routes
app.use("/api/auth", authRoute);

app.listen(4000, () => {
  console.log("Auth server is UP on port 4000.");
  connect();
});
