import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import videoRoutes from "routes/video";
import commentRoutes from "routes/comment";
import userRoutes from "routes/user";
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

// routes
app.use("/api/users", userRoutes);
app.use("/api/videos", videoRoutes);
app.use("/api/comments", commentRoutes);

app.listen(8800, () => {
  console.log(`Listening on ${PORT}...`);
  connect();
});
