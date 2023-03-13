import express from "express";
import {
  signin,
  signup,
  refresh,
  signout,
} from "../controller/AuthController.js";
const router = express.Router();

router.post("/signup", signup);
router.post("/signin", signin);
router.get("/refresh", refresh);
router.get("/google");
router.post("/signout", signout);
export default router;
