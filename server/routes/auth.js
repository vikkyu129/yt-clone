import express from "express";
import { signin, signup } from "../controllers/AuthController.js";
const router = express.Router();

router.post("/signup", signup);
router.post("/signin", signin);
router.get("/google");
export default router;
