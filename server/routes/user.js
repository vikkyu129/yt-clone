import express from "express";
import {
  update,
  deleteUser,
  getUser,
  subscribe,
  unsubscribe,
  like,
  dislike,
} from "../controllers/UserController";
import { verifyJWT } from "../utils/verifyJWT.js";
const router = express.Router();
//update user
router.put("/:id", verifyJWT, update);

//delete user
router.delete("/:id", verifyJWT, deleteUser);

//get a user
router.get("/find/:id", getUser);

//subscribe a user
router.put("/sub/:id", verifyJWT, subscribe);

//unsubscribe a user
router.put("/unsub/:id", verifyJWT, unsubscribe);

//like a video
router.put("/like/:videoId", verifyJWT, like);

//dislike a video
router.put("/dislike/:videoId", verifyJWT, dislike);
export default router;
