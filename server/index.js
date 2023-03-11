import express, { json } from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import videoRoutes from "./routes/video";
import commentRoutes from "./routes/comment";
import userRoutes from "./routes/user";
import authRoute from "./services/Auth/routes/auth.js";
import cookieParser from "cookie-parser";
const app = express();
const PORT = 8800;
dotenv.config();
const connect = () => {
  mongoose
    .connect(process.env.MONGO_CONNECTION_STRING)
    .then((_) => {
      console.log("Mongo DB Connection Successful");
    })
    .catch((e) => {
      console.log(
        "Error occurred while trying to establish Mongodb connection: ",
        e
      );
    });
};
app.use(cookieParser());
// allow json files
app.use(json());
// routes
app.use("/api/auth", authRoute);
app.use("/api/users", userRoutes);
app.use("/api/videos", videoRoutes);
app.use("/api/comments", commentRoutes);

app.listen(8800, () => {
  console.log(`Listening on ${PORT}...`);
  connect();
});
