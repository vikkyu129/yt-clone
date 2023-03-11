import express from "express";
import {
  addComment,
  deleteComment,
  getComments,
} from "../controllers/CommentController";
import { verifyJWT } from "../utils/verifyJWT.js";
const router = express.Router();

router.post("/", verifyJWT, addComment);
router.delete("/:id", verifyJWT, deleteComment);
router.get("/:videoId", getComments);
export default router;
