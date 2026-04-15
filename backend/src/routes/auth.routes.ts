import express from "express";
import { login, getCurrentUser } from "../controllers/Auth.controller";
import { protect } from "../middlewears/auth";
const router = express.Router();

router.post("/login", login);
router.get("/me", protect, getCurrentUser);
console.log("Auth routes loaded");
export default router;