import express from "express";
import { checkAuth, login, logout, signup, updateProfile } from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);

router.put("/update-profile", updateProfile);   // protected route with middleware

// used when refressing the page if user is not authenticated it goes to(manage by frontend) login page otherwise to the same page
router.get("/check",  checkAuth);

export default router;