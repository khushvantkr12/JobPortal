import express from "express";
import { login, logout, register, updateProfile,sendotp } from "../controllers/user.controller.js";
import isAuthenticated from "../middleware/isAuthenticated.js";
import { singleUpload } from "../middleware/multer.js";

const router=express.Router();

router.post("/sendotp",sendotp);
router.post("/register",singleUpload,register);
router.post("/login",login);
router.get("/logout",logout);
router.post("/profile/update",isAuthenticated,singleUpload,updateProfile);
export default router;