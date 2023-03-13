import express from "express";
import {
  addVideo,
  updateVideo,
  deleteVideo,
  getVideo,
  addView,
  trend,
  rand,
  sub,
  tags,
  search,
} from "../controllers/VideoController";
import { verifyJWT } from "../utils/verifyJWT.js";
const router = express.Router();

router.post("/", verifyJWT, addVideo);
router.post("/:id", verifyJWT, updateVideo);
router.delete("/:id", verifyJWT, deleteVideo);
router.get("/find/:id", verifyJWT, getVideo);
router.post("/view/:id", verifyJWT, addView);
router.post("/trend", trend);
router.get("/random", rand);
router.get("/sub", verifyJWT, sub);
router.get("/tags", tags);
router.get("/search", search);
export default router;
